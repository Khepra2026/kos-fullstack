import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BUCKET_NAME = 'admin-documents';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
};

async function verifyToken(req: Request, supabase: any): Promise<boolean> {
  const token = req.headers.get('x-admin-token');
  if (!token) return false;

  const { data, error } = await supabase
    .from('admin_sessions')
    .select('*')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (error || !data) return false;
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  if (!await verifyToken(req, supabase)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get('action');

  try {
    // LIST documents
    if (req.method === 'GET' && action === 'list') {
      const category = url.searchParams.get('category');
      const client = url.searchParams.get('client');
      const search = url.searchParams.get('search');

      let query = supabase
        .from('admin_documents')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') query = query.eq('category', category);
      if (client) query = query.ilike('client', `%${client}%`);
      if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,client.ilike.%${search}%`);

      const { data, error } = await query;
      if (error) throw error;

      return new Response(JSON.stringify({ documents: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // UPLOAD document
    if (req.method === 'POST' && action === 'upload') {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const category = formData.get('category') as string;
      const client = formData.get('client') as string;
      const tags = formData.get('tags') as string;
      const notes = formData.get('notes') as string;

      if (!file || !name) {
        return new Response(JSON.stringify({ error: 'File and name are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `${category}/${timestamp}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data: doc, error: dbError } = await supabase
        .from('admin_documents')
        .insert({
          name,
          description,
          category: category || 'general',
          client,
          file_path: filePath,
          file_size: file.size,
          file_type: file.name.split('.').pop() || 'docx',
          tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
          notes,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return new Response(JSON.stringify({ document: doc }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET signed URL for download
    if (req.method === 'GET' && action === 'download') {
      const docId = url.searchParams.get('id');
      if (!docId) throw new Error('Document ID required');

      const { data: doc, error: docError } = await supabase
        .from('admin_documents')
        .select('file_path, name, file_type')
        .eq('id', docId)
        .maybeSingle();

      if (docError || !doc) throw docError || new Error('Document not found');

      const { data: signedUrl, error: urlError } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(doc.file_path, 3600);

      if (urlError) throw urlError;

      return new Response(JSON.stringify({ url: signedUrl.signedUrl, name: doc.name, type: doc.file_type }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // UPDATE document metadata
    if (req.method === 'POST' && action === 'update') {
      const body = await req.json();
      const { id, ...updates } = body;
      if (!id) throw new Error('Document ID required');

      const { data, error } = await supabase
        .from('admin_documents')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ document: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE document
    if (req.method === 'DELETE' && action === 'delete') {
      const docId = url.searchParams.get('id');
      if (!docId) throw new Error('Document ID required');

      const { data: doc, error: docError } = await supabase
        .from('admin_documents')
        .select('file_path')
        .eq('id', docId)
        .maybeSingle();

      if (docError || !doc) throw docError || new Error('Document not found');

      await supabase.storage.from(BUCKET_NAME).remove([doc.file_path]);

      const { error: dbError } = await supabase
        .from('admin_documents')
        .delete()
        .eq('id', docId);

      if (dbError) throw dbError;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ARCHIVE document
    if (req.method === 'POST' && action === 'archive') {
      const body = await req.json();
      const { id } = body;

      const { data, error } = await supabase
        .from('admin_documents')
        .update({ is_archived: true, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ document: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // LIST clients (distinct)
    if (req.method === 'GET' && action === 'clients') {
      const { data, error } = await supabase
        .from('admin_documents')
        .select('client')
        .not('client', 'is', null)
        .eq('is_archived', false);

      if (error) throw error;

      const clients = [...new Set(data.map((d: any) => d.client).filter(Boolean))].sort();

      return new Response(JSON.stringify({ clients }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

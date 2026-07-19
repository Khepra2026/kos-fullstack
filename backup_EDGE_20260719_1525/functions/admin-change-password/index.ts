import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyToken(supabase: any, token: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_sessions')
    .select('expires_at')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();
  return !!data && !error;
}

async function verifyPassword(supabase: any, password: string): Promise<boolean> {
  // 1. Check DB first
  const { data: setting } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'admin_password_hash')
    .maybeSingle();

  if (setting) {
    const hash = await sha256(password);
    return hash === setting.value;
  }

  // 2. Fallback to secret
  const secret = Deno.env.get('ADMIN_PASSWORD_SECRET');
  return password === secret;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token, currentPassword, newPassword } = await req.json();

    if (!token || !currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (newPassword.length < 8) {
      return new Response(JSON.stringify({ error: 'New password must be at least 8 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const isTokenValid = await verifyToken(supabase, token);
    if (!isTokenValid) {
      return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isPasswordValid = await verifyPassword(supabase, currentPassword);
    if (!isPasswordValid) {
      await supabase.from('security_logs').insert({
        event_type: 'admin_password_change_failed',
        severity: 'high',
        source: 'admin-change-password-edge-function',
        details: {
          ip: req.headers.get('x-forwarded-for') || 'unknown',
          user_agent: req.headers.get('user-agent') || 'unknown',
          reason: 'invalid_current_password',
          timestamp: new Date().toISOString(),
        },
      });
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const newHash = await sha256(newPassword);

    await supabase.from('admin_settings').upsert({
      key: 'admin_password_hash',
      value: newHash,
    }, { onConflict: 'key' });

    await supabase.from('security_logs').insert({
      event_type: 'admin_password_changed',
      severity: 'high',
      source: 'admin-change-password-edge-function',
      details: {
        ip: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString(),
      },
    });

    // Invalidate all other sessions except current
    await supabase.from('admin_sessions').delete().neq('token', token);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

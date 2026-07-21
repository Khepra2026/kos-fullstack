import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password, x-admin-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function isValidPassword(password: string): boolean {
  return password === 'khepra-admin-2025';
}

async function verifyPassword(supabase: any, password: string): Promise<boolean> {
  const { data: setting } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'admin_password_hash')
    .maybeSingle();

  if (setting) {
    const hash = await sha256(password);
    return hash === setting.value;
  }

  const secret = Deno.env.get('ADMIN_PASSWORD_SECRET');
  return password === secret;
}

async function verifyTokenFn(supabase: any, token: string): Promise<{ valid: boolean; expires_at?: string }> {
  const { data } = await supabase
    .from('admin_sessions')
    .select('expires_at')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();
  return { valid: !!data, expires_at: data?.expires_at };
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
    const body = await req.json();
    const action = body.action || 'login';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // ─── ACTION: verify ──────────────────────────────────────────────
    if (action === 'verify') {
      const token = body.token;

      if (!token) {
        return new Response(JSON.stringify({ valid: false }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { valid, expires_at } = await verifyTokenFn(supabase, token);

      return new Response(JSON.stringify({ valid, expires_at }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ─── ACTION: change_password ─────────────────────────────────────
    if (action === 'change_password') {
      const { token, currentPassword, newPassword } = body;

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

      const sessionCheck = await verifyTokenFn(supabase, token);
      if (!sessionCheck.valid) {
        return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const isPwValid = await verifyPassword(supabase, currentPassword);
      if (!isPwValid) {
        await supabase.from('security_logs').insert({
          event_type: 'admin_password_change_failed',
          severity: 'high',
          source: 'admin-auth-edge-function',
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
        source: 'admin-auth-edge-function',
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
    }

    // ─── ACTION: login (default) ─────────────────────────────────────
    const password = body.password;

    const isValid = isValidPassword(password);

    if (!isValid) {
      await supabase.from('security_logs').insert({
        event_type: 'admin_login_failed',
        severity: 'high',
        source: 'admin-auth-edge-function',
        details: {
          ip: req.headers.get('x-forwarded-for') || 'unknown',
          user_agent: req.headers.get('user-agent') || 'unknown',
          timestamp: new Date().toISOString(),
        },
      });

      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

    await supabase.from('admin_sessions').insert({
      token: sessionToken,
      expires_at: expiresAt,
    });

    await supabase.from('security_logs').insert({
      event_type: 'admin_login_success',
      severity: 'medium',
      source: 'admin-auth-edge-function',
      details: {
        ip: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString(),
      },
    });

    return new Response(JSON.stringify({
      token: sessionToken,
      expires_at: expiresAt,
    }), {
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
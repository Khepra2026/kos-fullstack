import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const targetUrl = Deno.env.get("SITE_URL") ?? "https://khepraexperts.com";
    const results: any = {
      scan_type: "full",
      score: 0,
      headers_score: 0,
      csp_score: 0,
      cors_score: 0,
      cookies_score: 0,
      hsts_score: 0,
      vulnerabilities: [],
      recommendations: [],
    };

    // Fetch homepage to inspect headers
    let response: Response;
    try {
      response = await fetch(targetUrl, { redirect: "follow" });
    } catch {
      response = new Response(null, { status: 0 });
    }

    const headers = response.headers;

    // 1. Check HSTS
    const hsts = headers.get("strict-transport-security");
    if (hsts && hsts.includes("max-age=")) {
      const maxAge = parseInt((hsts.match(/max-age=(\d+)/) ?? ["", "0"])[1]);
      results.hsts_score = maxAge >= 31536000 ? 100 : maxAge >= 604800 ? 70 : 30;
      if (hsts.includes("includeSubDomains")) results.hsts_score = Math.min(100, results.hsts_score + 10);
      if (hsts.includes("preload")) results.hsts_score = Math.min(100, results.hsts_score + 10);
    } else {
      results.hsts_score = 0;
      results.vulnerabilities.push({
        severity: "high",
        type: "missing_hsts",
        description: "HTTP Strict-Transport-Security header is missing",
        recommendation: "Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
      });
    }

    // 2. Check CSP
    const csp = headers.get("content-security-policy");
    if (csp) {
      results.csp_score = 60;
      if (csp.includes("default-src 'self'") || csp.includes("default-src https:")) results.csp_score += 15;
      if (csp.includes("script-src")) results.csp_score += 10;
      if (csp.includes("style-src")) results.csp_score += 5;
      if (csp.includes("object-src 'none'")) results.csp_score += 5;
      if (!csp.includes("unsafe-inline")) results.csp_score += 5;
    } else {
      results.csp_score = 0;
      results.vulnerabilities.push({
        severity: "medium",
        type: "missing_csp",
        description: "Content-Security-Policy header is missing",
        recommendation: "Add a restrictive CSP header to prevent XSS attacks"
      });
    }

    // 3. Check CORS
    const cors = headers.get("access-control-allow-origin");
    if (cors) {
      results.cors_score = cors === "*" ? 40 : cors === targetUrl ? 100 : 60;
      if (cors === "*") {
        results.vulnerabilities.push({
          severity: "low",
          type: "wildcard_cors",
          description: "Access-Control-Allow-Origin is set to wildcard (*)",
          recommendation: "Restrict CORS to specific origin: khepraexperts.com"
        });
      }
    } else {
      results.cors_score = 80; // No CORS headers on main site is fine
    }

    // 4. Check X-Frame-Options
    const xfo = headers.get("x-frame-options");
    if (!xfo) {
      results.vulnerabilities.push({
        severity: "low",
        type: "missing_x_frame_options",
        description: "X-Frame-Options header is missing",
        recommendation: "Add: X-Frame-Options: DENY or SAMEORIGIN"
      });
    }

    // 5. Check X-Content-Type-Options
    const xcto = headers.get("x-content-type-options");
    if (!xcto || xcto !== "nosniff") {
      results.vulnerabilities.push({
        severity: "low",
        type: "missing_x_content_type",
        description: "X-Content-Type-Options: nosniff is missing",
        recommendation: "Add: X-Content-Type-Options: nosniff"
      });
    }

    // 6. Check Referrer-Policy
    const rp = headers.get("referrer-policy");
    if (!rp) {
      results.vulnerabilities.push({
        severity: "info",
        type: "missing_referrer_policy",
        description: "Referrer-Policy header is missing",
        recommendation: "Add: Referrer-Policy: strict-origin-when-cross-origin"
      });
    }

    // 7. Check Permissions-Policy
    const pp = headers.get("permissions-policy");
    if (!pp) {
      results.vulnerabilities.push({
        severity: "info",
        type: "missing_permissions_policy",
        description: "Permissions-Policy header is missing",
        recommendation: "Add a restrictive Permissions-Policy header"
      });
    }

    // 8. Check cookies for Secure/HttpOnly flags
    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookie of cookies) {
        if (!cookie.toLowerCase().includes("secure")) {
          results.vulnerabilities.push({
            severity: "medium",
            type: "insecure_cookie",
            description: "Cookie missing Secure flag: " + cookie.split(";")[0],
            recommendation: "Add Secure flag to all cookies"
          });
        }
        if (!cookie.toLowerCase().includes("httponly")) {
          results.vulnerabilities.push({
            severity: "medium",
            type: "cookie_no_httponly",
            description: "Cookie missing HttpOnly flag: " + cookie.split(";")[0],
            recommendation: "Add HttpOnly flag to all cookies"
          });
        }
      }
      results.cookies_score = 100 - (results.vulnerabilities.filter((v: any) => v.type.includes("cookie")).length * 20);
    } else {
      results.cookies_score = 100;
    }

    // 9. Check for security.txt
    try {
      const secTxt = await fetch(targetUrl + "/security.txt");
      if (!secTxt.ok) {
        results.vulnerabilities.push({
          severity: "info",
          type: "missing_security_txt",
          description: "security.txt file not found (RFC 9116)",
          recommendation: "Create /.well-known/security.txt per RFC 9116"
        });
      }
    } catch {
      // ignore
    }

    // Calculate scores
    results.headers_score = Math.round(
      (results.hsts_score + results.csp_score + results.cors_score + results.cookies_score) / 4
    );

    const criticalVulns = results.vulnerabilities.filter((v: any) => v.severity === "high").length;
    const mediumVulns = results.vulnerabilities.filter((v: any) => v.severity === "medium").length;
    const lowVulns = results.vulnerabilities.filter((v: any) => v.severity === "low" || v.severity === "info").length;

    results.score = Math.max(0, Math.round(
      results.headers_score * 0.6 +
      (100 - criticalVulns * 25 - mediumVulns * 10 - lowVulns * 3) * 0.4
    ));

    // Generate recommendations
    results.recommendations = [
      {
        priority: "high",
        action: "Verify HSTS preload status at hstspreload.org",
        impact: "Ensures browser-level HTTPS enforcement"
      },
      {
        priority: "high",
        action: "Run OWASP ZAP full scan monthly",
        impact: "Detects injection, XSS, CSRF vulnerabilities"
      },
      {
        priority: "medium",
        action: "Implement Subresource Integrity (SRI) for external scripts",
        impact: "Prevents supply chain attacks via CDN compromise"
      },
      {
        priority: "medium",
        action: "Enable DNSSEC on khepraexperts.com domain",
        impact: "Prevents DNS spoofing and cache poisoning"
      },
      {
        priority: "low",
        action: "Add security.txt at /.well-known/security.txt",
        impact: "RFC 9116 compliance for vulnerability disclosure"
      }
    ];

    // Store in Supabase
    const { error } = await supabase.from("security_scans").insert({
      scan_type: results.scan_type,
      score: results.score,
      headers_score: results.headers_score,
      csp_score: results.csp_score,
      cors_score: results.cors_score,
      cookies_score: results.cookies_score,
      hsts_score: results.hsts_score,
      vulnerabilities: results.vulnerabilities,
      recommendations: results.recommendations,
      scanned_at: new Date().toISOString(),
    });

    if (error) {
      console.error("DB insert error:", error);
    }

    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Security scan error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
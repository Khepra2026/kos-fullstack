import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const META_GRAPH_API = "https://graph.facebook.com/v21.0";

function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function getPageAccessToken(supabase: ReturnType<typeof createClient>): Promise<{ token: string; pageId: string }> {
  const { data: tokenRow } = await supabase
    .from("social_api_tokens")
    .select("token_value")
    .eq("provider", "facebook")
    .eq("token_name", "page_access_token")
    .eq("is_active", true)
    .maybeSingle();

  const { data: pageRow } = await supabase
    .from("social_api_tokens")
    .select("token_value")
    .eq("provider", "facebook")
    .eq("token_name", "page_id")
    .eq("is_active", true)
    .maybeSingle();

  if (!tokenRow?.token_value || !pageRow?.token_value) {
    throw new Error("Page Facebook non connectee. Allez dans KOS Social Media Command > Connecter Facebook.");
  }

  return { token: tokenRow.token_value, pageId: pageRow.token_value };
}

async function getIGCredentials(supabase: ReturnType<typeof createClient>): Promise<{ igUserId: string; igUsername: string } | null> {
  const { data: igUserRow } = await supabase
    .from("social_api_tokens")
    .select("token_value")
    .eq("provider", "instagram")
    .eq("token_name", "ig_user_id")
    .eq("is_active", true)
    .maybeSingle();

  const { data: igNameRow } = await supabase
    .from("social_api_tokens")
    .select("token_value")
    .eq("provider", "instagram")
    .eq("token_name", "ig_username")
    .eq("is_active", true)
    .maybeSingle();

  if (!igUserRow?.token_value) return null;
  return { igUserId: igUserRow.token_value, igUsername: igNameRow?.token_value || "" };
}

async function publishToFacebookFeed(pageId: string, pageToken: string, message: string, link?: string): Promise<string> {
  const params: Record<string, string> = {
    message,
    access_token: pageToken,
  };
  if (link) params.link = link;

  const formBody = new URLSearchParams(params);
  const resp = await fetch(`${META_GRAPH_API}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  const data = await resp.json();
  if (!resp.ok || data.error) {
    throw new Error(data.error?.message || `Facebook API error: HTTP ${resp.status}`);
  }
  return data.id as string;
}

async function publishInstagramMedia(
  igUserId: string,
  pageToken: string,
  mediaType: "REELS" | "STORIES" | "CAROUSEL" | "IMAGE",
  caption: string,
  mediaUrl?: string,
  childrenUrls?: string[],
): Promise<string> {
  // Étape 1: Créer le media container
  const createParams: Record<string, string> = {
    access_token: pageToken,
    caption,
    media_type: mediaType,
  };

  if (mediaType === "REELS" && mediaUrl) {
    createParams.video_url = mediaUrl;
  } else if (mediaType === "STORIES" && mediaUrl) {
    createParams.image_url = mediaUrl;
    createParams.media_type = "STORIES";
  } else if (mediaType === "IMAGE" && mediaUrl) {
    createParams.image_url = mediaUrl;
  } else if (mediaType === "CAROUSEL" && childrenUrls && childrenUrls.length > 0) {
    // Pour les carrousels, on crée d'abord les conteneurs enfants
    const childrenIds: string[] = [];
    for (const childUrl of childrenUrls) {
      const childResp = await fetch(`${META_GRAPH_API}/${igUserId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ access_token: pageToken, image_url: childUrl, is_carousel_item: "true" }).toString(),
      });
      const childData = await childResp.json();
      if (childData.id) childrenIds.push(childData.id);
    }
    createParams.children = childrenIds.join(",");
    delete createParams.image_url;
    delete createParams.video_url;
  } else {
    // Texte seul — pas de média, c'est un post text-only (non supporté par IG, on fait un fallback)
    return "instagram_text_only_not_supported";
  }

  const createResp = await fetch(`${META_GRAPH_API}/${igUserId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(createParams).toString(),
  });

  const createData = await createResp.json();
  if (!createResp.ok || createData.error) {
    throw new Error(createData.error?.message || `IG media creation failed: HTTP ${createResp.status}`);
  }

  const creationId = createData.id;

  // Étape 2: Publier le media
  const publishResp = await fetch(`${META_GRAPH_API}/${igUserId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ access_token: pageToken, creation_id: creationId }).toString(),
  });

  const publishData = await publishResp.json();
  if (!publishResp.ok || publishData.error) {
    throw new Error(publishData.error?.message || `IG media publish failed: HTTP ${publishResp.status}`);
  }

  return publishData.id as string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = getSupabaseAdmin();

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "status";

    // ═══════════════════════════════════════════════
    // HEALTH / STATUS (GET)
    // ═══════════════════════════════════════════════
    if (req.method === "GET" || action === "status") {
      let facebookConnected = false;
      let instagramConnected = false;
      let pageName = "";
      let igUsername = "";

      try {
        const { token, pageId } = await getPageAccessToken(supabase);
        facebookConnected = true;
        const pageResp = await fetch(`${META_GRAPH_API}/${pageId}?fields=name&access_token=${token}`);
        if (pageResp.ok) {
          const pageData = await pageResp.json();
          pageName = pageData.name || "";
        }
      } catch { /* not connected */ }

      try {
        const igCreds = await getIGCredentials(supabase);
        instagramConnected = !!igCreds;
        igUsername = igCreds?.igUsername || "";
      } catch { /* not connected */ }

      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-meta-publisher-v1",
        facebook_connected: facebookConnected,
        instagram_connected: instagramConnected,
        page_name: pageName,
        ig_username: igUsername,
        actions: ["publish_feed", "publish_ig_media", "status"],
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // PUBLISH_FEED — Publier sur le feed Facebook
    // ═══════════════════════════════════════════════
    if (action === "publish_feed" && req.method === "POST") {
      const body = await req.json();
      const { message, link } = body;

      if (!message) {
        return new Response(JSON.stringify({ success: false, error: "Le champ 'message' est requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { token, pageId } = await getPageAccessToken(supabase);
      const postId = await publishToFacebookFeed(pageId, token, message, link);

      // Enregistrer dans la table de publications
      try {
        await supabase.from("kos_publications").insert({
          platform: "facebook",
          external_id: postId,
          title: message.substring(0, 150),
          content: message,
          status: "published",
          published_at: new Date().toISOString(),
          metrics: {},
        });
      } catch { /* non bloquant */ }

      return new Response(JSON.stringify({
        success: true,
        post_id: postId,
        platform: "facebook",
        url: `https://www.facebook.com/${postId}`,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // PUBLISH_IG_MEDIA — Publier sur Instagram
    // ═══════════════════════════════════════════════
    if (action === "publish_ig_media" && req.method === "POST") {
      const body = await req.json();
      const { caption, media_type, media_url, children_urls } = body;

      if (!caption) {
        return new Response(JSON.stringify({ success: false, error: "Le champ 'caption' est requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const igCreds = await getIGCredentials(supabase);
      if (!igCreds) {
        return new Response(JSON.stringify({ success: false, error: "Instagram non connecte. Connectez d'abord votre compte Instagram Business a votre Page Facebook." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { token, pageId } = await getPageAccessToken(supabase);
      const mediaType = (media_type as string)?.toUpperCase() || "IMAGE";

      if (!["REELS", "STORIES", "CAROUSEL", "IMAGE"].includes(mediaType)) {
        return new Response(JSON.stringify({ success: false, error: `Type de media invalide: ${mediaType}. Utiliser REELS, STORIES, CAROUSEL ou IMAGE.` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      let igPostId: string;
      try {
        igPostId = await publishInstagramMedia(
          igCreds.igUserId,
          token,
          mediaType as "REELS" | "STORIES" | "CAROUSEL" | "IMAGE",
          caption,
          media_url,
          children_urls,
        );
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur publication Instagram" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Enregistrer dans la table de publications
      try {
        await supabase.from("kos_publications").insert({
          platform: "instagram",
          external_id: igPostId,
          title: caption.substring(0, 150),
          content: caption,
          status: "published",
          published_at: new Date().toISOString(),
          metrics: {},
        });
      } catch { /* non bloquant */ }

      return new Response(JSON.stringify({
        success: true,
        post_id: igPostId,
        platform: "instagram",
        media_type: mediaType,
        ig_username: igCreds.igUsername,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // PUBLISH_BOTH — Publier sur Facebook + Instagram
    // ═══════════════════════════════════════════════
    if (action === "publish_both" && req.method === "POST") {
      const body = await req.json();
      const { message, link, ig_caption, ig_media_type, ig_media_url } = body;

      const results: Record<string, unknown> = {};

      // Facebook
      if (message) {
        try {
          const { token, pageId } = await getPageAccessToken(supabase);
          const fbPostId = await publishToFacebookFeed(pageId, token, message, link);
          results.facebook = { success: true, post_id: fbPostId };
        } catch (err) {
          results.facebook = { success: false, error: err instanceof Error ? err.message : "Erreur Facebook" };
        }
      }

      // Instagram
      if (ig_caption) {
        try {
          const igCreds = await getIGCredentials(supabase);
          if (igCreds) {
            const { token } = await getPageAccessToken(supabase);
            const mediaType = (ig_media_type as string)?.toUpperCase() || "IMAGE";
            const igPostId = await publishInstagramMedia(
              igCreds.igUserId,
              token,
              mediaType as "REELS" | "STORIES" | "CAROUSEL" | "IMAGE",
              ig_caption,
              ig_media_url,
            );
            results.instagram = { success: true, post_id: igPostId, media_type: mediaType };
          } else {
            results.instagram = { success: false, error: "Instagram non connecte" };
          }
        } catch (err) {
          results.instagram = { success: false, error: err instanceof Error ? err.message : "Erreur Instagram" };
        }
      }

      return new Response(JSON.stringify({ success: true, results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: `Action inconnue: ${action}` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("kos-meta-publisher error:", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
}

const YOUTUBE_UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos"
const YOUTUBE_THUMBNAIL_URL = "https://www.googleapis.com/youtube/v3/thumbnails/set"
const FUNCTION_BASE = Deno.env.get("SUPABASE_URL") + "/functions/v1"
const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL") || ""

function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )
}

async function getFreshAccessToken(userId: string): Promise<string> {
  const resp = await fetch(`${FUNCTION_BASE}/youtube-refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
    },
    body: JSON.stringify({ user_id: userId }),
  })

  const data = await resp.json()
  if (!data.success || !data.access_token) {
    throw new Error(data.error || "Impossible d'obtenir un access token frais")
  }
  return data.access_token
}

async function uploadVideoToYouTube(
  accessToken: string,
  videoUrl: string,
  title: string,
  description: string,
  tags: string[],
  thumbnailUrl: string | null,
): Promise<string> {
  // 1. Télécharger la vidéo depuis Supabase Storage
  const videoResp = await fetch(videoUrl)
  if (!videoResp.ok) throw new Error(`Impossible de télécharger la vidéo: HTTP ${videoResp.status}`)
  const videoBlob = await videoResp.blob()

  // 2. Initier l'upload résumable YouTube
  const initBody = JSON.stringify({
    snippet: {
      title: title.substring(0, 100),
      description: (description || title).substring(0, 5000),
      tags: (tags || ["KHEPRA", "KOS", "YouTube", "Régulation", "Afrique"]).slice(0, 50).map((t: string) => t.substring(0, 30)),
      categoryId: "27",
    },
    status: {
      privacyStatus: "private",
      selfDeclaredMadeForKids: "false",
    },
  })

  const initResp = await fetch(
    `${YOUTUBE_UPLOAD_URL}?uploadType=resumable&part=snippet,status`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Length": videoBlob.size.toString(),
        "X-Upload-Content-Type": "video/mp4",
      },
      body: initBody,
    }
  )

  if (!initResp.ok) {
    const errText = await initResp.text()
    throw new Error(`YouTube a refusé l'upload: HTTP ${initResp.status} — ${errText.substring(0, 300)}`)
  }

  const uploadUrl = initResp.headers.get("Location")!
  if (!uploadUrl) throw new Error("YouTube n'a pas retourné d'URL d'upload")

  // 3. Upload du fichier
  const uploadResp = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": videoBlob.size.toString(),
    },
    body: videoBlob,
  })

  if (!uploadResp.ok) {
    const errText = await uploadResp.text()
    throw new Error(`Échec upload vidéo: HTTP ${uploadResp.status} — ${errText.substring(0, 300)}`)
  }

  const ytData = await uploadResp.json()
  const videoId = ytData.id

  if (!videoId) throw new Error("YouTube n'a pas retourné de video ID")

  // 4. Upload thumbnail si présent
  if (thumbnailUrl) {
    try {
      const thumbResp = await fetch(thumbnailUrl)
      if (thumbResp.ok) {
        const thumbBlob = await thumbResp.blob()
        const formData = new FormData()
        formData.append("image", thumbBlob, "thumbnail.jpg")

        await fetch(`${YOUTUBE_THUMBNAIL_URL}?videoId=${videoId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        })
      }
    } catch {
      console.warn("Impossible d'uploader la miniature, continue...")
    }
  }

  return videoId
}

async function sendDiscordNotification(
  videoTitle: string,
  videoId: string,
  channelTitle: string,
  publishedAt: string,
  tags: string[],
) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log("DISCORD_WEBHOOK_URL not configured, skipping notification")
    return
  }

  const youtubeUrl = `https://youtube.com/watch?v=${videoId}`
  const tagsFormatted = tags.slice(0, 5).map((t: string) => `\`${t}\``).join(" ")

  const embed = {
    title: "🎬 Vidéo publiée sur YouTube !",
    description: `**${videoTitle}**\n\n📺 [Voir sur YouTube](${youtubeUrl})`,
    color: 0xFF0000, // Rouge YouTube
    fields: [
      {
        name: "Chaîne",
        value: channelTitle || "@KHEPRAEXPERTS",
        inline: true,
      },
      {
        name: "Statut",
        value: "🔒 Privée (review manuelle)",
        inline: true,
      },
      {
        name: "Tags",
        value: tagsFormatted || "—",
        inline: false,
      },
    ],
    footer: {
      text: `KHEPRA-KOS Auto Publisher™ • ${publishedAt}`,
    },
    timestamp: publishedAt,
  }

  try {
    const resp = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!resp.ok) {
      console.error(`Discord webhook failed: HTTP ${resp.status} — ${await resp.text()}`)
    } else {
      console.log(`Discord notification sent for video ${videoId}`)
    }
  } catch (err) {
    console.error("Discord webhook error:", err)
  }
}

async function sendDiscordErrorNotification(
  videoTitle: string,
  errorMsg: string,
) {
  if (!DISCORD_WEBHOOK_URL) return

  const embed = {
    title: "❌ Échec publication YouTube",
    description: `**${videoTitle}**\n\nErreur: \`${errorMsg.substring(0, 1000)}\``,
    color: 0xFF0000,
    footer: {
      text: "KHEPRA-KOS Auto Publisher™",
    },
    timestamp: new Date().toISOString(),
  }

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    })
  } catch {
    // Best effort
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = getSupabaseAdmin()

  try {
    if (req.method === "GET") {
      // Health check
      const { data: queued } = await supabase
        .from("yt_upload_queue")
        .select("id", { count: "exact", head: true })
        .eq("status", "queued")

      const { data: published } = await supabase
        .from("yt_upload_queue")
        .select("id", { count: "exact", head: true })
        .eq("status", "published")

      const { data: errors } = await supabase
        .from("yt_upload_queue")
        .select("id", { count: "exact", head: true })
        .eq("status", "error")

      return new Response(
        JSON.stringify({
          status: "ok",
          engine: "youtube-publisher-v2",
          queue: {
            queued: queued?.length || 0,
            published: published?.length || 0,
            errors: errors?.length || 0,
          },
          discord_enabled: !!DISCORD_WEBHOOK_URL,
          tip: "POST to trigger a publish cycle. Designed to run via Supabase Cron every 5 min.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // POST — Déclenche un cycle de publication
    // 1. Prend la vidéo la plus ancienne avec status='queued'
    const { data: videos, error: queueError } = await supabase
      .from("yt_upload_queue")
      .select("*")
      .eq("status", "queued")
      .order("created_at", { ascending: true })
      .limit(1)

    if (queueError) {
      return new Response(
        JSON.stringify({ success: false, error: queueError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    if (!videos || videos.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No queued videos", published: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const video = videos[0]

    // 2. Passe en 'uploading'
    await supabase
      .from("yt_upload_queue")
      .update({ status: "uploading" })
      .eq("id", video.id)

    // 3. Obtient un access token frais
    const accessToken = await getFreshAccessToken(video.user_id)

    // 4. Upload vers YouTube
    const videoId = await uploadVideoToYouTube(
      accessToken,
      video.video_url,
      video.video_title,
      video.video_description || "",
      video.video_tags || [],
      video.thumbnail_url || null,
    )

    // 5. Récupère le nom de la chaîne
    let channelTitle = ""
    try {
      const { data: tokenData } = await supabase
        .from("yt_tokens")
        .select("channel_title")
        .eq("user_id", video.user_id)
        .single()
      channelTitle = tokenData?.channel_title || ""
    } catch {
      // non bloquant
    }

    // 6. Succès — met à jour le statut
    const now = new Date().toISOString()
    await supabase
      .from("yt_upload_queue")
      .update({
        status: "published",
        yt_video_id: videoId,
        published_at: now,
        error_msg: null,
      })
      .eq("id", video.id)

    // 7. Notification Discord
    await sendDiscordNotification(
      video.video_title,
      videoId,
      channelTitle,
      now,
      video.video_tags || [],
    )

    return new Response(
      JSON.stringify({
        success: true,
        published: true,
        video_id: videoId,
        youtube_url: `https://youtube.com/watch?v=${videoId}`,
        title: video.video_title,
        discord_notified: !!DISCORD_WEBHOOK_URL,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erreur inconnue"

    // Tente de récupérer l'ID de la vidéo en cours pour marquer l'erreur
    try {
      const supabase2 = getSupabaseAdmin()
      const { data: uploading } = await supabase2
        .from("yt_upload_queue")
        .select("id, video_title")
        .eq("status", "uploading")
        .order("created_at", { ascending: true })
        .limit(1)

      if (uploading && uploading.length > 0) {
        await supabase2
          .from("yt_upload_queue")
          .update({ status: "error", error_msg: errorMsg })
          .eq("id", uploading[0].id)

        // Notification Discord pour les erreurs aussi
        await sendDiscordErrorNotification(uploading[0].video_title, errorMsg)
      }
    } catch {
      // Best effort
    }

    return new Response(
      JSON.stringify({ success: false, error: errorMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})

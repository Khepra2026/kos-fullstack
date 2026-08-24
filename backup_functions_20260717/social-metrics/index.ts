import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const KHEPRA_EXPERTS_HANDLE = "KhepraExperts";
const LINKEDIN_COMPANY = "khepra-experts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SocialMetrics {
  twitter: {
    followers: number;
    following: number;
    tweets: number;
    engagement_rate: number;
    impressions_30d: number;
    likes_30d: number;
    retweets_30d: number;
    top_tweet: { text: string; likes: number; retweets: number; date: string } | null;
  };
  linkedin_company: {
    followers: number;
    employee_count: number | null;
    description: string | null;
    industry: string | null;
  };
  linkedin_founder: {
    connections: number | null;
    followers: number | null;
    headline: string | null;
  };
  meta: {
    source: "live" | "mock" | "partial" | "bridge";
    twitter_available: boolean;
    linkedin_company_available: boolean;
    linkedin_founder_available: boolean;
    bridge_used: boolean;
    last_updated: string;
    error?: string;
  };
}

function getMockMetrics(): SocialMetrics {
  return {
    twitter: {
      followers: 847,
      following: 312,
      tweets: 526,
      engagement_rate: 3.8,
      impressions_30d: 42000,
      likes_30d: 890,
      retweets_30d: 245,
      top_tweet: {
        text: "La BCEAO renforce le dispositif prudentiel 2026 — notre analyse complète de la nouvelle circulaire et ses implications pour les banques UEMOA.",
        likes: 47,
        retweets: 18,
        date: "2026-06-10T08:30:00Z",
      },
    },
    linkedin_company: {
      followers: 2840,
      employee_count: 25,
      description: "Cabinet de conseil de référence en Afrique francophone — Régulation financière, Prix de transfert, Gouvernance & Risques.",
      industry: "Business Consulting and Services",
    },
    linkedin_founder: {
      connections: 15000,
      followers: 4200,
      headline: "Managing Partner @ KHEPRA EXPERTS | BCEAO/COBAC Regulatory Advisory | Transfer Pricing Africa | Board Governance | 22+ ans d'expertise",
    },
    meta: {
      source: "mock",
      twitter_available: false,
      linkedin_company_available: false,
      linkedin_founder_available: false,
      bridge_used: false,
      last_updated: new Date().toISOString(),
      error: "API keys not configured — using enriched mock data.",
    },
  };
}

async function getTokenFromDB(provider: string, tokenName: string): Promise<string | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return null;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from("social_api_tokens")
      .select("token_value")
      .eq("provider", provider)
      .eq("token_name", tokenName)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) return null;
    return data.token_value;
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════
// TWITTER/X API — OAuth 2.0 Bearer Token generation
// ═══════════════════════════════════════════════════════════
async function getTwitterBearerToken(): Promise<string | null> {
  // Priority 1: Direct Bearer Token from env
  const directBearer = Deno.env.get("TWITTER_BEARER_TOKEN");
  if (directBearer) return directBearer;

  // Priority 2: From social_api_tokens table
  const dbToken = await getTokenFromDB("twitter", "bearer_token");
  if (dbToken) return dbToken;

  // Priority 3: Generate from API Key + API Secret (OAuth 2.0 App-only)
  const apiKey = Deno.env.get("TWITTER_API_KEY");
  const apiSecret = Deno.env.get("TWITTER_API_SECRET");
  if (!apiKey || !apiSecret) return null;

  try {
    const credentials = btoa(`${encodeURIComponent(apiKey)}:${encodeURIComponent(apiSecret)}`);
    const response = await fetch("https://api.twitter.com/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      console.error(`[social-metrics] Twitter OAuth2 token generation failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.access_token || null;
  } catch (err) {
    console.error(`[social-metrics] Twitter OAuth2 error: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════
// KOS LINKEDIN BRIDGE — Fallback quand le MDP manque
// ═══════════════════════════════════════════════════════════
async function fetchLinkedInCompanyViaBridge(): Promise<SocialMetrics["linkedin_company"] | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !anonKey) return null;

    const response = await fetch(
      `${supabaseUrl}/functions/v1/kos-linkedin-bridge?profile_type=company`,
      {
        headers: {
          "Authorization": `Bearer ${anonKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return null;
    const bridgeData = await response.json();

    return {
      followers: bridgeData.followers || 0,
      employee_count: bridgeData.employee_count || null,
      description: bridgeData.description || null,
      industry: bridgeData.industry || null,
    };
  } catch {
    return null;
  }
}

async function fetchTwitterMetrics(bearerToken: string) {
  try {
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${KHEPRA_EXPERTS_HANDLE}?user.fields=public_metrics,description`,
      { headers: { Authorization: `Bearer ${bearerToken}` } }
    );
    if (!userResponse.ok) throw new Error(`Twitter user lookup failed: ${userResponse.status}`);
    const userData = await userResponse.json();
    const userId = userData.data?.id;
    const publicMetrics = userData.data?.public_metrics;

    if (!userId || !publicMetrics) throw new Error("Twitter user data incomplete");

    let topTweet = null;
    try {
      const tweetsResponse = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=public_metrics,created_at&exclude=retweets,replies`,
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      );
      if (tweetsResponse.ok) {
        const tweetsData = await tweetsResponse.json();
        if (tweetsData.data?.length > 0) {
          const best = tweetsData.data.reduce((a: any, b: any) =>
            (a.public_metrics?.like_count || 0) > (b.public_metrics?.like_count || 0) ? a : b
          );
          topTweet = {
            text: best.text?.substring(0, 200) || "",
            likes: best.public_metrics?.like_count || 0,
            retweets: best.public_metrics?.retweet_count || 0,
            date: best.created_at || "",
          };
        }
      }
    } catch { /* top tweet is optional */ }

    return {
      followers: publicMetrics.followers_count || 0,
      following: publicMetrics.following_count || 0,
      tweets: publicMetrics.tweet_count || 0,
      engagement_rate: 0,
      impressions_30d: 0,
      likes_30d: 0,
      retweets_30d: 0,
      top_tweet: topTweet,
    };
  } catch (err) {
    throw new Error(`Twitter API error: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function fetchLinkedInCompany(accessToken: string): Promise<{ data: SocialMetrics["linkedin_company"] | null; error?: string; mdp_required?: boolean }> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "LinkedIn-Version": "202405",
    "X-Restli-Protocol-Version": "2.0.0",
    "Content-Type": "application/json",
  };

  // --- Attempt 1: Direct vanityName lookup (requires r_organization_social / MDP) ---
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=${LINKEDIN_COMPANY}`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      const org = data.elements?.[0];
      if (org) {
        let followerCount = 0;
        try {
          const fcResponse = await fetch(
            `https://api.linkedin.com/v2/networkSizes/${encodeURIComponent(org.id)}?edgeType=CompanyFollowedSize`,
            { headers }
          );
          if (fcResponse.ok) {
            const fcData = await fcResponse.json();
            followerCount = fcData.firstDegreeSize || 0;
          }
        } catch { /* optional */ }

        return {
          data: {
            followers: followerCount,
            employee_count: org.staffCountRange?.start || null,
            description: org.localizedDescription || org.localizedName || null,
            industry: org.industries?.[0]?.localizedName || null,
          },
        };
      }
    }

    if (response.status === 403) {
      // VanityName lookup blocked — try alternative approach
    } else if (!response.ok) {
      return { data: null, error: `LinkedIn company lookup failed: ${response.status}` };
    }
  } catch (err) {
    // Fall through to next attempt
  }

  // --- Attempt 2: organizationalEntityAcls (sometimes works with r_organization_admin without full MDP) ---
  try {
    const aclsResponse = await fetch(
      "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee&projection=(elements*(role,state,organization~(id,localizedName,localizedDescription,vanityName,industries,staffCountRange)))",
      { headers }
    );

    if (aclsResponse.ok) {
      const aclsData = await aclsResponse.json();
      const orgElements = aclsData.elements || [];

      const match = orgElements.find(
        (e: any) => e["organization~"]?.vanityName?.toLowerCase() === LINKEDIN_COMPANY.toLowerCase()
      ) || orgElements[0];

      if (match?.["organization~"]) {
        const org = match["organization~"];
        let followerCount = 0;
        try {
          const fcResponse = await fetch(
            `https://api.linkedin.com/v2/networkSizes/${encodeURIComponent(org.id)}?edgeType=CompanyFollowedSize`,
            { headers }
          );
          if (fcResponse.ok) {
            const fcData = await fcResponse.json();
            followerCount = fcData.firstDegreeSize || 0;
          }
        } catch { /* optional */ }

        return {
          data: {
            followers: followerCount,
            employee_count: org.staffCountRange?.start || null,
            description: org.localizedDescription || org.localizedName || null,
            industry: org.industries?.[0]?.localizedName || null,
          },
        };
      }
      return { data: null, error: "LinkedIn company page not found in organizational ACLs." };
    }

    if (aclsResponse.status === 403) {
      return {
        data: null,
        error: "LinkedIn Organization API requires Marketing Developer Platform (MDP) approval. Falling back to KOS LinkedIn Bridge (OEmbed + OpenGraph + Snapshots).",
        mdp_required: true,
      };
    }

    return { data: null, error: `LinkedIn org ACLs failed: ${aclsResponse.status}` };
  } catch (err) {
    return {
      data: null,
      error: `LinkedIn Company API error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

async function fetchLinkedInFounder(accessToken: string): Promise<{ data: SocialMetrics["linkedin_founder"] | null; error?: string }> {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "LinkedIn-Version": "202405",
      "X-Restli-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
    };

    const meResponse = await fetch(
      "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,headline,profilePicture(displayImage~:playableStreams))",
      { headers }
    );

    if (!meResponse.ok) {
      const userinfoResponse = await fetch(
        "https://api.linkedin.com/oauth/v2/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!userinfoResponse.ok) {
        return {
          data: null,
          error: `LinkedIn /me & /userinfo both failed: ${meResponse.status}/${userinfoResponse.status}.`,
        };
      }
      const ui = await userinfoResponse.json();
      return {
        data: {
          connections: null,
          followers: null,
          headline: null,
        },
      };
    }

    const meData = await meResponse.json();

    let followerCount: number | null = null;
    try {
      const nsResponse = await fetch(
        `https://api.linkedin.com/v2/networkSizes/${encodeURIComponent(meData.id)}?edgeType=CompanyFollowedSize`,
        { headers }
      );
      if (nsResponse.ok) {
        const nsData = await nsResponse.json();
        followerCount = nsData.firstDegreeSize || null;
      }
    } catch { /* optional */ }

    return {
      data: {
        connections: null,
        followers: followerCount,
        headline: meData.headline || null,
      },
    };
  } catch (err) {
    return {
      data: null,
      error: `LinkedIn Founder API error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // ═══════════════════════════════════════════════════════════
  // TWITTER — OAuth 2.0 Bearer Token Auto-Generation
  // ═══════════════════════════════════════════════════════════
  const twitterBearerToken = await getTwitterBearerToken();
  if (twitterBearerToken) {
    console.log("[social-metrics] Twitter Bearer Token obtained successfully");
  } else {
    console.log("[social-metrics] No Twitter credentials configured — will use mock");
  }

  // ═══════════════════════════════════════════════════════════
  // LINKEDIN — Access Token from env or DB
  // ═══════════════════════════════════════════════════════════
  let linkedinToken = Deno.env.get("LINKEDIN_ACCESS_TOKEN");
  if (!linkedinToken) {
    linkedinToken = await getTokenFromDB("linkedin", "access_token_oauth2");
  }
  // Also try platform_credentials
  if (!linkedinToken) {
    linkedinToken = await getTokenFromDB("linkedin", "access_token");
  }
  if (!linkedinToken) {
    // Try platform_credentials table
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data: pcData } = await supabase
          .from("platform_credentials")
          .select("credential_value")
          .eq("platform", "linkedin")
          .eq("credential_name", "access_token")
          .maybeSingle();
        if (pcData?.credential_value) {
          linkedinToken = pcData.credential_value;
        }
      }
    } catch { /* non-blocking */ }
  }

  const mock = getMockMetrics();
  const errors: string[] = [];
  let bridgeUsed = false;

  // ═══════════════════════════════════════════════════════════
  // TWITTER — Fetch live metrics via Bearer Token
  // ═══════════════════════════════════════════════════════════
  if (twitterBearerToken) {
    try {
      const twitterMetrics = await fetchTwitterMetrics(twitterBearerToken);
      mock.twitter = { ...mock.twitter, ...twitterMetrics };
      mock.meta.twitter_available = true;
      console.log(`[social-metrics] Twitter LIVE: ${twitterMetrics.followers} followers, ${twitterMetrics.tweets} tweets`);
    } catch (err) {
      errors.push(`Twitter: ${err instanceof Error ? err.message : String(err)}`);
      console.error(`[social-metrics] Twitter fetch failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // LINKEDIN — Fetch live metrics
  // ═══════════════════════════════════════════════════════════
  if (linkedinToken) {
    const companyResult = await fetchLinkedInCompany(linkedinToken);

    if (companyResult.data) {
      mock.linkedin_company = { ...mock.linkedin_company, ...companyResult.data };
      mock.meta.linkedin_company_available = true;
    } else if (companyResult.mdp_required) {
      console.log("[social-metrics] MDP required — falling back to KOS LinkedIn Bridge");
      const bridgeData = await fetchLinkedInCompanyViaBridge();

      if (bridgeData) {
        if (bridgeData.followers > 0) mock.linkedin_company.followers = bridgeData.followers;
        if (bridgeData.employee_count) mock.linkedin_company.employee_count = bridgeData.employee_count;
        if (bridgeData.description) mock.linkedin_company.description = bridgeData.description;
        if (bridgeData.industry) mock.linkedin_company.industry = bridgeData.industry;
        mock.meta.linkedin_company_available = true;
        bridgeUsed = true;
        mock.meta.bridge_used = true;
      } else {
        errors.push(companyResult.error || "MDP required — bridge fallback unavailable");
      }
    } else if (companyResult.error) {
      errors.push(companyResult.error);
    }

    const founderResult = await fetchLinkedInFounder(linkedinToken);
    if (founderResult.data) {
      mock.linkedin_founder = { ...mock.linkedin_founder, ...founderResult.data };
      mock.meta.linkedin_founder_available = true;
    }
    if (founderResult.error) {
      errors.push(founderResult.error);
    }
  } else {
    console.log("[social-metrics] No LinkedIn token — trying bridge for public data");
    const bridgeData = await fetchLinkedInCompanyViaBridge();
    if (bridgeData) {
      if (bridgeData.followers > 0) mock.linkedin_company.followers = bridgeData.followers;
      if (bridgeData.employee_count) mock.linkedin_company.employee_count = bridgeData.employee_count;
      if (bridgeData.description) mock.linkedin_company.description = bridgeData.description;
      if (bridgeData.industry) mock.linkedin_company.industry = bridgeData.industry;
      mock.meta.linkedin_company_available = true;
      bridgeUsed = true;
      mock.meta.bridge_used = true;
    }
  }

  const anyLive = mock.meta.twitter_available || mock.meta.linkedin_company_available || mock.meta.linkedin_founder_available;
  const anyMock = !mock.meta.twitter_available || !mock.meta.linkedin_company_available || !mock.meta.linkedin_founder_available;

  if (bridgeUsed && !mock.meta.twitter_available && !mock.meta.linkedin_founder_available) {
    mock.meta.source = "bridge";
  } else if (anyLive && anyMock) {
    mock.meta.source = "partial";
  } else if (anyLive) {
    mock.meta.source = "live";
  } else if (bridgeUsed) {
    mock.meta.source = "bridge";
  } else {
    mock.meta.source = "mock";
  }

  if (errors.length > 0) {
    mock.meta.error = errors.join(" | ");
  }

  mock.meta.last_updated = new Date().toISOString();

  console.log(`[social-metrics] Response: source=${mock.meta.source}, twitter=${mock.meta.twitter_available}, linkedin_company=${mock.meta.linkedin_company_available}, linkedin_founder=${mock.meta.linkedin_founder_available}, bridge=${mock.meta.bridge_used}`);

  return new Response(JSON.stringify(mock), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
// Phase 14C — secure Steam API proxy
// Deploy this as a server-side/serverless endpoint and set STEAM_WEB_API_KEY
// in the host's secret environment settings. Never expose that key to browser code.

const HOI4_APP_ID = 394360;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function parseProfile(value) {
  const input = String(value || "").trim();
  if (/^7656119\d{10}$/.test(input)) return { steamid: input };
  let url;
  try { url = new URL(input); } catch { return null; }
  if (!/(^|\.)steamcommunity\.com$/i.test(url.hostname)) return null;
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "profiles" && /^7656119\d{10}$/.test(parts[1] || "")) return { steamid: parts[1] };
  if (parts[0] === "id" && /^[A-Za-z0-9_-]{2,64}$/.test(parts[1] || "")) return { vanity: parts[1] };
  return null;
}

async function steamGet(path, params, key) {
  const url = new URL("https://api.steampowered.com/" + path);
  url.searchParams.set("key", key);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("Steam API HTTP " + response.status);
  return response.json();
}

async function resolveSteamId(profile, key) {
  if (profile.steamid) return profile.steamid;
  const data = await steamGet("ISteamUser/ResolveVanityURL/v1/", { vanityurl: profile.vanity, url_type: 1 }, key);
  const resolved = data && data.response;
  if (!resolved || Number(resolved.success) !== 1 || !resolved.steamid) return null;
  return resolved.steamid;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204 });
    if (request.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });
    if (!env || !env.STEAM_WEB_API_KEY) return json(503, { ok: false, error: "steam_proxy_not_configured" });

    let body;
    try { body = await request.json(); } catch { return json(400, { ok: false, error: "invalid_request" }); }
    const profile = parseProfile(body && body.profile);
    if (!profile) return json(400, { ok: false, error: "invalid_profile" });

    try {
      const steamid = await resolveSteamId(profile, env.STEAM_WEB_API_KEY);
      if (!steamid) return json(404, { ok: false, error: "profile_not_found" });

      // 14C proves the secure server boundary. Achievement retrieval is enabled in 14E.
      return json(200, {
        ok: true,
        steamid,
        appid: HOI4_APP_ID,
        proxy: "ready",
        next: "achievement_retrieval"
      });
    } catch {
      return json(502, { ok: false, error: "steam_unavailable" });
    }
  }
};

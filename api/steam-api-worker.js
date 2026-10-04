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

// Phase 14D — canonical Steam profile parsing and SteamID64 resolution.
function parseProfile(value) {
  let input = String(value || "").trim();
  if (!input) return null;
  if (/^7656119\d{10}$/.test(input)) return { type: "steamid64", steamid: input, normalized: input };

  // Accept copied Steam Community links with or without a scheme.
  if (/^(?:www\.)?steamcommunity\.com\//i.test(input)) input = "https://" + input;
  let url;
  try { url = new URL(input); } catch { return null; }
  if (!/(^|\.)steamcommunity\.com$/i.test(url.hostname)) return null;

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  const kind = (parts[0] || "").toLowerCase();
  const identity = decodeURIComponent(parts[1] || "").trim();

  if (kind === "profiles" && /^7656119\d{10}$/.test(identity)) {
    return { type: "steamid64", steamid: identity, normalized: "https://steamcommunity.com/profiles/" + identity };
  }
  if (kind === "id" && /^[A-Za-z0-9_-]{2,64}$/.test(identity)) {
    return { type: "vanity", vanity: identity, normalized: "https://steamcommunity.com/id/" + identity };
  }
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
  if (profile.type === "steamid64" && profile.steamid) return { steamid: profile.steamid, resolution: "direct" };
  const data = await steamGet("ISteamUser/ResolveVanityURL/v1/", { vanityurl: profile.vanity, url_type: 1 }, key);
  const resolved = data && data.response;
  if (!resolved || Number(resolved.success) !== 1 || !/^7656119\d{10}$/.test(resolved.steamid || "")) return null;
  return { steamid: resolved.steamid, resolution: "vanity" };
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
      const resolved = await resolveSteamId(profile, env.STEAM_WEB_API_KEY);
      if (!resolved) return json(404, { ok: false, error: "profile_not_found" });

      return json(200, {
        ok: true,
        steamid: resolved.steamid,
        profileType: profile.type,
        normalizedProfile: profile.normalized,
        resolution: resolved.resolution,
        appid: HOI4_APP_ID,
        proxy: "ready",
        next: "achievement_retrieval"
      });
    } catch {
      return json(502, { ok: false, error: "steam_unavailable" });
    }
  }
};

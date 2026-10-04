# Steam API proxy

Phase 14C introduces the server-side boundary used by the War Room Steam sync.

## Secret required

Set `STEAM_WEB_API_KEY` in the deployment platform's encrypted secret/environment settings. Never commit the key.

## Endpoint contract

POST the following JSON to the deployed worker:

```json
{"profile":"https://steamcommunity.com/id/example"}
```

The proxy validates Steam Community profile formats and resolves vanity profile names to SteamID64. Phase 14E extends the same endpoint with HOI4 achievement retrieval.

The public website must call the deployed proxy URL; it must never call Steam with an API key from browser JavaScript.

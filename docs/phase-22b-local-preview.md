# Phase 22B — Isolated local browser preview

This preview uses the **development branch** only. Do not merge PR #3 or change GitHub Pages / Cloudflare Workers settings solely to test it.

## Launch

1. From the GitHub repository, select branch `phase-22b-difficulty-classification`, then **Code → Download ZIP**.
2. Extract the ZIP, open the extracted repository root (the folder containing `index.html`).
3. Open a terminal in that directory and run:

   ```sh
   py -m http.server 8765 --bind 127.0.0.1
   ```

   If `py` is unavailable, try `python -m http.server 8765 --bind 127.0.0.1`.
4. In a desktop browser, open **http://127.0.0.1:8765/**.
5. Press F12 → Console. Run the following (read commands before executing):

   ```js
   ({
     classification: window.HOI4WarRoomPhase22BClassificationAudit(),
     validator: window.HOI4WarRoomPhase22BPilotValidationAudit(),
     archive: window.HOI4WarRoomPhase22BArchiveUIAudit(),
     generic: window.HOI4WarRoomPhase22AGenericAudit(),
     identity: window.HOI4WarRoomPhase22AIdentityAudit()
   })
   ```

All `passed` flags should be `true`. Record any failures with console output and browser version. **These manual tests have not been run merely by adding this guide.**

## Visual QA

Desktop: review Achievement Archive search, complete/uncompleted filter, generic toggle, cards, campaign dossiers, generator Random and Choose modes. Narrow window to ~390px to verify wraps and no sideways scrolling. Since no achievement ratings have been approved for publication, the current archive should show **no intelligence chips**: this is expected.

## Steam Sync caution

The preview is on `127.0.0.1`, not the production origin. The Cloudflare Worker may reject it due to allowed-origin/CORS checks. Use the live website for Steam Sync validation; do not weaken Worker CORS or enter sensitive information for this preview.

## Exit

Stop the local server with Ctrl+C. Preview is entirely separate from production.

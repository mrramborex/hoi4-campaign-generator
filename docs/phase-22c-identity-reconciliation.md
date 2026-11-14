# Phase 22C — Canonical identity reconciliation

Base: classification Batch 32 (261 reviewed records; 293 canonical achievements).

## Fix
- Editorial intelligence lookup now normalizes straight/curly apostrophes and quotation marks using the existing canonical name normalizer.
- Phase 22A identity audit now fails if any editorial rating key does not correspond to a canonical achievement, or if two editorial keys normalize to the same identity.
- No new achievements, ratings, Steam identifiers, artwork entries, or changes to the 42 generic exclusions were introduced.

## Reconciliation
The 32 artwork-map keys missing from an exact-string comparison to the 261 editorial keys **are not** proof of 32 distinct missing achievements. For example, `Genghis Khan’t` (artwork) and `Genghis Khan't` (editorial) normalize to the same identity. The canonical catalog contains 293 entries, and all 261 existing editorial keys match canonical catalog names after normalization; no duplicate normalized editorial keys were found in the Batch 32 snapshot.

## Acceptance pending
Run `window.HOI4WarRoomPhase22AIdentityAudit()` and `window.HOI4WarRoomPhase22BClassificationAudit()` in a browser, plus desktop/mobile Playwright regression. This branch fixes identity resolution; it **does not** classify the remaining 32 canonical achievements or certify 293/293 completion.

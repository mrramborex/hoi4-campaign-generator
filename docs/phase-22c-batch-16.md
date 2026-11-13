# Phase 22C — Batch 16: Achievement Intelligence and difficulty filter

**Development draft:** 8 additional ratings, **133/293 classified** with **160 unrated**. No live release.

Steam achievement descriptions checked 2026-11-13. Difficulty/duration are **War Room editorial estimates**, not official Steam values.

| Achievement | Difficulty | Duration | Scores (complexity/time/uncertainty) | Steam source |
|---|---|---|---|---|
| We’re Putting the Band Back Together | Hard | Long | 3 / 3 / 3 | [Steam](https://steamcommunity.com/profiles/76561198204957968/achievements/394360) |
| Hardly Anything Sèvres | Very Hard | Very Long | 4 / 4 / 4 | [Steam](https://steamcommunity.com/profiles/76561198416418966/achievements/394360) |
| The Pope? How many Divisions does he have? | Hard | Long | 3 / 3 / 3 | [Steam](https://steamcommunity.com/profiles/76561198030808048/achievements/394360) |
| Satisfactory | Moderate | Long | 2 / 3 / 2 | [Steam](https://steamcommunity.com/profiles/76561198093039723/achievements/394360) |
| Manifesting a Better Tomorrow | Moderate | Long | 2 / 3 / 2 | [Steam](https://steamcommunity.com/profiles/76561198093039723/achievements/394360) |
| Just proper gander | Moderate | Long | 2 / 3 / 2 | [Steam](https://steamcommunity.com/profiles/76561197996874543/achievements/394360) |
| Pizza Time! | Very Hard | Very Long | 4 / 4 / 4 | [Steam](https://steamcommunity.com/profiles/76561198009442137/achievements/394360) |
| Spies Trade | Moderate | Medium | 2 / 2 / 2 | [Steam](https://steamcommunity.com/profiles/76561198055637100/achievements/394360) |

## Archive difficulty filter
- New `Difficulty` select beside the archive search/country/ideology/status filters.
- Choices: All difficulties (default), Easy, Moderate, Hard, Very Hard, Not rated (pending review).
- Difficulty matching only reads completed, reviewed editorial intelligence. Unreviewed and missing ratings appear only in All or Not rated.
- Filter combines with name search, country, ideology, completion status and generic toggle; existing completion state is unchanged.
- Existing Archive layout: five controls on desktop, two-column tablet, one-column phone; generic toggle remains on its own row.
- `visibleCount` updates after difficulty selection.
- Desktop/mobile Playwright smoke tests added for filtering, unrated count, reset and horizontal overflow. Tests have **not yet been run**.

## Safeguards
- Canonical achievement catalog stays 293; no Steam identifiers fabricated.
- Existing Steam Sync, 42 generic exclusions, completion colors, and achievement art untouched.
- Stacked on Batch 15 PR #18. CI, screenshot verification and sequential merges pending.

# Phase 22C — Classification batch 01

**Scope:** Eight additional editorial ratings on a development branch. They are **not official Steam ratings**. Reviewed entries total **13 of 293**; the other **280 remain unrated**. This change does not alter Steam completion status or the campaign generator.

**Requirement source:** [Steam Hearts of Iron IV achievement catalog](https://steamcommunity.com/achievements/394360), checked 2026-11-08. Steam provides achievement names and requirements, **not** these difficulty or duration judgments.

| Achievement | Difficulty | Duration | Complexity / Time / Uncertainty | Tags |
|---|---|---|---|---|
| We'll build it in a day | Easy | Long | 1 / 3 / 1 | research, industry |
| Wunderwaffen | Hard | Very Long | 3 / 4 / 3 | research, industry, air |
| Master of War | Moderate | Long | 2 / 3 / 2 | research, land, air, naval |
| Mine is bigger than yours | Hard | Long | 3 / 3 / 3 | diplomacy |
| No country for old men | Moderate | Medium | 2 / 2 / 1 | economy, land |
| United Netherlands | Hard | Medium | 3 / 2 / 3 | conquest, land |
| Vive la France | Hard | Very Long | 3 / 4 / 3 | survival, timed |
| Canada First | Moderate | Medium | 2 / 2 / 2 | diplomacy, focus-tree |

Difficulty uses the median of complexity, time, and uncertainty (1 = Easy; 4 = Very Hard). Duration is **reported separately**: 1 = Short, 2 = Medium, 3 = Long, 4 = Very Long. These are editorial estimates for normal achievement-oriented play, not guarantees. Some objectives may have faster strategies or vary by patch/DLC.

## Acceptance criteria
- [x] Compare all eight exact requirement strings with Steam.
- [x] Retain existing 293-achievement catalog and 42 generic-archive safeguards.
- [x] Restrict metadata to reviewed, source-backed records with matching canonical requirements.
- [ ] Confirm the full 13-entry archive is rendered correctly on desktop and mobile through GitHub browser CI.
- [ ] Complete review and merge PR #4 only after automated checks and visual acceptance.

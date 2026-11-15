# Phase 22C — Classification batch 08

**State:** Development draft. Eight Steam-description checked classifications, now **69 / 293 reviewed** (224 remain unrated) on this stacked branch. Production remains unchanged.

Requirement source: [Steam achievements](https://steamcommunity.com/achievements/394360), checked 2026-11-11. Additional [Steam player achievement listing](https://steamcommunity.com/profiles/76561198112036154/achievements/394360) for Czechmate. Difficulty/duration are **War Room editorial estimates, not official Steam ratings**.

| Achievement | Difficulty | Duration | Scores (complexity / time / uncertainty) | Tags |
|---|---|---|---|---|
| 30 Minutes of Hel | Very Hard | Long | 4 / 3 / 4 | survival, land, timed |
| Tour de France | Hard | Long | 3 / 3 / 3 | conquest, land |
| Nothing personal, Adolf | Hard | Medium | 3 / 2 / 3 | conquest, diplomacy, timed |
| Death or Dishonor or Cake | Hard | Long | 3 / 3 / 3 | conquest, land, diplomacy |
| Huge-oslavia | Very Hard | Very Long | 4 / 4 / 4 | conquest, land |
| Battlecry | Very Hard | Very Long | 4 / 4 / 4 | conquest, land, naval |
| Australia-Hungary | Very Hard | Very Long | 4 / 4 / 3 | conquest, naval, land |
| Czechmate | Very Hard | Very Long | 4 / 4 / 4 | conquest, naval, land |

## Implementation review
- No change to canonical 293 catalog, generic achievement exclusions, Steam Sync, completion colors, icon artwork or identifiers.
- All new entries explicitly set `reviewStatus: reviewed`, with dated source, requirement snapshot, rubric and justification.
- Updated desktop/mobile smoke counts: 69 chips/labels.
- Automated CI and visual acceptance required before promotion.
- Stack on Batch 07 PR #10; merge earlier batches in order before production.

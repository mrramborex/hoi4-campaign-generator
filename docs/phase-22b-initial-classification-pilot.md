# Phase 22B — First source-checked classification batch (development branch)

**Status:** The five requirement texts were checked against Steam's Hearts of Iron IV achievement catalog on 2026-11-08: https://steamcommunity.com/achievements/394360. The War Room editorial ratings are **subjective estimates, not official Steam difficulty ratings**, and are implemented for development-branch preview only. PR #3 has not been merged into production.

| Achievement | Local catalog requirement | Complexity | Time | Uncertainty | Median | Proposed level | Proposed tags |
|---|---|---:|---:|---:|---:|---|---|
| Friend in Need | Join a faction. | 1 | 1 | 1 | 1 | Easy | diplomacy |
| Transport Tycoon | Have at least 1000 convoys. | 1 | 2 | 1 | 1 | Easy | economy, naval |
| Time is on our side | Reach 1948. | 1 | 4 | 1 | 1 | Easy | survival |
| Destroyer of Worlds | Deploy a nuke. | 2 | 3 | 2 | 2 | Moderate | research, air |
| True Blitzkrieg | As Germany have both Poland and France surrender before January 1st 1940. | 3 | 2 | 3 | 3 | Hard | conquest, land, timed |

**Caution:** The Time is on our side sample demonstrates a weakness of a simple median: an achievement with very long playtime can be classified Easy if the other dimensions are low. These ratings are editorial estimates. The UI now distinguishes difficulty from duration, allowing an Easy / Very Long combination without misleading players about required time.

## Release acceptance
- [x] Cross-check these five requirement strings against Steam's displayed descriptions.
- [x] Add source links, reviewer attribution, review date, dimension scores, and rationale to the development metadata.
- [x] Separate difficulty from duration; show editorial estimates only for validated records.
- [ ] Validate browser CI on the latest commit and visually inspect the actual archive at desktop and mobile widths.
- [ ] Confirm gameplay judgments and calibrate difficulty labels in additional editorial review (game mechanics can change across patches).
- [ ] Approve PR #3 and complete production smoke tests before considering the ratings released.

**Canonical dataset and gameplay generator are unchanged by this worksheet.**

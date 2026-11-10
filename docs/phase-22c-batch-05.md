# Phase 22C — Classification batch 05

**Release status:** Draft development branch, not merged or released. Adds eight editorial classifications, taking the development dataset to **45 / 293** rated achievements, with **248 still unrated**.

Requirements were compared with the Steam achievement catalog and Steam achievement profile listings on November 10, 2026. Difficulty and time estimates are **War Room editorial judgments**; they are not Steam-provided ratings or fixed guarantees. The median of complexity, time, and uncertainty determines difficulty, and time is separately displayed as duration.

| Achievement | Difficulty | Duration | Complexity / Time / Uncertainty | Tags |
|---|---|---|---|---|
| You Will Never Kill Me Alive | Moderate | Medium | 2 / 2 / 2 | espionage |
| Man of a Thousand Faces, Every One the Same | Moderate | Long | 2 / 3 / 2 | espionage |
| Not much fun in Stalingrad | Hard | Long | 3 / 3 / 3 | conquest, land |
| Braaaaains! | Easy | Medium | 1 / 2 / 1 | focus-tree, research |
| Do You Mined? | Moderate | Medium | 2 / 2 / 2 | naval |
| Pride and Extreme Prejudice | Hard | Medium | 3 / 2 / 3 | naval |
| Play It, Sam | Moderate | Medium | 2 / 2 / 2 | espionage |
| Turing Complete! | Moderate | Long | 2 / 3 / 2 | espionage, research |

**Sources:** [Steam Hearts of Iron IV Global Achievements](https://steamcommunity.com/achievements/394360) and [Steam achievement listing](https://steamcommunity.com/profiles/76561199199273004/achievements/394360).

**Deliberately deferred:** `Monarchy is Back In Fashion` and `I Captured the Bosporus and All I Got Was This Lousy Achievement` have differences between the current local objective text and the displayed Steam requirement text. Their identity and text must be reconciled separately; no silent rewriting was performed.

## Acceptance gates

- [x] All eight canonical names and requirement strings align with the checked Steam references.
- [x] Source-backed review metadata and consistent median scores.
- [x] Retain 293 catalog records, including 42 generic archive-only achievements.
- [ ] GitHub Chromium audits, mobile overflow, and completed badge color tests pass.
- [ ] Review and merge draft PR after checks.
- [ ] Verify production Pages, Cloudflare, and browser statuses.

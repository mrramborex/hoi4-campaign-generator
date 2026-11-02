# Phase 22B — Achievement difficulty methodology (draft)

Status: development proposal; not an official Paradox/Steam classification.

## Editorial dimensions
Score each **1–4**, using written evidence for each:
- **Execution complexity:** number of coordinated systems, timing, branching, required player skill.
- **Time investment:** realistic in-game campaign effort (not just game-year deadline); indicate if setup or repeated attempts matter.
- **Uncertainty/dependency:** degree of RNG, AI cooperation, external war outcomes, or hard-to-control conditions.

## Suggested rating calculation
Use the **median** of three dimension scores, rounded up only if an explicitly reviewed exception is documented. This prevents one unusual factor from overpowering the total. Scale: 1=Easy, 2=Moderate, 3=Hard, 4=Very Hard.

This is a *proposed editorial rubric*, not a mathematical statement of achievement success probability.

## Evidence and review fields
For every rated achievement, record: canonical name, exact requirement and link to Steam/Paradox source, relevant game version/DLC if verified, three dimension scores, final difficulty, justification, source URLs, review date, reviewer, and review status. Optional tags must come from the allowed tag list. Reject unrated/unfinished review submissions from publication.

## Safeguards
1. Keep the official achievement requirement separate from any commentary, strategy or rating.
2. Never infer an official Steam API ID from a display name.
3. Never assume mods permit vanilla Steam achievement unlocks.
4. Keep unrated achievements labeled **Not rated**; never populate placeholder ratings.
5. Retain the generic-achievement archive-only policy for campaign generation.
6. Do not alter Steam sync, localStorage records, or campaign selection logic in this phase.
7. Verify rating consistency using multiple examples before bulk classification.

## Phase 22B acceptance
- 293 canonical records preserved; no modifications to official requirements.
- Rubric and reviewed metadata schema documented.
- Validation rejects malformed scores, unsupported tags, missing evidence and inconsistent review statuses.
- UI shows ratings/tags only for validated, reviewed entries, once integration is deliberately introduced.
- Desktop/mobile, Steam Sync and Campaign Assignment regression tests pass.

No individual achievement has been rated in this document.

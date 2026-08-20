# BOSS PROTOCOL: THE ARENA

**Time:** 3–4 hours
**Files you need:** `index.html`, `checker.js`, `puzzles.js`
**File you edit:** `puzzles.js` — that's it. Don't touch the other two.

## The story

The arena gates won't open until the combat console is fully wired up.
Eight core systems — damage calculation, loot tracking, ability cooldowns,
boss AI, turn resolution — are sitting broken. Bring them all online, and
the gates open onto the final boss fight.

## How to run it

Download all 3 files into the same folder, open `index.html` in your
browser, edit `puzzles.js`, save, and refresh the page to re-scan. Systems
come online in order — you won't see System 4 until System 3 is online.

## What each system tests

| System | Concept | What it builds |
|---|---|---|
| 1 | Functions & arithmetic | Damage + critical hit calculator |
| 2 | filter / reduce | Post-battle loot summary |
| 3 | Destructuring | Character sheet parser |
| 4 | Closures | Ability cooldown tracker |
| 5 | Loops & strings | Health bar + battle log tools |
| 6 | Classes & inheritance | Boss AI hierarchy |
| 7 | async/await (sequential) | Turn-by-turn combat resolver |
| 8 | Everything combined | Full attack resolution system |

## Rules

Only edit `puzzles.js`. No AI tools, no copying answers. Google/MDN is
fair game if you forget exact syntax. Progress saves automatically in
your browser, so closing the tab won't reset you.

## When you finish

Screenshot the "ARENA ONLINE" screen and send it to me. Flag me down if
you're stuck on any one system for more than 15–20 minutes — System 4
(closures) and System 8 (the final combine-everything system) are the
two most people get stuck on, that's completely normal.

Good luck out there.

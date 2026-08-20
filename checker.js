// ============================================================
// ARENA CHECKER ENGINE — students do not need to read or edit this.
// It calls the functions you write in puzzles.js and checks the results.
// ============================================================

const LOCKS = [
  {
    id: 1,
    title: "SYSTEM 1 // DAMAGE CALCULATOR",
    concept: "Functions & arithmetic",
    desc:
`calculateDamage, isCriticalHit, applyCritical, and getDamageReport
should chain together to compute final attack damage, including
critical hits.`,
    run() {
      const d1 = calculateDamage(100, 20);
      const c1 = isCriticalHit(97);
      const c2 = isCriticalHit(50);
      const a1 = applyCritical(d1, c1);
      const a2 = applyCritical(d1, c2);
      const r1 = getDamageReport(100, 20, 97);
      const r2 = getDamageReport(100, 20, 50);

      const expected = {
        d1: 80, c1: true, c2: false, a1: 160, a2: 80,
        r1: "160 DMG (CRITICAL!)", r2: "80 DMG"
      };
      const pass =
        d1 === expected.d1 && c1 === expected.c1 && c2 === expected.c2 &&
        a1 === expected.a1 && a2 === expected.a2 &&
        r1 === expected.r1 && r2 === expected.r2;

      return {
        pass,
        got: JSON.stringify({ d1, c1, c2, a1, a2, r1, r2 }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 2,
    title: "SYSTEM 2 // LOOT TRACKER",
    concept: "Array methods (filter / reduce)",
    desc:
`getRareLoot, getTotalValue, and getBestDrop should filter and
summarize a post-battle loot drop list.`,
    run() {
      const drops = [
        { name: "Rusty Sword", rarity: "common", value: 10 },
        { name: "Phoenix Feather", rarity: "legendary", value: 500 },
        { name: "Iron Shield", rarity: "uncommon", value: 50 },
        { name: "Dragon Scale", rarity: "rare", value: 200 }
      ];
      const rare = getRareLoot(drops);
      const total = getTotalValue(drops);
      const best = getBestDrop(drops);

      const expected = {
        rareCount: 3,
        total: 760,
        best: { name: "Phoenix Feather", rarity: "legendary", value: 500 }
      };
      const pass =
        Array.isArray(rare) && rare.length === expected.rareCount &&
        total === expected.total &&
        JSON.stringify(best) === JSON.stringify(expected.best);

      return {
        pass,
        got: JSON.stringify({ rareCount: rare.length, total, best }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 3,
    title: "SYSTEM 3 // CHARACTER SHEET",
    concept: "Destructuring (nested objects + arrays)",
    desc:
`getMainStat, getEquippedWeapon, and createCharacterSummary should
pull data out of a nested character object using destructuring.`,
    run() {
      const character = {
        name: "Kael",
        stats: { strength: 18, agility: 12, intellect: 9 },
        equipment: [
          { slot: "weapon", name: "Frostbrand" },
          { slot: "shield", name: "Oak Buckler" }
        ]
      };
      const stat = getMainStat(character);
      const weapon = getEquippedWeapon(character);
      const summary = createCharacterSummary(character);

      const expected = {
        stat: "STR: 18",
        weapon: "Frostbrand",
        summary: { name: "Kael", mainStat: "STR: 18", weapon: "Frostbrand" }
      };
      const pass =
        stat === expected.stat &&
        weapon === expected.weapon &&
        JSON.stringify(summary) === JSON.stringify(expected.summary);

      return {
        pass,
        got: JSON.stringify({ stat, weapon, summary }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 4,
    title: "SYSTEM 4 // ABILITY COOLDOWN MANAGER",
    concept: "Closures",
    desc:
`createAbility(name, cooldownTurns) should return use()/tick()
methods that share one private cooldown counter via closure.`,
    run() {
      const fireball = createAbility("Fireball", 3);
      const u1 = fireball.use();          // "Fireball UNLEASHED!"
      const u2 = fireball.use();          // "Fireball ON COOLDOWN (3 turns left)"
      const t1 = fireball.tick();         // 2
      const t2 = fireball.tick();         // 1
      const t3 = fireball.tick();         // 0
      const u3 = fireball.use();          // "Fireball UNLEASHED!" again

      const expected = {
        u1: "Fireball UNLEASHED!",
        u2: "Fireball ON COOLDOWN (3 turns left)",
        t1: 2, t2: 1, t3: 0,
        u3: "Fireball UNLEASHED!"
      };
      const pass =
        u1 === expected.u1 && u2 === expected.u2 &&
        t1 === expected.t1 && t2 === expected.t2 && t3 === expected.t3 &&
        u3 === expected.u3;

      return {
        pass,
        got: JSON.stringify({ u1, u2, t1, t2, t3, u3 }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 5,
    title: "SYSTEM 5 // BATTLE LOG FORMATTER",
    concept: "Loops & string manipulation",
    desc:
`buildHealthBar, countOccurrences, and formatTurnLog should all be
built with plain loops rather than shortcut array methods.`,
    run() {
      const bar1 = buildHealthBar(60, 100, 10);
      const bar2 = buildHealthBar(40, 300, 10);
      const count = countOccurrences("CRIT! Fireball hit. CRIT! Ice Shard hit. Normal hit.", "CRIT");
      const formatted = formatTurnLog("kael casts fireball");

      const expected = {
        bar1: "██████░░░░ 60%",
        bar2: "█░░░░░░░░░ 13%",
        count: 2,
        formatted: "Kael Casts Fireball"
      };
      const pass =
        bar1 === expected.bar1 && bar2 === expected.bar2 &&
        count === expected.count && formatted === expected.formatted;

      return {
        pass,
        got: JSON.stringify({ bar1, bar2, count, formatted }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 6,
    title: "SYSTEM 6 // BOSS AI HIERARCHY",
    concept: "ES6 classes & inheritance (extends, super)",
    desc:
`FireBoss and IceBoss should both extend the given Boss class, each
overriding attack() by building on super.attack().`,
    run() {
      let fire, ice;
      try {
        fire = new FireBoss("Inferno", 300);
        ice = new IceBoss("Glacius", 250, 30);
      } catch (e) {
        return { pass: false, got: `error: ${e.message}`, expected: "working classes" };
      }
      const fireAttack = fire.attack();
      const iceAttack = ice.attack();

      const expected = {
        fireAttack: "Inferno attacks for 20 damage! The flames spread, burning for 5 extra damage!",
        iceAttack: "Glacius attacks for 20 damage! A chill freezes the air (30% freeze chance)."
      };
      const pass = fireAttack === expected.fireAttack && iceAttack === expected.iceAttack;

      return {
        pass,
        got: JSON.stringify({ fireAttack, iceAttack }),
        expected: JSON.stringify(expected)
      };
    }
  },
  {
    id: 7,
    title: "SYSTEM 7 // TURN RESOLVER",
    concept: "Promises & async/await (sequential)",
    desc:
`resolveTurn() must await playerAttack, then bossCounter, then
statusEffectTick, IN ORDER, since a real turn genuinely resolves
in that sequence.`,
    async run() {
      const result = await resolveTurn();
      const expected = "PLAYER HITS FOR 45 | BOSS COUNTERS FOR 30 | POISON DEALS 5";
      return { pass: result === expected, got: result, expected };
    }
  },
  {
    id: 8,
    title: "SYSTEM 8 // ATTACK RESOLVER",
    concept: "Combining everything: functions, math, string building",
    desc:
`resolveAttack(...) should combine the damage logic from System 1
and the health bar logic from System 5 into one final attack
resolution, including the boss-defeated case.`,
    run() {
      const hit = resolveAttack(200, 300, 100, 20, 97);
      const kill = resolveAttack(50, 300, 100, 0, 50);

      const expectedHit = { damage: 160, newHP: 40, healthBar: "█░░░░░░░░░ 13%", defeated: false };
      const expectedKill = { damage: 100, newHP: 0, healthBar: "░░░░░░░░░░ 0%", defeated: true };

      const pass =
        JSON.stringify(hit) === JSON.stringify(expectedHit) &&
        JSON.stringify(kill) === JSON.stringify(expectedKill);

      return {
        pass,
        got: JSON.stringify({ hit, kill }),
        expected: JSON.stringify({ hit: expectedHit, kill: expectedKill })
      };
    }
  }
];

const STORAGE_KEY = "arena_progress_v1";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors, non-critical
  }
}

function renderLocks(progress) {
  const container = document.getElementById("locks");
  container.innerHTML = "";

  LOCKS.forEach((lock, i) => {
    const isUnlocked = i === 0 || progress[LOCKS[i - 1].id] === "pass";
    const state = progress[lock.id]; // undefined | "pass" | "fail"

    const div = document.createElement("div");
    div.className = "lock" + (isUnlocked ? "" : " locked") + (state === "pass" ? " solved" : "");

    let statusClass = "status-locked";
    let statusText = "OFFLINE";
    if (isUnlocked && state !== "pass") { statusClass = "status-locked"; statusText = "SCANNING"; }
    if (state === "pass") { statusClass = "status-pass"; statusText = "ONLINE"; }
    if (state === "fail") { statusClass = "status-fail"; statusText = "ERROR"; }

    div.innerHTML = `
      <div class="lock-head">
        <span class="lock-title">${lock.title}</span>
        <span class="lock-status ${statusClass}">${statusText}</span>
      </div>
      <div class="lock-desc">[${lock.concept}]\n${lock.desc}</div>
      <div class="lock-log" id="log-${lock.id}"></div>
    `;
    container.appendChild(div);
  });
}

async function runChecks() {
  const progress = loadProgress();

  for (const lock of LOCKS) {
    const prevSolved = lock.id === 1 || progress[LOCKS[lock.id - 2].id] === "pass";
    if (!prevSolved) break; // stop at first still-offline system

    let outcome;
    try {
      outcome = await lock.run();
    } catch (e) {
      outcome = { pass: false, got: `runtime error: ${e.message}`, expected: "no error" };
    }
    progress[lock.id] = outcome.pass ? "pass" : "fail";
    lock._lastOutcome = outcome;
  }

  saveProgress(progress);
  renderLocks(progress);

  LOCKS.forEach(lock => {
    const logEl = document.getElementById(`log-${lock.id}`);
    if (!logEl || !lock._lastOutcome) return;
    const o = lock._lastOutcome;
    if (o.pass) {
      logEl.className = "lock-log";
      logEl.textContent = `> SYSTEM ONLINE — output matched: ${o.got}`;
    } else {
      logEl.className = "lock-log fail glitch";
      logEl.textContent = `> SYSTEM ERROR\n> expected: ${o.expected}\n> got:      ${o.got}`;
    }
  });

  const solvedCount = LOCKS.filter(l => progress[l.id] === "pass").length;
  document.getElementById("meterText").textContent = `${solvedCount} / 8 SYSTEMS ONLINE`;
  document.getElementById("meterFill").style.width = `${(solvedCount / 8) * 100}%`;

  if (solvedCount === 8) {
    document.getElementById("finalPanel").classList.add("show");
    document.getElementById("finalMsg").textContent =
      "All 8 systems online. The arena gates are open. Screenshot this page and send it to your mentor.";
  }
}

runChecks();

// ============================================================
// BOSS PROTOCOL: THE ARENA — puzzles.js
// This is the ONLY file you edit. Fix each function below.
// Save the file, then refresh index.html in your browser to re-scan.
// Systems come online in order — you won't see System 4 until
// System 3 is online.
// ============================================================


/* =========================================================
   SYSTEM 1 // DAMAGE CALCULATOR
   ---------------------------------------------------------
   Every attack in the arena needs a damage number. Armor reduces
   incoming damage by a percentage, and a lucky roll can land a
   critical hit that doubles it.

   Write these functions:
   * calculateDamage(basePower, armorPercent) should return the
     damage dealt after armor reduces it by armorPercent.
   * isCriticalHit(roll) should return true if roll is 95 or
     higher (out of 100), otherwise false.
   * applyCritical(damage, isCrit) should return damage doubled if
     isCrit is true, otherwise return damage unchanged.
   * getDamageReport(basePower, armorPercent, roll) should combine
     all three above and return a string:
       "<finalDamage> DMG" normally, or
       "<finalDamage> DMG (CRITICAL!)" if it was a critical hit.
   ========================================================= */
function calculateDamage(basePower, armorPercent) {
  return basePower * (1 - armorPercent / 100);
}

function isCriticalHit(roll) {
  return roll >= 95;
}

function applyCritical(damage, isCrit) {
  if (isCrit) {
    return damage * 2;
  }

  return damage;
}

function getDamageReport(basePower, armorPercent, roll) {
  let damage = calculateDamage(basePower, armorPercent);
  let critical = isCriticalHit(roll);
  let finalDamage = applyCritical(damage, critical);

  if (critical) {
    return `${finalDamage} DMG (CRITICAL!)`;
  }

  return `${finalDamage} DMG`;
}


/* =========================================================
   SYSTEM 2 // LOOT TRACKER
   ---------------------------------------------------------
   Defeated enemies drop loot. Each drop has a name, a rarity, and a
   value. Build the post-battle loot summary.

   Write these functions:
   * getRareLoot(drops) should return a new array containing only
     the drops whose rarity is NOT "common".
   * getTotalValue(drops) should return the sum of the value field
     across every drop.
   * getBestDrop(drops) should return the single drop object with
     the highest value.
   ========================================================= */
function getRareLoot(drops) {
  let rareLoot = [];

  for (let i = 0; i < drops.length; i++) {
    if (drops[i].rarity !== "common") {
      rareLoot.push(drops[i]);
    }
  }

  return rareLoot;
}

function getTotalValue(drops) {
  let total = 0;

  for (let i = 0; i < drops.length; i++) {
    total += drops[i].value;
  }

  return total;
}

function getBestDrop(drops) {
  let best = drops[0];

  for (let i = 1; i < drops.length; i++) {
    if (drops[i].value > best.value) {
      best = drops[i];
    }
  }

  return best;
}


/* =========================================================
   SYSTEM 3 // CHARACTER SHEET
   ---------------------------------------------------------
   The HUD needs to pull a few key stats out of a much bigger,
   nested character object. Use destructuring — not chained
   dot-notation like character.stats.strength.

   Write these functions:
   * getMainStat(character) should destructure strength out of the
     nested stats object (rename it to power while destructuring)
     and return "STR: <power>".
   * getEquippedWeapon(character) should destructure the name out of
     the FIRST item in the equipment array, and return just that
     name.
   * createCharacterSummary(character) should return an object with
     name, mainStat, and weapon, using the two functions above.
   ========================================================= */
function getMainStat(character) {
  const { stats: { strength: power } } = character;

  return `STR: ${power}`;
}

function getEquippedWeapon(character) {
  const { equipment: [{ name }] } = character;

  return name;
}

function createCharacterSummary(character) {
  const { name } = character;

  return {
    name: name,
    mainStat: getMainStat(character),
    weapon: getEquippedWeapon(character)
  };
}


/* =========================================================
   SYSTEM 4 // ABILITY COOLDOWN MANAGER
   ---------------------------------------------------------
   Every ability needs its own private cooldown counter that
   nothing outside the ability can directly access or tamper with —
   a perfect job for a closure.

   Write this function:
   * createAbility(name, cooldownTurns) should return an object
     with two methods that share one private "remaining" counter
     (starting at 0, meaning ready to use):
       - use(): if remaining is 0, set remaining to cooldownTurns
         and return "<name> UNLEASHED!"; otherwise, WITHOUT
         changing remaining, return
         "<name> ON COOLDOWN (<remaining> turns left)"
       - tick(): if remaining is greater than 0, subtract 1 from it.
         Either way, return the new value of remaining.
   ========================================================= */
function createAbility(name, cooldownTurns) {
  let remaining = 0;

  return {
    use() {
      if (remaining === 0) {
        remaining = cooldownTurns;
        return `${name} UNLEASHED!`;
      }

      return `${name} ON COOLDOWN (${remaining} turns left)`;
    },

    tick() {
      if (remaining > 0) {
        remaining -= 1;
      }

      return remaining;
    }
  };
}


/* =========================================================
   SYSTEM 5 // BATTLE LOG FORMATTER
   ---------------------------------------------------------
   The console needs a visual health bar and some log-parsing
   utilities — all built with plain loops, no .map() shortcuts.

   Write these functions:
   * buildHealthBar(currentHP, maxHP, barLength) should build a
     string of "█" characters for the filled portion and "░" for
     the empty portion, followed by the percentage. The number of
     filled characters is Math.round((currentHP / maxHP) * barLength).
     The percentage is Math.round((currentHP / maxHP) * 100).
     Format: "<filled><empty> <percent>%"
   * countOccurrences(log, keyword) should loop through log and
     count how many times keyword appears as a substring (you can
     use .indexOf() in a loop, but not a regex or .split().length
     shortcut).
   * formatTurnLog(text) should return text with the first letter
     of every word capitalized, built with a loop (same pattern as
     before — no .map()).
   ========================================================= */
function buildHealthBar(currentHP, maxHP, barLength) {
  let filledCount = Math.round((currentHP / maxHP) * barLength);
  let percent = Math.round((currentHP / maxHP) * 100);

  let filled = "";
  let empty = "";

  for (let i = 0; i < filledCount; i++) {
    filled += "█";
  }

  for (let i = filledCount; i < barLength; i++) {
    empty += "░";
  }

  return `${filled}${empty} ${percent}%`;
}

function countOccurrences(log, keyword) {
  let count = 0;
  let position = 0;

  while ((position = log.indexOf(keyword, position)) !== -1) {
    count++;
    position += keyword.length;
  }

  return count;
}

function formatTurnLog(text) {
  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char === " ") {
      result += char;
      capitalizeNext = true;
    } else if (capitalizeNext) {
      result += char.toUpperCase();
      capitalizeNext = false;
    } else {
      result += char;
    }
  }

  return result;
}


/* =========================================================
   SYSTEM 6 // BOSS AI HIERARCHY
   ---------------------------------------------------------
   Every boss shares a base attack, but each boss type adds its own
   flavor on top of it. The base Boss class is already written.

   Write these classes:
   * FireBoss (extends Boss) — constructor takes (name, maxHP).
     attack() should call the parent's attack() with super.attack()
     and append " The flames spread, burning for 5 extra damage!"
   * IceBoss (extends Boss) — constructor takes (name, maxHP,
     freezeChance). attack() should call super.attack() and append
     " A chill freezes the air (<freezeChance>% freeze chance)."
   ========================================================= */
class Boss {
  constructor(name, maxHP) {
    this.name = name;
    this.hp = maxHP;
    this.maxHP = maxHP;
  }
  attack() {
    return `${this.name} attacks for 20 damage!`;
  }
}

// YOUR CODE HERE — write class FireBoss extends Boss { ... }

class FireBoss extends Boss {
  constructor(name, maxHP) {
    super(name, maxHP);
  }

  attack() {
    return super.attack() + " The flames spread, burning for 5 extra damage!";
  }
}


// YOUR CODE HERE — write class IceBoss extends Boss { ... }

class IceBoss extends Boss {
  constructor(name, maxHP, freezeChance) {
    super(name, maxHP);
    this.freezeChance = freezeChance;
  }

  attack() {
    return super.attack() + ` A chill freezes the air (${this.freezeChance}% freeze chance).`;
  }
}


/* =========================================================
   SYSTEM 7 // TURN RESOLVER
   ---------------------------------------------------------
   Each combat turn has three steps that MUST happen in order: the
   player attacks, the boss counters, then a status effect (like
   poison) ticks. Each function below is already written and
   returns a promise — you just need to sequence them correctly.

   Write this function:
   * resolveTurn() should be an async function that awaits
     playerAttack, then bossCounter, then statusEffectTick — in
     that order — and returns:
     "<playerResult> | <bossResult> | <statusResult>"
   ========================================================= */
function playerAttack() {
  return new Promise(resolve => setTimeout(() => resolve("PLAYER HITS FOR 45"), 150));
}

function bossCounter() {
  return new Promise(resolve => setTimeout(() => resolve("BOSS COUNTERS FOR 30"), 200));
}

function statusEffectTick() {
  return new Promise(resolve => setTimeout(() => resolve("POISON DEALS 5"), 100));
}

async function resolveTurn() {
  const playerResult = await playerAttack();
  const bossResult = await bossCounter();
  const statusResult = await statusEffectTick();

  return `${playerResult} | ${bossResult} | ${statusResult}`;
}


/* =========================================================
   SYSTEM 8 // ATTACK RESOLVER
   ---------------------------------------------------------
   Final system. Put it all together: resolve a single player
   attack against the boss, using the same damage logic from
   System 1 and the same health bar logic from System 5.

   Write this function:
   * resolveAttack(bossHP, bossMaxHP, basePower, armorPercent, roll)
     should:
       - calculate the damage using calculateDamage + isCriticalHit
         + applyCritical (same logic as System 1, just working with
         the raw number instead of the formatted string)
       - compute newHP as bossHP minus damage, but never below 0
         (use Math.max)
       - build a health bar for newHP out of bossMaxHP, 10 characters
         long, using buildHealthBar
       - determine defeated: true if newHP is exactly 0
     Return an object: { damage, newHP, healthBar, defeated }
   ========================================================= */
function resolveAttack(bossHP, bossMaxHP, basePower, armorPercent, roll) {
  const damageAfterArmor = calculateDamage(basePower, armorPercent);
  const critical = isCriticalHit(roll);
  const damage = applyCritical(damageAfterArmor, critical);

  const newHP = Math.max(0, bossHP - damage);

  const healthBar = buildHealthBar(newHP, bossMaxHP, 10);

  const defeated = newHP === 0;

  return {
    damage: damage,
    newHP: newHP,
    healthBar: healthBar,
    defeated: defeated
  };
}
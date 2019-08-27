import { R } from './R.js'

export const physDmg = (Attacker, Defender) => {
  const Chance = 168 + Attacker.Hit - Defender.Eva
  const n = R(0, 200)
  const hit = (n === 0 || n <= Chance) && n !== 200

  if (!hit) {
    return 0 // miss
  }

  const Critical = n === 0 || n <= Attacker.Crt

  return (Critical + 1) * R(Attacker.Att, 2 * Attacker.Att) - Defender.Def
}

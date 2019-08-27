import { R } from './R.js'

export const physDmg = (attacker, defender) => {
  const chance = 168 + attacker.hit - defender.eva
  const n = R(0, 200)
  const hit = (n === 0 || n <= chance) && n !== 200

  if (!hit) {
    return 0 // miss
  }

  const critical = n === 0 || n <= attacker.crt

  return (critical + 1) * R(attacker.att, 2 * attacker.att) - defender.def
}

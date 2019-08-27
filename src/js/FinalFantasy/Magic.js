import { R } from './R.js'
import { FI, TH, WM, RM, BM } from './Hero.js'

export const SA = 0 // Single Ally
export const SE = 1 // Single Enemy
export const AA = 2 // All Allies
export const AE = 3 // All Enemies

export const STATUS = 1
export const POISON = 2
export const TIME = 4
export const DEATH = 8
export const FIRE = 16
export const ICE = 32
export const LIGHT = 64
export const EARTH = 128

export const Spell = (name, elem, eff, acc, target, usable) => ({
  name, elem, eff, acc, target, usable
})

export const spells = [
  Spell('CURE', 0, 15, 0, SA, WM & RM & FI), // HP Revovery Single Ally
  Spell('CUR2', 0, 33, 0, SA, WM & RM & FI), // HP Revovery Single Ally
  Spell('CUR3', 0, 66, 0, SA, WM & RM), // HP Revovery Single Ally
  Spell('CUR4', 0, 0, SA, WM), // Full HP Revovery Single Ally
  Spell('HEAL', 0, 12, 0, AA, WM), // HP Revovery All Allies
  Spell('HEL2', 0, 48, 0, AA, WM), // HP Revovery All Allies
  Spell('HEL3', 0, 48, 48, AA, WM), // HP Revovery All Allies
  Spell('HARM', 0, 20, 24, AE, WM), // Damage All Enemies
  Spell('HRM2', 0, 40, 24, AE, WM), // Damage All Enemies
  Spell('HRM3', 0, 60, 24, AE, WM), // Damage All Enemies
  Spell('FIRE', FIRE, 10, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('FIR2', FIRE, 30, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('FIR3', FIRE, 50, 24, SE, BM & RM), // Damage Single Enemy
  Spell('LIT', LIGHT, 10, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('LIT2', LIGHT, 30, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('LIT3', LIGHT, 60, 24, SE, BM & RM), // Damage Single Enemy
  Spell('ICE', ICE, 20, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('ICE2', ICE, 40, 24, SE, BM & RM & TH), // Damage Single Enemy
  Spell('ICE3', ICE, 70, 24, SE, BM & RM) // Damage Single Enemy
]

export const magDmg = (spell, enemy) => {
  const resi = enemy.resi && spell.elem
  const weak = enemy.weak && spell.elem

  const baseChance = resi ? 0 : weak ? 188 : 148
  const chance = baseChance + spell.Acc - enemy.Mdef

  const n = R(0, 200)
  const double = (n === 0 || n <= chance) && n !== 200

  const effecivity = spell.Eff * (resi ? 1 : weak ? 3 : 2)

  return (double + 1) * R(effecivity, 2 * effecivity)
}

export const magHeal = (spell, ally) => {
  const chance = 148 + spell.acc - ally.mdef
  const n = R(0, 200)
  const hit = (n === 0 || n <= chance) && n !== 200

  if (!hit) {
    return 0 // miss
  }

  if (spell.name === 'CUR4') {
    // Heal to full HP
    return ally.hp - ally.currentHp
  }

  return R(spell.eff, 2 * spell.eff)
}

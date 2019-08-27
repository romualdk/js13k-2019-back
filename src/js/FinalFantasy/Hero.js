import { Exp } from './Exp.js'

export const FI = 1 // Figher / Knight
export const TH = 2 // Thief / Ninja
export const BB = 4 // Black Belt / Master
export const RM = 6 // Red Mage / Red Wizard
export const WM = 8 // White Mage / White Wizard
export const BM = 16 // Black Mage / Black Wizard

export const HERO_ID = {
  1: 0,
  2: 1,
  4: 2,
  6: 3,
  8: 4,
  16: 5
}

/**
 * LVL = Level
 * EXP = Experience
 * HP = Hit Points
 * MP = Magic Points
 * STR = Strength
 * AGI = Agility
 * INT = Intelligence
 * VIT = Vitality
 * LCK = Luck
 * ATK = Attack
 * DEF = Defense
 * HITP = Hit %
 * EVAP = Evade %
 * MDEF = Magic Defense
 */

const statsBase = {
  hp: [35, 30, 33, 30, 28, 25],
  str: [20, 5, 5, 10, 5, 1],
  agi: [5, 10, 5, 10, 5, 10],
  int: [1, 5, 5, 10, 15, 20],
  vit: [10, 5, 20, 5, 10, 1],
  lck: [5, 15, 5, 5, 5, 10],
  hit: [10, 5, 5, 7, 5, 5],
  mdef: [15, 15, 10, 20, 20, 20]
}

const statsGain = {
  str: [49, 33, 24, 25, 18, 13],
  agi: [35, 32, 25, 17, 18, 13],
  int: [14, 17, 24, 24, 29, 49],
  vit: [25, 16, 49, 22, 20, 14],
  lck: [24, 49, 30, 25, 19, 14],
  hit: [3, 2, 3, 2, 1, 1],
  mdef: [3, 2, 4, 2, 2, 2]
}

export class Hero {
  constructor (type) {
    this.type = type
    this.setStats()
  }

  setStats () {
    this.lvl = 1
    this.exp = 0

    for (let key in statsBase) {
      this[key] = statsBase[key][HERO_ID[this.type]]
    }

    this.calcStats()

    this.resi = 0
    this.weak = 0
  }

  calcStats () {
    this.att = Math.floor(this.vit / 4)
    this.def = this.lvl
    this.crt = this.lvl * 2
    this.eva = 48 + this.agi
  }

  addExp (e) {
    let lvlup = true

    this.exp += e

    while (lvlup) {
      lvlup = this.exp >= Exp[this.lvl + 1]

      if (lvlup) {
        this.lvl += 1
        this.gainStats()
        this.calcStats()
      }
    }
  }

  gainStats () {
    for (let key in statsGain) {
      this[key] += statsGain[key][HERO_ID[this.type]]
    }

    this.hp += Math.floor(this.vit / 4)
  }
}

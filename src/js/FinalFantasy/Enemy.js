import { FIRE, ICE } from './Magic.js'

export const Type = {
  Magical: 1,
  Dragon: 2,
  Undead: 4,
  Were: 16,
  Aquatic: 32,
  Mage: 64,
  Regenerative: 128
}

export const MAGICAL = 1
export const DRAGON = 2
export const GIANT = 4
export const UNDEAD = 8
export const WERE = 16
export const AQUATIC = 32
export const MAGE = 64
export const REGENERATIVE = 128

export const Enemy = (name, type, hp, atk, acc, crt, def, eva, mdef, weak, resi, gold, exp) => ({
  name, type, hp, atk, acc, crt, def, eva, mdef, weak, resi, gold, exp
})

export const enemies = [
  Enemy('IMP', GIANT, 8, 4, 2, 1, 4, 6, 16, 0, 0, 6, 6),
  Enemy('GrIMP', GIANT, 16, 8, 4, 1, 6, 9, 23, 0, 0, 18, 18),
  Enemy('WOLF', 0, 20, 8, 5, 1, 0, 36, 28, 0, 0, 6, 24),
  Enemy('GrWOLF', 0, 72, 14, 18, 1, 0, 54, 46, 0, 0, 22, 93),
  Enemy('WrWOLF', MAGICAL & WERE, 68, 14, 17, 1, 6, 42, 45, 0, 0, 67, 135),
  Enemy('FrWOLF', 0, 92, 25, 23, 1, 0, 54, 55, FIRE, ICE, 200, 402),
  Enemy('BONE', UNDEAD, 10, 10, 2, 1, 0, 12, 17, FIRE, ICE, 3, 9),
  Enemy('RBONE', UNDEAD, 144, 26, 36, 1, 12, 42, 76, FIRE, ICE, 378, 378),
  Enemy('CREEP', 0, 56, 17, 14, 1, 8, 24, 40, FIRE, 0, 15, 63),
  Enemy('CRAWL', 0, 84, 1, 21, 1, 8, 42, 51, 0, 0, 200, 186),
  Enemy('LICH', MAGICAL & UNDEAD & MAGE, 500, 50, 64, 1, 50, 48, 140, 0, ICE, 1, 2000)
]

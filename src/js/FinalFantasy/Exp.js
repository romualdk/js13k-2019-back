const ExpToNextLvl = (l, B = 39, M = 29) => B * Math.min(l, M) ** 2
const getExpTable = () => {
  let t = { 1: 0 }

  for (let i = 2; i <= 50; i++) {
    t[i] = t[i - 1] + ExpToNextLvl(i - 1)
  }

  return t
}

export const Exp = getExpTable()

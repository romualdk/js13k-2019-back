import { Canvas } from './Canvas.js'
import { i2pos, pos2i, draw } from './Tset.js'
import { Vec, add, mul } from './Vec.js'
import { relem } from './Math.js'

export const Tmap = (w, h, data = []) => ({ w, h, data })
export const tile = (tmap, tset, i) => mul(i2pos(i, tmap.w), Vec(tset.tw, tset.th))
export const fill = (tmap, t) => {
  tmap.data = new Array(tmap.w * tmap.h).fill(t)
}
export const set = (tmap, pos, t) => {
  tmap.data[pos2i(pos, tmap.w)] = t
}
export const put = (tmap, pos, tmap2) => {
  for (let i in tmap2.data) {
    if (tmap2.data[i] > 0) {
      set(tmap, add(pos, i2pos(i, tmap2.w)), tmap2.data[i])
    }
  }
}
export const fillRand = (tmap, ts) => {
  for (let i in tmap.data) {
    tmap.data[i] = relem(ts)
  }
}
export const img = (tmap, tset) => {
  const c = Canvas(tmap.w * tset.tw, tmap.h * tset.th)
  for (let i in tmap.data) {
    draw(c, tset, tile(tmap, tset, i), tmap.data[i])
  }
  return c
}

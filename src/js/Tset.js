import { Vec, mul } from './Vec.js'

export const Tset = (img, tw, th, cols) => ({ img, tw, th, cols })
export const i2pos = (i, cols) => Vec(i % cols, Math.floor(i / cols))
export const pos2i = (pos, cols) => pos.x + pos.y * cols
export const tile = (tset, i) => mul(i2pos(i - 1, tset.cols), Vec(tset.tw, tset.th))
export const draw = (c, tset, pos, i) => {
  const t = tile(tset, i)
  c.ctx.drawImage(tset.img, t.x, t.y, tset.tw, tset.th, pos.x, pos.y, tset.tw, tset.th)
}

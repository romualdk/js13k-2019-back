export const Tset = (img, tw, th, cols) => ({ img, tw, th, cols })
export const tile = (tset, i) => ({
  x: (i - 1) % tset.cols * tset.tw,
  y: Math.floor((i - 1) / tset.cols) * tset.th,
  w: tset.tw,
  h: tset.th
})

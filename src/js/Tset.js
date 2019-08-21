export const Tset = (img, tw, th, cols) => ({ img, tw, th, cols })
export const tile = (tset, i) => {
  const j = i - 1
  return {
    x: j % tset.cols * tset.tw,
    y: Math.floor(j / tset.cols) * tset.th,
    w: tset.tw,
    h: tset.th
  }
}

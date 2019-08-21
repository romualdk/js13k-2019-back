/**
 * 2D vector in less than 1 kB
 *
 * https://github.com/xem/mini2Dphysics/blob/gh-pages/index.html
 */

export const Vec = (x, y) => ({ x, y })
export const add = (a, b) => Vec(a.x + b.x, a.y + b.y)
export const sub = (a, b) => add(a, scale(b, -1))
export const mul = (a, b) => Vec(a.x * b.x, a.y * b.y)
export const div = (a, b) => Vec(a.x / b.x, a.y / b.y)
export const scale = (a, scalar) => Vec(a.x * scalar, a.y * scalar)
export const len = a => dot(a, a) ** 0.5
export const dist = (a, b) => len(sub(a, b))
export const dot = (a, b) => a.x * b.x + a.y * b.y
export const cross = (a, b) => a.x * b.y - a.y * b.x
export const norm = a => scale(a, 1 / (len(a) || 1))
export const proj = (a, b) => scale(b, dot(a, b) / dot(b, b))
export const angle = (a) => Math.atan2(a.y, a.x)
export const rot = (a, angle, g = Vec(Math.sin(angle), Math.cos(angle))) =>
  Vec(cross(a, g), dot(a, g))
export const angle2 = (a, b) => angle(sub(b, a))
export const rot2 = (a, origin, angle) =>
  add(origin, rot(sub(a, origin), angle))

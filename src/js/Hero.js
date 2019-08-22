import { Vec, add, scale } from './Vec.js'
import { draw } from './Tset.js'

export class Hero {
  constructor (state, pos, tile) {
    this.state = state
    this.pos = pos
    this.vel = Vec(0, 0)
    this.speed = 40
    this.maxDist = 12
    this.tile = tile
  }

  follow (hero) {
    this.toFollow = hero
  }

  walk () {
    this.vel.y = -this.speed
    this.toFollow = null
  }

  update (dt) {
    if (this.toFollow) {
      const dist = Math.abs(this.pos.y - this.toFollow.pos.y)
      this.vel.y = dist > this.maxDist ? -this.speed : 0
    }

    this.pos = add(this.pos, scale(this.vel, dt))
  }

  render (scr) {
    const p = Vec(Math.floor(this.pos.x), Math.floor(this.pos.y))
    draw(scr, this.state.game.tls, p, this.tile)
  }
}

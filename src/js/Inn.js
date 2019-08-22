import { Canvas } from './Canvas.js'
import { draw } from './Tset.js'
import { img } from './Tmap.js'
import { innMap } from './Maps.js'
import { Vec, add, scale } from './Vec.js'
import { Interm } from './Interm.js'
import { TXT } from './TXT.js'

export class Inn {
  constructor (Game) {
    this.game = Game

    this.map = innMap()
    this.map.img = img(this.map, this.game.tls)
    this.player = Vec(18 * 16, 20 * 16)
    this.npc1 = Vec(15 * 16, 15 * 16)
    this.npc2 = Vec(16 * 16, 17 * 16)
    this.npc3 = Vec(17 * 16, 15 * 16)

    const v = Vec(0, -16)
    const m0 = Vec(-100, -100)
    const m1 = add(this.npc1, v)
    const m2 = add(this.npc2, v)
    const m3 = add(this.npc3, v)
    const p = add(this.player, v)

    this.marks = [m0, m1, m1, m2, m2, m3, m3, m1, m1, p, p, m1, m1, m2, m2, m3, m3]

    this.cmark = 0

    this.scrA = Canvas(this.map.img.width, this.map.img.height)
    this.camA = scale(Vec(this.scrA.width, this.scrA.height), 0.5)

    this.time = 0

    // screen B
    this.inter = new Interm(this.game, TXT.inn, this.game.lang)
    this.scrB = this.inter.canvas
    this.camB = scale(Vec(this.scrB.width, this.scrB.height), 0.5)
  }

  prepare () {

  }

  update (dt) {
    this.time += dt
    this.inter.update(dt)

    this.cmark = Math.floor(this.time)
    this.cmark = this.marks[this.cmark] ? this.cmark : 0

    if (this.time >= 18) {
      this.game.changeStateForest()
    }
  }

  render () {
    // screen A
    this.scrA.ctx.drawImage(this.map.img, 0, 0)
    draw(this.scrA, this.game.tls, this.player, 97)
    draw(this.scrA, this.game.tls, this.npc1, 98)
    draw(this.scrA, this.game.tls, this.npc2, 99)
    draw(this.scrA, this.game.tls, this.npc3, 100)
    draw(this.scrA, this.game.tls, this.marks[this.cmark], 71)

    // screen B
    this.inter.render()
    this.game.render()
  }
}

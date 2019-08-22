import { Canvas } from './Canvas.js'
import { img } from './Tmap.js'
import { forestMap } from './Maps.js'
import { Vec, add, scale } from './Vec.js'
import { Interm } from './Interm.js'
import { TXT } from './TXT.js'
import { Hero } from './Hero.js'

export class Forest {
  constructor (Game) {
    this.game = Game

    this.map = forestMap()
    this.map.img = img(this.map, this.game.tls)

    this.p1 = new Hero(this, Vec(this.map.img.width / 2 - 8, this.map.img.height - 256), 97)
    this.npc1 = new Hero(this, add(this.p1.pos, Vec(0, -32)), 98)
    this.npc2 = new Hero(this, add(this.p1.pos, Vec(-24, -24)), 99)
    this.npc3 = new Hero(this, add(this.p1.pos, Vec(24, -24)), 100)

    this.p1.follow(this.npc1)
    this.p1.maxDist = 24
    this.npc2.follow(this.npc1)
    this.npc3.follow(this.npc1)
    this.npc1.walk()

    this.scrA = Canvas(this.map.img.width, this.map.img.height)
    this.camA = Vec(0, 0)

    this.time = 0

    // screen B
    this.inter = new Interm(this.game, TXT.inn, this.game.lang)
    this.scrB = this.inter.canvas
    this.camB = scale(Vec(this.scrB.width, this.scrB.height), 0.5)
  }

  prepare () {

  }

  update (dt) {
    this.npc1.update(dt)
    this.npc2.update(dt)
    this.npc3.update(dt)
    this.p1.update(dt)
    this.camA = add(this.p1.pos, Vec(8, -128))
  }

  render () {
    // screen A
    this.scrA.ctx.drawImage(this.map.img, 0, 0)
    this.p1.render(this.scrA)
    this.npc1.render(this.scrA)
    this.npc2.render(this.scrA)
    this.npc3.render(this.scrA)

    // screen B
    this.inter.render()
    this.game.render()
  }
}

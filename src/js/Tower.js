import { Interm } from './Interm.js'
import { Canvas } from './Canvas.js'
import { draw } from './Tset.js'
import { Vec, copy, dist, scale } from './Vec.js'
import { towerMap } from './Maps.js'
import { img } from './Tmap.js'
import { easeInOutQuad } from './Ease.js'

export const txt = [
  [
    ['SOUTHERN TOWER OF SPELLS', 0],
    ['is known for powerful mages', 2],
    [' ', 0],
    ['After years of education', 0],
    ['YOUNG MAGE', 2],
    [' ', 0],
    ['GOES BACK', 1],
    ['to his village']
  ]
]

export const txtPl = [
  [
    ['POLUDNIOWA WIEZA CZAROW', 0],
    ['jest znana z poteznych magow', 2],
    [' ', 0],
    ['Po latach edukacji', 0],
    ['MLODY MAG', 2],
    [' ', 0],
    ['WRACA', 2],
    ['do swojej wioski']
  ]
]

export class Tower {
  constructor (Game) {
    this.game = Game

    // screen A
    this.map = towerMap()
    this.map.img = img(this.map, this.game.tls)
    this.player = Vec(256, 1264)

    this.scrA = Canvas(this.map.img.width, this.map.img.height)

    // camera movement
    const center = this.scrA.width / 2
    const margin = 256 + 128

    this.start = Vec(center, margin)
    this.end = Vec(center, this.scrA.height - margin)
    this.camA = copy(this.start)

    this.time = 0
    this.endtime = 5
    this.distance = dist(this.start, this.end)

    // screen B
    this.inter = new Interm(this.game, txt)
    this.scrB = this.inter.canvas
    this.camB = scale(Vec(this.scrB.width, this.scrB.height), 0.5)
  }

  prepare () {

  }

  update (dt) {
    this.time += dt
    this.inter.update(dt)

    if (this.time <= this.endtime) {
      this.camA.y = this.start.y + Math.floor(easeInOutQuad(this.time / this.endtime) * this.distance)
    }

    if (this.time >= 6) {
      this.player.y += 30 * dt
    }

    if (this.time >= 10) {
      this.game.changeStateInn()
    }
  }

  render () {
    // screen A
    this.scrA.ctx.drawImage(this.map.img, 0, 0)
    draw(this.scrA, this.game.tls, this.player, 97)

    // screen B
    this.inter.render()
    this.game.render()
  }
}

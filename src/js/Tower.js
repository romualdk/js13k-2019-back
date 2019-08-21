import { Intermission } from './Intermission.js'
import { Canvas } from './Canvas.js'
import { tile } from './Tset.js'
import { Vec } from './Vec.js'
import { towerMap } from './Maps.js'
import { img } from './Tmap.js'
import { easeInOutQuad } from './Ease.js'

export const txt = [
  [
    ['SOUTHERN TOWER OF SPELLS', 0],
    ['is known for powerful mages', 6],
    [' ', 0],
    ['After years of education', 0],
    ['YOUNG MAGE', 4],
    [' ', 0],
    ['GOES BACK', 2],
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

    this.inter = new Intermission(this.game, txt)
    this.map = towerMap()
    this.map.image = img(this.map, this.game.tls)
    this.overlay = Canvas(this.map.image.width, this.map.image.height)

    this.start = Vec(16 * 16 - 8, 12 * 16)
    this.end = Vec(16 * 16 - 8, (79 - 4) * 16 - 8)

    this.time = 0
    this.endtime = 8
    this.distance = this.end.y - this.start.y

    this.pos = {}
    this.pos.x = this.start.x
    this.pos.y = this.start.y

    this.width = 33 * 16
    this.height = 33 * 16
    this.halfWidth = this.width / 2
    this.halfHeight = this.height / 2
    this.scale = 2

    this.player = {
      x: 16 * 16,
      y: 79 * 16
    }
    this.playerTile = tile(this.game.tls, 97)

    this.walks = false
  }

  prepare () {

  }

  update (dt) {
    this.time += dt
    this.inter.update(dt)

    if (this.time <= 8) {
      this.pos.y = this.start.y + Math.floor(easeInOutQuad(this.time / this.endtime) * this.distance)
    }

    if (this.time >= 14) {
      this.player.y += 20 * dt
    }

    if (this.time >= 20) {
      this.game.changeStateInn()
    }
  }

  render () {
    const s = this.game.screenA.scale

    // screen B
    this.inter.render()
    this.game.screenB.ctx.fillStyle = '#091431'
    this.game.screenB.ctx.fillRect(0, 0, this.game.screenB.width, this.game.screenB.height)

    const bsx = 0
    const bsy = 0
    const bsw = this.inter.canvas.width
    const bsh = this.inter.canvas.height
    const bdw = bsw * s
    const bdh = bsh * s
    const bdx = (this.game.screenB.width - bdw) / 2
    const bdy = (this.game.screenB.height - bdh) / 2

    this.game.screenB.ctx.drawImage(this.inter.canvas, bsx, bsy, bsw, bsh, bdx, bdy, bdw, bdh)

    // screen A

    // map
    const sx = this.pos.x - this.halfWidth
    const sy = this.pos.y - this.halfHeight
    const sw = this.width
    const sh = this.height
    const dw = sw * s
    const dh = sh * s
    const dx = (this.game.screenA.width - dw) / 2
    const dy = (this.game.screenA.height - dh) / 2

    this.game.screenA.ctx.drawImage(this.map.image, sx, sy, sw, sh, dx, dy, dw, dh)

    this.overlay.ctx.clearRect(0, 0, this.map.image.width, this.map.image.height)
    this.overlay.ctx.drawImage(this.game.tls.img,
      this.playerTile.x, this.playerTile.y, this.game.tls.tw, this.game.tls.th,
      Math.floor(this.player.x), Math.floor(this.player.y), this.game.tls.tw, this.game.tls.th)

    this.game.screenA.ctx.drawImage(this.overlay, sx, sy, sw, sh, dx, dy, dw, dh)

    this.game.render()
  }
}

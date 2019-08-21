import { tile } from './Tset.js'
import { Map } from './Map.js'
import { Intermission } from './Intermission.js'
import { tiles } from './objects.js'
import { getCanvas } from './canvas.js'

const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

const txt = [
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

const txt_pl = [
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

    this.map = new Map(this.game.tls)
    this.map.tower()

    this.overlay = getCanvas(this.map.image.width, this.map.image.height)
    // this.map.drawSprites()

    this.start = {
      x: this.map.sprites[0].x * 16 - 8,
      y: 12 * 16
    }

    this.end = {
      x: this.map.sprites[0].x * 16 - 8,
      y: (this.map.sprites[0].y - 4) * 16 - 8
    }

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
      x: this.map.sprites[0].x * 16,
      y: this.map.sprites[0].y * 16
    }
    this.playerTile = tile(this.game.tls, tiles.player)

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
      this.playerTile.x, this.playerTile.y, this.playerTile.w, this.playerTile.h,
      Math.floor(this.player.x), Math.floor(this.player.y), this.playerTile.w, this.playerTile.h)

    this.game.screenA.ctx.drawImage(this.overlay, sx, sy, sw, sh, dx, dy, dw, dh)

    this.game.render()
  }
}

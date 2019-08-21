import { img } from './Tmap.js'
import { innMap } from './Maps.js'

export class Inn {
  constructor (Game) {
    this.game = Game

    this.map = innMap()
    this.map.image = img(this.map, this.game.tls)

    this.pos = { x: 16 * 16, y: 17 * 16 }

    this.width = 33 * 16
    this.height = 33 * 16
    this.halfWidth = this.width / 2
    this.halfHeight = this.height / 2
  }

  prepare () {

  }

  update (dt) {

  }

  render () {
    const s = this.game.screenA.scale

    // screen B
    this.game.screenB.ctx.fillStyle = '#091431'
    this.game.screenB.ctx.fillRect(0, 0, this.game.screenB.width, this.game.screenB.height)

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

    this.game.render()
  }
}

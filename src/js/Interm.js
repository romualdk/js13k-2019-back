import { Canvas } from './Canvas.js'

const cols = 36
const rows = 12

const defLang = 'en'

export class Interm {
  constructor (Game, txt, lang) {
    this.game = Game

    const clang = txt[lang] ? lang : defLang

    this.txt = txt[clang]
    this.ctxt = []

    this.fnt = this.game.fnt
    this.canvas = Canvas(cols * this.fnt.size, rows * this.fnt.size * 2)
    this.time = 0
    this.line = 0
    this.linewait = 1
    this.screen = 0
  }

  update (dt) {
    this.time += dt

    if (!this.txt[this.screen]) {
      return
    }

    if (
      this.line >= this.txt[this.screen].length &
      this.time >= this.linewait
    ) {
      this.screen += 1
      this.line = 0
      this.linewait = 0
      this.ctxt = []
      this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    if (this.time >= this.linewait & this.screen < this.txt.length) {
      if (this.txt[this.screen][this.line][0]) {
        this.ctxt.push(this.txt[this.screen][this.line][0])
      }

      this.time = 0
      this.linewait = this.txt[this.screen][this.line][1]
      this.line += 1
    }
  }

  render () {
    for (let i in this.ctxt) {
      const s = Math.floor((cols - this.ctxt[i].length) / 2) * this.fnt.size
      this.fnt.text(this.canvas.ctx, s, i * this.fnt.size * 2, this.ctxt[i])
    }
  }
}

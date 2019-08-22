/* global Image */
import { Canvas } from './js/Canvas.js'
import { Tset } from './js/Tset.js'
import { SEG } from './js/Maps.js'
import { Loop } from './js/Loop.js'
import { Tower } from './js/Tower.js'
import { Inn } from './js/Inn.js'
import { Font } from './js/Font.js'
import { Vec, sub, scale } from './js/Vec.js';

let loaded = 0

function load () {
  loaded += 1
  if (loaded >= 2) {
    init()
  }
}

const G = {}

G.imgFont = new Image()
G.fnt = new Font(G.imgFont, 8, 16, 48)
G.imgFont.onload = load
G.imgFont.src = './img/font.png'

G.img = new Image()
G.tls = Tset(G.img, 16, 16, 8)
G.img.onload = load
G.img.src = './img/tileset.png'

const CAMERA_WIDTH = SEG * G.tls.tw
const CAMERA_HEIGHT = SEG * G.tls.th

function screenHalfs (width, height) {
  const portrait = width <= height

  const partWidth = portrait ? width : Math.floor(width / 2)
  const partHeight = portrait ? Math.floor(height / 2) : height

  return {
    A: {
      x: 0,
      y: 0,
      width: partWidth,
      height: partHeight
    },
    B: {
      x: portrait ? 0 : width - partWidth,
      y: portrait ? height - partHeight : 0,
      width: partWidth,
      height: partHeight
    }
  }
}

function getScale (screen, camera) {
  const scaleX = Math.ceil(screen.width / camera.width)
  const scaleY = Math.ceil(screen.height / camera.height)
  return Math.min(scaleX, scaleY)
}

function onResize () {
  G.screen = Canvas(window.innerWidth, window.innerHeight, 'screen')
  G.halfs = screenHalfs(G.screen.width, G.screen.height)
  G.screenA = Canvas(G.halfs.A.width, G.halfs.A.height)
  G.screenB = Canvas(G.halfs.B.width, G.halfs.B.height)

  G.screenA.scale = getScale(G.halfs.A, { width: CAMERA_WIDTH, height: CAMERA_HEIGHT })
  G.screenB.scale = getScale(G.halfs.B, { width: CAMERA_WIDTH, height: CAMERA_HEIGHT })

  G.screenA.ctx.fillStyle = '#472d3c'
  G.screenA.ctx.fillRect(0, 0, G.halfs.A.width, G.halfs.A.height)

  G.screenB.ctx.fillStyle = '#472d3c'
  G.screenB.ctx.fillRect(0, 0, G.halfs.B.width, G.halfs.B.height)

  const v = Vec(G.screenA.width, G.screenA.height)
  const s = G.screenA.scale

  G.camA = {
    sd: scale(v, 1), // source dimensions
    dd: scale(v, s), // destination dimensions
    sp: scale(v, -0.5), // source positon
    dp: scale(sub(v, scale(v, s)), 0.5) // destination position
  }
}

window.addEventListener('resize', onResize, false)
onResize()

G.render = function () {
  G.screenA.ctx.fillRect(0, 0, G.halfs.A.width, G.halfs.A.height)

  if (this.state.camA && this.state.scrA) {
    const c = this.state.camA
    const a = this.camA

    this.screenA.ctx.drawImage(this.state.scrA,
      a.sp.x + c.x, a.sp.y + c.y, a.sd.x, a.sd.y,
      a.dp.x, a.dp.y, a.dd.x, a.dd.y)
  }

  this.screen.ctx.drawImage(this.screenA, this.halfs.A.x, this.halfs.A.y)
  this.screen.ctx.drawImage(this.screenB, this.halfs.B.x, this.halfs.B.y)
}

G.changeStateInn = function () {
  this.state = new Inn(this)
  this.loop.setState(this.state)
}

function init () {
  G.state = new Tower(G)
  G.loop = new Loop(G.state)
  G.loop.start()
}

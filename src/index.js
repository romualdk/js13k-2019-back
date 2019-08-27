/* global Image */
import { Canvas } from './js/Canvas.js'
import { Tset } from './js/Tset.js'
import { SEG } from './js/Maps.js'
import { Loop } from './js/Loop.js'
import { Tower } from './js/Tower.js'
import { Forest } from './js/Forest.js'
import { Inn } from './js/Inn.js'
import { Font } from './js/Font.js'
import { Vec, sub, scale, rot } from './js/Vec.js';

/*
import { FI, Hero } from './js/FinalFantasy/Hero.js'
import { spells, magDmg, magHeal } from './js/FinalFantasy/Magic.js'
import { physDmg } from './js/FinalFantasy/PhysAttack.js'
import { enemies } from './js/FinalFantasy/Enemy.js'
*/

// -----
let loaded = 0

function load () {
  loaded += 1
  if (loaded >= 2) {
    init()
  }
}

const G = {}

const language = () => (window.navigator.userLanguage || window.navigator.language).substring(0, 2)
G.lang = language()

G.imgFont = new Image()
G.fnt = new Font(G.imgFont, 8, 16, 48)
G.imgFont.onload = load
G.imgFont.src = './img/font.png'

G.img = new Image()
G.tls = Tset(G.img, 16, 16, 8)
G.img.onload = load
G.img.src = './img/tileset.png'

const CAM_W = SEG * G.tls.tw
const CAM_H = SEG * G.tls.th

function screenHalfs (w, h) {
  const p = w <= h // portrait

  const pW = p ? w : Math.floor(w / 2)
  const pH = p ? Math.floor(h / 2) : h

  return {
    A: {
      x: 0,
      y: 0,
      width: pW,
      height: pH
    },
    B: {
      x: p ? 0 : w - pW,
      y: p ? h - pH : 0,
      width: pW,
      height: pH
    }
  }
}

function getScale (scr, cam) {
  const x = Math.ceil(scr.width / cam.width)
  const y = Math.ceil(scr.height / cam.height)
  return Math.min(x, y)
}

function onResize () {
  G.scr = Canvas(window.innerWidth, window.innerHeight, 'screen')
  G.halfs = screenHalfs(G.scr.width, G.scr.height)
  G.scrA = Canvas(G.halfs.A.width, G.halfs.A.height)
  G.scrB = Canvas(G.halfs.B.width, G.halfs.B.height)

  G.s = getScale(G.halfs.A, { width: CAM_W, height: CAM_H })

  G.scr.ctx.fillStyle = '#091431'
  G.scrA.ctx.fillStyle = '#472d3c'
  G.scrB.ctx.fillStyle = '#091431'

  const v = Vec(G.scrA.width, G.scrA.height)

  G.cam = {
    sd: scale(v, 1), // source dimensions
    dd: scale(v, G.s), // destination dimensions
    sp: scale(v, -0.5), // source positon (scaled)
    dp: scale(sub(v, scale(v, G.s)), 0.5) // destination position (scaled)
  }
}

window.addEventListener('resize', onResize, false)
onResize()

G.render = function () {
  clear(this.scr)
  clear(this.scrA)
  clear(this.scrB)

  camDraw(this.scrA.ctx, this.state.scrA, this.cam, this.state.camA)
  camDraw(this.scrB.ctx, this.state.scrB, this.cam, this.state.camB)

  this.scr.ctx.drawImage(this.scrA, this.halfs.A.x, this.halfs.A.y)
  this.scr.ctx.drawImage(this.scrB, this.halfs.B.x, this.halfs.B.y)
}

const clear = (scr) => {
  scr.ctx.fillRect(0, 0, scr.width, scr.height)
}

const camDraw = (ctx, img, c1, c2) => {
  ctx.drawImage(img, c1.sp.x + c2.x, c1.sp.y + c2.y, c1.sd.x, c1.sd.y,
    c1.dp.x, c1.dp.y, c1.dd.x, c1.dd.y)
}

G.changeStateInn = function () {
  this.state = new Inn(this)
  this.loop.setState(this.state)
}

G.changeStateForest = function () {
  this.state = new Forest(this)
  this.loop.setState(this.state)
}

function init () {
  G.state = new Forest(G)
  G.loop = new Loop(G.state)
  G.loop.start()
}

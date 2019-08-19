/* global Image */
import { getCanvas } from './js/canvas.js'
import { Tileset } from './js/Tileset.js'
import { Loop } from './js/Loop.js'
import { Tower } from './js/Tower.js'
import { Inn } from './js/Inn.js'
import { Font } from './js/Font.js';

let loaded = 0

function load () {
  loaded += 1
  if (loaded >= 2) {
    init()
  }
}

const Game = {}

Game.imgFont = new Image()
Game.fnt = new Font(Game.imgFont, 8, 16, 48)
Game.imgFont.onload = load
Game.imgFont.src = './img/font.png'

Game.img = new Image()
Game.tls = new Tileset(Game.img, 16, 16, 8)
Game.img.onload = load
Game.img.src = './img/tileset.png'

const CAMERA_WIDTH = 33 * 16
const CAMERA_HEIGHT = 33 * 16

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
  Game.screen = getCanvas(window.innerWidth, window.innerHeight, 'screen')
  Game.halfs = screenHalfs(Game.screen.width, Game.screen.height)
  Game.screenA = getCanvas(Game.halfs.A.width, Game.halfs.A.height)
  Game.screenB = getCanvas(Game.halfs.B.width, Game.halfs.B.height)

  Game.screenA.scale = getScale(Game.halfs.A, { width: CAMERA_WIDTH, height: CAMERA_HEIGHT })
  Game.screenB.scale = getScale(Game.halfs.B, { width: CAMERA_WIDTH, height: CAMERA_HEIGHT })

  Game.screenA.ctx.fillStyle = 'red'
  Game.screenA.ctx.fillRect(0, 0, Game.halfs.A.width, Game.halfs.A.height)

  Game.screenB.ctx.fillStyle = 'blue'
  Game.screenB.ctx.fillRect(0, 0, Game.halfs.B.width, Game.halfs.B.height)
}

window.addEventListener('resize', onResize, false)
onResize()

Game.render = function () {
  this.screen.ctx.drawImage(this.screenA, this.halfs.A.x, this.halfs.A.y)
  this.screen.ctx.drawImage(this.screenB, this.halfs.B.x, this.halfs.B.y)
}

Game.changeStateInn = function () {
  this.state = new Inn(this)
  this.loop.setState(this.state)
}

function init () {
  // Game.state = new Tower(Game)
  Game.state = new Tower(Game)
  Game.loop = new Loop(Game.state)
  Game.loop.start()
}

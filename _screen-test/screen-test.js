/* global Image */

const resolutions = [
  ['mobile', 360, 640, 28.41],
  ['mobile', 375, 667, 8.04],
  ['mobile', 360, 720, 5.35],
  ['mobile', 414, 736, 4.04],
  ['mobile', 412, 846, 3.82],
  ['mobile', 360, 760, 3.79],
  ['tablet', 768, 1024, 58.33],
  ['tablet', 1280, 800, 4.96],
  ['tablet', 1024, 1366, 4.14],
  ['tablet', 834, 1112, 3.85],
  ['tablet', 800, 1280, 3.25],
  ['tablet', 601, 962, 3.21],
  ['desktop', 1366, 768, 23.19],
  ['desktop', 1920, 1080, 19.76],
  ['desktop', 1440, 900, 6.33],
  ['desktop', 1536, 864, 5.9],
  ['desktop', 1600, 900, 4.87],
  ['desktop', 1024, 768, 3.62]
]

const colorA = '#472d3c'
const colorB = '#091431'

const tileSize = 16
const tilesX = 21 + 3 + 3
const tilesY = 19 + 4 + 4

const screenWidth = tilesX * tileSize
const screenHeight = tilesY * tileSize

const mockup = new Image()
mockup.src = 'mockup-castle.png'

const ui = new Image()
ui.onload = init

mockup.onload = function () {
  ui.src = 'mockup-ui.png'
}

document.body.appendChild(mockup)
document.body.appendChild(ui)

const screenA = document.createElement('canvas')
const ctxA = screenA.getContext('2d')
screenA.width = screenWidth
screenA.height = screenHeight
// document.body.appendChild(screenA)

const screenB = document.createElement('canvas')
const ctxB = screenB.getContext('2d')
screenB.width = screenWidth
screenB.height = screenHeight
// document.body.appendChild(screenB)

clear(screenA, ctxA, colorA)
clear(screenB, ctxB, colorB)

function clear (canvas, context, color) {
  context.fillStyle = color
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function clearRect (context, rect, color) {
  context.fillStyle = color
  context.fillRect(rect.x, rect.y, rect.width, rect.height)
}

function fitHalf (rect, screen, realScreenCtx, color) {
  const scaleX = Math.ceil(rect.width / screen.width)
  const scaleY = Math.ceil(rect.height / screen.height)
  const scale = Math.min(scaleX, scaleY)

  const tmp = document.createElement('canvas')
  const tmpCtx = tmp.getContext('2d')
  tmp.width = screen.width * scale
  tmp.height = screen.height * scale

  clear(tmp, tmpCtx, color)

  tmpCtx.drawImage(screen, 0, 0, screen.width, screen.height, 0, 0, tmp.width, tmp.height)

  const x = Math.floor((tmp.width - rect.width) / 2)
  const y = Math.floor((tmp.height - rect.height) / 2)
  realScreenCtx.drawImage(tmp, x, y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height)
}

function setup (width, height) {
  const scr = document.createElement('canvas')
  const ctx = scr.getContext('2d')
  scr.width = width
  scr.height = height
  document.body.appendChild(scr)

  const portrait = width <= height

  const partWidth = portrait ? width : Math.floor(width / 2)
  const partHeight = portrait ? Math.floor(height / 2) : height

  const halfA = {
    x: 0,
    y: 0,
    width: partWidth,
    height: partHeight
  }

  const halfB = {
    x: portrait ? 0 : width - partWidth,
    y: portrait ? height - partHeight : 0,
    width: partWidth,
    height: partHeight
  }

  clearRect(ctx, halfA, colorA)
  clearRect(ctx, halfB, colorB)

  fitHalf(halfA, screenA, ctx, colorA)
  fitHalf(halfB, screenB, ctx, colorB)
}

function init () {
  ctxA.drawImage(mockup, 0, 0)
  ctxB.drawImage(ui, 0, 0)

  for (let i = 0; i < resolutions.length; i++) {
    let width = resolutions[i][1]
    let height = resolutions[i][2]
    setup(width, height)
    setup(height, width)
  }
}

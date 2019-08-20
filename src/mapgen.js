/* global Image */

import { Tileset } from './js/Tileset.js'
import { Map } from './js/Map.js'

const img = new Image()
img.onload = init
img.src = './img/tileset.png'

const tls = new Tileset(img, 16, 16, 8)

function init () {
  const m1 = new Map(tls)
  m1.tower()
  m1.drawSprites()
  document.body.appendChild(m1.image)

  const m2 = new Map(tls)
  m2.inn()
  m2.drawSprites()
  document.body.appendChild(m2.image)

  const m3 = new Map(tls)
  m3.forest()
  m3.drawSprites()
  document.body.appendChild(m3.image)

  const m4 = new Map(tls)
  m4.castleroom()
  m4.drawSprites()
  document.body.appendChild(m4.image)
}

/* global Image */

import { Tset } from './js/Tset.js'
import { Tmap, fill, fillRand, set, put, img } from './js/Tmap.js'
import { Vec } from './js/Vec.js'
import { relem } from './js/Math.js'
import { OBJ, structs } from './js/OBJ.js'

const tls = new Image()
tls.onload = init
tls.src = './img/tileset.png'

const tset = Tset(tls, 16, 16, 8)

const SEG = 33

// forest
const F = [1, 1, 1, 2, 7, 7]

// road
const R = 50 // road
const R1 = new Array(10).fill(1).concat(2)
const R2 = new Array(4).fill(1).concat(new Array(4).fill(2))
const RX = new Array(2).fill(R1).concat(new Array(2).fill(R2)).concat([F, F, F])

const fillForest = (tmap) => {
  fillRand(tmap, F)
}

const fillRoad = (tmap, start = 0) => {
  const center = Math.floor(tmap.w / 2)

  for (let y = start; y < tmap.h; y++) {
    set(tmap, Vec(center, y), R)

    for (let x = 0; x < RX.length; x++) {
      set(tmap, Vec(center - x - 1, y), relem(RX[x]))
      set(tmap, Vec(center + x + 1, y), relem(RX[x]))
    }
  }
}

function tower () {
  const map = Tmap(SEG, SEG * 3)
  fill(map, 1)
  fillForest(map)
  fillRoad(map, 70)

  const o = [
    [12, 65, OBJ.tower],
    [24, 63, OBJ.graves],
    [24, 80, OBJ.house],
    [9, 82, relem(structs)],
    [7, 84, relem(structs)],
    [10, 83, relem(structs)],
    [21, 86, relem(structs)]
  ]

  for (let i in o) {
    put(map, Vec(o[i][0], o[i][1]), o[i][2])
  }

  // this.putSprite(16, 79, 'player')

  return map
}

function inn () {
  const map = Tmap(SEG, SEG)
  fill(map, 1)
  put(map, Vec(8, 8), OBJ.inn)
  /*
  this.putSprite(18, 20, 'player')
  this.putSprite(15, 15, 'barbarian')
  this.putSprite(17, 15, 'rogue')
  this.putSprite(16, 17, 'assassin')
   */

  return map
}

function forest () {
  const map = Tmap(SEG, SEG * 7)
  fill(map, 1)
  fillForest(map)
  fillRoad(map, 33)

  const o = [
    [12, 24, OBJ.castle],
    [21, 67, OBJ.graves],
    [20, 35, OBJ.house],
    [9, 36, OBJ.fort],
    [8, 41, relem(structs)],
    [9, 43, relem(structs)],
    [27, 38, relem(structs)],
    [25, 41, relem(structs)]
  ]

  for (let i in o) {
    put(map, Vec(o[i][0], o[i][1]), o[i][2])
  }
  /**
   * this.putSprite(15, 28, 'bat')
    this.putSprite(17, 29, 'bat')
    this.putSprite(16, 36, 'ogre')
    this.putSprite(15, 37, 'orc')
    this.putSprite(17, 37, 'orc')
    this.putSprite(17, 36, 'snake')
    this.putSprite(14, 35, 'snake')

    this.putSprite(16, 211, 'player')
    this.putSprite(15, 210, 'barbarian')
    this.putSprite(16, 210, 'rogue')
    this.putSprite(17, 210, 'assassin')
   */

  return map
}

function castleroom () {
  const map = Tmap(SEG, SEG)
  fill(map, 1)
  put(map, Vec(8, 9), OBJ.castleroom)
  /**
   * this.setSize()
    this.fill()
    this.putObject(8, 9, 'castleroom')
    this.fillObjects()
    this.putSprite(16, 21, 'player')
    this.putSprite(15, 20, 'barbarian')
    this.putSprite(16, 20, 'rogue')
    this.putSprite(17, 20, 'assassin')
    this.putSprite(16, 12, 'boss')
    this.putSprite(14, 16, 'crab')
    this.putSprite(16, 15, 'fly')
    this.putSprite(18, 16, 'scarab')
    this.draw()
   */

  return map
}

function init () {
  const map = castleroom()

  const m1 = img(map, tset)
  document.body.appendChild(m1)
}

/* global Image */

import { getCanvas } from './js/canvas.js'
import { tiles, objects } from './js/objects.js'
import { Tileset } from './js/tileset.js'

const img = new Image()
img.onload = init
img.src = './img/tileset.png'
document.body.appendChild(img)

const map = {
  width: 33,
  height: 16 * 33,
  data: [],
  objects: []
}

map.tileset = new Tileset(img, 16, 16, 8)

function randTile (tiles) {
  return tiles[Math.floor(Math.random() * tiles.length)]
}

function fill (map, tile) {
  for (let x = 0; x < map.width; x++) {
    map.data[x] = []

    for (let y = 0; y < map.height; y++) {
      map.data[x][y] = tile
    }
  }
}

function fillForest (map, tiles) {
  const fr = new Array(3).fill(tiles.ground[0]).concat(tiles.ground[1], tiles.tree, tiles.tree)

  for (let x = 0; x < map.width; x++) {
    map.data[x] = []

    for (let y = 0; y < map.height; y++) {
      map.data[x][y] = randTile(fr)
    }
  }
}

function fillRoad (map, tiles, start = 0) {
  const g1 = tiles.ground[0]
  const g2 = tiles.ground[1]

  const near = new Array(10).fill(g1).concat(g2)
  const far = new Array(4).fill(g1).concat(new Array(4).fill(g2))
  const tr = [g1, g1, g1, g2, g2].concat(tiles.tree)

  const nearfar = new Array(2).fill(near).concat(new Array(2).fill(far)).concat([tr, tr, tr])

  const center = Math.floor(map.width / 2)

  for (let y = start; y < map.height; y++) {
    map.data[center][y] = tiles.road

    for (let x = 0; x < nearfar.length; x++) {
      map.data[center - x - 1][y] = randTile(nearfar[x])
      map.data[center + x + 1][y] = randTile(nearfar[x])
    }
  }
}

function draw (map) {
  map.screen = getCanvas(map.width * map.tileset.tilewidth, map.height * map.tileset.tileheight, 'screen')

  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      const t = map.tileset.getTile(map.data[x][y])
      map.screen.ctx.drawImage(map.tileset.image, t.x, t.y, t.width, t.height, x * t.width, y * t.height, t.width, t.height)
    }
  }
}

function fillObjects (map, objects) {
  for (let i in map.objects) {
    let ox = map.objects[i].x
    let oy = map.objects[i].y
    let type = map.objects[i].type
    let obj = objects[type]

    for (let x = 0; x < obj.width; x++) {
      for (let y = 0; y < obj.height; y++) {
        let t = obj.data[x + (y * obj.width)]
        if (t > 0) {
          map.data[x + ox][y + oy] = t
        }
      }
    }
  }
}

function putObject (map, x, y, type) {
  map.objects.push({
    x: x,
    y: y,
    type: type
  })
}

function putStruct (map, x, y) {
  const i = 1 + Math.floor(Math.random() * 6)

  console.log(i)

  map.objects.push({
    x: x,
    y: y,
    type: 'struct' + i
  })
}

const segmentSize = 33

function forest (map, numSegments) {
  map.width = segmentSize
  map.height = segmentSize * numSegments
  fillForest(map, tiles)
  fillRoad(map, tiles, 33)
  putObject(map, 12, 24, 'castle')
  putObject(map, 21, 67, 'graves')
  putObject(map, 20, 35, 'house')
  putObject(map, 9, 36, 'fort')
  putStruct(map, 8, 41)
  putStruct(map, 9, 43)
  putStruct(map, 27, 38)
  putStruct(map, 25, 41)
  fillObjects(map, objects)
  draw(map)
}

function castleroom (map) {
  map.width = segmentSize
  map.height = segmentSize
  fill(map, tiles.ground[0])
  putObject(map, 8, 9, 'castleroom')
  fillObjects(map, objects)
  draw(map)
}

function inn (map) {
  map.width = segmentSize
  map.height = segmentSize
  fill(map, tiles.ground[0])
  putObject(map, 8, 8, 'inn')
  fillObjects(map, objects)
  draw(map)
}

function tower (map) {
  map.width = segmentSize
  map.height = segmentSize * 3
  fillForest(map, tiles)
  fillRoad(map, tiles, 70)
  putObject(map, 12, 65, 'tower')
  putObject(map, 24, 63, 'graves')
  putObject(map, 24, 80, 'house')
  putStruct(map, 9, 82)
  putStruct(map, 7, 84)
  putStruct(map, 10, 83)
  putStruct(map, 21, 86)
  fillObjects(map, objects)
  draw(map)
}

function init () {
  ///forest(map, 7)
  //inn(map)
  //tower(map)
  castleroom(map)
}

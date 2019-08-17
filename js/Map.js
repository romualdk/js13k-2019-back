import { getCanvas } from './canvas.js'
import { tiles, objects } from './objects.js'

const segmentSize = 33

export class Map {
  constructor (tileset) {
    this.image = null
    this.width = 0
    this.height = 0
    this.tileset = tileset
    this.data = []
    this.objects = []
  }

  tower () {
    this.setSize(3)
    this.fillForest()
    this.fillRoad(70)
    this.putObject(12, 65, 'tower')
    this.putObject(24, 63, 'graves')
    this.putObject(24, 80, 'house')
    this.putStruct(9, 82)
    this.putStruct(7, 84)
    this.putStruct(10, 83)
    this.putStruct(21, 86)
    this.fillObjects()
    this.draw()
  }

  inn () {
    this.setSize()
    this.fill()
    this.putObject(8, 8, 'inn')
    this.fillObjects()
    this.draw()
  }

  forest () {
    this.setSize(7)
    this.fillForest()
    this.fillRoad(33)
    this.putObject(12, 24, 'castle')
    this.putObject(21, 67, 'graves')
    this.putObject(20, 35, 'house')
    this.putObject(9, 36, 'fort')
    this.putStruct(8, 41)
    this.putStruct(9, 43)
    this.putStruct(27, 38)
    this.putStruct(25, 41)
    this.fillObjects()
    this.draw()
  }

  castleroom () {
    this.setSize()
    this.fill()
    this.putObject(8, 9, 'castleroom')
    this.fillObjects()
    this.draw()
  }

  setSize (segments = 1) {
    this.width = segmentSize
    this.height = segmentSize * segments
  }

  fill (tile = 1) {
    for (let x = 0; x < this.width; x++) {
      this.data[x] = []

      for (let y = 0; y < this.height; y++) {
        this.data[x][y] = tile
      }
    }
  }

  fillForest () {
    const fr = new Array(3).fill(tiles.ground[0]).concat(tiles.ground[1], tiles.tree, tiles.tree)

    for (let x = 0; x < this.width; x++) {
      this.data[x] = []

      for (let y = 0; y < this.height; y++) {
        this.data[x][y] = randElement(fr)
      }
    }
  }

  fillRoad (start = 0) {
    const g1 = tiles.ground[0]
    const g2 = tiles.ground[1]

    const near = new Array(10).fill(g1).concat(g2)
    const far = new Array(4).fill(g1).concat(new Array(4).fill(g2))
    const tr = [g1, g1, g1, g2, g2].concat(tiles.tree)

    const nearfar = new Array(2).fill(near).concat(new Array(2).fill(far)).concat([tr, tr, tr])

    const center = Math.floor(this.width / 2)

    for (let y = start; y < this.height; y++) {
      this.data[center][y] = tiles.road

      for (let x = 0; x < nearfar.length; x++) {
        this.data[center - x - 1][y] = randElement(nearfar[x])
        this.data[center + x + 1][y] = randElement(nearfar[x])
      }
    }
  }

  fillObjects () {
    for (let i in this.objects) {
      let ox = this.objects[i].x
      let oy = this.objects[i].y
      let type = this.objects[i].type
      let obj = objects[type]

      for (let x = 0; x < obj.width; x++) {
        for (let y = 0; y < obj.height; y++) {
          let t = obj.data[x + (y * obj.width)]
          if (t > 0) {
            this.data[x + ox][y + oy] = t
          }
        }
      }
    }
  }

  putObject (x, y, type) {
    this.objects.push({ x, y, type })
  }

  putStruct (x, y) {
    this.putObject(x, y, 'struct' + (1 + Math.floor(Math.random() * 6)))
  }

  draw () {
    const w = this.width
    const h = this.height
    const tls = this.tileset

    this.image = getCanvas(w * tls.tilewidth, h * tls.tileheight)

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const t = tls.getTile(this.data[x][y])
        this.image.ctx.drawImage(tls.image, t.x, t.y, t.width, t.height, x * t.width, y * t.height, t.width, t.height)
      }
    }
  }
}

function randElement (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
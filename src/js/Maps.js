import { Vec } from './Vec.js'
import { relem } from './Math.js'
import { Tmap, fill, fillRand, set, put } from './Tmap.js'
import { OBJ, structs } from './OBJ.js'

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

export const towerMap = () => {
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

  return map
}

export const innMap = () => {
  const map = Tmap(SEG, SEG)
  fill(map, 1)
  put(map, Vec(8, 8), OBJ.inn)

  return map
}

export const forestMap = () => {
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

  return map
}

export const castleroomMap = () => {
  const map = Tmap(SEG, SEG)
  fill(map, 1)
  put(map, Vec(8, 9), OBJ.castleroom)

  return map
}

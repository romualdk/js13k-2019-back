import { Tmap } from './Tmap.js'

export const OBJ = {
  tower: Tmap(9, 15, [
    0, 9, 13, 13, 13, 13, 13, 9, 0,
    0, 17, 11, 35, 35, 35, 11, 17, 0,
    0, 17, 1, 25, 28, 27, 1, 17, 0,
    0, 17, 1, 33, 33, 33, 1, 17, 0,
    0, 17, 1, 25, 28, 27, 1, 17, 0,
    0, 17, 1, 33, 33, 33, 1, 17, 0,
    0, 10, 13, 13, 13, 13, 13, 10, 0,
    0, 17, 11, 17, 20, 17, 11, 17, 0,
    51, 42, 17, 49, 20, 49, 17, 42, 52,
    53, 26, 20, 57, 17, 57, 17, 26, 53,
    53, 26, 17, 20, 17, 20, 21, 26, 53,
    53, 26, 20, 17, 49, 20, 20, 26, 53,
    53, 43, 20, 17, 57, 20, 17, 43, 53,
    53, 26, 20, 20, 57, 17, 20, 41, 53,
    59, 61, 61, 61, 45, 61, 61, 61, 60
  ]),
  inn: Tmap(17, 17, [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 1, 1, 1, 2, 1, 1, 17, 19, 17, 17, 17, 19, 17, 1, 1, 1,
    1, 1, 1, 1, 1, 7, 1, 17, 1, 46, 47, 48, 1, 17, 2, 1, 1,
    1, 1, 1, 7, 1, 1, 1, 17, 1, 1, 1, 1, 101, 17, 1, 1, 1,
    1, 2, 1, 1, 1, 17, 17, 17, 17, 17, 17, 17, 29, 17, 1, 1, 1,
    17, 17, 17, 17, 17, 17, 1, 38, 1, 56, 1, 1, 58, 17, 1, 7, 1,
    19, 1, 1, 30, 39, 17, 1, 1, 1, 1, 1, 102, 1, 17, 7, 1, 7,
    17, 32, 1, 1, 58, 29, 1, 31, 31, 31, 1, 1, 1, 17, 2, 1, 1,
    17, 1, 1, 37, 1, 17, 1, 14, 15, 16, 1, 1, 1, 17, 19, 17, 1,
    17, 17, 17, 17, 17, 17, 1, 31, 31, 31, 1, 1, 31, 22, 31, 17, 1,
    19, 1, 1, 30, 39, 17, 1, 1, 1, 1, 1, 1, 31, 23, 31, 17, 1,
    17, 32, 1, 1, 58, 29, 1, 1, 1, 1, 1, 1, 31, 24, 31, 17, 1,
    17, 1, 1, 37, 1, 17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 2,
    17, 17, 17, 17, 17, 17, 36, 1, 1, 1, 58, 1, 1, 1, 36, 17, 1,
    1, 2, 1, 1, 1, 17, 17, 17, 19, 17, 29, 17, 19, 17, 17, 17, 1,
    7, 1, 2, 1, 1, 1, 2, 1, 1, 1, 50, 40, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 50, 1, 1, 1, 2, 1, 1
  ]),
  graves: Tmap(5, 5, [
    66, 1, 68, 1, 65,
    3, 3, 3, 3, 3,
    65, 1, 3, 1, 66,
    1, 1, 3, 69, 1,
    67, 1, 3, 1, 67
  ]),
  fort: Tmap(4, 3, [
    0, 13, 0, 0,
    13, 18, 17, 0,
    17, 17, 17, 44
  ]),
  house: Tmap(5, 3, [
    0, 34, 34, 34, 0,
    34, 21, 17, 21, 34,
    17, 21, 29, 21, 17
  ]),
  castle: Tmap(9, 10, [
    51, 61, 61, 61, 61, 61, 61, 61, 52,
    53, 9, 13, 13, 13, 13, 13, 9, 53,
    53, 17, 11, 35, 35, 35, 11, 17, 53,
    53, 17, 1, 17, 29, 17, 1, 17, 53,
    53, 17, 1, 1, 50, 1, 1, 17, 53,
    53, 17, 1, 58, 50, 1, 1, 17, 53,
    53, 17, 1, 1, 50, 58, 1, 17, 53,
    53, 10, 13, 13, 13, 13, 13, 10, 53,
    53, 17, 11, 17, 49, 17, 11, 17, 53,
    59, 61, 61, 61, 45, 61, 61, 61, 60
  ]),
  castleroom: Tmap(17, 15, [
    17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
    17, 26, 43, 26, 26, 63, 26, 26, 42, 26, 26, 64, 26, 26, 43, 26, 17,
    17, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 17,
    17, 26, 1, 37, 4, 4, 62, 4, 4, 4, 62, 4, 4, 37, 1, 26, 17,
    17, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1, 26, 17,
    17, 26, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 26, 17,
    17, 26, 1, 37, 4, 4, 4, 4, 4, 4, 4, 4, 4, 37, 1, 26, 17,
    17, 26, 55, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 26, 17,
    17, 17, 17, 13, 17, 13, 17, 13, 13, 13, 17, 13, 17, 13, 17, 17, 17,
    17, 17, 17, 17, 17, 17, 17, 17, 29, 17, 17, 17, 17, 17, 17, 17, 17
  ]),
  struct1: Tmap(2, 1, [17, 44]),
  struct2: Tmap(2, 1, [17, 55]),
  struct3: Tmap(2, 1, [12, 17]),
  struct4: Tmap(1, 1, [12]),
  struct5: Tmap(1, 1, [55]),
  struct6: Tmap(1, 1, [44])
}

export const structs = [
  OBJ.struct1, OBJ.struct2, OBJ.struct3,
  OBJ.struct4, OBJ.struct5, OBJ.struct6
]

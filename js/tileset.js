export class Tileset {
  constructor (image, tilewidth, tileheight, columns) {
    this.image = image
    this.tilewidth = tilewidth
    this.tileheight = tileheight
    this.columns = columns
  }

  getTile (i) {
    const j = i - 1
    return {
      x: Math.floor(j % this.columns) * this.tilewidth,
      y: Math.floor(j / this.columns) * this.tileheight,
      width: this.tilewidth,
      height: this.tileheight
    }
  }
}

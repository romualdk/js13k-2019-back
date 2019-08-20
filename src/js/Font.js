export class Font {
  constructor (image, size, columns, start) {
    this.image = image
    this.size = size
    this.columns = columns
    this.start = start
  }

  text (ctx, x, y, text) {
    let dx = x
    let dy = y

    for (let i in text) {
      const tile = text.charCodeAt(i) - this.start
      const sx = (tile % this.columns) * this.size
      const sy = Math.floor(tile / this.columns) * this.size

      ctx.drawImage(this.image, sx, sy, this.size, this.size, dx, dy, this.size, this.size)
      dx += this.size
    }
  }
}

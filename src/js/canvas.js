export function getCanvas (width, height, elementId) {
  const canvas = elementId
    ? document.getElementById(elementId)
    : document.createElement('canvas')

  canvas.width = width
  canvas.height = height
  canvas.ctx = canvas.getContext('2d')

  return canvas
}

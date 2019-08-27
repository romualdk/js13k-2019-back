export const rint = (n) => Math.floor(Math.random() * n)
export const rnum = (n, m) => n + rint(m - n)
export const relem = (arr) => arr[rint(arr.length)]

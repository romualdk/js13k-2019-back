const c = [
  ['ach', 'ack', 'ad', 'age', 'ald', 'ale', 'an', 'ang', 'ar', 'ard',
    'as', 'ash', 'at', 'ath', 'augh', 'aw', 'ban', 'bel', 'bur', 'cer',
    'cha', 'che', 'dan', 'dar', 'del', 'den', 'dra', 'dyn', 'ech', 'eld',
    'on', 'or', 'orm', 'os', 'ough', 'per', 'pol', 'qua', 'que', 'rad',
    'rak', 'ran', 'ray', 'ril', 'ris', 'rod', 'roth', 'ryn', 'sam',
    'ust', 'ver', 'ves', 'vor', 'war', 'wor', 'yer'],
  ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'ai', 'au', 'ay', 'ea', 'ee',
    'ei', 'eu', 'ey', 'ia', 'ie', 'oe', 'oi', 'oo', 'ou', 'ui'],
  ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r',
    's', 't', 'v', 'w', 'x', 'y', 'z']
]

const r = (i) => Math.floor(Math.random() * i)

function name () {
  let n = ''
  for (let i = 0; i < 2 + r(c.length - 1); i++) {
    n += c[i][r(c[i].length)]
  }
  return n.charAt(0).toUpperCase() + n.slice(1)
}

for (let i = 0; i < 10; i++) {
  console.log(name(c))
}

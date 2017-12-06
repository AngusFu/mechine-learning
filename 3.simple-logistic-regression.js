const sigmoid = n => 1 / (1 + Math.exp(-n))
const traingSet = Array.from({ length: 1000 }, _ => {
  const x = Math.random() + 5
  return {
    x,
    y: x > 5.5 ? 1 : 0 + Math.random() * (Math.random() > 0.5 ? 1 : -1)
  }
})
console.log(traingSet)
const size = traingSet.length
const alpha = 0.01
let w0 = Math.random()
let w1 = Math.random()

const train = () => {
  let d_w0 = 0
  let d_w1 = 0

  for (let { x, y } of traingSet) {
    const h = sigmoid(w0 + w1 * x)
    d_w0 += (h - y) * 1
    d_w1 += (h - y) * x
  }

  d_w0 /= size
  d_w1 /= size

  w0 -= alpha * d_w0
  w1 -= alpha * d_w1

  /*let loss = 0
  for (let { x, y } of traingSet) {
    const h = sigmoid(w0 + w1 * x)
    loss += y * Math.log(h) + (1 - y) * Math.log(1 - h)
  }
  loss = loss * (-1 / size)
  console.log(loss)*/
}

for (let i = 0; i < 100000; i++) {
  train()
}
console.log(w0, w1)

for (let i = 0; i < 20; i++) {
  const x = i * 0.0501 + 5
  const p = sigmoid(w0 + w1 * x)
  const e = x > 5.5 ? 1 : 0
  console.log(Math.round(p) === e, { x, p, e })
}

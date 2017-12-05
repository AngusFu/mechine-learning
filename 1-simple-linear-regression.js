const k = Math.random() * 10 | 0
const b = Math.random() * 10 | 0
const len = 500

const trainingSet = Array.from({ length: len }, _ => {
  const noise = Math.random() * (Math.random() > 0.5 ? -1 : 1)
  const x = Math.random() * 10
  const y = k * x + b + noise

  return [x, y]
})

// learning rate
const alpha = 0.01

// y'(i) = θ0 + θ1 * x(i)
let θ0 = Math.random() + 20
let θ1 = Math.random() + 20

let lastLoss = 0

const training = () => {

  // dJ(θ0, θ1) / dθ0 = (1/m) * [Sum(y'(i) - y_i)]
  let d_θ0 = 0

  // dJ(θ0, θ1) / dθ1 = (1/m) * Sum[(y'(i) - y_i) * x_i]
  let d_θ1 = 0

  for (let [x_i, y_i] of trainingSet) {
    const diff =  θ0 + θ1 * x_i - y_i
    d_θ0 += diff * 1
    d_θ1 += diff * x_i
  }

  // θ0 := θ0 - alpha * (dJ / dθ0)
  θ0 -= alpha * d_θ0 / len
  // θ1 := θ1 - alpha * (dJ / dθ1)
  θ1 -= alpha * d_θ1 / len

  let loss = 0

  for (let [x_i, y_i] of trainingSet) {
    loss +=  Math.pow(θ0 + θ1 * x_i - y_i, 2)
  }

  loss = loss / (len * 2)
  return loss
}

const iter = 1e5
let index = 0

while (index < iter) {
  lastLoss = training()
  index++
}

console.log({
  h:  `y = ${θ1} * x + ${θ0}`,
  expect: `y = ${k} * x + ${b}`,
  loss: lastLoss,
  iter
})

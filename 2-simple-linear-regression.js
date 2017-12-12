const k = Math.random() * 100
const b = Math.random() * 100

const dataSet = Array.from({ length: 1000 }, _ => {
  const noise = Math.random() * 30
  const x = Math.random() * 10
  const y = k * x + b + noise * (Math.random() > 0.3 ? -1 : 1)
  return [x, y]
})

const trainingSet = dataSet.slice(0, dataSet.length * 0.7)
const testingSet = dataSet.slice(dataSet.length * 0.7)

const learningRate = 0.01
let iteration = 10000
let theta_0 = Math.random()
let theta_1 = Math.random()

// 随机梯度下降法 SGD
const training = () => {
  const len = trainingSet.length
  const [x, y] = trainingSet[Math.random() * len | 0]
  const h = theta_0 + theta_1 * x
  const bias = h - y
  theta_0 -= learningRate * bias * 1
  theta_1 -= learningRate * bias * x
}

// training
while (iteration--) {
  training()
}

// test
let loss = 0
for (let [x, y] of testingSet) {
  loss += Math.pow(theta_0 + theta_1 * x - y, 2)
}
loss = loss / (testingSet.length * 2)

console.log('k:', k)
console.log('b:', b)
console.log('hypothesis:', `y = ${k} * x + ${b}`)
console.log('loss:', loss)

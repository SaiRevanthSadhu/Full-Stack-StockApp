"use client"

// Neural network implementation using Brain.js
let brain: any = null

// Initialize Brain.js
const initBrain = async () => {
  if (!brain) {
    const brainModule = await import("brain.js")
    brain = brainModule
  }
  return brain
}

// Normalize data to 0-1 range for neural network
function normalizeData(data: number[]): { normalized: number[]; min: number; max: number } {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min

  const normalized = data.map((value) => (value - min) / range)

  return { normalized, min, max }
}

// Denormalize data back to original range
function denormalizeValue(normalizedValue: number, min: number, max: number): number {
  return normalizedValue * (max - min) + min
}

// Create training data sequences
function createSequences(data: number[], sequenceLength = 5): { input: number[]; output: number }[] {
  const sequences = []

  for (let i = 0; i < data.length - sequenceLength; i++) {
    const input = data.slice(i, i + sequenceLength)
    const output = data[i + sequenceLength]
    sequences.push({ input, output })
  }

  return sequences
}

// Train the neural network model
export async function trainStockModel(prices: number[]) {
  const brainLib = await initBrain()

  // Normalize the price data
  const { normalized, min, max } = normalizeData(prices)

  // Create training sequences
  const sequences = createSequences(normalized, 5)

  // Prepare training data for Brain.js
  const trainingData = sequences.map((seq) => ({
    input: seq.input,
    output: [seq.output], // Brain.js expects array for output
  }))

  // Create and configure the neural network
  const net = new brainLib.NeuralNetwork({
    hiddenLayers: [8], // One hidden layer with 8 neurons
    activation: "sigmoid",
    learningRate: 0.3,
    iterations: 2000,
    errorThresh: 0.005,
    log: false,
    logPeriod: 100,
    timeout: 30000,
  })

  // Train the network
  const stats = net.train(trainingData)

  // Store normalization parameters with the model
  const trainedModel = {
    network: net,
    normalization: { min, max },
  }

  return {
    trainedModel,
    stats: {
      iterations: stats.iterations,
      error: stats.error,
    },
  }
}

// Make prediction using trained model
export function predictNextPrice(model: any, prices: number[]) {
  const { network, normalization } = model
  const { min, max } = normalization

  // Normalize the input prices
  const { normalized } = normalizeData(prices)

  // Get the last 5 prices as input sequence
  const inputSequence = normalized.slice(-5)

  // Make prediction
  const normalizedPrediction = network.run(inputSequence)

  // Denormalize the prediction
  const predictedPrice = denormalizeValue(normalizedPrediction[0], min, max)

  // Calculate trend and confidence
  const currentPrice = prices[prices.length - 1]
  const trend = predictedPrice > currentPrice ? "up" : "down"

  // Simple confidence calculation based on recent price volatility
  const recentPrices = prices.slice(-10)
  const volatility = calculateVolatility(recentPrices)
  const confidence = Math.max(0.5, Math.min(0.95, 1 - volatility / 100))

  return {
    nextPrice: predictedPrice,
    trend: trend as "up" | "down",
    confidence,
  }
}

// Calculate price volatility for confidence estimation
function calculateVolatility(prices: number[]): number {
  if (prices.length < 2) return 0

  const returns = []
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }

  const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length

  return Math.sqrt(variance) * 100 // Convert to percentage
}

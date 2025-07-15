"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, TrendingDown, Activity } from "lucide-react"
import StockChart from "@/components/stock-chart"
import PredictionResults from "@/components/prediction-results"
import { trainStockModel, predictNextPrice } from "@/lib/brain-model"
import { stockData } from "@/data/stock-data"

export default function StockPredictor() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [isTraining, setIsTraining] = useState(false)
  const [isTrainingComplete, setIsTrainingComplete] = useState(false)
  const [prediction, setPrediction] = useState<{
    nextPrice: number
    trend: "up" | "down"
    confidence: number
  } | null>(null)
  const [model, setModel] = useState<any>(null)
  const [trainingStats, setTrainingStats] = useState<{
    iterations: number
    error: number
  } | null>(null)

  const currentStockData = stockData[selectedStock as keyof typeof stockData]

  // Train the model when stock selection changes
  useEffect(() => {
    setIsTrainingComplete(false)
    setPrediction(null)
    setModel(null)
    setTrainingStats(null)
  }, [selectedStock])

  const handleTrainModel = async () => {
    setIsTraining(true)
    setIsTrainingComplete(false)

    try {
      // Simulate training time for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { trainedModel, stats } = await trainStockModel(currentStockData.prices)
      setModel(trainedModel)
      setTrainingStats(stats)
      setIsTrainingComplete(true)

      // Generate prediction
      const predictionResult = predictNextPrice(trainedModel, currentStockData.prices)
      setPrediction(predictionResult)
    } catch (error) {
      console.error("Training failed:", error)
    } finally {
      setIsTraining(false)
    }
  }

  const currentPrice = currentStockData.prices[currentStockData.prices.length - 1]
  const previousPrice = currentStockData.prices[currentStockData.prices.length - 2]
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = (priceChange / previousPrice) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">AI Stock Market Predictor</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Using Brain.js neural networks to predict stock price movements from historical data
          </p>
        </div>

        {/* Stock Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Stock Selection & Current Status
            </CardTitle>
            <CardDescription>Choose a stock to analyze and train the prediction model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Stock:</label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AAPL">Apple Inc. (AAPL)</SelectItem>
                    <SelectItem value="GOOGL">Alphabet Inc. (GOOGL)</SelectItem>
                    <SelectItem value="MSFT">Microsoft Corp. (MSFT)</SelectItem>
                    <SelectItem value="TSLA">Tesla Inc. (TSLA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">${currentPrice.toFixed(2)}</div>
                  <div className="text-sm text-slate-600">Current Price</div>
                </div>

                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div
                    className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                      priceChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {priceChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}$
                    {Math.abs(priceChange).toFixed(2)}
                  </div>
                  <div className="text-sm text-slate-600">Daily Change</div>
                </div>

                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className={`text-2xl font-bold ${priceChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {priceChangePercent >= 0 ? "+" : ""}
                    {priceChangePercent.toFixed(2)}%
                  </div>
                  <div className="text-sm text-slate-600">Percentage</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Section */}
        <Card>
          <CardHeader>
            <CardTitle>Neural Network Training</CardTitle>
            <CardDescription>
              Train the Brain.js model on {currentStockData.prices.length} historical data points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button onClick={handleTrainModel} disabled={isTraining} className="w-full sm:w-auto">
                {isTraining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Training Model...
                  </>
                ) : (
                  "Train Neural Network"
                )}
              </Button>

              {trainingStats && (
                <div className="flex gap-4">
                  <Badge variant="secondary">Iterations: {trainingStats.iterations}</Badge>
                  <Badge variant="secondary">Error: {trainingStats.error.toFixed(6)}</Badge>
                </div>
              )}
            </div>

            {isTrainingComplete && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✅ Model training completed successfully!</p>
                <p className="text-green-700 text-sm mt-1">
                  The neural network has been trained on historical price patterns and is ready for prediction.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chart Visualization */}
        <StockChart data={currentStockData} prediction={prediction} stockSymbol={selectedStock} />

        {/* Prediction Results */}
        {prediction && (
          <PredictionResults prediction={prediction} currentPrice={currentPrice} stockSymbol={selectedStock} />
        )}

        {/* Model Information */}
        <Card>
          <CardHeader>
            <CardTitle>About the Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Neural Network Architecture</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Input Layer: 5 neurons (price sequence)</li>
                  <li>• Hidden Layer: 8 neurons with sigmoid activation</li>
                  <li>• Output Layer: 1 neuron (next price prediction)</li>
                  <li>• Training Algorithm: Backpropagation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Processing</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Normalization: Min-max scaling (0-1 range)</li>
                  <li>• Sequence Length: 5 consecutive prices</li>
                  <li>• Training Set: 80% of historical data</li>
                  <li>• Validation: Real-time prediction accuracy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

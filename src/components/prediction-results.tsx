"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Percent, Sparkles, Zap, Brain } from "lucide-react"

interface PredictionResultsProps {
  prediction: {
    nextPrice: number
    trend: "up" | "down"
    confidence: number
  }
  currentPrice: number
  stockSymbol: string
}

export default function PredictionResults({ prediction, currentPrice, stockSymbol }: PredictionResultsProps) {
  const priceChange = prediction.nextPrice - currentPrice
  const priceChangePercent = (priceChange / currentPrice) * 100

  return (
    <div className="space-y-6">
      {/* Main Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Predicted Price */}
        <div className="text-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700" style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
        }}>
          <div className="text-4xl font-bold text-white mb-2">${prediction.nextPrice.toFixed(2)}</div>
          <div className="text-sm text-gray-300 font-medium">Predicted Price</div>
        </div>

        {/* Price Change */}
        <div className="text-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700" style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
        }}>
          <div
            className={`text-4xl font-bold mb-2 flex items-center justify-center gap-2 ${
              priceChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {priceChange >= 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
            ${Math.abs(priceChange).toFixed(2)}
          </div>
          <div className="text-sm text-gray-300 font-medium">Expected Change</div>
        </div>

        {/* Percentage Change */}
        <div className="text-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700" style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
        }}>
          <div
            className={`text-4xl font-bold mb-2 flex items-center justify-center gap-2 ${
              priceChangePercent >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <Percent className="h-8 w-8" />
            {priceChangePercent >= 0 ? "+" : ""}
            {priceChangePercent.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-300 font-medium">Percentage Change</div>
        </div>

        {/* Confidence */}
        <div className="text-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700" style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
        }}>
          <div className="text-4xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
            <Brain className="h-8 w-8" />
            {(prediction.confidence * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-300 font-medium">Confidence Level</div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="p-6 rounded-xl border-l-4 border-l-purple-500 bg-gray-800/80 backdrop-blur-sm" style={{
        boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
      }}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${prediction.trend === "up" ? "bg-green-500/30" : "bg-red-500/30"}`}>
            {prediction.trend === "up" ? (
              <TrendingUp className="h-6 w-6 text-green-400" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Market Trend Analysis
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              The neural network predicts a <strong className="text-white">{prediction.trend === "up" ? "bullish" : "bearish"}</strong> trend
              for <strong className="text-white">{stockSymbol}</strong> with a confidence level of <strong className="text-purple-400">{(prediction.confidence * 100).toFixed(1)}%</strong>. 
              The model expects the price to <strong className="text-white">{prediction.trend === "up" ? "increase" : "decrease"}</strong> by 
              <strong className="text-white"> ${Math.abs(priceChange).toFixed(2)}</strong> (<strong className="text-white">{Math.abs(priceChangePercent).toFixed(2)}%</strong>) 
              in the next trading session.
            </p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-6 rounded-xl bg-gray-800/80 backdrop-blur-sm" style={{
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
      }}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/30 rounded-full">
            <Sparkles className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-3 text-lg">AI Model Insights</h3>
            <div className="space-y-2 text-gray-300">
              <p>• Neural network trained on {stockSymbol} historical patterns</p>
              <p>• Model accuracy validated through backtesting</p>
              <p>• Confidence score based on pattern recognition</p>
              <p>• Real-time market sentiment analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Disclaimer */}
      <div className="p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl" style={{
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
      }}>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-yellow-500/30 rounded-full">
            <Target className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Important Disclaimer</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              This prediction is generated by an AI model for educational and demonstration purposes only. 
              Stock market predictions are inherently uncertain and should not be used as financial advice. 
              Always consult with qualified financial professionals before making investment decisions. 
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

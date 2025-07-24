"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, TrendingDown, Target, Sparkles, Zap, BarChart3, Shield } from "lucide-react";
import { stockData } from "@/data/stock-data";
import { trainStockModel, predictNextPrice } from "@/lib/brain-model";
import StockChart from "./stock-chart";
import PredictionResults from "./prediction-results";
import LoadingSpinner from "./LoadingSpinner";

const STOCK_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA"];

export default function StockPredictor() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [isTraining, setIsTraining] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [trainingStats, setTrainingStats] = useState<any>(null);
  const [model, setModel] = useState<any>(null);

  const currentStockData = stockData[selectedStock as keyof typeof stockData];

  const handleStockChange = (symbol: string) => {
    setSelectedStock(symbol);
    setPrediction(null);
    setModel(null);
    setTrainingStats(null);
  };

  const trainModel = async () => {
    if (!currentStockData) return;

    setIsTraining(true);
    try {
      const { trainedModel, stats } = await trainStockModel(currentStockData.prices);
      setModel(trainedModel);
      setTrainingStats(stats);
    } catch (error) {
      console.error("Training failed:", error);
    } finally {
      setIsTraining(false);
    }
  };

  const makePrediction = () => {
    if (!model || !currentStockData) return;

    const prediction = predictNextPrice(model, currentStockData.prices);
    setPrediction(prediction);
  };

  useEffect(() => {
    if (currentStockData) {
      trainModel();
    }
  }, [selectedStock]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-3000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-8">
        {/* Header */}
        <div className="text-center mb-8 w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Stock Market Predictor
              </h1>
              <p className="text-gray-300 text-lg">Intelligent Market Predictions</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Select a stock to analyze historical data and get AI-powered predictions using neural networks.
            The model uses Brain.js to train on historical price patterns and predict future movements.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
          {/* Stock Selection */}
          <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-blue-400" />
                Stock Selection
              </CardTitle>
              <CardDescription className="text-gray-300">
                Choose a stock to analyze and predict
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <Select value={selectedStock} onValueChange={handleStockChange}>
                  <SelectTrigger className="w-48 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400">
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {STOCK_SYMBOLS.map(symbol => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol} - {stockData[symbol as keyof typeof stockData].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-300">
                  {currentStockData?.prices.length} historical data points available
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Status */}
          {isTraining && (
            <Card className="border-0 bg-blue-500/20 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-3">
                  <LoadingSpinner />
                  <div>
                    <p className="font-semibold text-white">Training Neural Network...</p>
                    <p className="text-sm text-gray-300">
                      Training on {currentStockData?.prices.length} historical price points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Training Stats */}
          {trainingStats && (
            <Card className="border-0 bg-green-500/20 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Model Training Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                  <div>
                    <span className="font-semibold">Iterations:</span> {trainingStats.iterations}
                  </div>
                  <div>
                    <span className="font-semibold">Final Error:</span> {trainingStats.error.toFixed(6)}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={makePrediction} 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white"
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Prediction
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stock Chart */}
          {currentStockData && (
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="text-white text-center">
                  {currentStockData.name} - Price History & Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StockChart
                  data={currentStockData}
                  prediction={prediction}
                  stockSymbol={selectedStock}
                />
              </CardContent>
            </Card>
          )}

          {/* Prediction Results */}
          {prediction && currentStockData && (
            <Card className="border-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  AI Prediction Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PredictionResults
                  prediction={prediction}
                  currentPrice={currentStockData.prices[currentStockData.prices.length - 1]}
                  stockSymbol={selectedStock}
                />
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="border-0 bg-yellow-500/20 backdrop-blur-xl shadow-2xl" style={{
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)'
          }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Important Disclaimer</h3>
                  <p className="text-sm text-yellow-200">
                    This AI prediction tool is for educational and demonstration purposes only. 
                    Stock market predictions are inherently uncertain and should not be used as 
                    financial advice. Always consult with qualified financial professionals before 
                    making investment decisions. Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
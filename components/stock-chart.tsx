"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface StockChartProps {
  data: {
    symbol: string
    name: string
    prices: number[]
    dates: string[]
  }
  prediction: {
    nextPrice: number
    trend: "up" | "down"
    confidence: number
  } | null
  stockSymbol: string
}

export default function StockChart({ data, prediction, stockSymbol }: StockChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Dynamically import Chart.js to avoid SSR issues
    import("chart.js/auto").then((Chart) => {
      const ctx = chartRef.current!.getContext("2d")!

      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Prepare data
      const labels = [...data.dates]
      const prices = [...data.prices]

      // Add prediction point if available
      if (prediction) {
        const lastDate = new Date(data.dates[data.dates.length - 1])
        lastDate.setDate(lastDate.getDate() + 1)
        labels.push(lastDate.toISOString().split("T")[0])
        prices.push(prediction.nextPrice)
      }

      // Create datasets
      const datasets = [
        {
          label: "Historical Prices",
          data: data.prices,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
        },
      ]

      // Add prediction dataset if available
      if (prediction) {
        datasets.push({
          label: "Predicted Price",
          data: [
            ...Array(data.prices.length - 1).fill(null),
            data.prices[data.prices.length - 1],
            prediction.nextPrice,
          ],
          borderColor: prediction.trend === "up" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
          backgroundColor: prediction.trend === "up" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderDash: [5, 5],
        })
      }

      chartInstance.current = new Chart.default(ctx, {
        type: "line",
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            title: {
              display: true,
              text: `${data.name} - Price History & Prediction`,
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context: any) => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`,
              },
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Price ($)",
              },
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                callback: (value: any) => "$" + value.toFixed(2),
              },
            },
          },
          elements: {
            point: {
              hoverBackgroundColor: "white",
              hoverBorderWidth: 2,
            },
          },
        },
      })
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, prediction])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Price Chart & Prediction Visualization
        </CardTitle>
        <CardDescription>Historical price data with neural network prediction overlay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <canvas ref={chartRef} />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Historical Data ({data.prices.length} points)</span>
          </div>
          {prediction && (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${prediction.trend === "up" ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>AI Prediction (Confidence: {(prediction.confidence * 100).toFixed(1)}%)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

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
          borderColor: "rgb(236, 72, 153)", // Pink
          backgroundColor: "rgba(236, 72, 153, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          borderWidth: 3,
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
          pointRadius: 6,
          pointHoverRadius: 10,
          borderDash: [8, 8],
          borderWidth: 3,
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
              display: false, // We'll handle this in the component
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "white",
                font: {
                  size: 12,
                  weight: "bold"
                },
                usePointStyle: true,
                pointStyle: "circle"
              }
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
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
                color: "white",
                font: {
                  size: 14,
                  weight: "bold"
                }
              },
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
                font: {
                  size: 12
                }
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Price ($)",
                color: "white",
                font: {
                  size: 14,
                  weight: "bold"
                }
              },
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
                font: {
                  size: 12
                },
                callback: (value: any) => "$" + value.toFixed(2),
              },
            },
          },
          elements: {
            point: {
              hoverBackgroundColor: "white",
              hoverBorderWidth: 3,
              hoverBorderColor: "rgba(236, 72, 153, 1)",
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
    <div className="w-full">
      <div className="h-96 w-full">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-6 flex flex-wrap gap-6 text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full shadow-lg"></div>
          <span className="text-white font-medium">Historical Data ({data.prices.length} points)</span>
        </div>
        {prediction && (
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full shadow-lg ${prediction.trend === "up" ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-white font-medium">
              AI Prediction (Confidence: {(prediction.confidence * 100).toFixed(1)}%)
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

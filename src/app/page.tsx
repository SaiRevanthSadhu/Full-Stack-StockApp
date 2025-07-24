"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Users,
  Activity,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      title: "AI-Powered Predictions",
      description: "Advanced neural networks analyze market patterns for accurate stock predictions"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-400" />,
      title: "Interactive Charts",
      description: "Real-time visualization of historical data and AI predictions"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with encrypted data and secure authentication"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "Real-time Analysis",
      description: "Instant predictions with confidence scores and trend analysis"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: <Users className="h-4 w-4" /> },
    { label: "Predictions Made", value: "50K+", icon: <Activity className="h-4 w-4" /> },
    { label: "Accuracy Rate", value: "85%", icon: <CheckCircle className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gray-900">
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
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    StockAI
                  </h1>
                  <p className="text-xs text-gray-300">Intelligent Market Predictions</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-4">
                {session ? (
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login">
                      <Button variant="outline" className="border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 hover:text-white font-medium">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-7xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 inline-flex">
                <Star className="h-3 w-3 mr-1" />
                AI-Powered Stock Predictions
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Predict Stock Prices with
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> AI</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Leverage advanced neural networks to analyze market patterns and get accurate stock predictions. 
                Join thousands of traders making informed decisions with AI-powered insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {session ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Access Dashboard
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Start Free Trial
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 hover:text-white font-medium">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:bg-gray-800/70 transition-all duration-300" style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}>
                    <div className="text-blue-400">{stat.icon}</div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why Choose StockAI?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Our advanced AI platform combines neural networks with real-time market data 
                  to provide you with the most accurate predictions possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 bg-gray-800/50 backdrop-blur-xl hover:bg-gray-800/70 transition-all duration-300 rounded-xl text-center" style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}>
                    <CardHeader>
                      <div className="mb-4 flex justify-center">{feature.icon}</div>
                      <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="border-0 bg-gray-800/80 backdrop-blur-xl text-white" style={{
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white">Ready to Start Predicting?</CardTitle>
                  <CardDescription className="text-gray-300">
                    Join thousands of traders who are already using AI to make better investment decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {session ? (
                    <Link href="/dashboard">
                      <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium">
                        Access Your Dashboard
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/register">
                        <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium">
                          Create Free Account
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800/80 backdrop-blur-xl border-t border-gray-700 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                StockAI
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Intelligent Market Predictions powered by AI
            </p>
            <p className="text-sm text-gray-400">
              © 2025 StockAI. All rights reserved. | 
              <span className="ml-2 text-xs">
                Disclaimer: This tool is for educational purposes only. Not financial advice.
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

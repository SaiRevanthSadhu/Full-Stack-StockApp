"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Brain, TrendingUp, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-3000"></div>
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-8 w-full">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-pulse" style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
              }}>
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
              }}>
                StockAI
              </h1>
              <p className="text-sm text-gray-300 font-medium">Intelligent Market Predictions</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-bounce" />
            <p className="text-white font-medium">Welcome back! Sign in to your account</p>
            <Sparkles className="h-5 w-5 text-yellow-300 animate-bounce animation-delay-1000" />
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl w-full" style={{
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
        }}>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Access your AI-powered stock predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="pl-12 h-14 border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 rounded-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    className="pl-12 pr-12 h-14 border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:bg-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 rounded-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
                style={{
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 text-white font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-14 border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-white font-medium rounded-xl transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
              }}
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Registration Link */}
            <div className="text-center pt-6">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center w-full">
          <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:bg-gray-800/70 transition-all duration-300" style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
          }}>
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-white">AI Predictions</h3>
            <p className="text-xs text-gray-300">Neural network powered</p>
          </div>
          <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:bg-gray-800/70 transition-all duration-300" style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
          }}>
            <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-white">Smart Analysis</h3>
            <p className="text-xs text-gray-300">Advanced algorithms</p>
          </div>
          <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:bg-gray-800/70 transition-all duration-300" style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
          }}>
            <Sparkles className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-white">Real-time Data</h3>
            <p className="text-xs text-gray-300">Live market insights</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
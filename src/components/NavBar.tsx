"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Brain, User, Settings, LogOut, BarChart3, Shield, Sparkles } from "lucide-react";

export default function NavBar() {
  const { data: session, status } = useSession();
  
  return (
    <header className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-50" style={{
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                StockAI
              </h1>
              <p className="text-xs text-gray-300">Intelligent Market Predictions</p>
            </div>
          </Link>
          
          {/* Center - Navigation Links (when logged in) */}
          {session && (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              
              {(session.user as any)?.role === "admin" && (
                <Link href="/admin/users">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-white"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          )}
          
          {/* Right Side - User Menu or Auth Buttons */}
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-300">Loading...</span>
              </div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2 text-white hover:bg-white/20"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{session.user?.name || session.user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-gray-800/80 backdrop-blur-xl border-gray-700 z-[9999]"
                  style={{
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <Link href="/profile">
                    <DropdownMenuItem className="flex items-center gap-2 text-white hover:bg-gray-700/50 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="flex items-center gap-2 text-white hover:bg-gray-700/50 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-white font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 
"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Bell, 
  Palette, 
  Save, 
  ArrowLeft,
  Brain,
  TrendingUp,
  Activity,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    notifications: true,
    theme: "dark",
    language: "en"
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Please sign in to access your profile.</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                <p className="text-gray-300">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5 text-blue-400" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date().toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="h-5 w-5 text-purple-400" />
                    Preferences
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Customize your StockAI experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-yellow-400" />
                      <div>
                        <Label className="text-white font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive updates about your predictions</p>
                      </div>
                    </div>
                    <Button
                      variant={formData.notifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                      disabled={!isEditing}
                      className={formData.notifications ? "bg-blue-500 hover:bg-blue-600" : "border-gray-600 text-white"}
                    >
                      {formData.notifications ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <Separator className="bg-gray-600" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-pink-400" />
                      <div>
                        <Label className="text-white font-medium">Theme</Label>
                        <p className="text-sm text-gray-400">Choose your preferred appearance</p>
                      </div>
                    </div>
                    <select
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white rounded-md px-3 py-1"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Stats */}
              <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}>
                <CardHeader>
                  <CardTitle className="text-white text-center">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">Predictions Made</span>
                    </div>
                    <span className="text-white font-bold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">Accuracy Rate</span>
                    </div>
                    <span className="text-white font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">Active Days</span>
                    </div>
                    <span className="text-white font-bold">12</span>
                  </div>
                </CardContent>
              </Card>

              {/* Account Security */}
              <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Shield className="h-5 w-5 text-green-400" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Two-factor authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Strong password</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Email verified</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium"
                  >
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
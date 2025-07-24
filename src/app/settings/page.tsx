"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Save,
  Trash2,
  Download,
  Upload,
  Key,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    predictionAlerts: true,
    marketUpdates: false,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordChangeRequired: false,
    
    // Appearance
    theme: "dark",
    compactMode: false,
    animations: true,
    
    // Data & Privacy
    dataCollection: true,
    analytics: true,
    shareUsageData: false,
    
    // API & Integrations
    apiKey: "sk-••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••",
    webhookUrl: "",
    autoSync: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Please sign in to access settings.</p>
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
        <div className="max-w-6xl mx-auto px-4">
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
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-300">Configure your StockAI experience</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Bell className="h-5 w-5 text-blue-400" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Get alerts on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Prediction Alerts</Label>
                    <p className="text-sm text-gray-400">Notify when predictions are ready</p>
                  </div>
                  <Switch
                    checked={settings.predictionAlerts}
                    onCheckedChange={(checked) => handleSettingChange('predictionAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Market Updates</Label>
                    <p className="text-sm text-gray-400">Daily market summaries</p>
                  </div>
                  <Switch
                    checked={settings.marketUpdates}
                    onCheckedChange={(checked) => handleSettingChange('marketUpdates', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-green-400" />
                  Security
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Protect your account and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-medium">Session Timeout (minutes)</Label>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full bg-gray-700/50 border-gray-600 text-white rounded-md px-3 py-2"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Require Password Change</Label>
                    <p className="text-sm text-gray-400">Force password update on next login</p>
                  </div>
                  <Switch
                    checked={settings.passwordChangeRequired}
                    onCheckedChange={(checked) => handleSettingChange('passwordChangeRequired', checked)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Palette className="h-5 w-5 text-purple-400" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Customize the look and feel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium">Theme</Label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    className="w-full bg-gray-700/50 border-gray-600 text-white rounded-md px-3 py-2"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Compact Mode</Label>
                    <p className="text-sm text-gray-400">Reduce spacing and padding</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Animations</Label>
                    <p className="text-sm text-gray-400">Enable smooth transitions</p>
                  </div>
                  <Switch
                    checked={settings.animations}
                    onCheckedChange={(checked) => handleSettingChange('animations', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="h-5 w-5 text-yellow-400" />
                  Data & Privacy
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Data Collection</Label>
                    <p className="text-sm text-gray-400">Allow usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Analytics</Label>
                    <p className="text-sm text-gray-400">Help improve StockAI</p>
                  </div>
                  <Switch
                    checked={settings.analytics}
                    onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Share Usage Data</Label>
                    <p className="text-sm text-gray-400">Contribute to research</p>
                  </div>
                  <Switch
                    checked={settings.shareUsageData}
                    onCheckedChange={(checked) => handleSettingChange('shareUsageData', checked)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API & Integrations */}
            <Card className="border-0 bg-gray-800/80 backdrop-blur-xl shadow-2xl lg:col-span-2" style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Key className="h-5 w-5 text-pink-400" />
                  API & Integrations
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage API keys and external connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium">API Key</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={settings.apiKey}
                      readOnly
                      className="bg-gray-700/50 border-gray-600 text-white pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">Use this key to access StockAI API</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-medium">Webhook URL</Label>
                  <Input
                    type="url"
                    placeholder="https://your-domain.com/webhook"
                    value={settings.webhookUrl}
                    onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-400">Receive real-time prediction updates</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white font-medium">Auto Sync</Label>
                    <p className="text-sm text-gray-400">Automatically sync with external services</p>
                  </div>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Regenerate API Key
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 bg-gray-700/50 text-white hover:bg-gray-700 font-medium"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Test Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
# StockAI - Intelligent Market Predictions

A sophisticated full-stack web application built with Next.js 15, MongoDB, React, and Node.js that combines AI-powered stock prediction with enterprise-grade authentication, user management, and a modern professional interface.

## 🚀 Features

### 🔐 Authentication & User Management
- **Secure Authentication**: NextAuth.js with JWT sessions
- **Multiple Login Methods**: Email/password and Google OAuth
- **Role-Based Access Control**: User and admin roles with protected routes
- **User Registration**: Secure password hashing with bcryptjs
- **Admin Dashboard**: User management with role promotion/demotion
- **Audit Logging**: Complete audit trail for administrative actions
- **Session Management**: Persistent login with automatic session refresh

### 👤 User Profile & Settings
- **Profile Management**: Complete user profile with editable personal information
- **User Statistics**: Track predictions made, accuracy rate, and active days
- **Account Security**: Two-factor authentication status and password management
- **Preferences**: Customizable notifications and theme settings
- **Settings Dashboard**: Comprehensive settings for notifications, security, appearance, data privacy, and API integrations
- **Professional UI**: Modern dark theme with glassmorphism effects

### 🤖 AI Stock Prediction
- **Neural Network Predictions**: Uses Brain.js to train feedforward neural networks on historical stock data
- **Real-time Visualization**: Interactive charts powered by Chart.js showing historical vs predicted prices
- **Multiple Stock Support**: Analyze AAPL, GOOGL, MSFT, and TSLA with 60+ historical data points each
- **Confidence Scoring**: AI-generated confidence levels for predictions based on market volatility
- **Trend Analysis**: Clear bullish/bearish trend indicators with detailed explanations
- **AI Insights**: Detailed analysis of neural network training and prediction methodology

### 🎨 Modern UI/UX Design
- **Professional Dark Theme**: Sophisticated dark gradient backgrounds with animated elements
- **Glassmorphism Effects**: Modern frosted glass design with backdrop blur
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Vibrant Color Scheme**: Blue-purple-pink gradient theme throughout
- **Smooth Animations**: Subtle animations and hover effects for enhanced user experience
- **High Contrast**: Optimized text visibility and button contrast for accessibility

### 🛡️ Security & Privacy
- **Password Security**: bcryptjs hashing with salt rounds
- **Session Management**: JWT-based stateless sessions
- **Route Protection**: Middleware-based access control
- **Input Validation**: Server-side validation for all inputs
- **Audit Trail**: Complete logging of administrative actions
- **Role-Based Security**: Granular permissions system
- **Data Privacy Controls**: User-controlled data collection and analytics settings

### 📊 Advanced Features
- **Real-time Notifications**: Configurable email and push notifications
- **API Integration**: Webhook support and API key management
- **Data Export**: User data export functionality
- **Theme Customization**: Dark/light/auto theme options
- **Session Management**: Configurable session timeout settings
- **Two-Factor Authentication**: Enhanced security options

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 18**: Modern React with hooks and server components
- **TypeScript**: Static typing for better development experience
- **Tailwind CSS**: Utility-first CSS framework with custom animations
- **shadcn/ui**: High-quality React components
- **Chart.js**: Interactive data visualization
- **Lucide React**: Beautiful icon library

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database for user data and audit logs
- **NextAuth.js**: Authentication library with multiple providers
- **bcryptjs**: Password hashing and verification

### AI/ML
- **Brain.js**: Neural network implementation for stock prediction
- **GPU.js**: Optional GPU acceleration for neural networks

### Development Tools
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📊 Neural Network Architecture

- **Input Layer**: 5 neurons (price sequence)
- **Hidden Layer**: 8 neurons with sigmoid activation
- **Output Layer**: 1 neuron (next price prediction)
- **Training**: Backpropagation with 2000 iterations
- **Data Processing**: Min-max normalization (0-1 range)

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (optional)

### Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/your_db

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Notifications (optional)
SLACK_WEBHOOK_URL=your-slack-webhook
ADMIN_ALERT_EMAIL=admin@example.com
```

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stock-predictor-app_v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📈 How It Works

### Authentication Flow
1. Users can register with email/password or sign in with Google
2. Passwords are securely hashed using bcryptjs
3. Sessions are managed via JWT tokens
4. Protected routes require authentication
5. Admin users have access to user management and audit logs

### Stock Prediction Flow
1. Historical stock prices are normalized to 0-1 range for neural network training
2. Price sequences of 5 consecutive days are created as training inputs
3. Brain.js neural network is trained on the historical data
4. Predictions are made for the next trading day
5. Results are displayed with confidence scores and trend analysis

### User Experience Flow
1. **Landing Page**: Professional marketing page with feature highlights
2. **Authentication**: Secure login/register with multiple options
3. **Dashboard**: AI-powered stock prediction interface
4. **Profile**: Personal information and preferences management
5. **Settings**: Comprehensive application configuration
6. **Admin Panel**: User management and audit logging (admin only)

### Admin Features
1. **User Management**: View all users and modify their roles
2. **Audit Logging**: Track all administrative actions with timestamps
3. **Security Checks**: Prevent self-demotion and last admin removal
4. **Role-Based Access**: Admin-only routes and functionality

## 🎨 UI/UX Features

### Design System
- **Dark Theme**: Professional dark gradient backgrounds
- **Glassmorphism**: Modern frosted glass effects with backdrop blur
- **Vibrant Gradients**: Blue-purple-pink color scheme
- **Smooth Animations**: Subtle hover effects and transitions
- **High Contrast**: Optimized text visibility and accessibility

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets and intuitive navigation
- **Progressive Enhancement**: Works on all devices and browsers

### Interactive Elements
- **Hover Effects**: Smooth transitions and visual feedback
- **Loading States**: Professional loading spinners and progress indicators
- **Error Handling**: User-friendly error messages and validation
- **Success Feedback**: Confirmation messages and visual cues

## 🔒 Security Features

- **Password Security**: bcryptjs hashing with salt rounds
- **Session Management**: JWT-based stateless sessions
- **Route Protection**: Middleware-based access control
- **Input Validation**: Server-side validation for all inputs
- **Audit Trail**: Complete logging of administrative actions
- **Role-Based Security**: Granular permissions system
- **Two-Factor Authentication**: Enhanced security options
- **Data Privacy**: User-controlled data collection settings

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── admin/         # Admin API endpoints
│   │   ├── register/      # User registration
│   │   └── reset/         # Password reset
│   ├── admin/             # Admin pages
│   ├── dashboard/         # Protected dashboard
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── profile/           # User profile page
│   ├── settings/          # User settings page
│   └── globals.css        # Global styles and animations
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── StockPredictor.tsx # Main prediction component
│   ├── stock-chart.tsx   # Chart visualization
│   ├── prediction-results.tsx # Results display
│   ├── NavBar.tsx        # Navigation component
│   └── LoadingSpinner.tsx # Loading component
├── lib/                  # Utilities and configurations
│   ├── mongodb.ts        # Database connection
│   ├── brain-model.ts    # Neural network logic
│   ├── audit.ts          # Audit logging
│   └── utils.ts          # Helper functions
├── data/                 # Static data
│   └── stock-data.ts     # Historical stock data
└── middleware.ts         # Route protection
```

## 🚀 Deployment

This application is ready for deployment on:
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative hosting option
- **Railway**: Full-stack deployment platform

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- `MONGODB_URI`: Production MongoDB connection string
- `NEXTAUTH_SECRET`: Secure random string
- `NEXTAUTH_URL`: Your production domain
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: OAuth credentials

## 🎯 Key Features Summary

### For Users
- ✅ **AI-Powered Stock Predictions** with confidence scoring
- ✅ **Professional Profile Management** with statistics tracking
- ✅ **Comprehensive Settings Dashboard** with privacy controls
- ✅ **Modern Dark Theme** with glassmorphism effects
- ✅ **Responsive Design** that works on all devices
- ✅ **Secure Authentication** with multiple login options

### For Administrators
- ✅ **User Management** with role-based access control
- ✅ **Audit Logging** for complete action tracking
- ✅ **Security Features** with two-factor authentication
- ✅ **Admin Dashboard** with comprehensive controls

### Technical Excellence
- ✅ **TypeScript** for type safety
- ✅ **Modern React** with hooks and server components
- ✅ **Professional UI/UX** with accessibility features
- ✅ **Scalable Architecture** ready for production
- ✅ **Comprehensive Error Handling** and validation

## 📝 License

This project is for educational purposes. The stock predictions should not be used as financial advice.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Disclaimer**: This AI prediction tool is for educational and demonstration purposes only. Stock market predictions are inherently uncertain and should not be used as financial advice. Always consult with qualified financial professionals before making investment decisions.

## 🏆 Recent Updates

### v2.0 - Professional UI/UX Overhaul
- ✨ **Complete UI Redesign**: Modern dark theme with glassmorphism
- ✨ **Profile & Settings Pages**: Full user management system
- ✨ **Enhanced Navigation**: Professional dropdown menus
- ✨ **Improved Accessibility**: Better contrast and text visibility
- ✨ **Responsive Design**: Mobile-optimized interface
- ✨ **Animation System**: Smooth transitions and hover effects
- ✨ **Professional Branding**: Consistent StockAI identity throughout

### v1.0 - Core Features
- ✅ **AI Stock Prediction**: Neural network-powered predictions
- ✅ **Authentication System**: Secure user management
- ✅ **Admin Dashboard**: User management and audit logging
- ✅ **Interactive Charts**: Real-time data visualization
- ✅ **Role-Based Access**: Granular security controls

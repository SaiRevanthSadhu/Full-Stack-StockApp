# Setup Guide

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB (Required)
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/your_db

# NextAuth (Required)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Notifications (Optional)
SLACK_WEBHOOK_URL=your-slack-webhook-url
ADMIN_ALERT_EMAIL=admin@example.com
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** (see above)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string and add it to `.env.local`

## Google OAuth Setup (Optional)

1. Go to https://console.developers.google.com
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add the client ID and secret to `.env.local`

## Creating an Admin User

To create an admin user, you can either:

1. **Register normally and update in MongoDB:**
   ```javascript
   // In MongoDB Atlas or local MongoDB
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Or modify the registration API temporarily** to create an admin user

## Features Available

- ✅ User registration and login
- ✅ Google OAuth login
- ✅ Protected dashboard with stock predictions
- ✅ Admin user management
- ✅ Audit logging
- ✅ Role-based access control
- ✅ AI-powered stock predictions
- ✅ Interactive charts and visualizations

## Troubleshooting

### Common Issues:

1. **"Module not found" errors**: Run `npm install` to ensure all dependencies are installed
2. **MongoDB connection errors**: Check your `MONGODB_URI` in `.env.local`
3. **NextAuth errors**: Ensure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set
4. **Google OAuth errors**: Verify your Google OAuth credentials and redirect URI

### Development Tips:

- Use the browser's developer tools to check for console errors
- Check the terminal for server-side error messages
- Ensure all environment variables are properly set
- Restart the development server after changing environment variables 
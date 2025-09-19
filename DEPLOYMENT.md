# DevDecks Deployment Guide

## Deploy to Vercel (Recommended)

### Prerequisites

1. **Vercel account** - Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas** - Free database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **GitHub repository** - Push your code to GitHub

### Step 1: Prepare Your Environment

1. **Set up MongoDB Atlas:**

   ```bash
   # Copy environment file
   cp .env.example .env
   ```

   Edit `.env` with your MongoDB Atlas connection string:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devdecks
   ```

2. **Build the project:**
   ```bash
   npm run build:full
   ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: devdecks
# - Directory: ./
# - Override settings? No
```

#### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings from `vercel.json`

### Step 3: Configure Environment Variables

In Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `NODE_ENV` = production

### Step 4: Deploy

Click "Deploy" and wait for it to complete!

## Your App Will Be Available At:

- **Frontend:** `https://your-project.vercel.app`
- **API:** `https://your-project.vercel.app/api/health`

## Testing Your Deployment

1. **Check API health:**

   ```bash
   curl https://your-project.vercel.app/api/health
   ```

2. **Test the frontend:**
   - Visit your Vercel URL
   - Try taking a quiz
   - Check the admin panel

## Troubleshooting

### If API doesn't work:

1. Check MongoDB Atlas connection
2. Verify environment variables in Vercel
3. Check Vercel function logs

### If frontend doesn't load:

1. Check if `npm run build` completed successfully
2. Verify `vercel.json` configuration

## Alternative: Split Repository

If you prefer separate repos:

### Frontend Repository:

- Contains only `src/`, `public/`, `package.json`, etc.
- Deploy to Vercel as static site

### Backend Repository:

- Contains only `api/` folder
- Deploy to Vercel as serverless functions

**But the monorepo approach is simpler and recommended!**

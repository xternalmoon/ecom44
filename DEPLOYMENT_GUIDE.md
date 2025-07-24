# Free Deployment Guide for Baby Clothing Store

## Option 1: Render (Recommended for Full-Stack Apps)

### Why Render?
- Free tier includes PostgreSQL database
- Supports Node.js applications
- Automatic SSL certificates
- Easy deployment from GitHub

### Step-by-Step Render Deployment

**1. Prepare Your Repository**
- Push your code to GitHub
- Ensure all files are committed

**2. Set Up Database**
- Go to [render.com](https://render.com) and sign up
- Create new PostgreSQL database (free tier: 1GB storage)
- Note down the database URL

**3. Deploy Your App**
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure settings:
  - **Name**: baby-clothing-store
  - **Environment**: Node
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`

**4. Environment Variables**
Add these in Render dashboard:
```
DATABASE_URL=your_postgres_url_from_step_2
SESSION_SECRET=your_random_secret_key
NODE_ENV=production
```

**5. Deploy**
- Click "Create Web Service"
- Wait 5-10 minutes for build and deployment

---

## Option 2: Railway

### Why Railway?
- Generous free tier
- Built-in PostgreSQL
- Simple deployment process

### Step-by-Step Railway Deployment

**1. Setup**
- Go to [railway.app](https://railway.app) and sign up
- Install Railway CLI: `npm install -g @railway/cli`

**2. Deploy Database**
- Click "New Project" → "Provision PostgreSQL"
- Note the database URL from variables tab

**3. Deploy App**
- In your project root: `railway login`
- Run: `railway init`
- Run: `railway up`

**4. Set Environment Variables**
```bash
railway variables set DATABASE_URL=your_postgres_url
railway variables set SESSION_SECRET=random_secret_key
railway variables set NODE_ENV=production
```

---

## Option 3: Vercel + PlanetScale (Frontend Focus)

### Why This Combo?
- Vercel excels at frontend deployment
- PlanetScale provides free MySQL database
- Serverless architecture

### Step-by-Step Vercel Deployment

**1. Prepare for Serverless**
- Convert Express routes to Vercel API routes
- Update database to MySQL (PlanetScale)

**2. Database Setup**
- Sign up at [planetscale.com](https://planetscale.com)
- Create database branch
- Get connection string

**3. Deploy to Vercel**
- Push to GitHub
- Connect GitHub to Vercel
- Set environment variables
- Deploy automatically

---

## Option 4: Fly.io

### Why Fly.io?
- Free tier includes 3 VMs
- Supports full-stack apps
- Global deployment

### Step-by-Step Fly.io Deployment

**1. Install CLI**
```bash
curl -L https://fly.io/install.sh | sh
```

**2. Setup App**
```bash
fly auth login
fly launch
```

**3. Add Database**
```bash
fly postgres create
fly postgres attach
```

**4. Deploy**
```bash
fly deploy
```

---

## Recommended Free Deployment Strategy

**For Your Baby Clothing Store:**

1. **Render** (Best choice)
   - Free PostgreSQL database (1GB)
   - Free web service (512MB RAM)
   - Auto-sleep after 15 minutes of inactivity
   - Perfect for your current setup

2. **Railway** (Alternative)
   - $5/month after free usage
   - More reliable than Render
   - Better performance

3. **Vercel + PlanetScale** (If you want to refactor)
   - Requires converting to serverless
   - Better for high-traffic sites
   - More complex setup

---

## Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables identified
- [ ] Database migration strategy planned
- [ ] Build command tested locally
- [ ] Production dependencies verified

---

## Free Tier Limitations

**Render Free Tier:**
- 512MB RAM
- App sleeps after 15min inactivity
- 1GB PostgreSQL storage
- 100GB bandwidth/month

**Railway Free Tier:**
- $5 monthly credit
- Usage-based billing after credit

**Vercel Free Tier:**
- 100GB bandwidth
- Serverless functions only
- External database required

Choose Render for easiest setup with your current architecture!
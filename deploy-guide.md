# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- PostgreSQL database (recommend Neon or Vercel Postgres)

### 2. Environment Variables
Add these to Vercel dashboard:

```
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secure-random-string-here
```

### 3. Database Setup
Using Neon (recommended):
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string to `DATABASE_URL`

### 4. Deploy to Vercel
1. Connect your GitHub repo to Vercel
2. Add environment variables
3. Deploy

### 5. Post-Deploy Setup
Run database migration:
```bash
npx drizzle-kit push
```

Add sample categories via SQL:
```sql
INSERT INTO categories (name, slug, description) VALUES 
('Baby Clothing', 'baby-clothing', 'Comfortable clothing for babies 0-24 months'),
('Kid Clothing', 'kid-clothing', 'Trendy clothing for children 2-12 years'),
('Teen Clothing', 'teen-clothing', 'Stylish clothing for teenagers 13-18 years'),
('Accessories', 'accessories', 'Baby and kids accessories'),
('Footwear', 'footwear', 'Comfortable shoes and booties');
```

## Configuration Files

### vercel.json
- Configured for serverless functions
- Handles API routes through `/api/index.ts`
- Static files served from `/dist/public`

### Key Optimizations Made
1. Removed unnecessary dependencies (Replit-specific packages)
2. Optimized session configuration for Vercel
3. Added proper CORS and security headers
4. Configured build process for static files
5. Created serverless function for API routes
6. Added proper error handling and logging

## Troubleshooting

### Build Issues
- Make sure all dependencies are in `package.json`
- Check that TypeScript compiles without errors
- Verify environment variables are set

### Database Connection
- Ensure `DATABASE_URL` is correctly formatted
- Check database allows connections from Vercel IPs
- Verify SSL settings if required

### Session Issues
- `SESSION_SECRET` must be set for authentication
- Cookies need proper `secure` settings for HTTPS
- Check `sameSite` settings for cross-origin requests

The application is now optimized for Vercel deployment with proper serverless architecture!
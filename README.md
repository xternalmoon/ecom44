# Baby Clothing E-Commerce Store

A full-stack e-commerce application for baby clothing built with modern technologies.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo&env=DATABASE_URL,SESSION_SECRET)

### Environment Variables

Set these environment variables in Vercel:

- `DATABASE_URL` - PostgreSQL connection string (use Neon or Vercel Postgres)
- `SESSION_SECRET` - A secure random string for session encryption

### Quick Setup

1. **Deploy to Vercel**:
   - Click the deploy button above
   - Connect your GitHub repository
   - Add environment variables

2. **Database Setup**:
   - Create a PostgreSQL database (recommended: Neon)
   - Copy the connection URL to `DATABASE_URL`
   - Run the database migration: `npm run db:push`

3. **Initialize Data**:
   - The app will automatically create the necessary database tables
   - You can add sample categories and products through the admin interface

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + Shadcn/ui
- **Backend**: Node.js + Express + TypeScript + Drizzle ORM
- **Database**: PostgreSQL with session storage
- **Authentication**: Email/password with bcrypt + express-session
- **Deployment**: Optimized for Vercel

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Features

- User authentication and role-based access
- Product catalog with categories and filtering
- Shopping cart and checkout process
- Admin dashboard for product management
- Order management and history
- Wishlist functionality
- Product reviews and ratings
- Mobile-responsive design

## Architecture

- **Frontend**: React SPA with client-side routing (Wouter)
- **Backend**: Express API with TypeScript and Drizzle ORM
- **Database**: PostgreSQL with proper relationships and constraints
- **Security**: Bcrypt password hashing, secure sessions, input validation
- **Performance**: React Query caching, optimized builds, code splitting
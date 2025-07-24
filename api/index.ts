// Vercel API entry point - handles all API routes
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app instance
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Trust Vercel proxy
app.set('trust proxy', 1);

let isInitialized = false;

// Initialize routes only once
const initializeApp = async () => {
  if (!isInitialized) {
    try {
      await registerRoutes(app);
      
      // Global error handler
      app.use((err: any, req: any, res: any, next: any) => {
        console.error('API Error:', err);
        const status = err.status || err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).json({ message });
      });
      
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize app:', error);
      throw error;
    }
  }
  return app;
};

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await initializeApp();
    
    // Handle the request
    app(req as any, res as any);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
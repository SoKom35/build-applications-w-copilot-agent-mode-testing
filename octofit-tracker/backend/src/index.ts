import express from 'express';
import type { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);

// Middleware
app.use(express.json());

// Helper function to get API URL
// Supports Codespaces with $CODESPACE_NAME and localhost fallback
function getApiUrl(): string {
  // When running in GitHub Codespaces, use the Codespaces domain
  // Format: https://{CODESPACE_NAME}-8000.app.github.dev
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Fallback to localhost for local development
  return `http://localhost:${PORT}`;
}

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  const apiUrl = getApiUrl();
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    apiUrl,
    endpoints: {
      users: `${apiUrl}/api/users/`,
      teams: `${apiUrl}/api/teams/`,
      activities: `${apiUrl}/api/activities/`,
      leaderboard: `${apiUrl}/api/leaderboard/`,
      workouts: `${apiUrl}/api/workouts/`,
    },
  });
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    const apiUrl = getApiUrl();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Server listening on port ${PORT}`);
      console.log(`✓ API URL: ${apiUrl}`);
      console.log(`✓ MongoDB connected to octofit_db`);
      console.log(`✓ Available endpoints:`);
      console.log(`  - GET  ${apiUrl}/`);
      console.log(`  - GET  ${apiUrl}/health`);
      console.log(`  - GET  ${apiUrl}/api/users/`);
      console.log(`  - POST ${apiUrl}/api/users/`);
      console.log(`  - GET  ${apiUrl}/api/teams/`);
      console.log(`  - POST ${apiUrl}/api/teams/`);
      console.log(`  - GET  ${apiUrl}/api/activities/`);
      console.log(`  - POST ${apiUrl}/api/activities/`);
      console.log(`  - GET  ${apiUrl}/api/leaderboard/`);
      console.log(`  - GET  ${apiUrl}/api/workouts/`);
      console.log(`  - POST ${apiUrl}/api/workouts/`);
    });
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  });

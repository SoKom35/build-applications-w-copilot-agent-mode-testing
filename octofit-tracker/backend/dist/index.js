import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
// Middleware
app.use(express.json());
// Helper function to get API URL
function getApiUrl() {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    if (process.env.GITHUB_CODESPACES === 'true') {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
}
// Root endpoint
app.get('/', (req, res) => {
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
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// Connect to MongoDB and start server
mongoose
    .connect(MONGO_URI)
    .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        const apiUrl = getApiUrl();
        console.log(`✓ Server listening on port ${PORT}`);
        console.log(`✓ API URL: ${apiUrl}`);
        console.log(`✓ MongoDB connected to ${MONGO_URI}`);
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
//# sourceMappingURL=index.js.map
import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({
        message: 'Get global leaderboard',
        endpoint: '/api/leaderboard/',
        rankings: []
    });
});
router.get('/teams', (req, res) => {
    res.json({
        message: 'Get team leaderboard',
        endpoint: '/api/leaderboard/teams',
        rankings: []
    });
});
router.get('/users', (req, res) => {
    res.json({
        message: 'Get user leaderboard',
        endpoint: '/api/leaderboard/users',
        rankings: []
    });
});
export default router;
//# sourceMappingURL=leaderboard.js.map
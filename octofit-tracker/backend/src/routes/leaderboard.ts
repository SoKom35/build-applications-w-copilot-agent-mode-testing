import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Get global leaderboard',
    endpoint: '/api/leaderboard/',
    rankings: []
  });
});

router.get('/teams', (req: Request, res: Response) => {
  res.json({ 
    message: 'Get team leaderboard',
    endpoint: '/api/leaderboard/teams',
    rankings: []
  });
});

router.get('/users', (req: Request, res: Response) => {
  res.json({ 
    message: 'Get user leaderboard',
    endpoint: '/api/leaderboard/users',
    rankings: []
  });
});

export default router;

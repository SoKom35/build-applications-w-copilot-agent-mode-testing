import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams', endpoint: '/api/teams/' });
});

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new team', endpoint: '/api/teams/' });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team ${id}`, endpoint: `/api/teams/${id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update team ${id}`, endpoint: `/api/teams/${id}` });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete team ${id}`, endpoint: `/api/teams/${id}` });
});

export default router;

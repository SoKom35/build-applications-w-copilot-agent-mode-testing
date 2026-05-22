import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all workout suggestions', endpoint: '/api/workouts/' });
});

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create personalized workout suggestion', endpoint: '/api/workouts/' });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get workout ${id}`, endpoint: `/api/workouts/${id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update workout ${id}`, endpoint: `/api/workouts/${id}` });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete workout ${id}`, endpoint: `/api/workouts/${id}` });
});

export default router;

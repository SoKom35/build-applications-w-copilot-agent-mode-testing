import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities', endpoint: '/api/activities/' });
});

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Log a new activity', endpoint: '/api/activities/' });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get activity ${id}`, endpoint: `/api/activities/${id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update activity ${id}`, endpoint: `/api/activities/${id}` });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete activity ${id}`, endpoint: `/api/activities/${id}` });
});

export default router;

import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users', endpoint: '/api/users/' });
});

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create a new user', endpoint: '/api/users/' });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}`, endpoint: `/api/users/${id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update user ${id}`, endpoint: `/api/users/${id}` });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete user ${id}`, endpoint: `/api/users/${id}` });
});

export default router;

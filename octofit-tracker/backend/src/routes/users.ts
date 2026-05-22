import { Router } from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/User.js';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, username } = req.body;
    if (!name || !email || !username) {
      res.status(400).json({ error: 'Missing required fields: name, email, username' });
      return;
    }
    const user = new User({ name, email, username });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific user
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, username },
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;

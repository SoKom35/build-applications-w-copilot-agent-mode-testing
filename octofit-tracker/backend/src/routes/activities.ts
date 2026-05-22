import { Router } from 'express';
import type { Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Log a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, description, duration, calories, date } = req.body;
    if (!userId || !type || !duration || calories === undefined) {
      res.status(400).json({ error: 'Missing required fields: userId, type, duration, calories' });
      return;
    }
    const activity = new Activity({ userId, type, description, duration, calories, date });
    await activity.save();
    await activity.populate('userId');
    res.status(201).json(activity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific activity
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Update an activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { type, description, duration, calories, date } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, description, duration, calories, date },
      { new: true, runValidators: true }
    ).populate('userId');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted', activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;

import { Router } from 'express';
import type { Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Create a personalized workout suggestion
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, difficulty, duration, targetCalories, exercises } = req.body;
    if (!userId || !name || !duration || targetCalories === undefined) {
      res.status(400).json({ error: 'Missing required fields: userId, name, duration, targetCalories' });
      return;
    }
    const workout = new Workout({
      userId,
      name,
      description,
      difficulty: difficulty || 'beginner',
      duration,
      targetCalories,
      exercises: exercises || [],
    });
    await workout.save();
    await workout.populate('userId');
    res.status(201).json(workout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific workout
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Update a workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, difficulty, duration, targetCalories, exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, description, difficulty, duration, targetCalories, exercises },
      { new: true, runValidators: true }
    ).populate('userId');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json({ message: 'Workout deleted', workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;

import { Router } from 'express';
import type { Request, Response } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Create a new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Team name is required' });
      return;
    }
    const team = new Team({ name, description, members: members || [] });
    await team.save();
    await team.populate('members');
    res.status(201).json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific team
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Update a team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description, members },
      { new: true, runValidators: true }
    ).populate('members');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json({ message: 'Team deleted', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;

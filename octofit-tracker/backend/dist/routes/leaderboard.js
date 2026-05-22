import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
const router = Router();
// Get global leaderboard (ranked by total calories burned)
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().populate('userId');
        const userStats = {};
        activities.forEach((activity) => {
            const userId = activity.userId._id.toString();
            if (!userStats[userId]) {
                userStats[userId] = {
                    user: activity.userId,
                    totalCalories: 0,
                    totalDuration: 0,
                    activitiesCount: 0,
                };
            }
            userStats[userId].totalCalories += activity.calories || 0;
            userStats[userId].totalDuration += activity.duration || 0;
            userStats[userId].activitiesCount += 1;
        });
        const rankings = Object.values(userStats)
            .sort((a, b) => b.totalCalories - a.totalCalories)
            .map((stat, index) => ({
            rank: index + 1,
            ...stat,
        }));
        res.json({ message: 'Global leaderboard', endpoint: '/api/leaderboard/', rankings });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// Get team leaderboard (ranked by total team calories)
router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find().populate('members');
        const activities = await Activity.find().populate('userId');
        const teamStats = {};
        teams.forEach((team) => {
            teamStats[team._id.toString()] = {
                team,
                totalCalories: 0,
                totalDuration: 0,
                activitiesCount: 0,
            };
        });
        activities.forEach((activity) => {
            const userId = activity.userId._id.toString();
            for (const [teamId, stats] of Object.entries(teamStats)) {
                const team = stats.team;
                const memberIds = team.members.map((m) => m._id.toString());
                if (memberIds.includes(userId)) {
                    stats.totalCalories += activity.calories || 0;
                    stats.totalDuration += activity.duration || 0;
                    stats.activitiesCount += 1;
                }
            }
        });
        const rankings = Object.values(teamStats)
            .sort((a, b) => b.totalCalories - a.totalCalories)
            .map((stat, index) => ({
            rank: index + 1,
            ...stat,
        }));
        res.json({ message: 'Team leaderboard', endpoint: '/api/leaderboard/teams', rankings });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// Get user leaderboard
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        const activities = await Activity.find();
        const userStats = {};
        users.forEach((user) => {
            userStats[user._id.toString()] = {
                user,
                totalCalories: 0,
                totalDuration: 0,
                activitiesCount: 0,
            };
        });
        activities.forEach((activity) => {
            const userId = activity.userId.toString();
            if (userStats[userId]) {
                userStats[userId].totalCalories += activity.calories || 0;
                userStats[userId].totalDuration += activity.duration || 0;
                userStats[userId].activitiesCount += 1;
            }
        });
        const rankings = Object.values(userStats)
            .sort((a, b) => b.totalCalories - a.totalCalories)
            .map((stat, index) => ({
            rank: index + 1,
            ...stat,
        }));
        res.json({ message: 'User leaderboard', endpoint: '/api/leaderboard/users', rankings });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user leaderboard' });
    }
});
export default router;
//# sourceMappingURL=leaderboard.js.map
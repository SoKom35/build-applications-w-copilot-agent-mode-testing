import mongoose from 'mongoose';
import { User } from './src/models/User.js';
import { Team } from './src/models/Team.js';
import { Activity } from './src/models/Activity.js';
import { Workout } from './src/models/Workout.js';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        // Clear existing data
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Workout.deleteMany({});
        console.log('Cleared existing data');
        // Create sample users
        const users = await User.insertMany([
            { name: 'Alice Johnson', email: 'alice@example.com', username: 'alice_fit' },
            { name: 'Bob Smith', email: 'bob@example.com', username: 'bob_runner' },
            { name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlie_gym' },
            { name: 'Diana Prince', email: 'diana@example.com', username: 'diana_yoga' },
            { name: 'Eve Wilson', email: 'eve@example.com', username: 'eve_cyclist' },
        ]);
        console.log(`Created ${users.length} users`);
        // Create sample teams
        const teams = await Team.insertMany([
            {
                name: 'The Fitness Warriors',
                description: 'A team dedicated to fitness and wellness',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Healthy Habits',
                description: 'Building healthy habits together',
                members: [users[2]._id, users[3]._id, users[4]._id],
            },
        ]);
        console.log(`Created ${teams.length} teams`);
        // Create sample activities
        const activities = await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'running',
                description: 'Morning 5K run',
                duration: 30,
                calories: 300,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[0]._id,
                type: 'gym',
                description: 'Chest and triceps workout',
                duration: 60,
                calories: 400,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                description: 'Mountain biking trail',
                duration: 90,
                calories: 600,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id,
                type: 'swimming',
                description: 'Lap swimming session',
                duration: 45,
                calories: 450,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[3]._id,
                type: 'yoga',
                description: 'Vinyasa flow class',
                duration: 60,
                calories: 200,
                date: new Date(),
            },
            {
                userId: users[4]._id,
                type: 'cycling',
                description: 'Road cycling',
                duration: 120,
                calories: 800,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create sample workouts
        const workouts = await Workout.insertMany([
            {
                userId: users[0]._id,
                name: 'Beginner Strength Training',
                description: 'Perfect for someone just starting their fitness journey',
                difficulty: 'beginner',
                duration: 45,
                targetCalories: 300,
                exercises: ['Push-ups', 'Squats', 'Planks', 'Lunges'],
            },
            {
                userId: users[1]._id,
                name: 'HIIT Cardio Blast',
                description: 'High-intensity interval training for maximum calorie burn',
                difficulty: 'advanced',
                duration: 30,
                targetCalories: 400,
                exercises: ['Burpees', 'Jump squats', 'Mountain climbers', 'High knees'],
            },
            {
                userId: users[2]._id,
                name: 'Full Body Circuit',
                description: 'Complete workout hitting all major muscle groups',
                difficulty: 'intermediate',
                duration: 60,
                targetCalories: 500,
                exercises: ['Deadlifts', 'Bench press', 'Rows', 'Leg press', 'Pull-ups'],
            },
            {
                userId: users[3]._id,
                name: 'Relaxing Yoga Flow',
                description: 'Gentle yoga for flexibility and relaxation',
                difficulty: 'beginner',
                duration: 60,
                targetCalories: 150,
                exercises: ['Child pose', 'Downward dog', 'Warrior poses', 'Savasana'],
            },
            {
                userId: users[4]._id,
                name: 'Endurance Cycling',
                description: 'Long-distance cycling for stamina building',
                difficulty: 'intermediate',
                duration: 120,
                targetCalories: 750,
                exercises: ['Steady pace riding', 'Hill climbs', 'Sprint intervals'],
            },
        ]);
        console.log(`Created ${workouts.length} workouts`);
        console.log('\n✓ Database seeding completed successfully!');
        console.log(`✓ Total users: ${users.length}`);
        console.log(`✓ Total teams: ${teams.length}`);
        console.log(`✓ Total activities: ${activities.length}`);
        console.log(`✓ Total workouts: ${workouts.length}`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map
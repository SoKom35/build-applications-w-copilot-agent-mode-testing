import mongoose from 'mongoose';

/**
 * Database configuration for octofit_db
 * Uses mongoose as the ODM for MongoDB connection management
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Connect to MongoDB using mongoose
 */
export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to octofit_db successfully');
  } catch (error) {
    console.error('✗ Failed to connect to database:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectFromDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from database');
  } catch (error) {
    console.error('✗ Failed to disconnect from database:', error);
    throw error;
  }
}

export default { connectToDatabase, disconnectFromDatabase };

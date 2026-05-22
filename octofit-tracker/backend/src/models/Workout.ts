import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  description: string;
  difficulty: string;
  duration: number;
  targetCalories: number;
  exercises: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    duration: {
      type: Number,
      required: true,
    },
    targetCalories: {
      type: Number,
      required: true,
    },
    exercises: [String],
  },
  {
    timestamps: true,
  }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);

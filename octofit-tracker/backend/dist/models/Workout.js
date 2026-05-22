import { Schema, model, Document } from 'mongoose';
const workoutSchema = new Schema({
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
}, {
    timestamps: true,
});
export const Workout = model('Workout', workoutSchema);
//# sourceMappingURL=Workout.js.map
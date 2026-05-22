import { Schema, model, Document } from 'mongoose';
const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking'],
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
export const Activity = model('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map
import { Schema, model, Document } from 'mongoose';
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    timestamps: true,
});
export const Team = model('Team', teamSchema);
//# sourceMappingURL=Team.js.map
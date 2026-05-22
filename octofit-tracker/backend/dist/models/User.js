import { Schema, model, Document } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});
export const User = model('User', userSchema);
//# sourceMappingURL=User.js.map
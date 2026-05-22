import { Schema, Document } from 'mongoose';
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
export declare const Workout: import("mongoose").Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, import("mongoose").DefaultSchemaOptions> & IWorkout & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
//# sourceMappingURL=Workout.d.ts.map
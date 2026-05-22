import { Schema, Document } from 'mongoose';
export interface IActivity extends Document {
    userId: Schema.Types.ObjectId;
    type: string;
    description: string;
    duration: number;
    calories: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Activity: import("mongoose").Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, import("mongoose").DefaultSchemaOptions> & IActivity & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
//# sourceMappingURL=Activity.d.ts.map
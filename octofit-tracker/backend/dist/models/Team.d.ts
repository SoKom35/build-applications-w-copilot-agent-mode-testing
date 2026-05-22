import { Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    description: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Team: import("mongoose").Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, import("mongoose").DefaultSchemaOptions> & ITeam & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
//# sourceMappingURL=Team.d.ts.map
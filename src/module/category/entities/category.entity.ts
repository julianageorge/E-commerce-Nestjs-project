import { Types } from "mongoose"

export class Category {
    readonly _id:Types.ObjectId;
    name:string;
    slug:string;
    creadtedBy:Types.ObjectId;
    logo:object;
}

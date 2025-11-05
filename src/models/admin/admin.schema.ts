import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:true,discriminatorKey:"role",toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Admin{
     readonly _id:Types.ObjectId;
    UserName:string;
    email:string;
    password:string;

}
export const AdminSchema=SchemaFactory.createForClass(Admin); 
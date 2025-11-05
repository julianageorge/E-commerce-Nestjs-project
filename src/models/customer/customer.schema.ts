import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:true,discriminatorKey:"role",toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Customer{
    readonly _id:Types.ObjectId;
    UserName:string;
    email:string;
    password:string;
    @Prop({type:Date})
    dob:Date;
}

export const CustomerSchema=SchemaFactory.createForClass(Customer); 

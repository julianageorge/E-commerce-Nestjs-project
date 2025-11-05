import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:true,discriminatorKey:"role",toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Seller{
    readonly _id:Types.ObjectId;
    UserName:string;
    email:string;
    password:string;
    @Prop({type:String,required:true})
    WhatsappLink:string;
    

}
export const SellerSchema=SchemaFactory.createForClass(Seller); 
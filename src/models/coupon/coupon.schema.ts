
import { DiscountType } from "@common/Types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
export class usedBy{
    @Prop({type:SchemaTypes.ObjectId,ref:"User",required:true})
    customerId:Types.ObjectId;
    @Prop({type:Number})
    count:number;
}

@Schema({timestamps:true})
export class Coupon{
    readonly _id:Types.ObjectId;
    @Prop({type:String,required:true})
    code:string;
    @Prop({type:Number,required:true})
    discountAmount:number;
    @Prop({type:String,enum:DiscountType,default:DiscountType.fixed_amount})
    discountType:DiscountType;
    @Prop({type:Date,required:true})
    fromDate:Date;
    @Prop({type:Date,required:true})
    toDate:Date;
    @Prop({type:SchemaTypes.ObjectId,ref:"User",required:true})
    createdBy:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:"User",required:true})
    updatedBy:Types.ObjectId;
    @Prop({type:Boolean,default:true})
    active:boolean;
    @Prop({type:[usedBy]})
    usedBy:usedBy[];  
    @Prop({type:[usedBy]})
    assignedTo:usedBy[];
}
export const CouponSchema=SchemaFactory.createForClass(Coupon);
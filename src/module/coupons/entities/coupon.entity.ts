import { DiscountType } from "@common/Types";
import { usedBy } from "@models/index";
import { Types } from "mongoose";

export class Coupon {
     readonly _id:Types.ObjectId;
        code:string;
        discountAmount:number;
        discountType:DiscountType;
        fromDate:Date;
        toDate:Date;
        createdBy:Types.ObjectId;
        updatedBy:Types.ObjectId;
        active:boolean;
        usedBy:usedBy[];    
        assignedTo:usedBy[];
}

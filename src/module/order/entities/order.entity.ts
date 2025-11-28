import { OrderStatus, PaymentMethod } from "@common/Types";
import { Address, CouponDetails, OrderProduct } from "@models/index";
import { Types } from "mongoose";

export class Order {
     readonly _id:Types.ObjectId;
        address:Address;
        userId:Types.ObjectId;
        products:OrderProduct[];
        paymentMethod:PaymentMethod;
        status:OrderStatus;
        coupon:CouponDetails;
        totalAmount:number;
}

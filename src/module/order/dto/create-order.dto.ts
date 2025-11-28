import { PaymentMethod } from "@common/Types";
import { CouponDetails } from "@models/index";
import { IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
class AdressDto{
    @IsString()
      street:string;
    @IsString()
        city:string;
    @IsString()
        country:string;
    @IsString()
        code:string;
    @IsString()
        phoneNumber:string;
}
class CouponDetail{
    @IsMongoId()
    couponId:string;
    @IsNumber()
    discountAmount:number;
    @IsString()
    code:string;
}
export class CreateOrderDto {
    @IsObject()
    address:AdressDto;
    @IsString()
    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod:PaymentMethod;
    @IsObject()
    coupon:CouponDetail;

    /*products?:{
        productId:string;
        quantity:number;
    }[];*/
}

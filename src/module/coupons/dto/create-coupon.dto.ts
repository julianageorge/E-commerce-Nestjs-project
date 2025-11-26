import { IsValidtoDate } from "@common/decorator";
import { IsValidDiscount } from "@common/decorator/discount.decorator";
import { DiscountType } from "@common/Types";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString, Length, MinDate, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateCouponDto {
    @IsString()
    @IsNotEmpty()
    @Length(5,5)
     code:string;
    @IsValidDiscount()
    discountAmount:number;
    @IsString()
    @IsEnum(DiscountType)
    discountType:DiscountType;
    @Transform(({value})=>new Date(value))
    @IsDate()
    @MinDate(new Date(Date.now()-24*60*60*1000))
    fromDate:Date;
    @Transform(({value})=>new Date(value))
    @IsDate()
    @IsValidtoDate()
    toDate:Date;
     @IsBoolean()
     active:boolean;
     @IsArray()
     @IsMongoId({each:true})
     assignedTo:Types.ObjectId[];
}

import { AbstractRepositry } from "@models/abstract.repositry";
import { Injectable } from "@nestjs/common";
import { Coupon } from "./coupon.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CouponRepository extends AbstractRepositry<Coupon>{
    constructor(@InjectModel(Coupon.name)private readonly couponModel:Model<Coupon>){
            super(couponModel);
       
    }
    
}
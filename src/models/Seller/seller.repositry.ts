import { Model } from "mongoose";
import { AbstractRepositry } from "../abstract.repositry";
import { Seller } from "./seller.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
@Injectable()
export class SellerRepositry extends AbstractRepositry<Seller>{
    constructor(@InjectModel(Seller.name)sellerModel:Model<Seller>){
        super(sellerModel);
    }
}
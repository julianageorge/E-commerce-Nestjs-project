import { AbstractRepositry } from "@models/abstract.repositry";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository extends AbstractRepositry<Product>{
    constructor(@InjectModel(Product.name)private readonly ProductModel:Model<Product>){
        super(ProductModel)
    }
}
import { AbstractRepositry } from "@models/abstract.repositry";
import { Cart } from "./cart.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class CartRepository extends AbstractRepositry<Cart>{
    constructor(@InjectModel(Cart.name)private readonly CartModel:Model<Cart>){
        super(CartModel)
    }
}
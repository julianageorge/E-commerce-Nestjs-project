import { AbstractRepositry } from "@models/abstract.repositry";
import { Order } from "./order.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class OrderRepository extends AbstractRepositry<Order>{
    constructor(@InjectModel(Order.name)private readonly OrderModel:Model<Order>){
        super(OrderModel);
    }
}
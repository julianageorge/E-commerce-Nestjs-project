import { Injectable } from "@nestjs/common";
import { AbstractRepositry } from "../abstract.repositry";
import { Customer } from "./customer.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
@Injectable()
export class CustomerRepositry extends AbstractRepositry<Customer>{
   constructor(@InjectModel(Customer.name)private readonly customerModel:Model<Customer>){
    super(customerModel)
   }
}
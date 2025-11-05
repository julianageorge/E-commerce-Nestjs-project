import { Model } from "mongoose";
import { AbstractRepositry } from "../abstract.repositry";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./admin.schema";
@Injectable()
export class AdminRepositry extends AbstractRepositry<Admin>{
    constructor(@InjectModel(Admin.name)adminModel:Model<Admin>){
        super(adminModel);
    }
}
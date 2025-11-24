import { AbstractRepositry } from "@models/abstract.repositry";
import { User } from "./user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()

export class UserRepository extends AbstractRepositry<User>{
    constructor(@InjectModel(User.name)userModel:Model<User>){
        super(userModel);
    }
}
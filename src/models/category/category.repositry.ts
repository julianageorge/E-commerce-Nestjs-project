import { AbstractRepositry } from "@models/abstract.repositry";
import { Category } from "./category.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class CategoryRepositry extends AbstractRepositry<Category>{
    constructor(@InjectModel(Category.name)private readonly categoryModel:Model<Category>){
        super(categoryModel)
    }
}
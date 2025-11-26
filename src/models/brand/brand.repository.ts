import { AbstractRepositry } from "@models/abstract.repositry";
import { Brand } from "./brand.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BrandRepository extends AbstractRepositry<Brand>{
    constructor(@InjectModel(Brand.name)private readonly BrandModel:Model<Brand>){
        super(BrandModel)
    }

}
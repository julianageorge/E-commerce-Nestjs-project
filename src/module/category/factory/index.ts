import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import slugify from "slugify";

@Injectable()
export class CategoryFactoryService {

    creatCategory(creatCategoryDto:CreateCategoryDto,user:any){
        const category = new Category();
        category.name=creatCategoryDto.name;
        category.slug=slugify(creatCategoryDto.name,{lower:true,trim:true,replacement:"_"});
        category.creadtedBy=user._id;
        category.logo=creatCategoryDto.logo;
        return category;
    }
}

import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import slugify from "slugify";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryRepositry } from "@models/index";

@Injectable()
export class CategoryFactoryService {
    constructor(private readonly categoryRepository:CategoryRepositry){}

    creatCategory(creatCategoryDto:CreateCategoryDto,user:any){
        const category = new Category();
        category.name=creatCategoryDto.name;
        category.slug=slugify(creatCategoryDto.name,{lower:true,trim:true,replacement:"_"});
        category.creadtedBy=user._id;
        category.updatedBy=user._id;
        category.logo=creatCategoryDto.logo;
        return category;
    }
     async updateCategory(id:string,updateCategoryDto:UpdateCategoryDto,user:any){
        const oldCategory= await this.categoryRepository.getOne({_id:id});
        if(!oldCategory){
            throw new Error("Category not found");
        }
        const category = new Category();
        category.name=updateCategoryDto.name || oldCategory.name;
        category.slug=slugify(updateCategoryDto.name || oldCategory.name,{lower:true,trim:true,replacement:"_"});
        category.logo=updateCategoryDto.logo || oldCategory.logo;
        category.updatedBy=user._id;
        return category;
    }
}

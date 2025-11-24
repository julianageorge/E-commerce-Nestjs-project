import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepositry } from '@models/index';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository:CategoryRepositry){

  }
  async create(category:Category) {
    const categoryExist= await this.categoryRepository.getOne({slug:category.slug});
    if(categoryExist){
      throw new ConflictException("Category already exists");
    }
    return await this.categoryRepository.create(category);
  }

  async findAll(query:any) {
   return await this.categoryRepository.getAll({},{},{limit:query.limit,skip:query.page*query.limit-1})
  }

  async findOne(id: string) {
  const category= await this.categoryRepository.getOne({_id:id},{},{populate:[{path:"createdBy",select:"name"},{path:"updatedBy",select:"name"}]});
  if(!category){
    throw new NotFoundException("Category not found");
  }
  return category;
  }

  async update(id: string, category: Category) {
   const categoryExist= await this.categoryRepository.getOne({slug:category.slug,_id:{$ne:id}});
   if(categoryExist){
     throw new ConflictException("Category already exists");
   }
   return await this.categoryRepository.UpdateOne({_id:id},category,{new:true});
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

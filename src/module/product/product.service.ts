import { BrandService } from '@module/brand/brand.service';
import { CategoryService } from '@module/category/category.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../models';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { messages } from '@common/constant';
import { Types } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(private readonly productRepositry:ProductRepository,private readonly categoryService:CategoryService,
    private readonly brandService:BrandService){}
  async create(product: Product,user:any) {
    const categoryExistence=await this.categoryService.findOne(product.categoryId );
    const brandExistence=await this.brandService.findOne(product.brandId);
    const productExistence=await this.productRepositry.getOne({slug:product.slug,
      $or:[{createdBy:user._id},{updatedBy:user._id}]});
    if(productExistence){
    return await this.update(productExistence._id,product);
    }
    return await this.productRepositry.create(product);

  
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string|Types.ObjectId) {
   const product=await this.productRepositry.getOne({_id:id});
   if(!product){
    throw new NotFoundException(messages.Product.notFound);
   }
   return product;
  }

  async update(id: string | Types.ObjectId, product:Product) {
   const productExistence=await this.findOne(id);
   if(!productExistence){
    throw new NotFoundException(messages.Product.notFound);
   }
   product.stock+=productExistence.stock;
   const colors=this.addToset(product.colors,productExistence.colors);
   product.colors=colors;
   const sizes=this.addToset(product.size,productExistence.size);
   product.size=sizes;
   return await this.productRepositry.UpdateOne({_id:id},product,{new:true});
  }

  async remove(id: string|Types.ObjectId) {
    const productExistence=await this.findOne(id);
    if(!productExistence){
     throw new NotFoundException(messages.Product.notFound);
    }
    return await this.productRepositry.DeleteOne({_id:id});
  }
  addToset(newData:string[],oldData:string[]){
    const set=new Set<string>(oldData);
    for(const data of newData){
      set.add(data);
    }
    return Array.from(set);
  }
}

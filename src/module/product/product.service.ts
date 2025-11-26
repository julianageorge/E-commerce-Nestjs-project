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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string | Types.ObjectId, product:Product) {
   const productExistence=await this.productRepositry.getOne({_id:id});
   if(!productExistence){
    throw new NotFoundException(messages.Product.notFound);
   }
   product.stock+=productExistence.stock;
   const colors=new Set<string>(productExistence.colors);
   for(const color of product.colors){
    colors.add(color);
   }
   product.colors=Array.from(colors);
   const sizes=new Set<string>(productExistence.size);
   for(const size of product.size){
    sizes.add(size);
   }
   product.size=Array.from(sizes);
   return await this.productRepositry.UpdateOne({_id:id},product,{new:true});
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}

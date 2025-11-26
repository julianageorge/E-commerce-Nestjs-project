import { BrandService } from '@module/brand/brand.service';
import { CategoryService } from '@module/category/category.service';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../models';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(private readonly productRepositry:ProductRepository,private readonly categoryService:CategoryService,
    private readonly brandService:BrandService){}
  async create(product: Product) {
    const categoryExistence=await this.categoryService.findOne(product.categoryId );
    const brandExistence=await this.brandService.findOne(product.brandId);
    return await this.productRepositry.create(product);

  
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

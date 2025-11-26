import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, Public, User } from '@common/decorator';
import { ProductFactoryService } from './factory/product.factory';
import { messages } from '@common/constant';
import { TransformInterceptor } from '@common/interceptor';
import { Product } from '@models/index';
import { UseInterceptors } from '@nestjs/common';
@Controller('product')
@UseInterceptors(new TransformInterceptor<Product>())
@Auth(['Admin','Seller'])
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly productFactory:ProductFactoryService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto,@User() user:any) {
    const product=this.productFactory.createProduct(createProductDto,user);
    const createdProduct= await this.productService.create(product,user);
    return {message:messages.Product.Created,success:true,data:createdProduct};
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const product= await this.productService.findOne(id);
    return {message:"Product fetched successfully",success:true,data:product};
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@User() user:any) {
    const product=this.productFactory.updateProduct(updateProductDto,user);
    return await this.productService.update(id,product);
    
   
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}

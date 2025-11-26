import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, User } from '@common/decorator';
import { ProductFactoryService } from './factory/product.factory';
import { messages } from '@common/constant';

@Controller('product')
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
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
   
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

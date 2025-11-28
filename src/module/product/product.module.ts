import { Brand, BrandSchema, Product, ProductRepository, ProductSchema } from '@models/index';
import { BrandModule } from '@module/brand/brand.module';
import { CategoryModule } from '@module/category/category.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/index';
import { ProductFactoryService } from './factory/product.factory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
  imports:[UserMongoModule,MongooseModule.forFeature([{name:Product.name,schema:ProductSchema},
    {name:Brand.name,schema:BrandSchema}]),CategoryModule,BrandModule],
  controllers: [ProductController],
  providers: [ProductService,ProductFactoryService,JwtService,ProductRepository],
  exports:[ProductService,ProductRepository]
})
export class ProductModule {}

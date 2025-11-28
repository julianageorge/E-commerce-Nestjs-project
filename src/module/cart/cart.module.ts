import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductService } from '@module/product/product.service';
import { Cart, CartRepository, CartSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';
import { ProductModule } from '@module/product/product.module';

@Module({
  imports:[UserMongoModule,MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}]),ProductModule],
  controllers: [CartController],
  providers: [CartService,CartRepository,JwtService],
})
export class CartModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';
import { BrandModule } from './module/brand/brand.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema, Customer, CustomerSchema, Seller, SellerSchema, User, UserSchema } from './models';
import { CustomerModule } from '@module/customer/customer.module';
import { CouponsModule } from './module/coupons/coupons.module';
import { CartModule } from './module/cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({load:[devConfig],isGlobal:true}),
    MongooseModule.forRootAsync({inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({uri:configService.get('db').url})
  }),

  AuthModule, ProductModule, CategoryModule, BrandModule, CustomerModule, CouponsModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

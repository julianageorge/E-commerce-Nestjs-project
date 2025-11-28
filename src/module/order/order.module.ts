import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserMongoModule } from '@shared/index';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderRepository, OrderSchema, ProductRepository } from '@models/index';
import { CartModule } from '@module/cart/cart.module';
import { ProductModule } from '@module/product/product.module';

@Module({
  imports:[UserMongoModule,ProductModule,
    MongooseModule.forFeature([{name:Order.name,schema:OrderSchema}]),CartModule
  ],
  controllers: [OrderController],
  providers: [OrderService,JwtService,OrderRepository],
})
export class OrderModule {}

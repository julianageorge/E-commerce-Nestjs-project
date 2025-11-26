import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { couponFactoryService } from './factory/coupon.factory';
import { UserMongoModule } from '@shared/index';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponRepository, CouponSchema } from '@models/index';

@Module({
  imports:[UserMongoModule,MongooseModule.forFeature([{name:Coupon.name,schema:CouponSchema}])],
  controllers: [CouponsController],
  providers: [CouponsService,couponFactoryService,JwtService,CouponRepository],
})
export class CouponsModule {}

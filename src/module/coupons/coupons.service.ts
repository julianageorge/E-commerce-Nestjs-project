import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponRepository } from '@models/index';
import { messages } from '@common/constant';

@Injectable()
export class CouponsService {
  constructor(private readonly couponRepository:CouponRepository){}
  async create(coupon:Coupon) {
    const couponExist=await this.couponRepository.getOne({code:coupon.code,active:true});
    if(couponExist){
      throw new ConflictException(messages.coupon.alreadyExist);
    }
    return await this.couponRepository.create(coupon);
  }

  findAll() {
    return `This action returns all coupons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { couponFactoryService } from './factory/coupon.factory';
import { User } from '@common/decorator';
import { Auth } from '@common/decorator/auth.decorators';
import { messages } from '@common/constant';

@Controller('coupons')
@Auth(["Admin","Seller"])
export class CouponsController {
  constructor(private readonly couponsService: CouponsService,private readonly couponFactoryService:couponFactoryService
  ) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto,@User()user:any) {
    const coupon= this.couponFactoryService.createCoupon(createCouponDto,user);
    const CreatedCoupon=await this.couponsService.create(coupon);
    return {data:CreatedCoupon,message:messages.coupon.Created};
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}

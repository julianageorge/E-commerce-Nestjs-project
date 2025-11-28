import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@module/cart/cart.service';
import { OrderRepository, ProductRepository } from '@models/index';
import { Types } from 'mongoose';
import { DiscountType } from '@common/Types';

@Injectable()
export class OrderService {
  constructor(private readonly cartService:CartService, private readonly orderRepository:OrderRepository
    ,private readonly productRepository:ProductRepository){}
  async create(createOrderDto: CreateOrderDto,user:any) {
    const cart=await this.cartService.findOne(user);
    if(cart.products.length===0){
      throw new NotFoundException("Cart is empty");
    }
    const failProduct:{productId:Types.ObjectId;reason:string}[]=[];
    const successProduct:{productId:Types.ObjectId;quantinty:number,price:number,
      discount:number,discountType:DiscountType,totalPrice:number}[]=[];
    for(const product of cart.products){
      const productExist=await this.productRepository.getOne({_id:product.productId});
      if(!productExist){
        failProduct.push({productId:product.productId,reason:"Product not found"});
        continue;
      }
      if(productExist.stock<product.quantinty){
        failProduct.push({productId:product.productId,reason:"Product stock not enough"});
        continue;
      }
      successProduct.push({
        productId:product.productId,
        quantinty:product.quantinty,
        price:productExist.price,
        discount:productExist.discountAmount,
        discountType:productExist.discountType,
        totalPrice:productExist.finalPrice*product.quantinty});
    }
    if(failProduct.length>0){
      return failProduct;
    }

    const order=await this.orderRepository.create({
      userId:user._id,
      products:successProduct,
      totalAmount:successProduct.reduce((total,product)=>total+product.totalPrice,0),
      address:createOrderDto.address,
      paymentMethod:createOrderDto.paymentMethod,
      coupon:createOrderDto.coupon,
      });
      await this.cartService.ClearCart(user._id);
      return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

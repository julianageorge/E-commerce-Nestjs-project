import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/Add_to_cart';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '@common/decorator';
import { Auth } from '@common/decorator';

@Controller('cart')
@Auth(['Admin','Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async AddToCart(@Body() addToCartDto: AddToCartDto,@User()user:any) {
    const cart=await this.cartService.AddToCart(addToCartDto,user);
    return {message:"Product added to cart",success:true,data:cart}
  }

}

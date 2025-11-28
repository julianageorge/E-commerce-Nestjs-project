import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/Add_to_cart';
import { ProductService } from '@module/product/product.service';
import { CartRepository } from '@models/index';

@Injectable()
export class CartService {
  constructor(private readonly productService:ProductService,private readonly cartRepository:CartRepository){}
  async AddToCart(addToCartDto: AddToCartDto,user:any) {
    const productExistence=await this.productService.findOne(addToCartDto.productId);
    const cartExist=await this.cartRepository.getOne({userId:user._id});
    if(!cartExist){
     return await this.cartRepository.create(
        {userId:user._id,products:[{productId:addToCartDto.productId,
          quantinty:addToCartDto.quantinty}]});
    }
    const index=cartExist.products.findIndex((product)=>product.productId.toString()===addToCartDto.productId.toString());
   if(index==-1){
    cartExist?.products.push({productId:addToCartDto.productId,
      quantinty:addToCartDto.quantinty})
   } 
   else{
    cartExist.products[index].quantinty=addToCartDto.quantinty
   } 
   return await cartExist.save()
  
  }

  
}

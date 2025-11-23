
import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepositry } from '@models/index';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService,private readonly configService:ConfigService,
    private readonly customerRepositry:CustomerRepositry,
    private readonly reflactor:Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const publicVal=this.reflactor.get('PUBLIC',context.getHandler());
    if(publicVal){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const {authorization}=request.headers;
  const payload=  this.jwtService.verify(authorization,{secret:this.configService.get('JWT_SECRET')});
  const customerExist=await this.customerRepositry.getOne({_id:payload._id});
  if(!customerExist){
    throw new NotFoundException("Customer not found")
  }
  request.user=customerExist;
    return true;

  }
}

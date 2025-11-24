
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@models/index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService,private readonly configService:ConfigService,
    private readonly userRepository:UserRepository,
    private readonly reflactor:Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    try{
      const publicVal=this.reflactor.get('PUBLIC',context.getHandler());
    if(publicVal){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const {authorization}=request.headers;
  const payload=  this.jwtService.verify(authorization,{secret:this.configService.get('JWT_SECRET')});
  const customerExist=await this.userRepository.getOne({_id:payload._id});
  if(!customerExist){
    throw new NotFoundException("Customer not found")
  }
  request.user=customerExist;
    return true;

  }
    catch(error){
      throw new UnauthorizedException(error.message);
    }
}
}
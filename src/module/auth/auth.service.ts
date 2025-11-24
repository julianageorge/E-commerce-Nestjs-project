import { Customer, CustomerRepositry, UserRepository } from '@models/index';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SendMail } from '../../common/helpers';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  constructor(private readonly customerRepositry:CustomerRepositry
    ,private readonly jwtService:JwtService,
    private readonly configService:ConfigService,
    private readonly userRepositry:UserRepository
  ){}
  async register(customer:Customer) {
    const customerExist=await this.customerRepositry.getOne({email:customer.email})
    if(customerExist){
      throw new ConflictException("Customer already exists")
    }
   const createdCustomer= await this.customerRepositry.create(customer);
   await SendMail({to:customer.email,subject:"confirm email",html:`<h1>your otp is ${customer.otp}</h1>`})
    const {password,otp,otpExpiry,...Customerobj}=JSON.parse(JSON.stringify(createdCustomer));
    return Customerobj as Customer;
  
  }
  async login(loginDto:LoginDto){
    const customerExist=await this.userRepositry.getOne({email:loginDto.email})
    if(!customerExist){
      throw new UnauthorizedException("Invalid credentials")
    }
    const match=await bcrypt.compare(loginDto.password,customerExist.password)
    if(!match){
      throw new UnauthorizedException("Invalid credentials")
    }
    const token =this.jwtService.sign({_id:customerExist.id,email:customerExist.email},
      {secret:this.configService.get('JWT_SECRET'),expiresIn:'1d'});
      return {token}


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

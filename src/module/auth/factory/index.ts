import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/register.dto";
import { Customer } from "../entities/auth.entity";
import { Injectable } from '@nestjs/common';
import { generateOtp } from '@common/helpers';
@Injectable()
export class AuthFactoryService{
    async createCustomer(registerDto:RegisterDto)
    {
    const customer=new Customer();
    customer.userName=registerDto.userName;
    customer.email=registerDto.email;
    customer.password=await bcrypt.hash(registerDto.password,10);
    customer.dob = registerDto.dob;   
    customer.otp=generateOtp()as unknown as string;
    customer.otpExpiry=new Date(Date.now()+1000*60*60*24);
    customer.isVerified=false;
    return customer;
    }
}
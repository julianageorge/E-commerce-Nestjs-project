import { Customer, CustomerRepositry } from '@models/index';
import { ConflictException, Injectable } from '@nestjs/common';
import { SendMail } from '../../common/helpers';



@Injectable()
export class AuthService {
  constructor(private readonly customerRepositry:CustomerRepositry){}
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

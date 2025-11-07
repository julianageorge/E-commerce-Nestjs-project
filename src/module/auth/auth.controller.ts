import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly authFactoryService:AuthFactoryService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const customer=await this.authFactoryService.createCustomer(registerDto);
    const createdCustomer=await this.authService.register(customer);
    return {message:"customer registered successfully",success:true,data:createdCustomer};
    
  }
 @Post('/login')
 async login(@Body() loginDto:LoginDto){
  const token=await this.authService.login(loginDto);
  return {message:"customer logged in successfully",success:true,data:token};
 }


}

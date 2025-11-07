import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly authFactoryService:AuthFactoryService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const customer=await this.authFactoryService.createCustomer(registerDto);
    const createdCustomer=await this.authService.register(customer);
    return {message:"customer registered successfully",success:true,data:createdCustomer};
    
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

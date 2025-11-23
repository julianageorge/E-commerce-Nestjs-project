import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@common/guard/auth.guard';
import { RolesGuard } from '@common/guard/roles.guard';
import { Roles } from '@common/decorator/role.decorator';
import { Public } from '@common/decorator';

@Controller('customer')
@UseGuards(AuthGuard,RolesGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  @Roles(['Customer'])
  @Public()
  getProfile(@Request() req:any){
return {message:"done",success:true,data:{user:req.user}}

  }
  
}

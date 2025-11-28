import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, User } from '@common/decorator';

@Controller('order')
@Auth(["Customer","Admin"])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
 async create(@Body() createOrderDto: CreateOrderDto,@User() user:any) {
    const result= await this.orderService.create(createOrderDto,user);
    if(result instanceof Array){
      return {success:false,message:"order failed",data:result};
    }
    return {success:true,message:"order success",data:result};

  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

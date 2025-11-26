import { Auth, User } from '@common/decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory/brand.factory';

@Controller('brand')
@Auth(['Admin'])
export class BrandController {
  constructor(private readonly brandService: BrandService, private readonly brandFactory:BrandFactoryService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto,@User()user:any) {
    const brand=this.brandFactory.createBrand(createBrandDto,user);
     const createdBrand=await this.brandService.create(brand);
     return {success:true,message:"Brand created successfully",data:{createdBrand}};
  
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}

import { Auth, Public, User } from '@common/decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory';
@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,private readonly categoryFactory:CategoryFactoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@User()user:any) {
    const category = await this.categoryFactory.creatCategory(createCategoryDto,user);
    const createdCategory=await this.categoryService.create(category);
    return {success:true,message:"Category created successfully",data:{createdCategory}};
  }

  @Get()
  async findAll(@Query() query:any) {
    return await this.categoryService.findAll(query);
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category= await this.categoryService.findOne(id);
    return {success:true,message:"Category found successfully",data:{category}};
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,@User()user:any) {
   const category=await this.categoryFactory.updateCategory(id,updateCategoryDto,user);
   const updatedCategory=await this.categoryService.update(id,category);
   return {success:true,message:"Category updated successfully",data:{updatedCategory}};

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

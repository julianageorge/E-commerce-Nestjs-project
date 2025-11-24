import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepositry, CategorySchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';
@Module({
  imports:[UserMongoModule,MongooseModule.forFeature([{name:"Category",schema:CategorySchema}])],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepositry,CategoryFactoryService,JwtService],
})
export class CategoryModule {}

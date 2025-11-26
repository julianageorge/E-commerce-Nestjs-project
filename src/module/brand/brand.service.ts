import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandRepository } from '@models/index';
import { messages } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository:BrandRepository){}
  async create(brand: Brand) {
    const brandExist=await this.brandRepository.getOne({slug:brand.slug});
    if(brandExist){
      throw new ConflictException(messages.Brand.alreadyExist);
    }
    return await this.brandRepository.create(brand);
    
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: string|Types.ObjectId) {
    const brandExist=this.brandRepository.getOne({_id:id});
    if(!brandExist){
      throw new NotFoundException(messages.Brand.notFound);
    }
    return brandExist;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

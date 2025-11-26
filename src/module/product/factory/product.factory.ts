import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { Types } from "mongoose";
import { UpdateProductDto } from "../dto/update-product.dto";
import { DiscountType } from "@common/Types";

@Injectable()
export class ProductFactoryService{
    createProduct(createProductDto:CreateProductDto,user:any){
        const product=new Product();
        product.name=createProductDto.name;
        product.slug=slugify(createProductDto.name);
        product.description=createProductDto.description;
        product.categoryId=new Types.ObjectId(createProductDto.categoryId);
        product.brandId=new Types.ObjectId(createProductDto.brandId);
        product.createdBy=user._id;
        product.updatedBy=user._id;
        product.price=createProductDto.price;
        product.discountAmount=createProductDto.discountAmount;
        product.discountType=createProductDto.discountType;
        product.stock=createProductDto.stock;
        product.sold=0;
        product.colors=createProductDto.colors;
        product.size=createProductDto.size;
        return product;
    }
    updateProduct(updateProductDto:UpdateProductDto,user:any){
        const product=new Product();
        product.name=updateProductDto.name as string;
        product.slug=slugify(updateProductDto.name as string);
        product.description=updateProductDto.description as string;
        product.categoryId=new Types.ObjectId(updateProductDto.categoryId);
        product.brandId=new Types.ObjectId(updateProductDto.brandId);
        product.createdBy=user._id;
        product.updatedBy=user._id;
        product.price=updateProductDto.price as number;
        product.discountAmount=updateProductDto.discountAmount as number;
        product.discountType=updateProductDto.discountType as DiscountType;
        product.stock=updateProductDto.stock as number;
        product.sold=0;
        product.colors=updateProductDto.colors as string[];
        product.size=updateProductDto.size as string[];
        return product;
    }
    
}
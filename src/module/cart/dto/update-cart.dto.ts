import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDto } from './Add_to_cart';

export class UpdateCartDto extends PartialType(AddToCartDto) {}

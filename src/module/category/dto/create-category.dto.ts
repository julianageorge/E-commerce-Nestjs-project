import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name:string;
    logo:object;
    
}

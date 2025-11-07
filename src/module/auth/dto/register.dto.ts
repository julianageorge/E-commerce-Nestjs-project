import{ IsDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    userName:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) =>{
        return new Date(value)   
})
    dob:string;
}
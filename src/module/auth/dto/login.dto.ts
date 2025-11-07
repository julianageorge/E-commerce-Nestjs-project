import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsString()
   // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    password:string;
}
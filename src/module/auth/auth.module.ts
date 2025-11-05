import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer, CustomerRepositry, CustomerSchema, User, UserSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema,
    discriminators:[{name:Customer.name,schema:CustomerSchema}]}])],
  controllers: [AuthController],
  providers: [AuthService,CustomerRepositry],

})
export class AuthModule {}

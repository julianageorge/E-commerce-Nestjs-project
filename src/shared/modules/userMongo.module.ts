import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminRepositry, AdminSchema, Customer, CustomerRepositry, CustomerSchema, Seller, SellerRepositry, SellerSchema, User, UserRepository, UserSchema } from "src/models";

@Module({
imports:[MongooseModule.forFeature([
    {name:User.name,schema:UserSchema,
    discriminators:[{name:Admin.name,schema:AdminSchema},
        {name:Seller.name,schema:SellerSchema},
        {name:Customer.name,schema:CustomerSchema}]}
])],
controllers:[],
providers:[AdminRepositry,SellerRepositry,CustomerRepositry,UserRepository],
exports:[AdminRepositry,SellerRepositry,CustomerRepositry,UserRepository]
})

export class UserMongoModule{};
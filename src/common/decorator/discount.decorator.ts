import { DiscountType } from "@common/Types";
import { registerDecorator, ValidationOptions,ValidationArguments } from "class-validator";

export function IsValidDiscount(ValidationOptions?:ValidationOptions){
    return function (object: any, propertyName: string) {
        registerDecorator({
            name:'isValidDiscount',
            target:object.constructor,
            propertyName,
            options:ValidationOptions,
            validator:{
                validate(value:any,args:ValidationArguments){
                    
                    const obj=args.object as any;
                    const{discountType}=obj;
                    if(discountType===DiscountType.percentage){
                        return typeof value==='number' && value>=0 && value<=100;
                    }
                    if(discountType===DiscountType.fixed_amount) {
                        return typeof value==='number' && value>=0;
                    }
                    return true;
                },
                defaultMessage(args:ValidationArguments){
                    const obj=args.object as any;
                    const{discountType}=obj;
                    if(discountType===DiscountType.percentage){
                        return 'Discount amount must be a number between 0 and 100';
                    }
                    if(discountType===DiscountType.fixed_amount) {
                        return 'Discount amount must be a number greater than or equal to 0';
                    }
                    return 'Invalid discount type';
                }
            }
        })
    }

} 
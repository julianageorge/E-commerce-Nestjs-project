import { DiscountType } from "@common/Types";
import { registerDecorator, ValidationOptions,ValidationArguments } from "class-validator";

export function IsValidtoDate(ValidationOptions?:ValidationOptions){
    return function (object: any, propertyName: string) {
        registerDecorator({
            name:'isValidtoDate',
            target:object.constructor,
            propertyName,
            options:ValidationOptions,
            validator:{
                validate(value:any,args:ValidationArguments){
                    
                    const obj=args.object as any;
                    const{fromDate}=obj;
                    if(fromDate>value){
                        return false;
                    }
                    return true;
                },
                defaultMessage(args:ValidationArguments){
                    const obj=args.object as any;
                    const{fromDate,toDate}=obj;
                    if(fromDate>toDate){
                        return 'to-date can not exceed from-date';
                    }
                    return 'Invalid to date';
                }
            }
        })
    }

} 
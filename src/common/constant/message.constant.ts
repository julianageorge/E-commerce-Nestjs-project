import { Brand, Category } from "@models/index";
import { Product } from "@module/product/entities/product.entity";

const generateMessage=(entity:string)=>({
    notFound:`${entity} not found`,
    alreadyExist:`${entity} already exist`,
    notAllowed:`${entity} not allowed`,
    Created:`${entity} created successfully`,
    Updated:`${entity} updated successfully`,
    Deleted:`${entity} deleted successfully`,
    FailtoCreate:`Failed to create ${entity}`,  
    FailtoUpdate:`Failed to update ${entity}`,  
    FailtoDelete:`Failed to delete ${entity}`,  
});
export const messages={
    Category:{...generateMessage(Category.name)},
    Brand:{...generateMessage(Brand.name)},
    Product:{...generateMessage(Product.name)},
    coupon:{...generateMessage('coupon')},
}
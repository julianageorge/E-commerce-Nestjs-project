import { Model, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export class AbstractRepositry<T>{
    constructor(private readonly model:Model<T>){}
    public async create(item:Partial<T>){
        const doc=new this.model(item);
        return doc.save();
    };
    public getOne(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>){
        return this.model.findOne(filter,projection,options);
    }
    public getMany(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>){
        return this.model.find(filter,projection,options);
    }
     public UpdateOne(filter:RootFilterQuery<T>,updateQuery:UpdateQuery<T>,options?:QueryOptions<T>){
        return this.model.findOneAndUpdate(filter,updateQuery,options);
    }
    public getAll(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>,query?:any){
       /* let limit=query.limit;
        let skip=query.page*query.limit-1;
        options?.limit=limit;
        options?.skip=skip;*/
        return this.model.find(filter,projection,options);
    }

}
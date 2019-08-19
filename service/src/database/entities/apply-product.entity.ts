import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyProductInput')
export class ApplyProduct extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_projects)
    applicant: User;

    @Field(type => Product, { nullable: true })
    @ManyToOne(type => Product, target => target.applicants)
    product: Product;

}
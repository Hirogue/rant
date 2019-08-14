import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, ManyToMany } from "typeorm";
import { JsonScalar } from "../../core";
import { Base } from "./base";
import { ProductCategory } from "./product-category.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ProductInput')
export class Product extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    cover: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    flowsheet: string;

    @Field(type => JsonScalar, { nullable: true })
    @Column({ type: 'simple-json', nullable: true })
    @ApiModelProperty({ nullable: true })
    flows: any;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    slogan: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    advantage: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    introduction: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => ProductCategory, { nullable: true })
    @ManyToOne(type => ProductCategory, target => target.products)
    @ApiModelProperty({ nullable: true })
    category: ProductCategory;

    @Field(type => User, { nullable: true })
    @ManyToMany(type => User, target => target.apply_products)
    @ApiModelProperty({ nullable: true })
    applicants: User[];
}
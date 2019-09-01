import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectStatusEnum } from "../../core";
import { Base } from "./base";
import { Org } from "./org.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyProductInput')
export class ApplyProduct extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_products)
    applicant: User;

    @Field(type => Product, { nullable: true })
    @ManyToOne(type => Product, target => target.applicants)
    product: Product;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    reason: string;

    @Field(type => Org, { nullable: true })
    @ManyToOne(type => Org)
    @ApiModelProperty({ nullable: true })
    org: Org;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User)
    @ApiModelProperty({ nullable: true })
    own: User;

    @Field({ nullable: true })
    @Column({ default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

}
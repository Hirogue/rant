import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { ProjectStatusEnum } from "../../core";
import { Base } from "./base";
import { Metadata } from "./metadata.entity";
import { ProviderCategory } from "./provider-category.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ProviderInput')
export class Provider extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    logo: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    slogan: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    summary: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    @ApiModelProperty({ nullable: true })
    introduction: string;

    @Field(type => ProviderCategory, { nullable: true })
    @ManyToOne(type => ProviderCategory, target => target.providers)
    @ApiModelProperty({ nullable: true })
    category: ProviderCategory;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.providers)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.providers)
    @ApiModelProperty({ nullable: true })
    creator: User;

    @Field(type => User, { nullable: true })
    @ManyToMany(type => User, target => target.apply_providers)
    @ApiModelProperty({ nullable: true })
    applicants: User[];

    @Field({ nullable: true })
    @Column({ type: 'simple-enum', default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

}
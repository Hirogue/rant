import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProjectStatusEnum } from "../../core";
import { ApplyProvider } from "./apply-provider.entity";
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
    @Column({ nullable: true })
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

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    views: number;

    @Field(type => ProviderCategory, { nullable: true })
    @ManyToOne(type => ProviderCategory, target => target.providers)
    @ApiModelProperty({ nullable: true })
    category: ProviderCategory;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.providers)
    @ApiModelProperty({ nullable: true })
    area: Metadata;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    area_path: string;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.providers)
    @ApiModelProperty({ nullable: true })
    creator: User;

    @Field(type => ApplyProvider, { nullable: true })
    @OneToMany(type => ApplyProvider, target => target.provider)
    @ApiModelProperty({ nullable: true })
    applicants: ApplyProvider[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    reason: string;

    @Field({ nullable: true })
    @Column({ default: ProjectStatusEnum.PENDING })
    @ApiModelProperty({ nullable: true })
    status: ProjectStatusEnum;

}
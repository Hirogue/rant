import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
@ObjectType()
@InputType('CarouselInput')
export class Carousel extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    url: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @ApiModelProperty({ nullable: true })
    link: string;

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: false })
    @ApiModelProperty({ nullable: true })
    is_published: boolean;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

}
import { ApiModelProperty } from '@nestjs/swagger';
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
@ObjectType()
@InputType('LinkInput')
export class Link extends Base {

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    url: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

}
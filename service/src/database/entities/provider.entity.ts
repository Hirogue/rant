import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
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
    name: string;

    @Field({ nullable: true })
    @Column()
    logo: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    slogan: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    introduction: string;

    @Field(type => ProviderCategory, { nullable: true })
    @ManyToOne(type => ProviderCategory, target => target.providers)
    category: ProviderCategory;

    @Field(type => Metadata, { nullable: true })
    @ManyToOne(type => Metadata, target => target.providers)
    area: Metadata;

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.providers)
    creator: User;
}
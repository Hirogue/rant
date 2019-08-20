import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Provider } from "./provider.entity";
import { User } from "./user.entity";

@Entity()
@ObjectType()
@InputType('ApplyProviderInput')
export class ApplyProvider extends Base {

    @Field(type => User, { nullable: true })
    @ManyToOne(type => User, target => target.apply_providers)
    applicant: User;

    @Field(type => Provider, { nullable: true })
    @ManyToOne(type => Provider, target => target.applicants)
    provider: Provider;

}
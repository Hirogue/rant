import { ObjectType, Field, Int, ClassType } from "type-graphql";

export function BasePaginate<TItem>(TItemClass: ClassType<TItem>): any {

    @ObjectType({ isAbstract: true })
    abstract class Paginate {

        @Field(type => Int, { nullable: true })
        count?: number;

        @Field(type => Int, { nullable: true })
        total?: number;

        @Field(type => Int, { nullable: true })
        page?: number;

        @Field(type => Int, { nullable: true })
        pageCount?: number;

        @Field(type => [TItemClass], { nullable: true })
        data?: TItem[];
    }

    return Paginate;
}

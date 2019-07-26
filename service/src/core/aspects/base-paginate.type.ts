import { ObjectType, Field, Int, ClassType } from "type-graphql";

export function BasePaginate<TItem>(TItemClass: ClassType<TItem>): any {

    @ObjectType({ isAbstract: true })
    abstract class Paginate {

        @Field(type => Int)
        count: number;

        @Field(type => Int)
        total: number;

        @Field(type => Int)
        page: number;

        @Field(type => Int)
        pageCount: number;

        @Field(type => [TItemClass])
        data: TItem[];
    }

    return Paginate;
}

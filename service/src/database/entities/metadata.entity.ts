import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, Tree, TreeChildren, TreeParent, ManyToMany } from "typeorm";
import { Base } from "./base";
import { Provider } from "./provider.entity";
import { Project } from "./project.entity";
// import { Capital } from "./capital.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('MetadataInput')
export class Metadata extends Base {
    @Field({ nullable: true })
    @Column()
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    sort: number;

    @Field(type => Metadata, { nullable: true })
    @TreeParent()
    parent: Metadata;

    @Field(type => [Metadata]!, { nullable: true })
    @TreeChildren()
    children: Metadata[];

    @Field(type => [Provider]!, { nullable: true })
    providers: Provider[];

    @Field(type => [Project]!, { nullable: true })
    projects: Project[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.exit_mode)
    exit_mode_projects: Project[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.data)
    data_projects: Project[];

    // @Field(type => [Capital]!, { nullable: true })
    // @ManyToMany(type => Capital)
    // capitals: Capital[];
}
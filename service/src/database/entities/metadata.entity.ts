import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Project } from "./project.entity";
import { Provider } from "./provider.entity";
// import { Capital } from "./capital.entity";

@Entity()
@Tree('materialized-path')
@ObjectType()
@InputType('MetadataInput')
export class Metadata extends Base {
    @Field({ nullable: true })
    @Column()
    @ApiModelProperty({ nullable: true })
    title: string;

    @Field(type => Int, { nullable: true })
    @Column({ default: 0 })
    @ApiModelProperty({ nullable: true })
    sort: number;

    @Field(type => Metadata, { nullable: true })
    @TreeParent()
    @ApiModelProperty({ nullable: true })
    parent: Metadata;

    @Field(type => [Metadata]!, { nullable: true })
    @TreeChildren()
    @ApiModelProperty({ nullable: true })
    children: Metadata[];

    @Field(type => [Provider]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    providers: Provider[];

    @Field(type => [Project]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    projects: Project[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.exit_mode)
    @ApiModelProperty({ nullable: true })
    exit_mode_projects: Project[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.data)
    @ApiModelProperty({ nullable: true })
    data_projects: Project[];

    // @Field(type => [Capital]!, { nullable: true })
    // @ManyToMany(type => Capital)
    // capitals: Capital[];
}
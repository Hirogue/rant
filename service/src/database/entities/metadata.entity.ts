import { ApiModelProperty } from "@nestjs/swagger";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base";
import { Capital } from "./capital.entity";
import { Project } from "./project.entity";
import { Provider } from "./provider.entity";
import { User } from "./user.entity";

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

    @Field(type => [User]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    users: User[];

    @Field(type => [Provider]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    providers: Provider[];

    @Field(type => [Project]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    projects: Project[];

    @Field(type => [Capital]!, { nullable: true })
    @ApiModelProperty({ nullable: true })
    capitals: Capital[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.exit_mode)
    @ApiModelProperty({ nullable: true })
    projects_exit_mode: Project[];

    @Field(type => [Project]!, { nullable: true })
    @ManyToMany(type => Project, target => target.data)
    @ApiModelProperty({ nullable: true })
    projects_data: Project[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.industry)
    @ApiModelProperty({ nullable: true })
    capitals_industry: Capital[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.invest_area)
    @ApiModelProperty({ nullable: true })
    capitals_invest_area: Capital[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.type)
    @ApiModelProperty({ nullable: true })
    capitals_type: Capital[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.data)
    @ApiModelProperty({ nullable: true })
    capitals_data: Capital[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.stage)
    @ApiModelProperty({ nullable: true })
    capitals_stage: Capital[];

    @Field(type => [Capital]!, { nullable: true })
    @ManyToMany(type => Capital, target => target.invest_type)
    @ApiModelProperty({ nullable: true })
    capitals_invest_type: Capital[];
}
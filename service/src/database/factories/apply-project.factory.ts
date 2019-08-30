import * as Faker from 'faker';
import { define } from "typeorm-seeding";
import { ApplyProject, User, Project } from '../entities';


interface IApplyProjectSetting {
    applicant: User;
    project: Project;
}

define(ApplyProject, (faker: typeof Faker, settings: IApplyProjectSetting) => {
    const instance = new ApplyProject();
    instance.applicant = settings.applicant;
    instance.project = settings.project;


    return instance;
})
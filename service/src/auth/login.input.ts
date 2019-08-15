import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';

const prefix = 'user-login.login.input';

@InputType()
export class LoginInput {
    @Field()
    @IsNotEmpty({ message: `${prefix}.account.empty` })
    @Length(6, 12, { message: `${prefix}.account.length` })
    account: string;

    @Field()
    @IsNotEmpty({ message: `${prefix}.password.empty` })
    @Length(6, 12, { message: `${prefix}.password.length` })
    password: string;
}
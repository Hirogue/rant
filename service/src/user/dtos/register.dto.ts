import { ApiModelProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {

    @IsNotEmpty({ message: '手机号码不能为空' })
    @IsMobilePhone('zh-CN', { message: '手机号码格式不正确' })
    @ApiModelProperty()
    phone: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @Length(6, 12, { message: '密码长度错误' })
    @ApiModelProperty()
    password: string;

    @IsNotEmpty({ message: '确认密码不能为空' })
    @Length(6, 12, { message: '确认密码长度错误' })
    @ApiModelProperty()
    confirmPassword: string;

    @IsNotEmpty({ message: '短信验证码不能为空' })
    @Length(4, 4, { message: '短信验证码长度错误' })
    @ApiModelProperty()
    smsCode: string;

}
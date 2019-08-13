import { IsMobilePhone, IsNotEmpty, Length } from 'class-validator';
import { SmsTypeEnum } from '../../core';
import { ApiModelProperty } from '@nestjs/swagger';

export class SendSmsDto {

    @IsNotEmpty({ message: '手机号码不能为空' })
    @IsMobilePhone('zh-CN', { message: '手机号码格式不正确' })
    @ApiModelProperty()
    phone: string;

    @IsNotEmpty({ message: '图形验证码不能为空' })
    @Length(4, 4, { message: '图形验证码长度错误' })
    @ApiModelProperty()
    svgCode: string;

    @IsNotEmpty({ message: '图形验证码key不能为空' })
    @ApiModelProperty()
    svgKey: string;

    @ApiModelProperty({ enum: SmsTypeEnum, default: SmsTypeEnum.REGISTER })
    smsType: SmsTypeEnum = SmsTypeEnum.REGISTER;
}
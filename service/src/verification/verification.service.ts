import { BadRequestException, Injectable } from "@nestjs/common";
import { range, shuffle, take } from 'lodash';
import * as UUID from 'node-uuid';
import * as SVG from 'svg-captcha';
import { CacheService } from "../cache";
import { Config } from "../config";
import { SmsTypeEnum } from "../core";
import { Logger } from "../logger";

@Injectable()
export class VerificationService {
    constructor(private readonly cache: CacheService) { }

    async generateSvg() {

        const key = 'verification-' + UUID.v4();

        const result = SVG.create({ fontSize: 40, width: 100, height: 40 });

        this.cache.set(key, result.text, Config.verification.svg.expire);

        Logger.debug('key:', key);
        Logger.debug('text:', result.text);

        return {
            key,
            data: result.data
        }
    }

    async verifySvg(key: string, code: string) {

        const answer = await this.cache.get(key);

        if (!answer) throw new BadRequestException('图形验证码已过期');
        if (answer.toLowerCase() !== code.toLowerCase()) throw new BadRequestException('图形验证码错误');

        return true;
    }

    async sendSms(phone: string, type: SmsTypeEnum) {

        const code = take(shuffle(range(0, 10)), 4).join('');
        const expire = Config.verification.sms.expire;

        this.cache.set(`${type}-${phone}`, code, expire);

        Logger.debug('register code:', code);

        // TODO: send message to message queue

        return true;
    }

    async verifySms(phone: string, code: string, type: SmsTypeEnum) {

        const answer = await this.cache.get(`${type}-${phone}`);

        if (!answer) throw new BadRequestException('短信验证码已过期');
        if (answer !== code) throw new BadRequestException('短信验证码错误');

        return true;
    }
}
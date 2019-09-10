import { BadGatewayException, Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
import { range, shuffle, take } from 'lodash';
import * as moment from 'moment';
import { CacheService } from "../cache";
import { Config } from "../config";
import { WechatCacheKeyEnum } from "./wechat-cache-key.enum";
import fetch from 'node-fetch';


@Injectable()
export class WechatService {

    constructor(private readonly cache: CacheService) { }

    async getAccessToken() {
        // https请求方式: GET
        // https://api.weixin.qq.com/cgi-bin/token        
        // ?grant_type=client_credential
        // &appid=APPID
        // &secret=APPSECRET

        const accessToken = await this.cache.get(WechatCacheKeyEnum.WECHAT_ACCESS_TOKEN);
        if (!!accessToken) return accessToken;

        try {

            const result = await fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.wechat.appid}&secret=${Config.wechat.secret}`).then(res => res.json());

            if (!result['access_token']) throw new BadGatewayException('获取 AccessToken 失败');

            await this.cache.set(
                WechatCacheKeyEnum.WECHAT_ACCESS_TOKEN,
                result['access_token'],
                result['expires_in']
            );

            return result;
        } catch (err) {
            return null;
        }
    }

    async getJsApiTicket() {

        const ticket = await this.cache.get(WechatCacheKeyEnum.WECHAT_JS_API_TICKET);
        if (!!ticket) return ticket;

        const accessToken = await this.getAccessToken();
        if (!accessToken) throw new BadGatewayException('获取 AccessToken 失败');

        try {
            const result = await fetch(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`).then(res => res.json());

            if ('ok' !== result['errmsg']) throw new BadGatewayException('获取 JS API Ticket 失败');

            await this.cache.set(
                WechatCacheKeyEnum.WECHAT_JS_API_TICKET,
                result['ticket'],
                result['expires_in']
            );

            return result;
        } catch (err) {
            return null;
        }
    }

    async signature(url: string) {

        const ticket = await this.getJsApiTicket();
        if (!ticket) throw new BadGatewayException('获取 JS API Ticket 失败');

        const nonceStr = this.getNonceString();
        const timestamp = moment().unix();
        const params = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;

        console.log(params)

        return {
            signature: crypto.createHash('sha1')
                .update(params)
                .digest('hex'),
            nonceStr,
            timestamp,
            appId: Config.wechat.appid
        }
    }

    private getNonceString() {

        const numbers = range(0, 9);
        const letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z',
        ];

        const list = [
            ...numbers,
            ...letters,
            ...letters.map(item => item.toUpperCase())
        ];

        return take(shuffle(list), 16).join('');
    }
}
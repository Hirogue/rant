import { BadGatewayException, Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
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
            console.log(result)
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
        const timestamp = this.getUnixTime();
        const params = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;

        return {
            appId: Config.wechat.appid,
            nonceStr,
            signature: crypto.createHash('sha1').update(params).digest('hex'),
            timestamp
        }
    }

    private getUnixTime() {
        return Math.floor(new Date().getTime() / 1000).toString();
    }

    private getNonceString() {
        return Math.random().toString(36).substr(2, 15);
    }
}
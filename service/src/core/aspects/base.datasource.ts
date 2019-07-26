import { RESTDataSource } from 'apollo-datasource-rest';
import { Config } from '../../config';
import { Logger } from '../../logger';

export class BaseDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${Config.serverUrl}/api/`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.req.headers.authorization);
    }

    async find(url: string, args: any) {
        const res = await this.get(url, args);

        Logger.log(`${url}#find:`, args);

        return res;
    }

    async findOne(url: string, id: string) {
        return await this.get(`${url}/${id}`);
    }

    async update(url: string, id: string) {
        return await this.patch(`${url}/${id}`);
    }

    async replace(url: string, id: string) {
        return await this.put(`${url}/${id}`);
    }

    async create(url: string) {
        return await this.post(url);
    }

    async bulk(url: string) {
        return await this.post(url);
    }

    async remove(url: string, id: string) {
        return await this.delete(`${url}/${id}`);
    }
}
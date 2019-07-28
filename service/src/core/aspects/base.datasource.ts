import { RESTDataSource } from 'apollo-datasource-rest';
import { Config } from '../../config';

export class BaseDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${Config.serverUrl}/api/`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.req.headers.authorization);
    }

    async find(url: string, queryString: string) {
        return await this.get(`${url}?${queryString}`);
    }

    async findOne(url: string, id: string, queryString: string) {
        return await this.get(`${url}/${id}`, queryString);
    }

    async update(url: string, id: string, params: any) {
        return await this.patch(`${url}/${id}`);
    }

    async replace(url: string, id: string, params: any) {
        return await this.put(`${url}/${id}`);
    }

    async create(url: string, params: any) {
        return await this.post(url);
    }

    async bulk(url: string, params: any) {
        return await this.post(url);
    }

    async remove(url: string, ids: string) {
        return await this.delete(url, { ids });
    }
}
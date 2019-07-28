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

    async update(url: string, id: string, body: any) {
        console.log('--->', body);
        return await this.patch(`${url}/${id}`, { ...body });
    }

    async replace(url: string, id: string, body: any) {
        return await this.put(`${url}/${id}`, body);
    }

    async create(url: string, body: any) {
        return await this.post(url, body);
    }

    async bulk(url: string, body: any) {
        return await this.post(url, body);
    }

    async remove(url: string, ids: string) {
        return await this.delete(url, { ids });
    }
}
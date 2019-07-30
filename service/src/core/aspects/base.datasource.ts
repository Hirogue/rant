import { RESTDataSource } from 'apollo-datasource-rest';
import { Config } from '../../config';
import { ApolloException } from '../exceptions';

export class BaseDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${Config.serverUrl}/api/`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.req.headers.authorization);
    }

    async findTrees(url: string) {
        try {
            return await this.get(`${url}/tree/trees`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findRoots(url: string) {
        try {
            return await this.get(`${url}/tree/roots`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findDescendants(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/descendants/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findDescendantsTree(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/descendantsTree/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findCountDescendants(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/countDescendants/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findAncestors(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/ancestors/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findAncestorsTree(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/ancestorsTree/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findCountAncestors(url: string, parentId: string) {
        try {
            return await this.get(`${url}/tree/countAncestors/${parentId}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async find(url: string, queryString: string) {
        try {
            return await this.get(`${url}?${queryString}`);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async findOne(url: string, id: string, queryString: string) {
        try {
            return await this.get(`${url}/${id}`, queryString);
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async update(url: string, id: string, body: any) {
        try {
            return await this.patch(`${url}/${id}`, { ...body });
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async replace(url: string, id: string, body: any) {
        try {
            return await this.put(`${url}/${id}`, { ...body });
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async create(url: string, body: any) {
        try {
            return await this.post(url, { ...body });
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async bulk(url: string, body: any) {
        try {
            return await this.post(url, { ...body });
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }

    async remove(url: string, ids: string) {
        try {
            return await this.delete(url, { ids });
        } catch (err) {
            throw new ApolloException(err.extensions.response.statusText, err.extensions.response.status);
        }
    }
}
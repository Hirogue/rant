import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Q_FETCH_CURRENT_USER } from '../gql';
import { createApolloClient } from "./apollo";

export const buildingQuery = params => {
    return RequestQueryBuilder.create(params).query();
};

export const toFetchCurrentUser = async (client) => {
    const result = await createApolloClient().query({
        query: Q_FETCH_CURRENT_USER,
        fetchPolicy: "no-cache"
    });
    if (result && result.data && result.data.me) {
        localStorage.setItem('u_user', JSON.stringify(result.data.me));
        return result.data.me;
    } else {
        return null;
    }
}

export const toTransformAreaTreeProps = (data, map) => data.map(node => {
    let node_object = {
        label: node[map.key || 'key'],
        value: node[map.value || 'value']
    }
    if (node.children) {
        node_object[map.children || 'children'] = toTransformAreaTreeProps(node.children, map);
    }
    return node_object;
});

export const toGetLevel = (data) => {
    let max = 0
    function each(data, level) {
        data.forEach(e => {
            if (level > max) {
                max = level
            }
            if (e.children.length > 0) {
                each(e.children, level + 1)
            }
        })
    }
    each(data, 1)
    return max;
}

export const Upload = (url, formData) => fetch(url, {
    method: "POST",
    headers: new Headers({
        'authorization': `Bearer ${localStorage.getItem('u_token')}`
    }),
    body: formData
})

export const Fetch = (url, body) => {
    let option = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('u_token')}`
        })
    };
    if (body) {
        option.method = "POST";
        option.body = JSON.stringify(body);
    }
    return fetch(url, option)
}

export const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
export const toFindAreaTree = (tree, target) => {
    let key = Object.keys(target).shift();
    let val = Object.values(target).shift();
    let isGet = false;
    let retNode = null;
    const deepSearch = (tree) => {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].children && tree[i].children.length > 0) {
                deepSearch(tree[i].children);
            }
            if (val === tree[i][key] || isGet) {
                isGet || (retNode = tree[i]);
                isGet = true;
                break;
            }
        }
    }
    deepSearch(tree);
    return retNode;
}

export const toGetParentArrayByChildNode = (tree, target) => {
    let key = Object.keys(target).shift();
    let val = Object.values(target).shift();
    for (let treeNode of tree) {
        if (treeNode[key] === val) return [treeNode];
        if (treeNode.children) {
            let childNode = toGetParentArrayByChildNode(treeNode.children, target);
            if (childNode) {
                return [treeNode].concat(childNode);
            };
        }
    }
}


export const asyncEffectHandler = async (fn) => await fn();

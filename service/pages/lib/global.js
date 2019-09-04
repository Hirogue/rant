import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Q_FETCH_CURRENT_USER, Q_GET_METADATA_TREES } from '../gql';
import { createApolloClient } from "./apollo";
import { message, Modal } from 'antd';
import { withRouter } from 'next/router';

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


export const mergeParams = (params, partialParams) => {
    let newParams = { ...params };

    const keys = Object.keys(partialParams);

    keys.forEach(key => {
        if (partialParams[key]) {
            newParams[key] = partialParams[key];

            if (['filter', 'or', 'join', 'sort'].includes[key]) {
                if (!!params[key]) {

                    const oldParams = params[key]
                        .filter(item => partialParams[key].findIndex(temp => temp.field === item.field) < 0)
                        .map(item => item);

                    if (oldParams.length > 0) {
                        newParams[key] = [...newParams[key], ...oldParams];
                    }
                }
            }

            if (isArray(newParams[key])) {
                if (['filter', 'or'].includes(key)) {
                    newParams[key] = newParams[key].filter(item => !isEmpty(item.value));
                }

                if (['join', 'sort'].includes(key)) {
                    newParams[key] = newParams[key].filter(item => !isEmpty(item.field));
                }
            }
        }
    });

    return newParams;
};

export const toGetMetadata = async () => {
    let metadata = null;
    try {
        metadata = JSON.parse(sessionStorage.getItem('metadata'));
    } catch (error) {
        console.info('解析类型数据失败！');
    }
    if (!metadata) {
        const res = await createApolloClient().query({
            query: Q_GET_METADATA_TREES,
            fetchPolicy: "no-cache"
        });
        
        if (res.data) {
            sessionStorage.setItem('metadata', JSON.stringify(res.data.metadataTrees));
            return res.data.metadataTrees;
        } else {
            message.error('获取类型数据失败！');
            return null;
        }
    } else {
        return metadata;
    }
}


export const getUrlParam = (router, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = router.asPath.split('?')[1].match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

export const toApplayProject = (router, project) => {
    console.log(router, project);
    
    Modal.info({
        title: "您正在提交一个申请",
        content: (
            <>
                <p>请确认是否申请项目：</p>
                <p>【{project.title}】</p>
            </>
        ),
        okText: "确认",
        cancelText: "取消",
        onOk: () => console.log('ok'),
        onCancel: () => console.info(`您已取消申请项目【${project.title}】！`)

    })
}
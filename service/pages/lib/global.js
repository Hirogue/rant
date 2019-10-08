import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { message, Modal } from 'antd';
import { Fragment } from 'react';
import { isArray, isEmpty } from 'lodash';
import { Q_FETCH_CURRENT_USER, Q_GET_METADATA_TREES, Q_METADATA_DESCENDANTS_TREE } from '../gql';
import { createApolloClient } from "./apollo";

export const jump = (url, timeout = 0) => {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            window.location.href = url;
        }, timeout)
    }
}

export const goback = (timeout = 0) => {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            window.history.back();
        }, timeout)
    }
}

export const reload = (timeout = 0) => {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            window.location.reload();
        }, timeout)
    }
}

export const getAreaList = async (client) => {
    const result = await client.query({
        query: Q_METADATA_DESCENDANTS_TREE,
        variables: { root: '地区' }
    });

    if (result && result.data && result.data.metadataDescendantsTree) {
        return getTreeData(result.data.metadataDescendantsTree);
    } else {
        return [];
    }
}

export const getTreeData = (data, root) =>
    data.map(item => {
        item.__typename && delete item.__typename;

        if (item.children && item.children.length > 0) {
            return {
                ...item,
                key: item.id,
                value: item.id,
                label: item.title,
                root,
                children: getTreeData(item.children, root || item),
                dataRef: item,
            };
        }

        return {
            ...item,
            key: item.id,
            value: item.id,
            label: item.title,
            root,
            children: null,
            dataRef: item,
        };
    });

export const buildingQuery = params => {
    return RequestQueryBuilder.create(params).query();
};

export const toFetchCurrentUser = async (client) => {
    const result = await createApolloClient().query({
        query: Q_FETCH_CURRENT_USER,
        fetchPolicy: "no-cache"
    });
    if (result && result.data && result.data.me) {

        const { me, remainderApplyCount = 0 } = result.data;
        me.remainderApplyCount = remainderApplyCount;

        localStorage.setItem('u_user', JSON.stringify(me));

        return me;
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
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let res = router.asPath.split('?')[1];
    if (!res) return null;
    let param = res.match(reg);
    if (!param) return null;
    return decodeURI(param[2]);
}

export const toApply = async (key, target, gql) => {

    let client = createApolloClient();
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem('u_user')) || null;
    } catch (error) {
        console.info('您还未登录！');
    }


    console.log(target.id, gql);

    if (user) {
        const { data } = await client.mutate({
            mutation: gql,
            variables: { id: target.id }
        })
        if (data && Object.keys(data).length) {
            const user = await toFetchCurrentUser(client);
            if (user[`apply_${key}s`].findIndex(application => application[key] && (application[key].id === target.id)) !== -1) {
                return [true, `申请【${target.title}】成功！`]
            } else {
                return [false, `申请【${target.title}】失败！`]
            }
        } else {
            return [false, `申请【${target.title}】失败！`]
        }
    } else {
        return [false, '您尚未登录，请登陆后再申请！', '/login'];
    }
}

export const toApplayCommonHandler = (router, KV, gql) => {

    let key = Object.keys(KV).shift();
    let target = KV[key];

    Modal.confirm({
        title: "您正在提交一个申请",
        content: (
            <Fragment>
                <p>请确认是否申请：</p>
                <p>【{target.title}】</p>
            </Fragment>
        ),
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
            const [flag, content, url] = await toApply(key, target, gql);
            if (flag) {
                message.success(content);
            } else {
                message.error(content);
            }
            if (url) router.push(url);
        },
        onCancel: () => console.info(`您已取消申请【${target.title}】！`),
        centered: true
    })
}

export const ProjectStatusMaps = {
    pending: '待审核',
    rejected: '已驳回',
    checked: '已审核',
    waiting: '待分配',
    following: '待跟进',
    cancelled: '已作废',
    finished: '已完成',
};


export const checkMobile = () => {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    if (isiPad) {
        return false;
    }
    var isMobile = navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i) != null;
    if (isMobile) {
        return true;
    }
    return false;
}

export const toSetWeChatShareConfig = async (title, desc, img) => {
    const result = await fetch(`/api/wechat/signature`).then(res => res.json());
    if (result.signature) {
        const {
            nonceStr,
            signature,
            timestamp,
            appId
        } = result;
        window.wx.config({
            debug: process.env.NODE_ENV === 'development' ? true : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: ["checkJsApi", "updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        window.wx.ready(function () {
            window.wx.updateAppMessageShareData({
                title: title || '旅游项目通', // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: img || 'https://www.lvyoto.com/static/logo.png', // 分享图标
                desc: desc || document.querySelector('meta[name="description"]').content, // 分享描述
            });
            //朋友
            window.wx.updateTimelineShareData({
                title: title || '旅游项目通', // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: img || 'https://www.lvyoto.com/static/logo.png', // 分享图标
            });
        });
    }
}
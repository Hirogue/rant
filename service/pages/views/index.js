import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import BaseLayout from '../components/Layout/BaseLayout';
import BannerMod from '../partials/home/Banner';
import NoticeAdvantage from '../partials/home/NoticeAdvantage';
import FindCapital from '../partials/home/FindCapital';
import ServerTeam from '../partials/home/ServerTeam';
import ServiceNews from '../partials/home/ServiceNews';
import IndexNav from '../partials/home/IndexNav';
import SuccessCase from '../partials/home/SuccessCase';
import { withApollo, createApolloClient } from "../lib/apollo";
import { buildingQuery, asyncEffectHandler, toGetMetadata } from "../lib/global";
import { Q_GET_HOME_DATA, Q_GET_HOME_ARTICLES, Q_GET_METADATA_TREES } from '../gql'

const client = createApolloClient();

const commonVariables = {
    page: 0,
    limit: 1000,
    join: [{ field: 'category' }],
    filter: [{ field: "is_published", operator: CondOperator.EQUALS, value: "true" }],
    sort: [{ field: 'sort', order: 'ASC' }, { field: 'create_at', order: 'DESC' }],
};

const providerVariables = {
    page: 0,
    limit: 6,
    sort: [{ field: 'create_at', order: 'DESC' }]
}

const productVariables = {
    page: 0,
    limit: 4,
    sort: [{ field: 'create_at', order: 'DESC' }]
}

const articleCategoryArray = ['行业快讯', '投融研报', '江旅资讯', '通知公告'];

const createIteratorFetch = function* (items = []) {
    for (let type of items) {
        yield client.query({
            query: Q_GET_HOME_ARTICLES,
            fetchPolicy: "no-cache",
            variables: {
                queryString: buildingQuery({
                    page: 0,
                    limit: 4,
                    join: [{ field: 'category' }],
                    filter: [{ field: "category.title", operator: CondOperator.EQUALS, value: type }, { field: "is_published", operator: CondOperator.EQUALS, value: "true" }],
                    sort: [{ field: 'sort', order: 'ASC' }, { field: 'create_at', order: 'DESC' }]
                })
            }
        });
    }
};

export default withRouter(withApollo((props) => {

    const [thisState, setState] = useState({});

    useEffect(() => {
        asyncEffectHandler(async () => {
            let homeData = {};
            let { data } = await client.query({
                query: Q_GET_HOME_DATA,
                fetchPolicy: "no-cache",
                variables: {
                    commonQuery: buildingQuery(commonVariables),
                    providerQuery: buildingQuery(providerVariables),
                    productQuery: buildingQuery(productVariables)
                }
            });
            if (data) {
                homeData = data;
            }

            let count = 0;
            let article = {};
            let articleIterator = createIteratorFetch(articleCategoryArray);
            for (let articlePromise of articleIterator) {
                let { data } = await articlePromise;
                if (data) {
                    article[articleCategoryArray[count++]] = data.queryArticle;
                }
            }
            setState(Object.assign(homeData, { article }));
            toGetMetadata();
        })
    }, [])

    const siteInfo = { aboutData: [] };

    const newsAndProviderData = {
        news: thisState.article || {},
        providers: thisState.queryProvider ? thisState.queryProvider.data : []
    }

    return (
        <BaseLayout>
            <IndexNav />
            <BannerMod data={thisState.queryCarousel || []} />
            <NoticeAdvantage data={thisState.article ? thisState.article['通知公告'].data : []} siteInfo={siteInfo || {}} />
            <FindCapital />
            <SuccessCase data={thisState.querySuccessCase ? thisState.querySuccessCase.data : []} />
            <ServerTeam data={thisState.queryExpert ? thisState.queryExpert.data : []} />
            <ServiceNews data={newsAndProviderData} mainData={thisState.providerCategoryTrees || []} />
        </BaseLayout>
    );
}))

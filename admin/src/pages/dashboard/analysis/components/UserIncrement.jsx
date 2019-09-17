// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { Fragment, useState, useEffect } from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
// import Slider from 'bizcharts-plugin-slider';
import {
  Tabs,
  // DatePicker
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import DataSet from '@antv/data-set';
import { get } from '../../../../utils/fetch';

const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;

export default props => {
  const [state, setState] = useState({
    category: 'identityData',
    groupBy: 'day',
    startDate: moment().subtract(2, 'months'),
    endDate: moment(),
    subjectData: [],
    identityData: [],
  });

  const { category, startDate, endDate, groupBy } = state;
  const mapStartDate = moment(startDate.toDate());
  const fieldDate = [];
  while (mapStartDate - moment() < 0) {
    fieldDate.push(mapStartDate.format('YYYY-MM-DD'));
    mapStartDate.add(1, 'days');
  }

  useEffect(() => {
    get('/api/statistics/users', {
      type: 'subject',
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      groupBy,
    })
      .then(res => {
        console.log(res);
        const resData = [];
        if (res) {
          res.forEach(item => {
            resData.push(
              { key: item.day, value: item.enterprise * 1 || 0, name: '企业' },
              { key: item.day, value: item.personal * 1 || 0, name: '个人' },
            );
          });
          //   fieldDate.forEach(item => {
          //     const resItem = _.find(res, { day: item });
          //     resData.push(
          //       { key: item, value: resItem ? resItem.enterprise * 1 : 0, name: '企业' },
          //       { key: item, value: resItem ? resItem.personal * 1 : 0, name: '个人' },
          //     );
          //   });
        }
        setState(prevState => ({ ...prevState, subjectData: resData }));
      })
      .catch(err => console.log(err));
    get('/api/statistics/users', {
      type: 'identity',
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      groupBy,
    })
      .then(res => {
        console.log(res);
        const resData = [];
        if (res) {
          res.forEach(item => {
            resData.push(
              { key: item.day, value: item.financer * 1 || 0, name: '融资方' },
              { key: item.day, value: item.investor * 1 || 0, name: '投资方' },
              { key: item.day, value: item.provider * 1 || 0, name: '供应商' },
              { key: item.day, value: item.tourist * 1 || 0, name: '普通会员' },
            );
          });
          //   fieldDate.forEach(item => {
          //     const resItem = _.find(res, { day: item });
          //     resData.push(
          //       { key: item, value: resItem ? resItem.financer * 1 : 0, name: '融资方' },
          //       { key: item, value: resItem ? resItem.investor * 1 : 0, name: '投资方' },
          //       { key: item, value: resItem ? resItem.provider * 1 : 0, name: '供应商' },
          //       { key: item, value: resItem ? resItem.tourist * 1 : 0, name: '普通会员' },
          //     );
          //   });
        }
        setState(prevState => ({ ...prevState, identityData: resData }));
      })
      .catch(err => console.log(err));
  }, [startDate, endDate]);

  const ds = new DataSet();
  const dv = ds.createView().source(state[state.category]);
  //   dv.transform({
  //     fields: fieldDate,
  //   });

  const Extra = () => (
    <Fragment>
      <span
        onClick={() =>
          setState(prevState => ({ ...prevState, startDate: moment().subtract(1, 'weeks') }))
        }
        style={{
          margin: '0 5px',
          padding: '2px 4px',
          border: '1px solid #999',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        近一周
      </span>
      <span
        onClick={() =>
          setState(prevState => ({ ...prevState, startDate: moment().subtract(1, 'months') }))
        }
        style={{
          margin: '0 5px',
          padding: '2px 4px',
          border: '1px solid #999',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        近一月
      </span>
      <span
        onClick={() =>
          setState(prevState => ({
            ...prevState,
            startDate: moment().subtract(6, 'months'),
            groupBy: 'month',
          }))
        }
        style={{
          margin: '0 5px',
          padding: '2px 4px',
          border: '1px solid #999',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        近半年
      </span>
      <span
        onClick={() =>
          setState(prevState => ({
            ...prevState,
            startDate: moment().subtract(1, 'years'),
            groupBy: 'month',
          }))
        }
        style={{
          margin: '0 5px',
          padding: '2px 4px',
          border: '1px solid #999',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        近一年
      </span>
    </Fragment>
  );

  return (
    <div>
      <Tabs
        tabBarExtraContent={<Extra />}
        onChange={activeKey => setState(prevState => ({ ...prevState, category: activeKey }))}
      >
        <TabPane tab="按身份" key="identityData"></TabPane>
        <TabPane tab="按主体" key="subjectData"></TabPane>
      </Tabs>
      ,
      <Chart height={400} data={dv} forceFit scale={{ key: { type: 'timeCat' } }}>
        <Axis name="key" />
        <Axis name="value" />
        <Legend />
        <Tooltip />
        <Geom
          type="interval"
          position="key*value"
          color="name"
          adjust={[
            {
              type: 'dodge',
              marginRatio: 1 / 32,
            },
          ]}
        />
      </Chart>
    </div>
  );
};

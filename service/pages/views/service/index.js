import React from 'react';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { apiGetServices } from '../../services/common';
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';
import PageMod from '../../components/PageMod';
import ScreenMod from '../../components/ScreenMod';

import List from '../../partials/service/List';

import '../../partials/service/service.scss';
import GlobalContext from '../../components/context/GlobalContext';

@withRouter
export default class Service extends React.Component {
	state = {
		data: [],
		list: [],
		current: 1,
		pageSize: 10,
		serviceSelectedTags: [],
		areaSelectedTags: []
	};

	async componentDidMount() {
		const { list, category } = this.props.router.query;

		if (!!category) {
			this.setState((state) => ({
				...state,
				serviceSelectedTags: [ category ]
			}));
		}

		this.setState((state) => ({
			...state,
			data: list,
			list: [].concat(list).splice((state.current - 1) * state.pageSize, state.pageSize)
		}));
	}

	onPageChange = (page, pageSize) => {
		this.setState((state) => ({
			...state,
			current: page,
			list: [].concat(state.data).splice((page - 1) * pageSize, pageSize)
		}));
	};

	onChange = (selectedTags, item) => {
		this.setState((state) => ({
			...state,
			current: 1
		}));
		if (item.name === '机构类别') {
			this.setState((state) => ({
				...state,
				serviceSelectedTags: selectedTags
			}));
		}

		if (item.name === '所在地区') {
			this.setState((state) => ({
				...state,
				areaSelectedTags: selectedTags
			}));
		}
	};

	render() {
		const { data, list, pageSize, serviceSelectedTags, areaSelectedTags } = this.state;

		const newList = _.filter(list, (item) => {
			if (serviceSelectedTags.length > 0) {
				if (!!item.category && serviceSelectedTags.indexOf(item.category) < 0) return false;
			}

			if (areaSelectedTags.length > 0) {
				if (!!item.area && areaSelectedTags.indexOf(item.area) < 0) return false;
			}

			return item;
		});

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const { mainData } = context;

						if (!mainData) return '';

						const tagItems = [
							{
								name: '机构类别',
								tagsFromServer: mainData.services.map((item) => item.name),
								selectedTags: this.state.serviceSelectedTags
							},
							{
								name: '所在地区',
								tagsFromServer: mainData.area.ex_info.tags,
								selectedTags: this.state.areaSelectedTags
							}
						];

						return (
							<React.Fragment>
								<div className="service-page">
									<BreadCrumb adrname_two={'服务商'} adrname_thr={'所有服务商'} />
									<ScreenMod
										tagItems={tagItems}
										onChange={this.onChange}
										tag_name={'服务商'}
										icon_type={'icon-shangwuren'}
									/>
									<div className="service-list">
										{newList.map((item) => <List data={item} key={item.id} />)}
									</div>
									<PageMod total={data.length} pageSize={pageSize} onChnage={this.onPageChange} />
								</div>
							</React.Fragment>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}

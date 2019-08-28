import _ from 'lodash';
import React, { Fragment } from 'react';
import { Select, Tag, Divider, Radio, Row, Col, Input, InputNumber, message } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

export default class TreeTags extends React.PureComponent {
	state = {
		selectedTags: {},
		category: [],
		selectedCategory: null
	};

	componentDidMount() {
		this.initalState(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.initalState(nextProps);
	}

	initalState = ({ tagGroups, tagString }) => {
		let selectedTags = {};
		let selectedCategory = '';

		if (!tagGroups || !tagGroups.children || tagGroups.children.length <= 0) return null;

		const category = _.filter(tagGroups.children, (item) => item.mode === '分类' && !item.ex_info);

		if (!category || category.length <= 0) return null;

		if (!tagString) {
			tagGroups.children.forEach((group) => {
				selectedTags[group.name] = { tags: [], customer: false };
			});

			category.forEach((item) => {
				item.children.forEach((group) => {
					selectedTags[group.name] = { tags: [], customer: false };
				});
			});

			selectedCategory = category[0].name;
		} else {
			const info = JSON.parse(tagString);

			selectedTags = info.selectedTags;
			selectedCategory = info.selectedCategory;
		}

		this.setState((state) => ({
			...state,
			selectedTags,
			category,
			selectedCategory
		}));
	};

	generateResult = () => {
		const { tagGroups } = this.props;
		const { selectedTags } = this.state;
		const errors = [];

		tagGroups.children.forEach((group) => {
			if (group.mode === '分类') return;

			if (group.customer === '必填') {
				if (group.mode === '多选' || group.mode === '单选') {
					if (!selectedTags[group.name].tags.length > 0) errors.push(group.name + '必选');
				} else {
					if (!selectedTags[group.name].value) errors.push(group.name + '必填');
				}
			}
		});

		if (errors.length > 0) {
			return { errors };
		} else {
			return this.state;
		}
	};

	handleChange = (group, tag, checked) => {
		const { name, mode, customer, range } = group;
		const { selectedTags } = this.state;

		let nextSelectedTags = { tags: [], customer: false };

		if (mode === '单选') {
			nextSelectedTags = checked ? { tags: [ tag ] } : { tags: [] };
			nextSelectedTags.customer = checked ? customer === tag : false;
		} else {
			nextSelectedTags.tags = checked
				? [ ...selectedTags[name].tags.filter((t) => t !== tag), tag ]
				: selectedTags[name].tags.filter((t) => t !== tag);
			nextSelectedTags.customer = checked ? customer === tag : false;

			if (!!range) {
				if (nextSelectedTags.tags.length > range) {
					message.warn(`最多可选择${range}项`);
					return false;
				}
			}
		}

		selectedTags[name] = nextSelectedTags;

		this.setState((state) => ({
			...state,
			selectedTags: {
				...selectedTags
			}
		}));
	};

	onCategoryChange = (e) => {
		this.setState((state) => ({
			...state,
			selectedCategory: e.target.value
		}));
	};

	onCustomerChange = (value, groupName) => {
		const { selectedTags } = this.state;

		selectedTags[groupName].value = value;

		this.setState((state) => ({
			...state,
			selectedTags: {
				...selectedTags
			}
		}));
	};

	renderTag(group) {
		const { selectedTags } = this.state;
		const { mode, range } = group;

		if (mode === '单选') {
			return !!group.ex_info ? (
				<Fragment>
					<Select
						style={{ width: 150 }}
						defaultValue={selectedTags[group.name].tags}
						onChange={(value) => this.handleChange(group, value, true)}
					>
						{group.ex_info.tags.map((tag) => {
							if (!selectedTags[group.name]) return;
							return (
								<Option key={tag} value={tag}>
									{tag}
								</Option>
							);
						})}
					</Select>
					{!!group.customer && !!selectedTags[group.name].customer ? (
						<Input
							style={{ width: 150 }}
							defaultValue={selectedTags[group.name].value}
							onChange={(e) => this.onCustomerChange(e.target.value, group.name)}
							placeholder="请输入自定义值"
						/>
					) : (
						''
					)}
				</Fragment>
			) : (
				''
			);
		}

		if (mode === '多选') {
			return !!group.ex_info ? (
				<Fragment>
					{group.ex_info.tags.map((tag) => {
						if (!selectedTags[group.name]) return;
						return (
							<Tag.CheckableTag
								key={`${group.name}${tag}`}
								checked={
									!!selectedTags[group.name].tags && selectedTags[group.name].tags.indexOf(tag) > -1
								}
								onChange={(checked) => this.handleChange(group, tag, checked)}
							>
								{tag}
							</Tag.CheckableTag>
						);
					})}
					{!!group.customer && !!selectedTags[group.name].customer ? (
						<Input
							style={{ width: 150 }}
							defaultValue={selectedTags[group.name].value}
							onChange={(e) => this.onCustomerChange(e.target.value, group.name)}
							placeholder="请输入自定义值"
						/>
					) : (
						''
					)}
				</Fragment>
			) : (
				''
			);
		}

		if (mode === '数字框') {
			if (range === '正整数') {
				return (
					<Fragment>
						<InputNumber
							min={1}
							style={{ width: 150 }}
							defaultValue={selectedTags[group.name].value}
							onChange={(e) => this.onCustomerChange(e, group.name)}
						/>
						<span style={{ marginLeft: '5px' }}>{group.unit}</span>
					</Fragment>
				);
			}

			if (range === '正数') {
				return (
					<Fragment>
						<InputNumber
							min={0.1}
							step={0.1}
							style={{ width: 150 }}
							defaultValue={selectedTags[group.name].value}
							onChange={(e) => this.onCustomerChange(e, group.name)}
						/>
						<span style={{ marginLeft: '5px' }}>{group.unit}</span>
					</Fragment>
				);
			}

			return (
				<Fragment>
					<InputNumber
						style={{ width: 150 }}
						defaultValue={selectedTags[group.name].value}
						onChange={(e) => this.onCustomerChange(e, group.name)}
					/>
					<span style={{ marginLeft: '5px' }}>{group.unit}</span>
				</Fragment>
			);
		}

		if (mode === '文本框') {
			return (
				<Input
					defaultValue={selectedTags[group.name].value}
					onChange={(e) => this.onCustomerChange(e.target.value, group.name)}
					style={{ width: 300 }}
				/>
			);
		}

		if (mode === '文本域') {
			return (
				<TextArea
					defaultValue={selectedTags[group.name].value}
					onChange={(e) => this.onCustomerChange(e.target.value, group.name)}
					rows={4}
				/>
			);
		}

		return '';
	}

	render() {
		const { tagGroups, categoryName, company } = this.props;
		const { category, selectedCategory } = this.state;

		if (!tagGroups || !tagGroups.children || tagGroups.children.length <= 0) return null;

		const currentTags = _.find(category, (item) => item.name === selectedCategory);

		if (!currentTags || currentTags.children.length <= 0) return null;

		const labelStyle = {
			marginRight: 15,
			textAlign: 'right',
			verticalAlign: 'top',
			display: 'inline-block',
			width: '15%',
			color: '#108ee9'
		};

		const rowStyle = {
			margin: '5px 0',
			padding: '5px',
			borderBottom: '1px dashed #e8e8e8'
		};

		return (
			<Fragment>
				<Row style={{ marginTop: 5 }}>
					<Col>
						{tagGroups.children.map(
							(group, index) =>
								group.mode === '分类' ? (
									''
								) : group.groups !== '1' ? (
									''
								) : (
									<div key={index} style={rowStyle}>
										<div style={labelStyle}>
											{group.customer !== '选填' ? (
												<span style={{ color: 'red', marginRight: '2px' }}>*</span>
											) : (
												''
											)}
											{group.name}：
											{/* {`(${group.mode})`}： */}
										</div>

										<div style={{ display: 'inline-block', width: '80%' }}>
											{this.renderTag(group)}
										</div>
									</div>
								)
						)}
					</Col>
				</Row>
				<Row>
					<Col style={rowStyle}>
						<div style={labelStyle}>{categoryName}：</div>

						<div style={{ display: 'inline-block', width: '80%' }}>
							<RadioGroup value={selectedCategory} onChange={this.onCategoryChange}>
								{category.map((item, index) => (
									<Radio key={index} value={item.name}>
										{item.name}
									</Radio>
								))}
							</RadioGroup>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						{currentTags.children.map(
							(group, index) =>
								group.mode === '分类' ? (
									''
								) : (
									<div key={index} style={rowStyle}>
										<div style={labelStyle}>
											{group.customer !== '选填' ? (
												<span style={{ color: 'red', marginRight: '2px' }}>*</span>
											) : (
												''
											)}
											{group.name}：
											{/* {`(${group.mode})`}： */}
										</div>

										<div style={{ display: 'inline-block', width: '80%' }}>
											{this.renderTag(group)}
										</div>
									</div>
								)
						)}
					</Col>
				</Row>

				<Row style={{ marginTop: 5 }}>
					<Col>
						{tagGroups.children.map(
							(group, index) =>
								group.mode === '分类' ? (
									''
								) : group.groups !== '2' ? (
									''
								) : group.name === '公司介绍' && !company ? (
									''
								) : (
									<div key={index} style={rowStyle}>
										<div style={labelStyle}>
											{group.customer !== '选填' ? (
												<span style={{ color: 'red', marginRight: '2px' }}>*</span>
											) : (
												''
											)}
											{group.name}：
											{/* {`(${group.mode})`}： */}
										</div>

										<div style={{ display: 'inline-block', width: '80%' }}>
											{this.renderTag(group)}
										</div>
									</div>
								)
						)}
					</Col>
				</Row>
			</Fragment>
		);
	}
}

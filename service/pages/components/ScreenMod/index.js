import React, { Component } from 'react';
import { List, Tag } from 'antd';
import TagLi from './TagList';
import IconFont from '../IconFont';
import './screen_mode.scss';

export default class ScreenMod extends Component {
	handleChange(tag, selectedTags, item) {
		const { onChange } = this.props;

		const nextSelectedTags = selectedTags.filter((t) => t !== tag);

		onChange(nextSelectedTags, item);
	}

	render() {
		const { onChange, tagItems, tag_name, icon_type } = this.props;

		return (
			<div className="screen-mod">
				<div className="tag-box">
					<p className="tag">
						<IconFont className="iconfont" type={icon_type} />
						<span>{tag_name}</span>
					</p>
					<div className="change-tag">
						{tagItems.length > 0 ? (
							tagItems.map((tag) => {
								return tag.selectedTags.map((item, index) => (
									<Tag
										closable
										onClose={this.log}
										key={index}
										onClose={() => this.handleChange(item, tag.selectedTags, tag)}
									>
										{item}
									</Tag>
								));
							})
						) : (
							''
						)}
					</div>
				</div>
				<List
					itemLayout="horizontal"
					dataSource={tagItems}
					renderItem={(item) => (
						<List.Item>
							<TagLi
								name={item.name}
								selectedTags={item.selectedTags}
								tagsFromServer={item.tagsFromServer}
								onChange={(selectedTags) => onChange(selectedTags, item)}
							/>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

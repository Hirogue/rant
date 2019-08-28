import { Tag, Popover } from 'antd';

const CheckableTag = Tag.CheckableTag;

export default class TagLi extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChange(tag, checked) {
		const { onChange, selectedTags } = this.props;

		const nextSelectedTags = checked ? [ ...selectedTags, tag ] : selectedTags.filter((t) => t !== tag);

		onChange(nextSelectedTags);
	}

	handleHeight(e) {
		const oTagBox = e.target.parentNode.children[1];
		const aTagLis = e.target.parentNode.children[1].children[0];

		if (aTagLis.offsetHeight > 22) {
			if (!e.onoff) {
				oTagBox.style.height = 'auto';
				e.target.innerHTML = '收起-';
				e.onoff = true;
			} else {
				oTagBox.style.height = '22px';
				e.target.innerHTML = '更多+';
				e.onoff = false;
			}
		} else {
			console.log('没有更多内容了！');
		}
	}

	render() {
		const content = (
			<div className="popover-list">
				<p>金融科技</p>
				<p>IT互联网</p>
				<p>移动互联网</p>
			</div>
		);

		const { name, tagsFromServer, selectedTags } = this.props;

		return (
			<div className="list-tag-box">
				<h6 style={{ marginRight: 8, display: 'inline' }}>{name}：</h6>
				<div className="tag-items-box">
					<div className="tag-items">
						{tagsFromServer.map((tag, index) => (
							<Popover
								className="popover-mod"
								placement="bottom"
								content={content}
								trigger="hover"
								visible={false}
								key={index}
							>
								<CheckableTag
									key={tag}
									checked={selectedTags.indexOf(tag) > -1}
									onChange={(checked) => this.handleChange(tag, checked)}
								>
									{tag}
								</CheckableTag>
							</Popover>
						))}
					</div>
				</div>
				{tagsFromServer.length > 16 ? (
					<a
						onClick={(e) => {
							this.handleHeight(e);
						}}
						className="tag-more-btn"
					>
						{'更多+'}
					</a>
				) : (
					''
				)}
			</div>
		);
	}
}

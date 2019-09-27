import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Anchor, Form, Select, Input, Button, Cascader, Checkbox, Row, Col, message } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import config from '../../config/config';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'antd/dist/antd.min.css';
import './index.scss';

const { Link } = Anchor;
const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18, offset: 6 },
};

const toTransformAreaTreeProps = (data, map) => data.map(node => {
    let node_object = {
        label: node[map.key || 'key'],
        value: node[map.value || 'value']
    }
    if (node.children) {
        node_object[map.children || 'children'] = toTransformAreaTreeProps(node.children, map);
    }
    return node_object;
});

const toGetParentArrayByChildNode = (tree, target) => {
    let key = Object.keys(target).shift();
    let val = target[key];
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

const DoubleInput = (props) => {

    const { onChange, extra, set } = props;
    const [state, setState] = useState([])

    const onChangeHandler = (key) => (val) => {
        state[key] = val.target.value;
        setState(state)
        if (!state[0] || !state[1]) {
            onChange('');
        } else {
            onChange(state.join(','));
        }
    }

    return (
        <div className="double-input" style={{ position: "relative" }}>
            <Input type="text" placeholder="姓名" onChange={onChangeHandler(0)}/>
            <Input type="number" placeholder="手机号码" onChange={onChangeHandler(1)} pattern="[0-9]"/>
            {!extra && <img onClick={() => set(true)} style={{ width: "25px", position: "absolute", right: "-28px", top: "3px", }} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAAvAC8DASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAABgABAwQFBwL/xAAYAQEBAQEBAAAAAAAAAAAAAAADBAIBBf/aAAwDAQACEAMQAAABf0ros7vbPlSobl8ko86Y3sEdN1UB6MVWZDKV4CBbplkbgi3O2PTBNfWRsv/EAB8QAAICAgIDAQAAAAAAAAAAAAIDAQQABRASERMVMf/aAAgBAQABBQLPzC2VYTAxYPO1Mgq5pjLvy9IvUWtODpVBqr4a0Urs32vlcExseuunXWSMonzG4bPfKxdLNnWg46dKLRV0xXSyohxfPq58+rkDAitK08f/xAAdEQADAAMBAAMAAAAAAAAAAAABAgMABBIRECFh/9oACAEDAQE/AZp2wXL6aonS/GvB6H1c3C4AQnKzM25OR3JzQL5ltvpg0/rL7BqfzP/EABsRAAIDAQEBAAAAAAAAAAAAAAECAAMREjEQ/9oACAECAQE/AWODYlpJw/HcL7Ks9it0Nj1Mx2JVgwxE5n//xAAjEAABAwMEAgMAAAAAAAAAAAABAAIRAxIxEBMhQSAzQlFx/9oACAEBAAY/AtLb1c0yPCG9nR7PjE+Bpu7UCoyP1ZlxydS92Ajzaz6Ca2clWBw4Cq7tTviVwm0usnSm49FOq7hTwXkWoUwZhXVKYJXpC9QVowjttic6f//EAB8QAQACAgIDAQEAAAAAAAAAAAEAESExEEEgUWHxwf/aAAgBAQABPyGKC1oJZCX2GIJG+k8LSViX5xlP+jw1u9vUuc+ySIaHNGvqA8PogaVdW4qEOO2GdgbEC5CfIobgUcHrUaVql1ufOQzcVGOzMRjq1Z+6z95hEMCgj1W+6d8f/9oADAMBAAIAAwAAABD7HzRLwlMz/8QAHREBAAICAgMAAAAAAAAAAAAAAQARMUEQcZGh0f/aAAgBAwEBPxBjdsds2Zvi/wBQbllG9BXmLNEuKszj7AsSCnGPceA9J//EABsRAAMAAgMAAAAAAAAAAAAAAAABERAhMVFh/9oACAECAQE/EK3QmznC6bUV21UgiAaaRQ2oWvp//8QAIxABAAIBAwMFAQAAAAAAAAAAAQARITFBYRBxwSBRgZHwof/aAAgBAQABPxCOTAtXaKiBpv8A2hbptdj6L+BVv4+einpBJsWDz6A4xYGq2SP7ooaV2W4YVojo8HHUUYr7vtLmypVWcsVZJa0sDVTOoasqCY0sWun0QI16KsjujlRdPPTTwiy6tdYDBswvygEnUniPc5d9uN0sUjB2Z+T8wBs/fzKZl6N40rMUF7BOXz0//9k=" alt="add" />}
        </div>
    )
}

export default Form.create()(withRouter((props) => {

    const [flag, setFlag] = useState(false);
    const [area, setArea] = useState(null);

    const { form } = props;
    const { getFieldDecorator, getFieldsError, validateFields } = form;

    useEffect(() => {
        if (!sessionStorage.getItem('area')) {
            fetch('http://192.168.30.224:3000/api/metadata/tree/descendantsTree/%E5%9C%B0%E5%8C%BA').then(res => res.json()).then((res) => {
                if (res && res.length > 0) {
                    setArea(res);
                    sessionStorage.setItem('area', JSON.stringify(res));
                }
            })
        } else {
            setArea(JSON.parse(sessionStorage.getItem('area')));
        }
        validateFields();
    }, [])

    const hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    const handleSubmit = e => {
        e.preventDefault();
        validateFields(async (err, values) => {
            if (!err) {
                let req_obj = {
                    ex_info: {
                        participants: []
                    }
                };
                let area_item = toGetParentArrayByChildNode(area, { title: values.area[2] })[2];
                let user_1 = values.participants_1 ? values.participants_1.split(",") : null;
                let user_2 = values.participants_2 ? values.participants_2.split(",") : null;

                if (user_1) {
                    req_obj.realname = user_1[0];
                    req_obj.phone = user_1[1];
                    req_obj.ex_info.participants.push({ realname: user_1[0], phone: user_1[1] });
                }
                if (user_2) {
                    req_obj.ex_info.participants.push({ realname: user_2[0], phone: user_2[1] });
                }
                req_obj.area = area_item;
                req_obj.company = values.company;
                req_obj.org_type = values.org_type;
                if (values.board_and_lodging) {
                    req_obj.ex_info.board_and_lodging = values.board_and_lodging;
                }
                
                const res = await fetch('/api/customer', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(req_obj)
                }).then(res => res.json());

                if (res && res.id) {
                    message.success('报名成功！');
                } else {
                    message.fail('报名失败！');
                }
                
            }
        });
    };

    return (
        <div id="topic-page">
            <div className="topic-navi">
                <Anchor className="topic-navi-container">
                    <Link href="#meeting-background" title="会议背景" />
                    <Link href="#group-introduction" title="集团介绍" />
                    <Link href="#important-guest" title="重要嘉宾"/>
                    <Link href="#agenda" title="会议议程"/>
                    <Link href="#meeting-address" title="会议地址"/>
                    <Link href="#registration" title="报名参会"/>
                    <Link href="#sponsor" title="赞助单位"/>
                </Anchor>
            </div>
            <div className="topic-banner">
                <LazyLoadImage
                    width="100%"
                    height="100%"
                    effect="blur"
                    placeholderSrc={config.staticImgUrl + `topic/topic@small.jpg`}
                    src={config.staticImgUrl + `topic/topic@large.jpg`} // use normal <img> attributes as props
                    alt="banner"
                />
            </div>
            <div className="topic-main">
                <p className="line-1">文旅产业投资的机遇与困惑</p>
                <div className="line-divider"></div>
                <p className="line-2">指导单位：江西省文化和旅游厅</p>
                <p className="line-3">主办单位：江西省旅游集团</p>
                <p className="line-4">2019.11.6 | 江西·南昌</p>
                <p className="line-5">
                    <a className="to-register" href="#registration">立即报名</a>
                </p>
                <p id="meeting-background" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>会议背景</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-content">
                    <p>为搭建江西省文化和旅游企业与资本对接合作平台，聚集省内外优秀文化和旅游企业及金融机构，共同交流工作、对接项目、深化合作，建立文旅产融结合长效对接机制，全力助推江西文旅产业高质量发展。现诚挚邀您出席参加2019江西省文化旅游投资发展促进会，共襄盛会！</p>
                </div>
                <p id="group-introduction" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>集团介绍</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-content">
                    <p>江西省旅游集团股份有限公司是具有国资背景的综合性现代旅游企业集团，于2014年12月28日正式揭牌成立。目前集团旗下拥有21家直属企业及2家二级公司，在吃、住、行、游、购、娱、养等旅游全要素消费领域展开布局。江旅集团持续整合产业链资源，在旅游全要素消费领域拥有成熟的运营实力，同时，通过自有金融平台为行业上下游企业提供综合性服务和支持。</p>
                </div>
                <p id="important-guest" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>重要嘉宾</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-guest">
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-1@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-1@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>石杰</p>
                        <p>【互联网金融服务】</p>
                        <p>百度中国</p>
                        <p>首席产品官</p>
                    </div>
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-2@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-2@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>沈斌</p>
                        <p>【供应链金融服务】</p>
                        <p>南京丰盛康旅有限公司</p>
                        <p>CEO</p>
                    </div>
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-3@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-3@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>王未召</p>
                        <p>【全球旅游服务】</p>
                        <p>联谊假期</p>
                        <p>CEO</p>
                    </div>
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-4@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-4@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>刘国平</p>
                        <p>【线上旅游营销】</p>
                        <p>八爪鱼日本株式会社</p>
                        <p>CEO</p>
                    </div>
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-5@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-5@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>高宏久</p>
                        <p>【线上旅游营销】</p>
                        <p>久柏易游创始人</p>
                        <p>原驴妈妈CEO</p>
                    </div>
                    <div>
                        <LazyLoadImage
                            width="100%"
                            height="100%"
                            effect="blur"
                            placeholderSrc={config.staticImgUrl + `topic/guest-6@small.jpg`}
                            src={config.staticImgUrl + `topic/guest-6@large.jpg`} // use normal <img> attributes as props
                            alt="banner"
                        />
                        <p>鲍将军</p>
                        <p>【景区投资及运营】</p>
                        <p>金马克文旅董事长</p>
                        <p>CEO</p>
                    </div>
                </div>
                <div id="agenda" className="intro-meeting">
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-1@small.jpg`}
                        src={config.staticImgUrl + `topic/part-1@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-2@small.jpg`}
                        src={config.staticImgUrl + `topic/part-2@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-3@small.jpg`}
                        src={config.staticImgUrl + `topic/part-3@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-4@small.jpg`}
                        src={config.staticImgUrl + `topic/part-4@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-5@small.jpg`}
                        src={config.staticImgUrl + `topic/part-5@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-6@small.jpg`}
                        src={config.staticImgUrl + `topic/part-6@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/part-7@small.jpg`}
                        src={config.staticImgUrl + `topic/part-7@large.jpg`} // use normal <img> attributes as props
                        alt="banner"
                    />
                </div>

                <p id="meeting-address" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>会议地址</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-content">
                    <p style={{ textAlign: "center" }}>江西省·南昌市·西湖区八一大道138号赣江宾馆</p>
                    <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        placeholderSrc={config.staticImgUrl + `topic/座位图.png`}
                        src={config.staticImgUrl + `topic/座位图.png`} // use normal <img> attributes as props
                        alt="banner"
                    />
                </div>

                <p id="registration" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>报名参会</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-content topic-form">
                    <Form onSubmit={handleSubmit}>
                        <Form.Item label="企业类别" {...formItemLayout}>
                            {getFieldDecorator('org_type', {
                                rules: [{ required: true, message: '请选择企业类别' }],
                            })(
                                <Select placeholder="一 请选择企业类别 一">
                                    <Option value="旅游康养">旅游康养</Option>
                                    <Option value="景区">景区</Option>
                                    <Option value="酒店与民宿">酒店与民宿</Option>
                                    <Option value="餐饮">餐饮</Option>
                                    <Option value="旅行社">旅行社</Option>
                                    <Option value="旅游大交通">旅游大交通</Option>
                                    <Option value="小额贷款">小额贷款</Option>
                                    <Option value="典当公司">典当公司</Option>
                                    <Option value="担保公司">担保公司</Option>
                                    <Option value="金融租赁">金融租赁</Option>
                                    <Option value="商业银行">商业银行</Option>
                                    <Option value="基金公司">基金公司</Option>
                                    <Option value="证券公司">证券公司</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="企业名称" {...formItemLayout}>
                            {getFieldDecorator('company', {
                                rules: [{ required: true, message: '请填写企业全称' }],
                            })(
                                <Input placeholder="一 请填写企业全称 一" />
                            )}
                        </Form.Item>
                        <Form.Item label="企业地址" {...formItemLayout}>
                            {getFieldDecorator('area', {
                                rules: [
                                    { type: 'array', required: true, message: '请选择企业所在的地址' },
                                ],
                            })(<Cascader placeholder="一 请选择企业地址 一" options={area ? toTransformAreaTreeProps(area, { key: 'title', value: 'title' }) : []} />)}
                        </Form.Item>
                        <Form.Item label="参会人" {...formItemLayout}>
                            {getFieldDecorator('participants_1', {
                                rules: [
                                    { required: true, message: '第一位参会人作为会议联系人，允许最多2位参会人' },
                                ],
                            })(
                                <DoubleInput extra={flag} set={setFlag} />
                            )}
                        </Form.Item>
                        {flag && <Form.Item label="参会人" {...formItemLayout}>
                            {getFieldDecorator('participants_2', {
                                rules: [
                                    { required: true, message: '第一位参会人作为会议联系人，允许最多2位参会人' },
                                ],
                            })(
                                <DoubleInput extra={flag} set={setFlag} />
                            )}
                        </Form.Item>}
                        <Form.Item label="食宿" {...formItemLayout}>
                            {getFieldDecorator('board_and_lodging')(
                                <Checkbox.Group>
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="dinner5">11月5日晚餐</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="stay5">11月5日住宿（含次日早餐）</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="lunch6">11月6日午餐</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            )}
                        </Form.Item>
                        <Form.Item {...formTailLayout}>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>提交</Button>
                        </Form.Item>
                    </Form>
                    
                </div>

                <p id="sponsor" className="intro-title">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span>赞助单位</span>
                    <i></i>
                    <i></i>
                    <i></i>
                </p>
                <div className="intro-content sponsor-list">
                    <img src='http://dummyimage.com/800x600/4d494d/686a82.gif&text=赞助单位' alt='赞助单位' />
                    <img src='http://dummyimage.com/800x600/4d494d/686a82.gif&text=赞助单位' alt='赞助单位' />
                    <img src='http://dummyimage.com/800x600/4d494d/686a82.gif&text=赞助单位' alt='赞助单位' />
                    <img src='http://dummyimage.com/800x600/4d494d/686a82.gif&text=赞助单位' alt='赞助单位' />
                </div>
                <div className="empty-divider"></div>
                <div className="empty-divider"></div>
                <div className="empty-divider"></div>
            </div>
        </div>
    )
}));
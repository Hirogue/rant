import React from 'react';
import { withRouter } from 'next/router';
import { Anchor } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import config from '../../config/config';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './index.scss';

const { Link } = Anchor;

export default withRouter((props) => {




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
                <div className="intro-content">
                    <select name="org_type">
                        <option value="旅游康养">旅游康养</option>
                        <option value="景区">景区</option>
                        <option value="酒店与民宿">酒店与民宿</option>
                        <option value="餐饮">餐饮</option>
                        <option value="旅行社">旅行社</option>
                        <option value="旅游大交通">旅游大交通</option>
                        <option value="小额贷款">小额贷款</option>
                        <option value="典当公司">典当公司</option>
                        <option value="担保公司">担保公司</option>
                        <option value="金融租赁">金融租赁</option>
                        <option value="商业银行">商业银行</option>
                        <option value="基金公司">基金公司</option>
                        <option value="证券公司">证券公司</option>
                    </select>
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
});
import BaseLayout from '../../components/Layout/BaseLayout';
import BreadCrumb from '../../components/BreadCrumb';

import IconFont from '../../components/IconFont';
import PageMod from '../../components/PageMod';
import './help.scss';
export default () => {
  return (
    <BaseLayout>
      <div className="help-main">
        <BreadCrumb adrname_two={'帮助中心'}/>
        <div className="help-content">
          <div className="left">
            <h4 className="left-title">帮助中心</h4>
            <a className="nav-item active">新手指引</a>
            <a className="nav-item">法律法规</a>
            <a className="nav-item">合作机构</a>
            <a className="nav-item">保障体系</a>
            <a className="nav-item">网站公告</a>
            <div className="hotline">
              <div className="icon-name"><IconFont className="iconfont" type="icon-icon-test" /><span>服务热线</span></div>
              <h4 className="iphone">400-123-1234</h4>
            </div>
          </div>
          <div className="right">
            <p className="list-title">网站公告</p>
            <div className="list-main">
              <div className="item">
                <a>· 关于“资源通”价格调整的通知（浙江投融界【2018】第023号）</a>
                <p>2018-12-26</p>
              </div>
              <div className="item">
                <a>· 关于“资源通”价格调整的通知（浙江投融界【2018】第023号）</a>
                <p>2018-12-26</p>
              </div>
              <div className="item">
                <a>· 关于“资源通”价格调整的通知（浙江投融界【2018】第023号）</a>
                <p>2018-12-26</p>
              </div>
              <div className="item">
                <a>· 关于“资源通”价格调整的通知（浙江投融界【2018】第023号）</a>
                <p>2018-12-26</p>
              </div>
              <div className="item">
                <a>· 关于“资源通”价格调整的通知（浙江投融界【2018】第023号）</a>
                <p>2018-12-26</p>
              </div>
            </div>
            <PageMod />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
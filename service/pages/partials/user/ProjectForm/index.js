import React from 'react';
import { Radio } from 'antd';
import UserEnterprise from './enterprise';
import UserPersonal from './personal';

const RadioGroup = Radio.Group;

import './fund_form.scss';

export default class ProjectForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valueId: 1
    }
  }

  onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      valueId: e.target.value,
    });
  }

  render() {
    return(
      <div className="fund-form">
        <div className="tab-title"><p>联系资料(项目方)</p></div>
        <div className="form-main">
          <div className="id-tab">
            <p><span>*</span>会员身份：</p>
            <RadioGroup onChange={this.onChange2} value={this.state.valueId}>
              <Radio value={1}>企业</Radio>
              <Radio value={2}>个人</Radio>
            </RadioGroup>
          </div>
          {
            this.state.valueId===1 ? <UserEnterprise /> : <UserPersonal />
          }
        </div>
      </div>
    )
  }
}
import React from 'react';
import { Radio } from 'antd';
import UserEnterprise from './enterprise';

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
        <div className="tab-title"><p>联系资料(服务商)</p></div>
        <div className="form-main">
          <div className="id-tab">
            <p><span>*</span>会员身份：</p>
            <RadioGroup onChange={this.onChange2} value={this.state.valueId}>
              <Radio value={1}>企业</Radio>
            </RadioGroup>
          </div>
            <UserEnterprise />
        </div>
      </div>
    )
  }
}
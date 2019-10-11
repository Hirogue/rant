import React, {Fragment,useState,useEffect} from 'react';
import _ from 'lodash';
import { Drawer, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import IconFont from '../../../components/IconFont';
import { Fetch } from '../../../lib/global';
import GlobalContext from '../../../components/context/GlobalContext';

const html = `
<p><span style="font-size:16px">尊敬的用户：</span></p><p><span style="font-size:16px">欢迎阅读旅游项目通服务协议（下称“本协议”），您应当在使用服务之前认真阅读本协议全部内容。《服务协议》以及相关管理规则、《隐私协议》、《法律声明》等均为本协议的组成部分，如果您对本协议任何条款表示异议，您可以选择不使用旅游项目通的服务。点击“立即注册”按钮，则意味着您自愿遵守本协议的全部内容。</span></p><p><span style="font-size:16px">本协议阐述之条款和条件适用于用户使用旅游项目通中文网站（所涉域名为：lvyoto.com，下称“旅游项目通”）所提供的各种在线投融资的工具、服务和衍生的线下服务。</span></p><p><strong><span style="font-size:16px">一、定义</span></strong></p><p><span style="font-size:16px">1.&nbsp;旅游项目通（或本平台）：是专业的旅游项目投融资信息服务平台。旅游项目通网站的运营权归江西省旅游产业资本管理有限公司所有，旅游项目通和江西省旅游产业资本管理有限公司，视为同一个主体。</span></p><p><span style="font-size:16px">2.&nbsp;用户：是同意遵守本协议，在旅游项目通完成注册，进行投融资、招商引资和信息交流活动的主体，包括项目方、资金方、金融服务机构、交易信息的发布者等所有参与本平台活动的自然人、法人或者其他组织。用户应当具备相应民事行为能力，不具备民事行为能力或者缺乏特定许可资质的用户与旅游项目通签署的协议无效，且由此产生的一切法律后果均由用户自行承担。</span></p><p><strong><span style="font-size:16px">二、用户的权利和义务</span></strong></p><p><span style="font-size:16px">1.&nbsp;用户在遵守本协议的前提下，依法享有旅游项目通提供的服务，有权对旅游项目通的服务进行监督、批评和指导，本平台欢迎用户提出服务改进建议，并会以勤勉态度为用户提供服务。</span></p><p><span style="font-size:16px">2.&nbsp;用户应当按照本协议和本平台的有关管理规则提交注册信息，并保证注册信息的真实性、合法性和完整性。用户可选择不公开或部分/全部公开自己的注册信息，对用户选择公开的信息以及用户上传的项目、资金信息等资料，旅游项目通、其他用户及其他浏览者将有权依据各自权限级别浏览、查阅和利用。</span></p><p><span style="font-size:16px">3.&nbsp;用户应当妥善保存自己的用户名和密码，不得以任何形式擅自转让或授权他人使用自己在旅游项目通的用户帐号。用户对其在旅游项目通注册的用户名和密码的安全性负全部责任，并对以其用户名进行的所有活动和事件负全部责任，用户若发现任何非法使用其账号或存在安全漏洞的情况，应立即通知旅游项目通。</span></p><p><span style="font-size:16px">4.&nbsp;用户保证通过旅游项目通发布的信息是真实、合法的，用户发布的信息不能含有任何违反国家有关法律、法规、政策及中华人民共和国承认或加入的国际条约的内容，包括但不限于危害国家安全、淫秽色情、虚假、侮辱、诽谤、恐吓或骚扰、蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据等侵犯他人知识产权、人身权或其他合法权益以及有违社会公序良俗的内容或指向这些内容的链接。</span></p><p><span style="font-size:16px">5.&nbsp;用户有权享有旅游项目通提供信息交流的各种服务，在本平台进行包括但不限于信息发布、信息浏览、信息订阅等相关活动时，应当严格遵守旅游项目通的相关管理规则，该规则包括但不限于《隐私条款》、《法律声明》等管理规则。</span></p><p><span style="font-size:16px">6.&nbsp;用户通过旅游项目通进行信息发布、信息浏览、信息订阅等活动所引起的一切法律纠纷均与旅游项目通无关。因用户违反有关法律、法规或本协议的有关规定而给旅游项目通或者第三方造成损失的，用户同意赔偿因此而导致的全部损失，包括但不限于实际损失、可预期利益、因此发生的诉讼费、差旅费、评估费、鉴定费、律师费、保全费、执行费、赔偿金等。</span></p><p><span style="font-size:16px">7.&nbsp;用户在旅游项目通实施了违法行为，导致第三方投诉（包括但不限于第三方以发函等形式指控旅游项目通侵权，对旅游项目通提起诉讼、仲裁，或使旅游项目通面临相关主管机关的审查或质询），旅游项目通有权先暂停用户对旅游项目通的使用。用户在收到旅游项目通通知后，应以自己名义出面与第三方协商、参与诉讼或接受相关主管机关审查或质询，并承担所有费用，并赔偿因此给旅游项目通造成的全部损失　　</span></p><p><span style="font-size:16px">8.&nbsp;用户不得通过任何方式攻击、干扰或试图攻击、干扰旅游项目通的正常运作及其有关活动，也不得帮助或教唆任何第三方从事上述活动，否则，旅游项目通有权立即终止用户对旅游项目通的使用，并要求赔偿因此给旅游项目通造成的全部损失。</span></p><p><span style="font-size:16px">9.&nbsp;本协议约定的赔偿损失的范围，包括直接损失、维权支出的诉讼费、差旅费、律师费、鉴定费、评估费、执行费、保全费、送达费等。</span></p><p><strong><span style="font-size:16px">三、旅游项目通的权利义务</span></strong></p><p><span style="font-size:16px">1.&nbsp;旅游项目通在提供本平台服务时，可能会对部分服务收取一定的费用，在此情况下，旅游项目通会在相关页面上做明确的提示。如用户拒绝支付该等费用，则不能使用相关的网络服务。旅游项目通保留在根据本协议第六条第一款变更协议后，收取或不收取“服务”费用的权利。</span></p><p><span style="font-size:16px">2.&nbsp;旅游项目通将对用户上传的内容进行审核，该审查为规范性审核，非实质性审核，亦无法保证用户上传内容的真实性、准确性、有效性和安全性。但在本平台实施管理活动以及第三方对用户发布信息进行投诉时，本平台会对用户提供的信息进行复核，为此可能会要求用户提供相应证据来证明其提供信息的真实性及合法性，在用户无法提供有效证明时，本平台有权删除相关信息及/或终止服务。</span></p><p><span style="font-size:16px">3.&nbsp;为了更好的服务用户，旅游项目通及其关联机构除对用户提供的资料（包括但不限于文字、图片、视频等）拥有合理使用权外，还拥有独家的、全球通用的、免费的许可使用权。许可使用范围包括复制、发行、展览、信息网络传播、改编、翻译、汇编等。用户将前述资料提供给旅游项目通期间，许可使用权持续有效。若用户发现旅游项目通对用户资料的使用不当时，请及时提出，旅游项目通将尽快改正。</span></p><p><span style="font-size:16px">4.&nbsp;为了更好的服务用户，旅游项目通及其关联机构在提供服务过程中及服务结束后的合理时间内拥有用户的肖像使用权，对包含用户的图片、照片及影像资料等可以用于宣传旅游项目通、网络媒介服务、第三方正面宣传报道等服务的用途。</span></p><p><span style="font-size:16px">5.&nbsp;旅游项目通有权随时删除含有任何危害国家安全、淫秽色情、虚假、侮辱、诽谤、恐吓或骚扰、侵犯他人知识产权或人身权或其他合法权益等违法或有违社会公序良俗的内容或指向这些内容链接的信息，并有权终止对发布前述信息的用户的服务。</span></p><p><span style="font-size:16px">6.&nbsp;通过旅游项目通服务存储或传送之任何信息、通讯资料和其他内容，如被删除或未予储存，旅游项目通毋须承担任何责任。</span></p><p><span style="font-size:16px">7.&nbsp;旅游项目通可能会提供与其他互联网网站或资源进行链接；用户还可能通过旅游项目通与推广商进行互动（包括但不限于参与促销活动，进行相关商品或服务之付款及交付），但旅游项目通对此不做出任何承诺，且对于前述网站或资源是否可以利用或用户与前述推广商的自主互动而遭受的任何性质的损失或损害，旅游项目通不承担任何责任。</span></p><p><span style="font-size:16px">8.&nbsp;用户所从事的经营业务不得对旅游项目通利益构成任何现实或潜在的损害或冲突，否则旅游项目通有权通知用户立即终止服务，而无需承担其他法律责任和费用补偿，如因此给旅游项目通造成损害的，用户需承担损害赔偿责任。</span></p><p><span style="font-size:16px">9.&nbsp;对于系统发生故障影响到本服务的正常运行，旅游项目通承诺及时处理进行修复。但用户因此而产生的经济和精神损失，旅游项目通不承担任何直接或间接的责任。对于旅游项目通有计划的系统维修、保养、升级，旅游项目通将会以网站公告的方式事先通知用户，升级期间，旅游项目通服务将不同程度受到影响，用户因此而产生的损失，旅游项目通不承担任何直接或间接的责任，亦不予赔偿，但将尽力减少因此而给您造成的损失和影响。</span></p><p><span style="font-size:16px">10.&nbsp;用户完全理解并同意，通过旅游项目通可能会收到推广信息及服务信息，凡因接收相应推广信息而与信息发布者或推广商发生交易行为而遭受的任何性质的损失或损害，旅游项目通均不予负责。</span></p><p><span style="font-size:16px">11.&nbsp;旅游项目通拥有对本协议条款的修改权、更新权、解释权。用户对服务之任何部分或本协议条款的任何部分之意见及建议可通过jianglvziben@163.com或0791-87705030与旅游项目通联系。</span></p><p><strong><span style="font-size:16px">四、免责声明</span></strong></p><p><span style="font-size:16px">1.&nbsp;除非另有书面协议约定，旅游项目通在任何情况下，对您使用本网站服务而产生的任何形式的直接或间接损失均不承担法律责任，包括但不限于资金损失、利润损失、营业中断损失等。！</span></p><p><span style="font-size:16px">2.旅游项目通不对您最终的融资结果做任何保证。您需根据自身实际能力及投资方的可靠程度独立判断，做出交易决策。项目实际投融资过程中产生的任何损失均由您自行承担。！</span></p><p><span style="font-size:16px">3.&nbsp;会员自旅游项目通任何工作人员处取得的建议、说明，均不构成旅游项目通对服务的承诺和保证。由此产生的法律后果，旅游项目通不承担任何责任。！</span></p><p><span style="font-size:16px">4.&nbsp;会员信息主要由您自行提供或发布，旅游项目通无法保证所有您提供的信息的真实、及时和完整，会员应对自己的判断承担全部责任。任何因为投融资行为而产生的风险概由会员方自行承担。！</span></p><p><span style="font-size:16px">5.&nbsp;任何旅游项目通之外的第三方机构或个人所提供的服务，其服务品质及内容由该第三方自行、独立负责。会员享用相关服务时产生的争议、纠纷及损失，旅游项目通不承担任何责任。！</span></p><p><span style="font-size:16px">6.&nbsp;因黑客、病毒或密码被盗、泄露等非旅游项目通原因所造成的损失概由会员本人自行承担。！</span></p><p><span style="font-size:16px">7.&nbsp;会员须对其自身在使用旅游项目通所提供的服务时的一切行为、行动（不论是否故意）负全部责任。！</span></p><p><span style="font-size:16px">8.&nbsp;当司法机关、政府部门或其他监管机构根据有关法律、法规、规章及其他政府规范性文件的规定和程序，要求旅游项目通提供您的信息资料，本网站对据此作出的任何披露，概不承担责任。！</span></p><p><strong><span style="font-size:16px">五、隐私条款</span></strong></p><p><span style="font-size:16px">旅游项目通将严格依照《隐私条款》及国家法律法规给予用户隐私权保护。详见《隐私条款》条文。</span></p><p><strong><span style="font-size:16px">六、知识产权声明</span></strong></p><p><span style="font-size:16px">旅游项目通独立拥有或与相关内容提供者共同拥有本平台内相关内容（包括但不限于网络域名、文字、图片、音频、视频资料、设计、商标、标识、网站构架、网站版面的安排、网页设计、软件和全部专有数据库等）的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等。未经旅游项目通书面许可，任何人不得擅自使用。否则，旅游项目通将依法追究侵权人法律责任。</span></p><p><strong><span style="font-size:16px">七、协议的变更、解除和终止</span></strong></p><p><span style="font-size:16px">1.&nbsp;变更</span></p><p><span style="font-size:16px">旅游项目通可以根据客观情况的变化随时进行业务性调整或产品性调整，并变更本协议，变更后的本协议将会在旅游项目通上重新公布。用户可以选择继续使用调整后的业务或产品，但是如果用户对变更后的本协议持有不同意见，可以选择退出旅游项目通，但旅游项目通对此不承担任何法律责任和费用补偿。如果用户继续选择享用旅游项目通，则视为用户已经完全接受本协议及其修改。</span></p><p><span style="font-size:16px">2.&nbsp;解除和终止</span></p><p><span style="font-size:16px">如发生下列任何一种情形，旅游项目通有权随时中断或终止向用户提供服务而无需通知用户：</span></p><p><span style="font-size:16px">1) 用户提供的个人资料不真实；</span></p><p><span style="font-size:16px">2) 用户违反法律或者本协议及其修改文本的规定；</span></p><p><span style="font-size:16px">3) 按照主管部门的要求；</span></p><p><span style="font-size:16px">4) 用户注册后连续12个月未登录其在旅游项目通的账号；</span></p><p><span style="font-size:16px">5) 旅游项目通发现用户恶意注册账号；</span></p><p><span style="font-size:16px">6) 同一公司主体注册多个账号；</span></p><p><span style="font-size:16px">7) 旅游项目通收到第三方投诉；</span></p><p><span style="font-size:16px">8) 同行业者通过注册账号等行为，获取资金方或项目方联系方式，窃取商业机密；</span></p><p><span style="font-size:16px">9) 其他旅游项目通认为是符合整体服务需求的特殊情形。</span></p><p><strong><span style="font-size:16px">八、不可抗力</span></strong></p><p><span style="font-size:16px">1.&nbsp;不可抗力是指协议双方不能合理控制、不可预见或即使预见亦无法避免的事件，该事件使任何一方根据本协议履行其全部或部分义务已不可能。该事件包括但不限于政府行为、地震、台风、洪水、火灾或其它天灾、战争或任何其它类似事件。</span></p><p><span style="font-size:16px">2.&nbsp;鉴于互联网之特殊性质，不可抗力亦包括下列影响互联网正常运行之情形：1）黑客攻击；2）电信部门技术调整导致之重大影响；3）病毒侵袭等。</span></p><p><span style="font-size:16px">3.&nbsp;旅游项目通如遭受不可抗力事件，有权暂停或终止服务，不视为违约。在不可抗力事件影响结束后，应当继续按本协议履行其义务。</span></p><p><strong><span style="font-size:16px">九、法律适用及争议解决</span></strong></p><p><span style="font-size:16px">1.&nbsp;本协议的订立、生效、解释、执行、管辖、争议的解决均适用中华人民共和国法律。</span></p><p><span style="font-size:16px">2.&nbsp;因本协议引起的或与本协议有关的任何争议，应尽最大诚意进行友好协商，如果双方不能协商一致，协议双方向本协议的履行地即服务器所在地有管辖权的人民法院起诉。</span></p><p><strong><span style="font-size:16px">十、其他</span></strong></p><p><span style="font-size:16px">1.&nbsp;本协议适用的通知方式。</span></p><p><span style="font-size:16px">1) 拨打客服电话0791-87705030、向客服邮箱jianglvziben@163.com发送邮件、EMS邮政快递均视为用户的有效通知。</span></p><p><span style="font-size:16px">2) 若通知以电子邮件形式发送，则通知收件日期以邮件进入收件方指定的电子邮件系统的时间为准；若通知及函件以EMS邮政快递或挂号邮件发送时，则通知收件日期以收件方签收之日为准；以多种方式通知收件方的，收件日期以最早的收件日期为准。</span></p><p><span style="font-size:16px">2.&nbsp;本公司未行使或执行本服务协议任何权利或规定，不构成对前述权利或权益之放弃。</span></p><p><span style="font-size:16px">3.&nbsp;如本服务协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本服务协议的其余条款仍应有效并且有约束力。</span></p><p><span style="font-size:16px">4.&nbsp;免责声明：网站所展示的信息由会员自行提供，内容的真实性、准确性和合法性由发布会员负责。旅游项目通对此不承担任何责任。</span></p><p><span style="font-size:16px">5.&nbsp;友情提醒：注意融资风险，建议您在投融资时务必对他人公司的资质、实力进行详细调查了解，特别警惕各类前期费用！</span></p><p><strong><span style="font-size:16px">十一、本协议一经用户点击“立即注册”按钮后，立即生效。</span></strong></p>
`


export default Form.create()((props) => {

	const CODE_INTERVAL = 60;

	const { form: { getFieldDecorator, getFieldValue }, handleRegisterSubmit } = props;
	
	const [thisState, setState] = useState({
		visible: false,
		timer: null,
		counter: CODE_INTERVAL,
		code_status: '发送验证码',
		svg_code_key: '',
		svg_code_dom: ''
	});

	const toChangeStateFactor = (key) => (handler) => {
		thisState[key] = handler(thisState[key]);
		setState(Object.assign({}, thisState));
	}

	const showDrawer = () => toChangeStateFactor('visible')(visible => visible = true);

	const onClose = () => toChangeStateFactor('visible')(visible => visible = false);

	const toFetchCode = async () => {
		let { timer, counter, code_status } = thisState;
		if (timer) {
			return false;
		} else {
			const phone = getFieldValue('phone');
			const svgCode = getFieldValue('svgCode');
			if (!phone) return message.warning('请输入正确的手机号！');
			const res = await Fetch(`/api/verification/sms`, {
				phone,
				svgCode,
				svgKey: thisState.svg_code_key,
				smsType: "register"
			}).then(res => res.json());

			if (typeof res === 'boolean') {
				message.success('发送验证码成功！');
				toChangeStateFactor('timer')(timer => timer = 1);
				timer = setInterval(() => {
					if (counter === 1) {
						clearInterval(timer);
						timer = null;
						counter = CODE_INTERVAL;
						code_status = `发送验证码`;
					} else {
						counter -= 1;
						code_status = (() => <Fragment>{counter}秒后<br />重新发送</Fragment>)();
					}
					setState({ ...thisState, timer, counter, code_status });
				}, 1000);
			} else if (typeof res === 'object') {
				if (res.message.error) message.error(res.message.message);
			}
		}
	}

	const toFetchCodeSVG = () => {
		if (!global.reg_svg_flag) {
			global.reg_svg_flag = true;
			Fetch(`/api/verification/svg`).then(async res => {
				const { key, data } = await res.json();
				setState({
					...thisState,
					svg_code_key: key,
					svg_code_dom: data
				});
				global.reg_svg_flag = false;
			});
		}
	}

	useEffect(toFetchCodeSVG, [])

	return (

		<React.Fragment>
			<Drawer
				title="项目通服务协议"
				placement="right"
				onClose={onClose}
				visible={thisState.visible}
				maskClosable={false}
				width={800}
			>
				<div
					style={{ padding: '10px 10px 50px 10px' }}
					dangerouslySetInnerHTML={{
						__html: html
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '100%',
						borderTop: '1px solid #e9e9e9',
						padding: '10px 16px',
						background: '#fff',
						textAlign: 'right'
					}}
				>
					<Button onClick={onClose} type="primary">
						我已知晓
						</Button>
				</div>
			</Drawer>

			<Form
				onSubmit={(e) => {
					e.preventDefault();
					handleRegisterSubmit(e, props);
				}}
				className="login-form"
			>
				<Form.Item>
					{getFieldDecorator('phone', {
						rules: [
							{ required: true, message: '请输入您的手机号!' },
							{
								pattern: /^1[34578]\d{9}$/,
								message: '格式不正确'
							}
						]
					})(
						<Input
							type="phone"
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="手机号"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [
							{ min: 8, message: '不可少于8位' },
							{ max: 12, message: '不可超过12位' },
							{ required: true, message: '请输入您的密码!' }
						]
					})(
						<Input
							type="password"
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="密码"
						/>
					)}
				</Form.Item>

				<Form.Item>
					{getFieldDecorator('svgCode', {
						rules: [
							{ min: 4, message: '不可少于4位' },
							{ max: 4, message: '不可超过4位' },
							{ required: true, message: '请输入验证码!' }
						]
					})(
						<Input
							prefix={
								<IconFont
									className="iconfont"
									type="icon-yanzhengma"
									style={{ color: 'rgba(0,0,0,.25)' }}
								/>
							}
							addonAfter={<span onClick={toFetchCodeSVG} style={{ width: "80px", height: "30px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} dangerouslySetInnerHTML={{ __html: thisState.svg_code_dom }}></span>}
							placeholder="请输入验证码"
						/>,
					)}
				</Form.Item>

				<Form.Item>
					{getFieldDecorator('smsCaptcha', {
						rules: [
							{ min: 4, message: '不可少于4位' },
							{ max: 4, message: '不可超过4位' },
							{ required: true, message: '请输入验证码!' }
						]
					})(
						<Input
							prefix={
								<IconFont
									className="iconfont"
									type="icon-yanzhengma"
									style={{ color: 'rgba(0,0,0,.25)' }}
								/>
							}
							addonAfter={(
								<span
								    style={{ width: "80px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
									disabled={thisState.timer}
									onClick={toFetchCode}
									className="get-test"
								>
									{thisState.code_status}
								</span>
							)}
							placeholder="请输入短信码"
						/>
					)}
					
				</Form.Item>
				<Form.Item className="set-margin">
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox>我已阅读并同意</Checkbox>)}
					<a className="login-form-forgot" onClick={showDrawer}>
						《项目通服务协议》
						</a>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						注册
					</Button>
				</Form.Item>
			</Form>
		</React.Fragment>
	);
})

<template>
	<view class="addBank">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">添加银行卡</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">添加银行卡</block></cu-custom>
		</view>	 -->
		<view class="addBank_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="rowItemHeader">
					<view class="header_title">
						添加银行卡
					</view>
					<view class="header_tip">
						请绑定持卡人本人的银行卡
					</view>
				</view>
				<view class="rowItem">
					<view class="rowItemBox">
						<view class="listItemTitle">
							持卡人
						</view>
						<view class="listItemC">
							{{bankForm.name || ''}}
						   <!-- <input type="text" value="" placeholder="" v-model="addBankForm.name"/> -->
						</view>
					</view>
					<view class="lineBk"></view>
				</view>
				<view class="rowItem">
					<view class="rowItemBox">
						<view class="listItemTitle">
							卡号
						</view>
						<view class="listItemC">
						   <input type="text" value="" placeholder="持卡人本人银行卡号" v-model="addBankForm.bankCardNum"/>
						</view>
					</view>
					<view class="lineBk"></view>

				</view>
				<view class="rowItem">
					<view class="rowItemBox">
						<view class="listItemTitle">
							手机号
						</view>
						<view class="listItemC">
							{{bankForm.mobile}}
						   <!-- <input type="text" value="" placeholder="系统自动识别" v-model="addBankForm.mobile"/> -->
						</view>
					</view>
					<view class="lineBk"></view>

				</view>
				<view class="rowItem">
					<view class="rowItemBox">
						<view class="listItemTitle">
							输入密码
						</view>
						<view class="listItemC">
						   <input type="password" value="" placeholder="请设置银行卡登录密码" v-model="addBankForm.password"/>
						</view>
					</view>
					<view class="lineBk"></view>
				</view>
				<view class="rowItem">
					<view class="rowItemBox">
						<view class="listItemTitle">
							确认密码
						</view>
						<view class="listItemC">
						   <input type="password" value="" placeholder="再次填写确认" v-model="addBankForm.surePassword"/>
						</view>
					</view>
					<view class="lineBk"></view>

				</view>

			</view>
			<view class="second_block">
				<button class="sureChange" type="default" @click="addBank">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "addBank",
		components: {
		},
		data(){
			return {
				loginData:{},
				addBankForm:{
					name:'',
					bankCardNum:'',
					mobile:'',
					password:'',
					surePassword:''
				},
				bankForm:{}
			}
		},
		onShow() {
		
		},
		onLoad(options) {
			var bankForm = JSON.parse(options.passwordForm);
			this.bankForm = bankForm
			this.getloginData()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async addBank() {
				const  password = this.addBankForm.password;
				const  surePassword = this.addBankForm.surePassword;
				if(!this.addBankForm.bankCardNum) {
					uni.showToast({
					  title: '银行卡号不能为空',
					  icon: 'none'
					})
					return
				}
				if(!this.addBankForm.password) {
					uni.showToast({
					  title: '密码不能为空',
					  icon: 'none'
					})
					return
				}
				if(!this.addBankForm.surePassword) {
					uni.showToast({
					  title: '确认密码不能为空',
					  icon: 'none'
					})
					return
				}
				if(password !== surePassword) {
					uni.showToast({
					  title: '两次输入密码不一致',
					  icon: 'none'
					})
					return
				}
				
				const paramForm = {
					name:this.bankForm.name,
					mobile:this.bankForm.mobile,
					bankCardNum:this.addBankForm.bankCardNum,
					password:this.addBankForm.password,
					
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.addBank(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code == '0' && status == 'success') {
					const dataList = data.data[0]
					uni.showToast({
					  title:'添加成功',
					  icon: 'none'
					})
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200);
				} else {
					uni.showModal({
						 content: msg,
						 showCancel: false
					});
				}
				
			},
			
		}
	}	
</script>

<style lang="less" scoped>
.addBank {
	.addBank_container {
	
		.first_block {
			display: flex;
			flex-direction: column;
			.rowItemHeader {
				display: flex;
				flex-direction: column;
				text-align: center;
				padding: 48px  0px  20px;
				.header_title {
					height: 33px;
					font-size: 24px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 33px;
				}
				.header_tip {
					margin-top: 8px;
					height: 20px;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 20px;
				}
			}
			.rowItem {
				height: 52px;
				background: #FFFFFF;
				padding: 0  16px;
				display: flex;
				flex-direction: column;
				// padding: 15px 0  15px  18px;
				.lineBk {
					border-bottom: 1px solid #D9D9D9;
					z-index: 1;
				}
				.rowItemBox {
					display: flex;
					padding: 15px 0;
					.listItemTitle {
						width: 70px;
						height: 22px;
						font-size: 16px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 22px;
					}
					.listItemC {
						height: 22px;
						font-size: 16px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						// color: rgba(0, 0, 0, 0.25);
						color: #5D5D5D;
						line-height: 22px;
						padding-left: 20px;
					}
				}
			}
		}
	    .second_block {
			position: fixed;
			bottom: 50px;
			left: 0;
			right: 0;
			padding: 15px 64px 0px;
			.sureChange {
				height: 44px;
				background: #00D09F;
				border-radius: 22px;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 44px;
			}
		}
	}
}
</style>

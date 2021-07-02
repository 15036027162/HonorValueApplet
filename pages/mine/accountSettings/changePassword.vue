<template>
	<view class="changePassword">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">修改密码</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">修改密码</block></cu-custom>
		</view>	 -->
		<view class="changePassword_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="rowItem">
					<view class="listItemTitle">
							当前手机号
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{passwordForm.mobile}}
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							验证码 
					</view>
					<view class="listItemC">
						<input class="verificationCode" v-model="verificationCode"></input>
						<button v-if="timer_num > 0" class="getVerification timer_num" type="default">{{timer_num}}s</button>
						<button v-else class="getVerification" type="default" @click="sendShortMessageCode">获取验证码</button>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							新密码
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<input type="password" value="" placeholder="请输入新密码" v-model="password"/>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							确认密码
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<input type="password" value="" placeholder="请再次输入新密码" v-model="surePassword"/>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="second_block">
				<button class="sureChange" type="default" @click="retrievePasswordByType">确认修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "changePassword",
		components: {
		},
		data(){
			return {
				loginData:{},
				passwordForm:{},
				verificationCode:'',
				password:'',
				surePassword:'',
				timer_num:0
			}
		},
		onShow() {
		
		},
		onLoad(options) {
			var passwordForm = JSON.parse(options.passwordForm);
			this.passwordForm = passwordForm
			this.getloginData()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async sendShortMessageCode() {
				const paramForm = {
					mobile:this.passwordForm.mobile,
					module: "103",
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.sendShortMessageCode(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '4116' && status === 'success') {
					const dataList = data.data[0]
					this.verificationCode = dataList.code
					console.log(this.verificationCode)
					this.sendCode()
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
			},
			async retrievePasswordByType() {
				const  password = this.password;
				const  surePassword = this.surePassword;
				if(password !== surePassword) {
					uni.showToast({
					  title: '两次输入密码不一致',
					  icon: 'none'
					})
					return
				}
				const paramForm = {
					type:'2',//1银行卡登录忘记密码 2身份证号登录忘记密码
					identity:this.passwordForm.identity,//身份证信息
					
					password:this.password,
					module: "103",
					code:this.verificationCode,
					mobile:this.passwordForm.mobile,
					
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.retrievePasswordByType(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				const dataList = data.data[0]
				this.appMemberBaseInfo = dataList
				if (code == '4105' && status == 'success') {
					uni.showToast({
					  title: '修改成功',
					  icon: 'none'
					})
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200);
				} else {
					uni.showToast({
					  title: '修改失败',
					  icon: 'none'
					})
				}
			},
			sendCode() {
				let that = this;
			    let timer_num = 60;
				that.timer_num = timer_num;
			    let timeClock=setInterval(function(){
			        timer_num--;
			        that.timer_num = timer_num;
			        if (timer_num == 0) {
			            clearInterval(timeClock);
			        } 
			    },1000)
			 
			}
		}
	}	
</script>

<style lang="less" scoped>
.changePassword {
	.changePassword_container {
		
		.first_block {
			padding:15px 10px ;
			.rowItem {
				height: 60px;
				background: #FFFFFF;
				box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
				border-radius: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 23px 15px;
				margin-bottom: 5px;
				.listItemTitle {
					width: 100px;
					height: 14px;
					font-size: 15px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 14px;

				}
				.listItemC {
					display: flex;
					align-items: center;
					.verificationCode {
						height: 14px;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #5D5D5D;
						line-height: 14px;
						padding-left: 20px;
					}
					.listItemD {
						height: 14px;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #5D5D5D;
						line-height: 14px;
						padding-right: 10px;
						display: flex;
						align-items: center;
						input {
							height: 14px;
							text-align: right;
							line-height: 14px;
						}
					}
					.imgBox {
						
					}
					.getVerification {
						width: 140px;
						height: 32px;
						background: #00D09F;
						border-radius: 16px;
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 32px;
					}
					.getVerification.timer_num {
						background: gray;
					}
				}

			}
		}
	    .second_block {
			position: fixed;
			bottom: 50px;
			left: 0;
			right: 0;
			padding: 15px 15px 0px;
			.sureChange {
				height: 47px;
				background: #00D09F;
				border-radius: 5px;
				font-size: 18px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 47px;
			}
		}
	}
}
</style>

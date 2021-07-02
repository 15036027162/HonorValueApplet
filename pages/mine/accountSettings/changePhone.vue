<template>
	<view class="changePhone">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">修改手机号</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">修改手机号</block></cu-custom>
		</view>	 -->
		<view class="changePhone_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="rowItem">
					<view class="listItemTitle">
							当前手机号
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{phoneForm.mobile}}
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							新手机号
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<input style="text-align: right;" type="text" value=""  v-model="changeMobile"/>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							<text>验证码</text> <text class="verificationCode">{{verificationCode}}</text>
					</view>
					<view class="listItemC">
						<button class="getVerification" type="default" @click="sendShortMessageCode">获取验证码</button>
					</view>
				</view>

			</view>
			<view class="second_block">
				<button class="sureChange" type="default" @click="changeMemberAppPhone">确认修改</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "changePhone",
		components: {
		},
		data(){
			return {
				loginData:{},
				phoneForm:{},
				changeMobile:'',
				verificationCode:''
			}
		},
		onShow() {
		
		},
		onLoad(options) {
			var phoneForm = JSON.parse(options.phoneForm);
			this.phoneForm = phoneForm
			console.log(phoneForm)
			this.getloginData()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async sendShortMessageCode() {
				const paramForm = {
					mobile:this.changeMobile,
					module: "103",
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.sendShortMessageCode(paramForm)
				const dataList = data.data[0]
				this.verificationCode = dataList.code
				console.log(this.verificationCode)
			},
			async changeMemberAppPhone() {
				const paramForm = {
					module: "103",
					code:this.verificationCode,
					oldMobile:this.phoneForm.mobile,
					newMobile:this.changeMobile,
					memberId:this.loginData.memberId,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.changeMemberAppPhone(paramForm)
				const dataCode = data.code
				const dataList = data.data[0]
				this.appMemberBaseInfo = dataList
				if (dataCode === '4113') {
					uni.showToast({
					  title: '修改手机号成功',
					  icon: 'none'
					})
				} else {
					uni.showToast({
					  title: '修改手机号失败',
					  icon: 'none'
					})
				}
			}
		
		}
	}	
</script>

<style lang="less" scoped>
.changePhone {
	height: 100vh;
	// .top {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 100;
	// 	width: 100%;
	// 	// height: 290px;
	// 	box-sizing: border-box;
	// 	// padding-top: var(--status-bar-height);
	// 	background-color: #00D09F;
	// 	// height: 60px;
	// 	.bg_bank {
	// 		background-color: #00D09F;
	// 		color: #FFFFFF;
	// 	}
	// }
	.changePhone_container {
		// margin-top: 60px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
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
						height: 14px;
						font-size: 15px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 14px;
						.verificationCode {
							height: 14px;
							font-size: 15px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #5D5D5D;
							line-height: 14px;
							padding-left: 20px;
						}
					}
					.listItemC {
						display: flex;
						align-items: center;
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
						}
						.imgBox {
							
						}
						.getVerification {
							width: 96px;
							height: 32px;
							background: #00D09F;
							border-radius: 16px;
							font-size: 14px;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 32px;
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

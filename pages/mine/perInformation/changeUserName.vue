<template>
	<view class="changeUserName">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">账号设置</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">修改用户名</block></cu-custom>
		</view> -->	
		<view class="changeUserName_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="rowItem">
					<view class="listItemTitle">
							用户名
					</view>
					<view class="listItemC">
						<input type="text" value="" placeholder="限制文本长度10" v-model="account"/>
					</view>
				</view>

			</view>
			<view class="second_block">
				<button class="sureChange" type="default" @click="setMemberPersonalInfo">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "changeUserName",
		components: {
		},
		data(){
			return {
				loginData:{},
				account:''
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async setMemberPersonalInfo() {
				const paramForm = {
					account:this.account,				
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.setMemberPersonalInfo(paramForm)
				const code = data.code
				const status = data.status
				if(code == '0' && status == "success") {
					this.$store.commit('SET_REFRESH_COMPONENT','mine')
					uni.showToast({
					  title: '修改成功',
					  icon: 'none'
					})
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},500);
				} else {
					uni.showToast({
					  title: '修改失败',
					  icon: 'none'
					})
				}
			}
			
		}
	}	
</script>

<style lang="less" scoped>
.changeUserName {
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
	.changeUserName_container {
		// margin-top: 60px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
		.first_block {
			.rowItem {
				height: 60px;
				background: #FFFFFF;
				box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
				border-radius: 10px;
				display: flex;
				align-items: center;
				padding: 23px 15px;
				margin-bottom: 5px;
				.listItemTitle {
					width: 64px;
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
					width: 100%;
					padding-left: 20px;
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					// color: rgba(0, 0, 0, 0.25);
					color: #5D5D5D;
					line-height: 22px;
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

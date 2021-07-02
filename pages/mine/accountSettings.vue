<template>
	<view class="accountSettings">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">账号设置</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">账号设置</block></cu-custom>
		</view>	 -->
		<view class="mine_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="rowItem">
					<view class="rowItemTitle">
						账号设置
					</view>
					<view class="rowItemList">
						<view class="listItem">
							<view class="listItemTitle">
								用户名
							</view>
							<view class="listItemC">
								<view class="listItemD">
									{{accountSetForm.account || ''}}
								</view>
								<view class="imgBox">
										<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
								</view>
							</view>
						</view>
						<view class="lineSpace" style="display: none;"></view>
						<view class="listItem" style="display: none;">
							<view class="listItemTitle">
								修改手机号
							</view>
							<view class="listItemC" @click="toChangePhone">
								<view class="listItemD">
									{{accountSetForm.mobile || ''}}
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="rowItem" style="display: none;">
					<view class="rowItemTitle">
						通用
					</view>
					<view class="rowItemList">
						<view class="listItem">
							<view class="listItemTitle">
								检查更新
							</view>
							<view class="listItemC">
								<view class="listItemD">
									当前1.0.4
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
						
					</view>
				</view>
				<view class="rowItem">
					<view class="rowItemTitle">
						实名认证
					</view>
					<view class="rowItemList">
						<view class="listItem" @click="toChangePassword">
							<view class="listItemTitle">
								修改密码
							</view>
							<view class="listItemC">
								<view class="listItemD">
									
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
				
					</view>
				</view>
				<view class="rowItem">
					<view class="rowItemTitle">
						银行卡
					</view>
					<view class="rowItemList">
						<view class="listItem" @click="toChangeBankPassword">
							<view class="listItemTitle">
								修改密码
							</view>
							<view class="listItemC">
								<view class="listItemD">
									
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
				
					</view>
				</view>
			
			</view>
		    <view class="second_block">
		    	<button class="sureChange" type="default" @click="logOut">退出登录</button>
		    </view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "accountSettings",
		components: {
		},
		data(){
			return {
				loginData:{},
				accountSetForm:{
					account:'',
					mobile:'',
				}
				
			}
		},
		onShow() {
		
		},
		onLoad(options) {
			var accountSetForm = JSON.parse(options.accountSetForm);
			this.accountSetForm = accountSetForm
			console.log(accountSetForm)
			this.getloginData()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if (initData){
					this.loginData = JSON.parse(initData)
				} else {
					this.loginData = {}
				}
			},
			toChangePhone() {
				const phoneForm = {
					mobile:this.accountSetForm.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/accountSettings/changePhone?phoneForm=' + JSON.stringify(phoneForm)
				});
			},
			toChangePassword() {
				const status = this.accountSetForm.status
				if (status !== '1') {
					uni.showToast({
					  title: '未实名认证',
					  icon: 'none'
					})
					return
				} 
				const passwordForm = {
					status:this.accountSetForm.status,
					identity:this.accountSetForm.identity,
					mobile:this.accountSetForm.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/accountSettings/changePassword?passwordForm='+ JSON.stringify(passwordForm)
				});
			},
			toChangeBankPassword() {
				const bankForm = {
					type:1,// 编辑
					mobile:this.accountSetForm.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/cardBag?bankForm=' + JSON.stringify(bankForm)
				});
			},
			logOut () {
				let  that = this
				uni.showModal({
						title: '',
						content: '是否确认退出登录',
						success: function (res) {
							if (res.confirm) {
								const paramForm = {
									memberId:that.loginData.memberId,
									member_id:that.loginData.memberId,
									m_token_id:that.loginData.token_id
								}
								if (paramForm) {
									uni.clearStorageSync()
									let data =	 that.$api.memberLoginOut(paramForm)
									const dataList = data.data
									uni.navigateTo({
									   url: '/pages/index/index'
									});
								}
								
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
				   })

				
			}
		
		}
	}	
</script>

<style lang="less" scoped>
.accountSettings {

	.mine_container {
		.first_block {
			padding: 15px  10px  0;
			.rowItem {
				display: flex;
				flex-direction: column;
				margin-bottom: 15px;
				.rowItemTitle {
					height: 14px;
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #282828;
					line-height: 14px;
					padding-left: 5px;
				}
				.rowItemList {
					margin-top: 15px;
					// height: 121px;
					background: #FFFFFF;
					box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
					border-radius: 10px;
					padding:0 15px;
					.lineSpace {
						height: 1px;
						background: #E8E8E8;
					}
					.listItem {
						height: 60px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding:23px  0;
						.listItemTitle {
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
							.listItemD {
								height: 14px;
								font-size: 15px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #5D5D5D;
								line-height: 14px;
								padding-right: 10px;
							}
							.imgBox {
								
							}
						}
					}
				}
			}
		}
	    .second_block {
	    	position: fixed;
	    	bottom: 0px;
	    	left: 0;
	    	right: 0;
	    	padding: 15px 15px 50px;
	    	background: #F6F7F9;
	    	z-index: 10;
	    	.sureChange {
	    		height: 47px;
	    		background: red;
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

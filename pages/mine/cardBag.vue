<template>
	<view class="cardBag">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">我的卡包</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">我的卡包</block></cu-custom>
		</view>	 -->
		<view class="cardBag_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="cardBagBox"  v-for="(item,index) in bankList" :key="index">
					<view class="rowItem" @click="toEditCardBag(item)">
						<view class="rowItemTop">
							<view class="imgBox">
								<image style="width: 32px; height: 32px;" src="../../static/cardBag/logo.png" mode=""></image>
							</view>
							<view class="bankInfo">
								<view class="bankName">
									{{item.bankName}}
								</view>
								<view class="bankType">
									储蓄卡
								</view>
							</view>
						</view>
						<view v-if="item.bankCardNum.length == 19 " class="rowItemBottom">
							**** **** ****
							{{item.bankCardNum.substring(15,19)}}
						</view>
						<view v-if="item.bankCardNum.length == 17 " class="rowItemBottom">
							**** **** ****
							{{item.bankCardNum.substring(13,17)}}
						</view>
						<view v-if="item.bankCardNum.length == 16 " class="rowItemBottom">
							**** **** ****
							{{item.bankCardNum.substring(12,16)}}
						</view>
					</view>
					
				</view>
				<view class="addBox" @click="toAddBank" v-if="bankForm.type == 2">
					<view class="imgBox">
						<image style="width: 24px; height: 24px;" src="../../static/cardBag/icon-+.png" mode=""></image>
					</view>
					<view class="addText">
						添加银行卡
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "cardBag",
		components: {
		},
		data(){
			return {
				bankForm:{},
				loginData:{},
				bankList:[]
			}
		},
		onShow() {
		    this.getBankList()
		},
		onLoad(options) {
			var bankForm = JSON.parse(options.bankForm);
			this.bankForm = bankForm
			console.log(bankForm)
			this.getloginData()
			this.getBankList()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			toAddBank() {
				const passwordForm = {
					name:this.bankForm.name,
					account:this.bankForm.account,
					mobile:this.bankForm.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/cardBag/addBank?passwordForm=' + JSON.stringify(passwordForm)
				});
			},
			toEditCardBag(row) {
				const  type = this.bankForm.type
				if(type == 2){
					return
				}
				const passwordForm = {
					bankCard:row,
					mobile:this.bankForm.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/accountSettings/changeBankPassword?passwordForm='+ JSON.stringify(passwordForm)
				});
			},
			async getBankList() {
				const paramForm = {
					pageNumber:1,
					pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getBankList(paramForm)
				const dataList = data.data
				this.bankList = dataList
				console.log(dataList)
			}
		}
	}	
</script>

<style lang="less" scoped>
.cardBag {
	height: 100vh;
	.cardBag_container {
		.first_block {
			padding:7px  16px;
			.cardBagBox {
				.rowItem {
					background: url(../../static/cardBag/bg.png) no-repeat;
					height: 113px;
					background-size: 100% 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 8px;
					.rowItemTop {
						display: flex;
						align-items: center;
						padding: 15px  0  15px  12px;
						.imgBox {
							
						}
						.bankInfo {
							padding-left: 8px;
							display: flex;
							flex-direction: column;
							.bankName {
								height: 20px;
								font-size: 14px;
								font-family: PingFangSC-Semibold, PingFang SC;
								font-weight: 600;
								color: #FFFFFF;
								line-height: 20px;
							}
							.bankType {
								height: 17px;
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFB8B8;
								line-height: 17px;
							}
						}
					}
					.rowItemBottom {
						height: 33px;
						font-size: 24px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						line-height: 33px;
						padding: 0  30px  16px  48px;
					}
				}
			}
			.addBox {
				height: 73px;
				background: #FFFFFF;
				border-radius: 10px;
				display: flex;
				align-items: center;
				padding: 25px 0  24px 20px;
				margin-top: 8px;
				.imgBox {
					
				}
				.addText {
					height: 25px;
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 25px;
					padding-left: 12px;
				}
			}
		}
	}
}
</style>

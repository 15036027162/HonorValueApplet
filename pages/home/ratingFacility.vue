<template>
	<view class="ratingFacility">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">评级授信</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">评级授信</block></cu-custom>
		</view>	 -->
		<view class="ratingFacility_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="firstBox">
					<view class="firstBox_top">
						<view class="availableItem availablePoints">
							<view class="font_style3 availablePointsT">
								可用积分
							</view>
							<view class="font_style4 availablePointsD">
								{{doorIntrgralList.integralPoint || 0}}
							</view>
						</view>
						<view class="availableItem creditRating">
							<view class="font_style3 creditRatingT">
								信用等级
							</view>
							<view class="font_style4 creditRatingD">
								{{doorIntrgralList.creditLevel}}
							</view>
						</view>
					</view>
					<view class="lineCenter"></view>
					<view class="firstBox_Bottom">
						<view class="scoreItem usedPoints">
							<view class="font_style1 usedPointsT">
								已用积分
							</view>
							<view class="font_style2 usedPointsD">
								{{doorIntrgralList.exchangePoint || 0}}
							</view>
						</view>
						<view class="scoreItem homeScore">
							<view class="font_style1 homeScoreT">
								家庭总分
							</view>
							<view class="font_style2 homeScoreD">
								{{doorIntrgralList.honorPoint || 0}}
							</view>
						</view>
						<view class="scoreItem homeRating">
							<view class="font_style1 homeRatingT">
								家庭排名
							</view>
							<view class="font_style2 homeRatingD">
								{{doorIntrgralList.rank || 0}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="second_block">
				<view class="secondBox">
					<view class="info_left">
						<view class="fontText">
							经评估，您大约可借
						</view>
						<view class="fontData">
							{{doorIntrgralList.creditMoney || 0}}
						</view>
						<view class="fontText">
							最终获取额度，以实际审批结果为准
						</view>
					</view>
					<view class="imgBox">
						<image style="width: 100px; height: 100px;" src="../../static/home/logo.png" mode=""></image>
						<view class="drawingBtn" @click="drawingBtn">
							我要提款
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "ratingFacility",
		components: {
		},
		data(){
			return {
				loginData:{},
				doorIntrgralList:{},
				clickType:false
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
			this.getDoorHonorIntrgral()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if (initData) {
					this.loginData = JSON.parse(initData)
				} else {
					this.loginData = {}
				}
			},
			// 头部数据
			async getDoorHonorIntrgral() {
				const paramForm = {
					editMemberId:this.loginData.memberId,
					villageCode:this.loginData.villageCode,
					sceneId:'',
					pageNumber:1,
					// pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getDoorHonorIntrgral(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
			    if (code === '0' && status === 'success') { 
					const dataList = data.data[0]
					this.doorIntrgralList = dataList
					this.$store.commit('SET_DOOR_INTRGRAL_LIST',dataList),
					uni.setStorageSync('doorIntrgralList',JSON.stringify(dataList))
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
				
				
			},
			drawingBtn() {
				const clickType = this.clickType
				if (!clickType) {
				    this.getDoorHonorIntrgral()
					return
				}
			}
			
		}
	}	
</script>

<style lang="less" scoped>
.ratingFacility {
	height: 100vh;
	background: #F6F7F9;
	// .top {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 100;
	// 	width: 100%;
	// 	// height: 290px;
	// 	box-sizing: border-box;
	// 	padding-top: var(--status-bar-height);
	// 	background-color: #00D09F;
	// 	// height: 60px;
	// 	.bg_bank {
	// 		background-color: #00D09F;
	// 		color: #FFFFFF;
	// 	}
	// }
	.ratingFacility_container {
		// margin-top: 60px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
		.first_block {
			padding: 8px 15px ;
			.firstBox {
				height: 132px;
				background: #FFFFFF;
				border-radius: 10px;
				background: url(../../static/home/group6.png) no-repeat;
				background-size: 100% 100%;
				padding: 16px 9px 13px  11px;
				display: flex;
				flex-direction: column;
				.firstBox_top {
					display: flex;
					justify-content: space-between;
					align-items: center;
                    .availableItem {
						width: 50%;
						padding-left: 4px;
						.font_style3 {
							height: 20px;
							font-size: 14px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #CDE5FF;
							line-height: 20px;
						}
						.font_style4 {
							height: 24px;
							font-size: 24px;
							font-family: D-DIN-Bold, D-DIN;
							font-weight: bold;
							color: #FFFFFF;
							line-height: 26px;
							margin-top: 13px;
						}
					}
				}
				.lineCenter {
					margin: 16px  0  12px;
					height: 1px;
					border: 1px solid #FFFFFF;
					// background: #FFFFFF;
					opacity: 0.13;
				}
				.firstBox_Bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.scoreItem {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.font_style1 {
							height: 17px;
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 0.6);
							line-height: 17px;
						}
						.font_style2 {
							padding-left: 12px;
							height: 12px;
							font-size: 12px;
							font-family: D-DIN, D;
							font-weight: normal;
							color: #FFFFFF;
							line-height: 13px;
						}
					}
				}
			}
		}
		.second_block {
			padding: 0 15px;
			.secondBox {
				height: 108px;
				background: #FFFFFF;
				border-radius: 10px;
				padding:13px 15px 4px 17px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.info_left {
					display: flex;
					flex-direction: column;
					.fontText {
						height: 17px;
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 17px;
					}
					.fontData {
						height: 33px;
						font-size: 24px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #000000;
						line-height: 33px;
						margin: 8px 0;
					}
				}
				.imgBox {
					width: 100px;
					position: relative;
					.drawingBtn {
						width: 100px;
						height: 32px;
						background: #00D09F;
						border-radius: 16px;
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 32px;
						text-align: center;
						position: absolute;
						top: 34px;
					}
				}
			}
		}
	}
}
</style>

<template>
	<view class="pointsDeclaration">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">积分申报</block></cu-custom>
		<view class="pointsDeclaration_container">
			<view class="first_block">
				<view class="messageBox">
					<view class="inforBox">
						<view class="name">
							<view class="imgBox">
								<image v-if="doorIntrgralList.avatar" style="width: 40px; height: 40px;" :src="doorIntrgralList.avatar" mode=""></image>
								<image v-else style="width: 40px; height: 40px;" src="../../static/family/account.png" mode=""></image>
							</view>
							<view class="name_home">
								<text class="nameN">{{doorIntrgralList.doorName}}</text>
							</view>
						</view>
						<view class="point">
							<view class="pointT">
								家庭总分
							</view>
							<view class="pointD">
								{{doorIntrgralList.honorPoint || 0}}
							</view>
						</view>
						<view class="ranking">
							<view class="rankingT">
								家庭排名
							</view>
							<view class="rankingD">
								{{doorIntrgralList.rank || 0}}
							</view>
						</view>
					</view>
					<view class="firstMessageList" v-for="(item,index) in personalList" :key="index">
						<view class="firstMessage">
							<view class="item_left">
								<view class="applyT">
									{{item.sceneClassifyExplain }}
									<!-- 家庭成员学历提升加分申请 -->
								</view>
								<view class="applyD">
									{{item.modifyTime}}
								</view>
							</view>
							<view class="itemBtn">
								<button v-if="item.state == 1" type="default">待审核</button>
								<button v-else-if="item.state == 2" class="reject" type="default">已驳回</button>
								<button v-else-if="item.state == 3" class="reject" type="default">被投诉</button>
								<button v-else-if="item.state == 4" class="reject" type="default">公示中</button>
								<button v-else-if="item.state == 5" class="adopt" type="default">已通过</button>
							</view>
						</view>
					</view>
                    <view v-if="personalList.length === 0" class="noDataContet">
                        <view class="imgChange">
                        	<image style="width: 168px; height: 137px;" src="../../static/public/kzt-jfsb.png" mode=""></image>
                        </view>
						<view class="imgTitle">
							暂无数据
						</view>
					</view> 
			        <view class="applyBtnBox">
			  	       <view class="applyBtn" @click="toPointsDeclarationDetail">
			  	       	   去申请
			  	       </view>
			        </view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "pointsDeclaration",
		components: {
		},
		data(){
			return {
				loginData:{},
				doorIntrgralList:{
					avatar:'',
					doorName:'',
					honorPoint:'',
				},
				personalList:[],
				clickType:true
			}
		},
		onShow() {
		    this.getPersonalList()
		},
		onLoad() {
			this.getloginData()
			this.getDoorIntrgralList()
			this.getPersonalList()
		},
		methods:{
			toPointsDeclarationDetail() {
				const clickType = this.clickType
				if (!clickType) {
				    this.getPersonalList()
					return
				}
				uni.navigateTo({
					url: '/pages/home/pointsDeclarationDetail'
				});
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if(initData) {
				   this.loginData = JSON.parse(initData)	
				} else {
				   this.loginData = {}
				}
				
			},
			// 同首页头部数据
			getDoorIntrgralList() {
				this.doorIntrgralList = this.$store.state.doorIntrgralList
				const doorData =  uni.getStorageSync('doorIntrgralList')
				if (doorData) {
					this.doorIntrgralList = JSON.parse(doorData)
				}
			},
			async getPersonalList() {
				const paramForm = {
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id,
					pageNumber:1,
					// pageSize:10,
				}
				let data = await this.$api.getPersonalList(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '4003' || status === 'error') {
					 this.clickType = false
					setTimeout(() => {
						uni.showModal({
						    title: '提示',
						    content: msg,
						    success: function (res) {
						        if (res.confirm) {
						            uni.navigateTo({
						               url: '/pages/index/index'
						            });
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					},200)
				} else if (code === '0' && status === 'success') {
					const dataList = data.data
					this.personalList = dataList
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			}
 		}
	}	
</script>

<style lang="less" scoped>
.pointsDeclaration {
	// height: 100vh;
	.top {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		// height: 290px;
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		background-color: #00D09F;
		// height: 60px;
		.bg_bank {
			background-color: #00D09F;
			color: #FFFFFF;
		}
	}
	.pointsDeclaration_container {
		// margin-top: 50px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
		padding-bottom: 95px;
		.first_block {
			background: url(../../static/home/headerT.png) no-repeat;
			background-size: 100% 30%;
			padding: 15px  15px  0 15px;
			.messageBox {
				position: relative;
				// width: 345px;
				// height: 100vh;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				// border-radius: 10px;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				padding: 15px  15px  20px  15px;
				display: flex;
				flex-direction: column;
				.inforBox {
					background: url(../../static/home/bg-phb.png) no-repeat;
					background-size: 100% 100%;
					// width: 315px;
					height: 76px;
					border-radius: 10px;
					padding:15px  21px  14px  15px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.name {
						display: flex;
						align-items: center;
						.name_home {
							height: 22px;
							font-size: 16px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 22px;
							.nameN {
								padding-left: 8px;
								padding-right: 3px;
							}
						}
					}
					.point {
						text-align: center;
						.pointT {
							height: 17px;
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 17px;
						}
						.pointD {
							margin-top: 10px;
							height: 20px;
							font-size: 20px;
							font-family: D-DIN-Bold, D-DIN;
							font-weight: bold;
							color: #FFFFFF;
							line-height: 22px;
						}
					}
					.ranking {
						text-align: center;
						.rankingT {
							height: 17px;
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 17px;
						}
						.rankingD {
							margin-top: 10px;
							height: 20px;
							font-size: 20px;
							font-family: D-DIN-Bold, D-DIN;
							font-weight: bold;
							color: #FFFFFF;
							line-height: 22px;
						}
					}
				}
				.noDataContet {
					padding-top: 100px;
					display: flex;
					align-items: center;
					flex-direction: column;
					.imgTitle {
						height: 20px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #C8D2DE;
						line-height: 20px;
					}
				}
				.firstMessageList {
					.firstMessage {
						height: 69px;
						background: #FFFFFF;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #E8E8E8;;
						.item_left {
							.applyT {
								height: 22px;
								font-size: 16px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #202020;
								line-height: 22px;
							}
							.applyD {
								margin-top: 10px;
								height: 17px;
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #5D5D5D;
								line-height: 17px;
							}
						}
						.itemBtn {
							button {
								width: 72px;
								height: 26px;
								background: #FFFFFF;
								border-radius: 13px;
								border: 1px solid #4C8BF5;
								font-size: 14px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #4C8BF5;
								line-height: 26px;
							}
							button.adopt {
								// border: 1px solid #5D5D5D;
								// color: #5D5D5D;
								border: 1px solid #999999;
								color: #999999;
							}
							button.reject {
								border: 1px solid #FC664D;
								color: #FC664D;
							}
						}
					}
				}
				.applyBtnBox {
					background: #FFFFFF;
					position: fixed;
					bottom: 0px;
					left: 0;
					right: 0;
					padding: 15px 15px 50px;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					.applyBtn {
						height: 47px;
						background: #00D09F;
						border-radius: 5px;
						font-size: 18px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 47px;
						text-align: center;
					
					}
				}

			}
		}
	}
}
</style>

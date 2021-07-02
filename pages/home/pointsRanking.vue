<template>
	<view class="pointsRanking">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">积分排名</block></cu-custom>
		<view class="pointsRanking_container">
			<view class="first_block">
				<scroll-view scroll-x class="bg-white nav navTab" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabTitleList" :key="index" @tap="tabSelect" :data-id="index">
						<view class="titleBox" @click="selectRowData(item)">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				<view v-for="(item,index) in tabTitleList" :key="index" v-if="index==TabCur" class="tabPage">
					<view class="itemPage  first_tabPage">
						<view class="messageBox">
							<view class="inforBox">
								<view class="name">
									<view class="imgBox">
										<image v-if="doorIntrgralList.avatar" style="width: 40px; height: 40px;" :src="doorIntrgralList.avatar" mode=""></image>
										<image v-else style="width: 40px; height: 40px;" src="../../static/mine/mineImg.png" mode=""></image>
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
							<view class="infoMessageBox" v-for="(item2,index) in tablist">
								<view class="infoMessage">
									<view class="item_left">
										<view class="imageBox">
											<image v-if="index == 0" style="width: 36px;height: 38px;" src="../../static/home/one.png" mode=""></image>
											<image v-if="index == 1" style="width: 36px;height: 38px;" src="../../static/home/oneTT.png" mode=""></image>
											<image v-if="index == 2" style="width: 36px;height: 38px;" src="../../static/home/oneT.png" mode=""></image>
											<image v-if="index > 2" style="width: 36px;height: 38px;" src="../../static/home/oneF.png" mode=""></image>
											<text v-if="index > 2" class="numIndex">{{index+1}}</text>
										</view>
										<view class="titleImg">
											<image v-if="item2.avatar" style="width: 40px;height: 40px;" :src="item2.avatar" mode=""></image>
											<image v-else style="width: 40px;height: 40px;" src="../../static/family/account.png" mode=""></image>
										</view>
									</view>
									<view class="item_center">
										<view class="homeText">
											<!-- <text class="homeName">赵光姬</text>家 -->
											<text class="homeName">{{item2.doorName}}</text>
										</view>
										<view class="homeAdress">
											{{item2.addressGroup}}
										</view>
									</view>
									<view class="item_right">
										<view class="familyScore">
											{{item2.honorPoint}}
										</view>
										<view class="familyScoreText">
											家庭总分
										</view>
									</view>
								
								</view>
								
							</view>
						



						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "pointsRanking",
		components: {
		},
		data(){
			return {
				TabCur: 0,
				scrollLeft: 0,
				loginData:{},
				doorIntrgralList:{},
				selectRow:{id:''},
				tabTitleList:[],
				tablist: [],
				//当前地区
				currentArea:{
					areaCode:'',
					areaName: '',
					streetCode: '',
					streetName: '',
					villageCode: '',
					villageName: ''
				}
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
			this.getSceneDictionary()
			this.getDoorHonorIntrgral()
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if (typeof initData == 'string' && initData.length > 0) {
					this.loginData = JSON.parse(initData)
					//获取当前账户的村code
					this.currentArea.villageCode = this.loginData.villageCode;
					//获取当前选择的村code
					const villageData = this.$store.state.villageData
					if( villageData.villageCode != undefined ){
						this.currentArea.villageCode = villageData.villageCode
					}
				} else {
					this.loginData = ''
				}
			},
			// 头部数据 同首页头部数据
			async getDoorHonorIntrgral() {
				const paramForm = {
					editMemberId:this.loginData.memberId,
					villageCode:this.currentArea.villageCode,
					sceneId:this.selectRow.id,
					pageNumber:1,
					// pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getDoorHonorIntrgral(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				const dataList = data.data[0]
				if (code === '4003' && status === 'error') {
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
					},100)
				} else if (code === '0' && status === 'success') {
					this.doorIntrgralList = dataList
				} else {
					this.clickType = false
					uni.showToast({
					  title:'系统错误:' + msg,
					  icon: 'none'
					})
				}
				
				
			},
			selectRowData(row) {
				this.selectRow.id = row.id
				console.log(this.selectRow.id)
				this.getTablist()
				this.getDoorHonorIntrgral()
			},
			async getSceneDictionary() {
				const paramForm = {
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getSceneDictionary(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
			    if (code === '0' && status === 'success') {
					const dataList = data.data
					this.tabTitleList = dataList
					this.selectRow.id = dataList[0].id
					console.log(dataList)
					this.getTablist()
					this.getDoorHonorIntrgral()
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
			
			},
			async getTablist() {
				const paramForm = {
					sceneId:this.selectRow.id,
					villageCode:this.currentArea.villageCode,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.honorListR(paramForm)
				const dataList = data.data
				this.tablist = dataList
				console.log(dataList)
			}
		}
	}	
</script>

<style lang="less" scoped>
.pointsRanking {
	height: 100vh;
	.pointsRanking_container {
		.first_block {
			.navTab {
				
			}
			.tabPage {
				padding: 10px 15px 0px;
				.itemPage {
					.messageBox {
						// width: 345px;
						height: 100%;
						background: #FFFFFF;
						box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
						border-radius: 10px;
						padding: 15px;
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
						.infoMessage {
							height: 69px;
							background: #FFFFFF;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding:14px  0px  13px 0px;
							border-bottom: 1px solid  #E8E8E8;
							.item_left {
								display: flex;
								align-items: center;
								.imageBox {
									position: relative;
									.numIndex {
										position: absolute;
										top: 13px;
										left: 13px;
										color: #FFFFFF;
										font-size: 16px;
									}
								}
								.titleImg {
									padding-left: 15px;
								}
							}
							.item_center {
								.homeText {
									height: 22px;
									font-size: 16px;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #333333;
									line-height: 22px;
									.homeName {
										padding-right: 16px;
									}
								}
								.homeAdress {
									margin-top: 3px;
									height: 17px;
									font-size: 12px;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #5D5D5D;
									line-height: 17px;
								}
							}
							.item_right {
								text-align: center;
								.familyScore {
									height: 22px;
									font-size: 22px;
									font-family: D-DIN-Bold, D-DIN;
									font-weight: bold;
									color: #4C8BF5;
									line-height: 24px;
								}
								.familyScoreText {
									width: 50px;
									margin-top: 3px;
									height: 17px;
									font-size: 12px;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #5D5D5D;
									line-height: 17px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>

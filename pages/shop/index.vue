<template name="shop">
	<view class="shop">
		<cu-custom bgColor="initBg"><block slot="content"><text style="color: #FFFFFF;">商城</text></block></cu-custom>
	<!-- 	<view class="top">
			<view class="header">
				<view class="title">
					商城
				</view>										
			</view>
		</view> -->
		<view class="shop_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="usedInfo">
					<view class="titleImg">
						<image v-if="doorIntrgralList.avatar" style="width: 48px;height: 48px;" :src="doorIntrgralList.avatar" mode=""></image>
						<image v-else style="width: 48px;height: 48px;" src="../../static/mine/mineImg.png" mode=""></image>
					</view>
					<view class="home_info">
						 <view class="familyNameT">
						 	家庭名称
						 </view>
						 <view class="familyNameN">
						 	<text class="familyName">{{doorIntrgralList.doorName}}</text>
						 </view>
					</view>
				</view>
				<view class="availablePointsBox">
					<view class="availablePointsT">
						可用积分
					</view>
					<view class="availablePoints">
						{{doorIntrgralList.integralPoint}}
					</view>
				</view>
				<view class="erWeiMaBox" @tap="showModal" data-target="Image">
					<view class="erWeiMa" @click="sceneQrCode">
						<image style="width: 52px;height: 52px;" src="../../static/shop/icon.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="second_block">
				<view class="commodityBox">
					<view class="commodityItem" v-for="(item,index) in exGoodsList" :key="index">
						<view class="shopBox">
							<view class="shopImgBox">
								<image style="width: 145px; height: 156px;border: 1px solid #e9e9e9;border-radius: 5px;" :src="item.picUrl" mode=""></image>
								<!-- <image style="width: 145px; height: 156px;" src="../../static/shop/bg.png" mode=""></image> -->
							</view>
							<view class="shopT">
								{{item.goodsName}}
							</view>
							<view class="shopData">
								<view class="shopIntegralBox">
									<text class="shopIntegral">{{item.changePoint}}</text>积分
								</view>
								<view class="shopPrice">
									<text class="deleLine">￥{{item.price}}</text>
								</view>
							</view>
						</view>
					</view>	
				
				</view>
			</view>
		</view>
		
	    <view class="cu-modal" :class="modalName=='Image'?'show':''">
	    	<view class="cu-dialog">
	    		<view class="dialogBox">
	    			<view class="tops">
						  <view class="top_left">
						  	  <image v-if="sceneQrCodeData.avatar" style="width: 67px;height: 62px;" :src="sceneQrCodeData.avatar" mode=""></image>
						  	  <image v-else style="width: 67px;height: 62px;" src="../../static/mine/mineImg.png" mode=""></image>
						  </view>
						  <view class="top_right">
						  	  <view class="infoBox">
						  	  	 <view class="info_title">
						  	  	 	{{sceneQrCodeData.doorName}}
						  	  	 </view>
								 <view class="info_address">
								 	<!-- xx村-xxx组-xxx号 -->
									<text>{{sceneQrCodeData.address}}</text>
								 </view>
						  	  </view>
							  <view class="updatBtnBox">
							  	  <view class="updatBtn" @click="sceneQrCode">
							  	  	  刷新
							  	  </view>
							  </view>
						  </view>
	    			</view>
					<view class="center">
						<img style="width: 251px;height: 231px;" :src="imgUrl" mode="">
					</view>
					<view class="bottom">
						<text>只用于本村物品兑换</text>
					</view>
	    		</view>
				<view class="cancelIcon">
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close "></text>
					</view>
				</view>
	    	</view>
	    </view>
	</view>
</template>

<script>
	export default {
	    name: "shop",
		components: {
		},
		data(){
			return {
				loginData:{},
				modalName: null,
				doorIntrgralList:{
					avatar:'',
					doorName:'',
					integralPoint:'',
					
				},
				exGoodsList:[],
				sceneQrCodeData:{
					avatar:'',
					doorName:'',
					address:''
				},
				imgUrl:'',
				clickType:true,
				doorNumType:'',
				//当前地区
				currentArea:{
					areaCode:'',
					areaName: '',
					streetCode: '',
					streetName: '',
					villageCode: '',
					villageName: ''
				},
				//默认地址
				defaultArea:{
					areaCode:'430382000000',
					areaName: '韶山市',
					streetCode: '430382100000',
					streetName: '清溪镇',
					villageCode: '430382100001',
					villageName: '韶山火车站社区'
				}
			}
		},
		onShow() {
		   this.sceneQrCode()
		},
		onLoad() {
			
		},
		methods:{
			getInitData () {
				this.getloginData()
				this.getUserMemberBaseInfo()
				this.getDoorHonorIntrgral()
				this.getExGoods()
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				
				if (typeof initData == 'string' && initData.length > 0) {
					this.loginData = JSON.parse(initData)
					//获取当前账户的村code
					// this.currentArea.villageCode = this.loginData.villageCode;
					//获取当前选择的村code
					const villageData = this.$store.state.villageData
					if( villageData.villageCode != undefined ){
						this.currentArea.villageCode = villageData.villageCode
					} else {
						this.currentArea.villageCode = this.loginData.villageCode
					}
					//初始化登录没有村code 按默认来
					if( this.loginData.villageCode == '' || this.loginData.villageCode == undefined ){
						this.currentArea.streetCode = this.defaultArea.streetCode
						this.currentArea.streetName = this.defaultArea.streetName
						this.currentArea.villageName = this.defaultArea.villageName
						this.currentArea.villageCode = this.defaultArea.villageCode
					}
					
				} else {
					
					console.log( '未登录' )
					
					this.loginData = ''
					this.currentArea = this.defaultArea
				}
				
			},
			showModal(e) {
				if(this.doorNumType == '未加入') {
					return
				}
				console.log(this.clickType)
				if (!this.clickType) {
					this.noUserDataTip()
					return
				}
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			async sceneQrCode() {
				if(this.doorNumType == '未加入') {
					uni.showModal({
						 content: '还未加入家庭!',
						 showCancel: false  
					});
					return
				}
				const paramForm = {
					doorNum:this.doorIntrgralList.doorNum,
					scene:'integratemall',
					qrCodeType:'F',
					qt:'ex',
					villageCode:this.currentArea.villageCode,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.sceneQrCode(paramForm)
				const status = data.status
				const dataList = data.data[0]
				this.sceneQrCodeData = dataList
				this.imgUrl = dataList.qrCode.replace(/[\r\n]/g, '')
			},
			// 头部数据
			async getDoorHonorIntrgral() {
				const paramForm = {
					editMemberId:this.loginData.memberId,
					villageCode:this.currentArea.villageCode,
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
				} else {
					this.clickType = false
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			},
			async getExGoods() {
				const paramForm = {
					status:'3',
					pageNumber:1,
					// pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getExGoods(paramForm)
				const dataList = data.data
				this.exGoodsList = dataList
			},
			//获取我的个人信息判断是否请求家庭信息
			async getUserMemberBaseInfo(){
				let param = {
					member_id: this.loginData.memberId,
					m_token_id: this.loginData.token_id,
					memberId: this.loginData.memberId
				};
				let data = await this.$api.getAppMemberBaseInfo( param );
				const code = data.code
				const msg = data.msg
				const status = data.status
				if( code == '0' && status == 'success' ){
					let data = data.data[0];
					if( data.doorNum != '' ){
						// this.loginData.doorNum = data.doorNum;
					} else {
						this.doorNumType = '未加入'
					}
				} else if (code === '4007' && status === 'error') {
					this.clickType = false
					// uni.showToast({
					//   title: msg,
					//   icon: 'none'
					// })
				    // this.noUserDataTip()
					
				} else {
					this.clickType = false
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			},
			noUserDataTip(){
				setTimeout(() => {
					uni.showModal({
					    title: '提示',
					    content: '对不起，您未登录，请登录',
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
			}
			
		}
	}	
</script>

<style lang="less" scoped>
.shop{
	  .shop_container {
		
		  .first_block {
			  height: 78px;
			  background: url(../../static/shop/bg.png) no-repeat;
			  background-size: 100% 100%;
			  padding: 15px 5px 15px 16px;
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  .usedInfo {
				  display: flex;
				  align-items: center;
				  .titleImg {
					  
				  }
				  .home_info {
					  padding-left: 15px;
					  .familyNameT {
						  // width: 48px;
						  height: 17px;
						  font-size: 12px;
						  font-family: PingFangSC-Regular, PingFang SC;
						  font-weight: 400;
						  color: rgba(255, 255, 255, 0.9);
						  line-height: 17px;
					  }
					  .familyNameN {
						  // width: 67px;
						  height: 28px;
						  font-size: 20px;
						  font-family: PingFangSC-Medium, PingFang SC;
						  font-weight: 500;
						  color: #FFFFFF;
						  line-height: 28px;
					  }
				  }
			  }
			  .availablePointsBox {
				  .availablePointsT {
					  // width: 48px;
					  height: 17px;
					  font-size: 12px;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: rgba(255, 255, 255, 0.9);
					  line-height: 17px;
				  }
				  .availablePoints {
					  // width: 54px;
					  height: 28px;
					  font-size: 20px;
					  font-family: Helvetica;
					  color: #FFFFFF;
					  line-height: 28px;
				  }
			  }
			  .erWeiMaBox {
				  
			  }
		  }
		  .second_block {
			  height: 100vh;
			  padding: 8px 8px  50px  8px;
			  // height: 812px;
			  background: #F6F7F9;
			  .commodityBox {
				  padding-bottom: 70px;
				  // display: flex;
				  .commodityItem {
					  width: 50%;
					  display: inline-block;
					  // width: 165px;
					  // height: 254px;
					  box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
					  border-radius: 4px;
					  padding: 5px;
					  .shopBox {
						  background: #FFFFFF;
						  height: 100%;
						  text-align: center;
						  padding: 10px;
						  .shopImgBox {
							  height: 156px;
							  width: 100%;
							  // border: 1px solid #e9e9e9;
							  // border-radius: 5px;
						  }
						  .shopT {
							  padding: 5px 10px;
							  // width: 145px;
							  // height: 44px;
							  font-size: 16px;
							  font-family: PingFangSC-Regular, PingFang SC;
							  font-weight: 400;
							  color: #333333;
							  line-height: 22px;
							  text-shadow: 0px 2px 4px rgba(73, 44, 112, 0.02);
							  text-align: left;
						  }
						  .shopData {
							  // height: 24px;
							  display: flex;
							  justify-content: space-between;
							  padding: 0 10px;
							  .shopIntegralBox {
								  margin-top: 5px;
								  .shopIntegral {
									  height: 24px;
									  font-size: 24px;
									  font-family: D-DIN-Bold, D-DIN;
									  font-weight: bold;
									  color: #429CFE;
									  line-height: 26px;
									  text-shadow: 0px 2px 4px rgba(73, 44, 112, 0.02);
									  padding-right: 5px;
								  }
							  }

							  .shopPrice {
								  margin-top: 5px;
								  height: 24px;
								  font-size: 14px;
								  font-family: D-DIN, D;
								  font-weight: normal;
								  color: #C9C9C9;
								  // line-height: 24px;
								  line-height: 36px;
								  text-shadow: 0px 2px 4px rgba(73, 44, 112, 0.02);
								  .deleLine {
									  text-decoration:line-through
								  }
							  }
						  }
					  }
				  }
				  .commodityItem:nth-child(1){
					  margin-top: 0px;
				  }
				  .commodityItem:nth-child(2){
					  margin-top: 0px;
				  }
			  }
		  }
		  
	  }
      
	  .cu-modal {
		  .cu-dialog {
			  overflow: initial;
			  position: relative;
			  .dialogBox {
				  display: flex;
				  flex-direction: column;
				  .tops {
					  display: flex;
					  justify-content: space-between;
					  align-items: center;
					  padding: 24px 35px 0 35px;
					  .top_left {
						  width:68px;
					  }
					  .top_right {
						  width: 100%;
						  padding-left: 10px;
						  display: flex;
						  justify-content: space-between;
						  .infoBox {
							  text-align: left;
							  .info_title {
								  // width: 106px;
								  height: 25px;
								  font-size: 18px;
								  font-family: PingFangSC-Medium, PingFang SC;
								  font-weight: 500;
								  color: #333333;
								  line-height: 25px;
								  margin-bottom: 12px;
							  }
							  .info_address {
								  // width: 150px;
								  // height: 17px;
								  font-size: 12px;
								  font-family: PingFangSC-Regular, PingFang SC;
								  font-weight: 400;
								  color: #333333;
								  line-height: 17px;
							  }
						  }
						  .updatBtnBox {
							  .updatBtn {
								  // width: 76px;
								  width: 60px;
								  height: 32px;
								  background: #4C8BF5;
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
				  .center {
					  
				  }
				  .bottom {
					  margin-bottom: 19px;
				  }
			  }
			  .cancelIcon {
				  position: absolute;
				  left: 0;
				  right: 0;
				  color: #FFFFFF;
				  bottom: -50px;
				  font-size: 22px;
				  .cuIcon-close {
					  border-radius: 50%;
				  	  border: 1px solid #FFFFFF;
					  padding: 4px;
				  }
			  }
		  }

	  }

}	
</style>

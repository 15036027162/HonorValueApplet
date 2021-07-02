<template name="mine">
	<view class="mine">
		<cu-custom bgColor="initBg"><block slot="content"><text style="color: #FFFFFF;">我的</text></block></cu-custom>
<!--    	   <view class="top">
    			<view class="header">
					<view class="title">
						我的
					</view>										
				</view>
    	   </view> -->
		   <view class="mine_container">
			   <view class="first_block">
				   <view class="mine_infoBox">
					   <view class="mineTitleImg" @click="toPerInformation">
						   <image v-if="appMemberBaseInfo.avatar" style="width: 85px;height: 83px" :src="appMemberBaseInfo.avatar" mode=""></image>
						   <image v-else style="width: 85px;height: 83px" src="../../static/mine/mineImg.png" mode=""></image>
					   </view>
					   <view class="mine_info">
						   <view class="mineName">
							   <text>{{appMemberBaseInfo.account || '未登录'}} </text>
							   <text class="imgBox"><image style="width: 10px; height: 10px;" src="../../static/mine/mineImg.png" mode=""></image></text>
						   </view>
						   <view class="mineAdress">
						   	  {{appMemberBaseInfo.address}}
						   </view>
					   </view>
				   </view>
			   </view>
			   <view class="second_block">
				   <view class="mine_menu">
					   <view class="menuItem first_menu" @click="toAccountSettings">
						   <view class="menu_left">
							   <view class="menuTimg">
							   	  <image style="width: 36px; height: 36px;" src="../../static/mine/accountSettings.png" mode=""></image>
							   </view>
							   <text class="menuText">账号设置</text>
						   </view>
						   <view class="menu_right">
						    	<image style="width: 16px; height: 16px;" src="../../static/public/arrow-right.png" mode=""></image>
						   </view>

					   </view>
					   <view class="menuItem second_menu" @click="toRealAuthentication">
						   <view class="menu_left">
							   <view class="menuTimg">
							   	  <image style="width: 36px; height: 36px;" src="../../static/mine/realNameAuthentication.png" mode=""></image>
							   </view>
							   <text class="menuText">实名认证</text>
						   </view>
						   <view class="menu_right">
							    <text class="authentication">{{ appMemberBaseInfo.status == '1' ? '已认证' :' 未认证' }}</text>
						    	<image style="width: 16px; height: 16px;" src="../../static/public/arrow-right.png" mode=""></image>
						   </view>
					   </view>
					   <view class="menuItem third_menu" @click="toCardBag">
						   <view class="menu_left">
							   <view class="menuTimg">
							   	  <image style="width: 36px; height: 36px;" src="../../static/mine/myCardbag.png" mode=""></image>
							   </view>
							   <text class="menuText">我的卡包</text>
						   </view>
						   <view class="menu_right">
						    	<image style="width: 16px; height: 16px;" src="../../static/public/arrow-right.png" mode=""></image>
						   </view>
					   </view>
					   <view class="menuItem forth_menu" @click="toMyFamily" style="display: none;">
						   <view class="menu_left">
							   <view class="menuTimg">
							   	  <image style="width: 36px; height: 36px;" src="../../static/mine/myFamily.png" mode=""></image>
							   </view>
							   <text class="menuText">我的家庭</text>
						   </view>
						   <view class="menu_right">
						    	<image style="width: 16px; height: 16px;" src="../../static/public/arrow-right.png" mode=""></image>
						   </view>
					   </view>
					   <view class="menuItem fifth_menu" @click="toAboutUs">
						   <view class="menu_left">
							   <view class="menuTimg">
							   	  <image style="width: 36px; height: 36px;" src="../../static/mine/aboutUs.png" mode=""></image>
							   </view>
							   <text class="menuText">关于我们</text>
						   </view>
						   <view class="menu_right">
						    	<image style="width: 16px; height: 16px;" src="../../static/public/arrow-right.png" mode=""></image>
						   </view>
					   </view>
				   	
				   </view>
			   	
			   </view>
		   	
		   </view>
	</view>
</template>

<script>
	export default {
	    name: "mine",
		components: {
		},
		data(){
			return {
				loginData:{},
				appMemberBaseInfo:{
					avatar:'',
					account:'',
					address:''
				},
				clickType:true
			}
		},
		onShow() {
			this.getloginData()
		    this.getAppMemberBaseInfo()
		},
		onLoad() {
			
		},
		methods:{
			toPerInformation() {
				const clickType = this.clickType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				uni.navigateTo({
					url: '/pages/mine/perInformation'
				});
			},
			// 账号设置
			toAccountSettings() {
				const clickType = this.clickType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				const accountSetForm = {
					status:this.appMemberBaseInfo.status,
					identity:this.appMemberBaseInfo.identity,
					account:this.appMemberBaseInfo.account,
					mobile:this.appMemberBaseInfo.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/accountSettings?accountSetForm=' + JSON.stringify(accountSetForm)
				});
			},
			toRealAuthentication() {
				const clickType = this.clickType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				//根据认证状态判定是否认证
				let status = this.appMemberBaseInfo.status;
				//未实名认证跳转到认证页面
				if( status == '2' ){
					uni.navigateTo({
						url: '/pages/mine/realAuthentication?page=mine'
					});
				}else{
					//已认证跳转到认证信息查看
					uni.navigateTo({
						url: '/pages/mine/checkAuth'
					});
				}
			},
			toCardBag() {
				const clickType = this.clickType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				const bankForm = {
					type:2 ,//可以新增
					name:this.appMemberBaseInfo.name,
					status:this.appMemberBaseInfo.status,
					identity:this.appMemberBaseInfo.identity,
					account:this.appMemberBaseInfo.account,
					mobile:this.appMemberBaseInfo.mobile
				}
				uni.navigateTo({
					url: '/pages/mine/cardBag?bankForm=' + JSON.stringify(bankForm)
				});
			},
			toMyFamily() {
				uni.navigateTo({
					url: '/pages/mine/myFamily'
				});
			},
			toAboutUs() {
				uni.navigateTo({
					url: '/pages/mine/aboutUs'
				});
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if(typeof initData == 'string' && initData.length > 0) {
					this.loginData = JSON.parse(initData)
				} else {
					console.log( '未登录' )
					
					this.loginData = ''
				}
			},
			async getAppMemberBaseInfo() {
				const paramForm = {
					memberId:this.loginData.memberId,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getAppMemberBaseInfo(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '0' && status === 'success') {
					const dataList = data.data[0]
					this.appMemberBaseInfo = dataList
					this.$store.commit('SET_USER_DATA',dataList),
					uni.setStorageSync('userData',JSON.stringify(dataList))
					console.log(dataList)
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
.mine {
	.mine_container {
		 // margin-top: 60px;
		  .first_block {
			  // margin-top: 50px;
			  height: 144px;
			  background: #00D09F;
			  padding: 14px  15px  0px 15px;
			  .mine_infoBox {
				  // width: 345px;
				  height: 120px;
				  background: url(../../static/mine/编组.png) no-repeat;
				  background-size: 100% 100%;
				  padding: 20px 17px  17px  17px;
				  display: flex;
				  align-items: center;
				  .mineTitleImg {
					  width: 85px;
					  height: 83px;
				  }
				  .mine_info {
					  // padding-left: 18px;
					  padding-left: 10px;
					  .mineName {
						  // width: 60px;
						  height: 28px;
						  font-size: 20px;
						  font-family: PingFangSC-Medium, PingFang SC;
						  font-weight: 500;
						  color: #202020;
						  line-height: 28px;
						  .imgBox {
							  // padding-left: 12px;
						  }
					  }
					  .mineAdress {
						  margin-top: 10px;
						  // width: 106px;
						  height: 20px;
						  font-size: 14px;
						  font-family: PingFangSC-Regular, PingFang SC;
						  font-weight: 400;
						  color: #5D5D5D;
						  line-height: 20px;
					  }
				  }
				  
			  }
		  }
		  .second_block {
			  // width: 375px;
			  margin-top: -10px;
			  height: 500px;
			  background: #F6F7F9;
			  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.1);
			  border-radius: 10px 10px 0px 0px;
			  .mine_menu {
				  padding: 15px;
				  .menuItem {
					  // width: 345px;
					  height: 60px;
					  background: #FFFFFF;
					  box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
					  border-radius: 10px;
					  display: flex;
					  align-items: center;
					  justify-content: space-between;
					  margin-bottom: 5px;
					  .menu_left {
						  display: flex;
						  align-items: center;
					  }
					  .menu_right {
						  height: 16px;
						  box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
						  padding-right: 15px;
						  display: flex;
						  align-items: center;
						  .authentication {
							  height: 22px;
							  font-size: 16px;
							  font-family: PingFangSC-Regular, PingFang SC;
							  font-weight: 400;
							  color: #333333;
							  line-height: 22px;
							  text-shadow: 0px 2px 4px rgba(73, 44, 112, 0.02);
						  }
						  
					  }
				  }
			  }
		  }
		  
	  }
}
</style>

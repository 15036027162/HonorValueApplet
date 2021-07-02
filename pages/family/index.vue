<template name="family">
	<view class="family">
		   <cu-custom bgColor="initBg"><block slot="content"><text style="color: #FFFFFF;">我的家庭</text></block></cu-custom>
		   <view class="family_container">
			   <view class="first_block">
				   <view class="add_tip" @click="toFamilyNews" v-if="showNotice">
				   	  <view class="noticeImg_box"><image style="width: 12px;height: 12px;" src="../../static/family/notice.png" mode=""></image></view> 
					  <view class="notice_text">
						  <swiper :interval="3000" :duration="1000" :indicator-dots="false" :circular="false"
						   :current="topSwiperIndex" @change="topSwiperTab" :autoplay="autoplay" class="autoplay">
						      <swiper-item v-for="(item,index) in houseMessageList" :key="index">
						          <view class="swiper-item">
						            {{item.content}}
						          </view>
						      </swiper-item>
						  </swiper>
					  </view>
				   </view>
			        <view class="imgBox">
			        	<!-- <image style="width:100%;height:153px;" src="http://i3.mlxcchina.com/jinshipicture/1625123339149b99b1d0f2b2e4232a46e5ba7ddd1f1be.png" mode=""></image> -->
			        </view>
					
					<view class="familyQrcode" @click="checkQrCode">
						<image style="width: 52px;height: 52px;" src="../../static/family/qrcode.png" mode=""></image>
					</view>
					
			   </view>
			   <view class="second_block">
			   	    	 <view class="accountInfo">
			   	    	 	  <view class="accountImg">
			   	    	 	  	  <image style="width: 48px;height: 48px;" :src="familyInfo.avatar" mode=""></image>
								  <view class="identification">
								  	{{masterLabel}}
								  </view>
			   	    	 	  </view>
							  <view class="accountData">
							  	   <view class="account_name">
							  	   	  <text>{{familyInfo.houseHoldName}}</text>
							  	   </view>
								   <view class="account_number">
								   	   <text> {{familyInfo.address}} </text>
								   </view>
							  </view>
			   	    	 </view>
						 <view class="accountTransfer" v-if="isMaster" @click="toHouseholder"> 户主转让 </view>
						 <view class="accountTransfer" v-if="!isJoin" @click="joinFamily"> 扫码加入家庭 </view>
			   </view>
			   
			   <view class="third_block">
				   <view class="integral">
					   <view class="font_style1 totalScore">
					   	  {{familyInfo.honorPoint}}
					   </view>
				   	    <view class="font_style2 totalScoreT">
				   	      家庭总分
				   	    </view>   
				   </view>
				   <view class="integral">
				   	    <view class="font_style1 familyRanking">
				   	    	{{familyInfo.rank}}
				   	    </view>
				   	     <view class="font_style2 familyRankingT">
				   	        家庭排名
				   	     </view>  
				   </view>
				   <view class="integral">
				   	     <view class="font_style1 pointsUsed">
				   	     	  {{familyInfo.exchangePoint}}
				   	     </view>
				   	      <view class="font_style2 pointsUsedT">
				   	          已用积分
				   	      </view>  
				   </view>
				   <view class="integral">
				   	      <view class="font_style1 availablePoints">
				   	      	 {{familyInfo.integralPoint}}
				   	      </view>
				   	       <view class="font_style2 availablePoints_title">
				   	          可用总分
				   	       </view>  
				   </view>
				   
				  <view class="integral">
				   	     <view class="donation" @click="toDonation" v-if="isJoin">
				   	     	捐赠
				   	     </view>
				   </view>
					
			   </view>
			   
			   <view class="forth_block">
				   <view class="forth_header">
					   <view class="forth_title" @click="toMemberFamily">
						   家庭成员
						   <view class="title_icon">
						   	<image style="width: 10px; height: 10px;" src="../../static/home/icon-arrow.png" mode=""></image>
						   </view>
					   </view>
					   <view class="integralContribution"></view>
				   </view>
				   
				   <view class="forth_content" v-if="isJoin">
					   <view class="memberOfFamily">
						   
						   <view class="memberItem" v-for="(item,index) in familyMemberList">
						   	 <view class="member_unit">
						   		 <view class="memberImg">
						   		 	<image style="width: 48px;height: 48px;" src="../../static/family/account.png" mode=""></image>
						   		 </view>
						   		 <text class="memberName">{{item.name}}</text>
						   	 </view>
						   	 <view class="member_integral">
						   	 </view>
						   </view>
						   
					   </view>

				   </view>

			   </view>
			   
			   <view class="fifth_block" v-if="isJoin">
				   <view class="fifth_header">
					   <view class="fifth_title">
						   家庭荣誉
						   <view class="title_icon">
						   	<image style="width: 10px; height: 10px;" src="../../static/home/icon-arrow.png" mode=""></image>
						   </view>
					   </view>
				   </view>
				   <view class="fifth_content">
					   <view class="home_honor" v-for="(item,index) in familyInfo.honorPojoList"  :key="index">
						   <view class="honorImg">
						   	  <image style="width: 62px;height: 64px;" :src="item.picUrl" mode=""></image>
						   </view>
					   	    <view class="honorName">
					   	    	{{item.name}}
					   	    </view>
					   </view>
				   </view>
			   	
			   </view>
		   	
				<view class="option_tips" v-if="!isJoin">
						<view class="option_tips_icon">
							<image style="width:122px;height:106px;" src="../../static/family/kzt-zwjr@2x.png" mode=""></image>
						</view>
						<text class="tips">暂无加入家庭</text>
				</view>
			
		   </view>
		   
		   <view class="cu-modal" v-bind:class="{ show: showDialogModal }">
		     <view class="cu-dialog">
		       <view class="cu-bar bg-white justify-end">
		         <view class="content">操作提示</view>
		         <view class="action" bindtap="hideModal">
		           <text class="cuIcon-close text-red"></text>
		         </view>
		       </view>
		       <view class="padding-xl">
		         加入家庭需实名认证! 请先完成实名认证
		       </view>
		       <view class="cu-bar bg-white justify-end">
		         <view class="action">
		           <button class="cu-btn line-green text-green" @click="cancelCert">取消</button>
		           <button class="cu-btn bg-green margin-left" @click="goCert">去认证</button>
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
		   							<text>{{sceneQrCodeData.fixedAddress}}</text>
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
		   				<text>我的家庭二维码,扫码可加入家庭</text>
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
	import CryptoJS from '@/common/crypto-js.js';
	import {mapState, mapMutations}  from 'vuex';
	export default {
	    name: "family",
		components: {

		},
		data(){
			return {
				CustomBar: this.CustomBar,
				masterLabel:"未加入",
				isMaster: false,
				isJoin: false,
				userInfo:{},
				familyInfo:{
					address: "",
					avatar: "../../static/family/account.png",
					houseHoldName:"",
					rank:0,
					honorPoint:0,
					integralPoint:0,
					exchangePoint:0,
					honorPojoList:[]
				},
				showDialogModal: false,
				qrcodeInfo:{},
				familyMemberList:{},
				myBaseInfo:{},
				sceneQrCodeData:{
					avatar:'',
					doorName:'',
					fixedAddress:''
				},
				modalName: null,
				imgUrl:'',
				houseMessageList:[],
				topSwiperIndex:0,
				autoplay: true,
				showNotice: false
			}
		},
		mounted() {
			
		},
		onShow(){
			console.log( 'show' );
		},
		methods:{
			//初始化数据
			getInitData(){
				
				//读取用户信息缓存
				this.userInfo = uni.getStorageSync('loginData')
				if (this.userInfo) {
					this.userInfo = JSON.parse( this.userInfo )
				} else {
					this.userInfo ={}
				}
				//根据用户信息判定是否拉取家庭信息
				this.getUserMemberBaseInfo()
			},
			toFamilyNews() {
				uni.navigateTo({
					url: '/pages/family/familyNews'
				});
			},
			//转让户主
			toHouseholder() {
				uni.navigateTo({
					url: '/pages/family/householder'
				});
			},
			toMemberFamily() {
				if( this.userInfo.doorNum == '' ){
					uni.showModal({
						 content: '还未加入家庭!',
						 showCancel: false  
					});
					return false;
				}
				uni.navigateTo({
					url: '/pages/family/memberFamily'
				});
			},
			toDonation() {
				const donationForm = {
					integralPoint:this.familyInfo.integralPoint
				}
				uni.navigateTo({
					url: '/pages/family/donation?donationForm=' + JSON.stringify(donationForm)
				});
			},
			showModal(e) {
				const clickType = this.clickType
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//获取我的个人信息判断是否请求家庭信息
			async getUserMemberBaseInfo(){
				let param = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id,
					memberId: this.userInfo.memberId
				};
				let result = await this.$api.getAppMemberBaseInfo( param );
				if( result.code == '0' && result.status == 'success' ){
					let data = result.data[0];
					//判定是否为户主
					if( parseInt( data.isHousehold ) == 1 ){
						this.isMaster = true;
					}
					if( data.doorNum != '' ){
						this.userInfo.doorNum = data.doorNum;
						this.masterLabel = '已加入';
						this.isJoin = true;
						//已计入拉取家庭信息
						this.getFamilyInfo();
						//获取家庭成员信息
						this.getFamilyMemberInfo();
						//获取消息通知
						this.houseMessageWei();
					}
				}
			},
			//查看家庭二维码
			checkQrCode(){
				this.sceneQrCode();
			},
			async sceneQrCode() {
				const paramForm = {
					doorNum:this.userInfo.doorNum,
					scene:'normal',
					qrCodeType:'F',
					qt:'info',
					villageCode:this.userInfo.villageCode,
					member_id:this.userInfo.memberId,
					m_token_id:this.userInfo.token_id
				}
				let result = await this.$api.sceneQrCode(paramForm)
				if( result.code == '0' && result.status == 'success' ){
					
					console.log(  result.data[0] )
					
					this.sceneQrCodeData = result.data[0]
					this.imgUrl = result.data[0].qrCode.replace(/[\r\n]/g, '')
					this.modalName = 'Image'
				}else{
					if( result.msg != undefined ){
						uni.showModal({
							 content: result.msg,
							 showCancel: false
						});
					}else{
						uni.showModal({
							 content: '二维码获取失败!',
							 showCancel: false  
						});
					}
				}
			},
			//获取家庭信息
			async getFamilyInfo(){

				const paramForm = {
					doorNum: this.userInfo.doorNum,
					villageCode: this.userInfo.villageCode,
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id
				}
				let result = await this.$api.getMyFamilyHome(paramForm);
				const data = result.data[0];
				//默认头像是否为空, 为空则默认头像
				if( data.avatar.length < 1 ){
					data.avatar = this.familyInfo.avatar;
				}
				this.familyInfo = data;
				console.log( '拉取家庭信息:' )
				console.log( this.familyInfo );
			},
			//获取家庭成员
			async getFamilyMemberInfo(){
			
				const paramForm = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id
				}
				let result = await this.$api.getFamilyMember(paramForm);
				//家庭成员信息
				console.log('家庭成员信息:');
				console.log( result.data );
				//首页最多展示三条
				var list = result.data;
				list = list.slice(0,3);
				this.familyMemberList = list;
				
			},
			//加入家庭
			joinFamily(){
				//获取个人信息判定是否需要认证
				this.getMyUserInfo();
			},
			//取消认证
			cancelCert(){
				this.showDialogModal = false;
			},
			//去实名认证
			goCert(){
				this.showDialogModal = false;
				var authStatus = parseInt(this.myBaseInfo.status);
				
				console.log('认证状态:');
				console.log( authStatus );
				
				//未实名认证跳转到实名认证页面
				if( authStatus == 2 ){
					uni.navigateTo({
						url: '/pages/mine/realAuthentication?page=family'
					});
				}
				//已认证但未通过跳转 认证查看页面
				if( authStatus == 3 || authStatus == 4 ){
					uni.navigateTo({
						url: '/pages/mine/checkAuth'
					});
				}
			},
			//获取要加入家庭的信息
			async getMemberInfo( params ){
				let param = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id,
					uuid: params.u,
					scene: params.scene,
					qrCodeType: params.qct,
					qt: params.qt
				};
				let result = await this.$api.getMemberInfoWithScene( param );
				if( result.code == '0' && result.status == 'success' ){
					var pageParams = {
						uuid: params.u,
						...result.data[0]
					};
					this.$store.commit('SET_FAMILYINFO_DATA',pageParams);
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/family/joinFamily'
						});
					})
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
				}
			},
			//获取我的个人信息
			async getMyUserInfo(){
				
				var that = this;
				
				let param = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id,
					memberId: this.userInfo.memberId
				};
				let result = await this.$api.getAppMemberBaseInfo( param );
				if( result.code == '0' && result.status == 'success' ){
					console.log( result );
					
					this.myBaseInfo = result.data[0];
					
					//已实名，去扫码
					if( this.myBaseInfo.status == '1' ){
						
							// 允许从相机和相册扫码
							uni.scanCode({
								success: function (res) {
							
									console.log('条码类型：' + res.scanType);
									console.log('扫码字符集:' + res.charSet);
									console.log( '条码内容:' );
									
									//二维码AES方式解码
									var key = CryptoJS.enc.Utf8.parse('shaoshanshaoshan');
									var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String');
									var decryptedData = CryptoJS.AES.decrypt( res.result, key, {
										iv: iv,
										mode: CryptoJS.mode.CBC,
										padding: CryptoJS.pad.Pkcs7
									});
									
									var content = decryptedData.toString(CryptoJS.enc.Utf8);
									if( content.length < 1 ){
										uni.showModal({
											 content: '扫码失败!请扫户主的二维码',
											 showCancel: false  
										});  
									}
									console.log('解码内容:');
									console.log( content );
									
									//获取url参数
									var params = that.parseQueryString( content );
									
									//请求获取要加入家庭的信息
									that.getMemberInfo( params );
							
								}
							});
							
					}else{
						//判断用户是否完成实名认证，未认证提示先去认证
						this.showDialogModal = true;
					}
					
				}else{
					
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
	
				}
			},
			//解析url转换为对象
			parseQueryString(url) {
				var obj = {};
				var keyvalue = [];
				var key = "",
					value = "";
				var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
				for (var i in paraString) {
					keyvalue = paraString[i].split("=");
					key = keyvalue[0];
					value = keyvalue[1];
					obj[key] = value;
				}
				return obj;
			},
			async houseMessageWei() {
				const paramForm = {
					pageNumber:1,
					pageSize:10,
					member_id:this.userInfo.memberId,
					m_token_id:this.userInfo.token_id
				}
				let result = await this.$api.houseMessageWei(paramForm)
				if( result.code == '0' && result.status == 'success' ){
					if( result.data ){
						this.houseMessageList = result.data
						this.showNotice = true
					}
				}
			},
			topSwiperTab(e) {
				var that = this;
				this.topSwiperIndex = Number(e.target.current);
			}
		
			
		}
		
	}
</script>

<style lang="less" scoped>
.family {
	.family_container {
		  .first_block {
			  position: relative;
			  height: 190px;
			  background: url(http://i3.mlxcchina.com/jinshipicture/1625123339149b99b1d0f2b2e4232a46e5ba7ddd1f1be.png) no-repeat;
			  background-size: 100% 100%;
			  .add_tip {
				  position: absolute;
				  top: 18px;
				  left: 15px;
				  display: inline-block;
				  width: 178px;
				  height: 28px;
				  line-height: 28px;
				  border-radius: 15px;
				  background-color: #FFFFFF;
				  z-index: 10;
				  .noticeImg_box {
					  display: inline-block;
					  margin-left: 10px;
					  text-align: center;
					  padding: 2px;
				  }
				  .notice_text {
					 margin-left: 3px;
					 height: 25px;
					 font-size: 12px;
					 font-family: PingFangSC-Regular, PingFang SC;
					 font-weight: 400;
					 color: #00D09F;
					 line-height: 25px; 
					 .autoplay {
						 position: relative;
						 top: -30px;
						 left: 25px;
						 width: 75%;
						 white-space: nowrap;
						 text-overflow: ellipsis;
						 overflow: hidden;
					 }
				  }
				  
			  }
			  .imgBox {
				width: 100%;
				position: relative;
			  }
			  .familyQrcode{
				  position:absolute;
				  top:15px;
				  right:15px;
				  z-index:999;
			  }
		  }
		  .second_block {
			  margin-top: -50px;
			  height: 72px;
			  background-color: #FFFFFF;
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  padding: 12px 15px;
			  position: absolute;
			  width: 100%;
			  .accountInfo {
				  display: flex;
				  justify-content: space-between;
				  align-items: center;
				  .accountImg {
					  position: relative;
					  text-align: center;
					  .identification {
						  position: absolute;
						  bottom: 0;
						  width: 48px;
						  height: 16px;
						  line-height: 16px;
						  background: #00D09F;
						  border-radius: 8px;
						  text-align: center;
						  color: #FFFFFF;
					  }
				  }
				  .accountData {
					  padding-left: 13px;
					  .account_name {
						  // width: 60px;
						  height: 25px;
						  font-size: 18px;
						  font-family: PingFangSC-Medium, PingFang SC;
						  font-weight: 500;
						  color: #333333;
						  line-height: 25px;
					  }
					  .account_number {
						  // width: 112px;
						  height: 17px;
						  font-size: 12px;
						  font-family: PingFangSC-Regular, PingFang SC;
						  font-weight: 400;
						  color: #333333;
						  line-height: 17px;
					  }
				  				  
				  }
			  }
			  .accountTransfer {
				  min-width: 72px;
				  padding:0 20px;
				  height: 26px;
				  background: #FFFFFF;
				  border-radius: 13px;
				  border: 1px solid #00D09F;
				  font-size: 14px;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #00D09F;
				  text-align: center;
				  line-height: 26px;
			  }
				  
		  }
		  .third_block {
			  margin-top: 30px;
			  height: 70px;
			  display: flex;
			  justify-content: space-between;
			  background-color: #FFFFFF;
			  align-items: center;
			  padding:14px  15px 12px 16px;
			  .integral {
				  text-align: center; 
				  .font_style1 {
					  // width: 41px;
					  height: 20px;
					  font-size: 20px;
					  font-family: D-DIN-Bold, D-DIN;
					  font-weight: bold;
					  color: rgba(0, 0, 0, 0.85);
					  line-height: 22px;
				  }
				  .font_style2 {
					  // width: 48px;
					  padding-top: 7px;
					  height: 17px;
					  font-size: 12px;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: #A7A7A7;
					  line-height: 17px;
				  }
				  .donation {
					  width: 72px;
					  height: 26px;
					  background: #00D09F;
					  border-radius: 13px;
					  // width: 28px;
					  font-size: 14px;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: #FFFFFF;
					  line-height: 26px;
					  
				  }
			  }
		  }
	      .forth_block {
			  margin-top: 10px;
			  background-color: #FFFFFF;
			  .forth_header {
				  display: flex;
				  justify-content: space-between;
				  align-items: center;
				  padding: 15px 15px 10px;
				  .forth_title {
					    display: inline-block;
					     // width: 72px;
					     height: 28px;
					     font-size: 20px;
					     font-family: STSongti-SC-Black, STSongti-SC;
					     font-weight: 900;
					     color: #282828;
					     line-height: 28px;
					  .title_icon {
					  	display: inline-block;
					  	margin-left: 10px;
					  }
				  }
				  .integralContribution {
					  // width: 48px;
					  height: 17px;
					  font-size: 12px;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: #A7A7A7;
					  line-height: 17px;
				  }
			  }
			  .forth_content {
				  .memberOfFamily {
					  .memberItem {
						  display: flex;
						  justify-content: space-between;
						  align-items: center;
						  border-top: 1px solid #F6F7F9;
						  padding: 4px 15px;
						  .member_unit {
							  display: flex;
							  .memberName {
								  padding-left: 16px;
								  height: 48px;
								  line-height: 48px;
								  font-size: 18px;
								  font-family: PingFangSC-Regular, PingFang SC;
								  font-weight: 400;
								  color: #333333;
							  }

						  }
						  .member_integral {
							  // width: 62px;
							  height: 20px;
							  font-size: 20px;
							  font-family: D-DIN-Bold, D-DIN;
							  font-weight: bold;
							  color: #4C8BF5;
							  line-height: 22px;
						  }

					  }
				  }
				  
			  }
			  
		  }
		  .fifth_block {
			  margin-top: 10px;
			  background-color: #FFFFFF;
			  padding-bottom: 70px;
			  .fifth_header {
				  display: flex;
				  align-items: center;
				  padding: 15px 15px 10px;
				  .fifth_title {
					  display: inline-block;
					     // width: 72px;
					     height: 28px;
					     font-size: 20px;
					     font-family: STSongti-SC-Black, STSongti-SC;
					     font-weight: 900;
					     color: #282828;
					     line-height: 28px;
					  .title_icon {
					  	display: inline-block;
					  	margin-left: 10px;
					  }
				  }

			  }
			  .fifth_content {
				  display: flex;
				  // justify-content: space-between;
				  flex-wrap: wrap;
				  padding: 4px 8px 8px 16px;
				  .home_honor {
					  width: 25%;
					  padding: 2px;
					  .honorImg {
						  // width: 62px;
						  height: 64px;
						  text-align: center;
					  }
					  .honorName {
						  padding-top: 8px;
						  font-size: 14px;
						  font-family: PingFangSC-Regular, PingFang SC;
						  font-weight: 800;
						  color: #333333;
						  line-height: 20px;
						  text-align: center;
					  }
				  }
			  }
		  			  
		  }
		  .option_tips{
			  text-align:center;
			  .tips{
					color:#C8D2DE;
					font-size:14px;
			  }
			  .option_tips_icon{
				  margin-top:35px;
				  margin-bottom:10px;
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

<!-- <template>
	<view>
		<home v-if="PageCur=='home'" homeData= 'homeData' ref='homePage'></home>
		<family v-if="PageCur=='family'"></family>
		<shop v-if="PageCur=='shop'"></shop>
		<mine v-if="PageCur=='mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/menu/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="family">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/menu/circles' + [PageCur == 'family'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='family'?'text-green':'text-gray'">我的家</view>
			</view>
			<view class="action" @click="NavChange" data-cur="shop">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/menu/shop' + [PageCur == 'shop'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='shop'?'text-green':'text-gray'">商城</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/menu/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-green':'text-gray'">我的</view>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				homeData: {}
			}
		},
		onLoad: function() {
			uni.login({
				success: function(res) {
					// 获取code
					console.log(1111);
					console.log(JSON.stringify(res));
					console.log(JSON.stringify(res));
					console.log(1111);
				}
			});
			this.wxGetUserInfo()
			this.getPhoneNumber()
			this.getHomePage()
			
		},
		onShow() {
		   
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			wxGetUserInfo() {
				console.log(222)
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(333)
						console.log(this.userInfo);
						console.log(333)
					},
					fail: () => {
						console.log("未授权");
					}
				})
			console.log(222)
			 },
			 getPhoneNumber: function(e) {
			 	console.log(e);
			 	if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
			  
			 	} else {
			  
			 	}
			 },
		    getHomePage() {
				let that = this
				setTimeout(() => {
					  that.$refs.homePage.getHomePageAdv()
					  that.$refs.homePage.getPolicyList()
					  
				})
			}
			
		}
	}
</script>

<style>

</style>
 
 -->
 
 
<template>
	<view>
		<view>
		  <view>
			<view class='header'>
			  <!-- <image src='../../static/wx_login.png'></image> -->
			</view>
			<view class='content'>
			  <view>申请获取以下权限</view>
			  <text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<!-- withCredentials=true  获取到除用户基本信息之外的encryptedData以及iv等数据 -->
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
			  授权登录
			</button>
			
			<button class='bottom' type='primary' open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">
			  授权登录
			</button>
		  </view>
		</view>
	</view>
</template>

<script>
	// import { htxcx } from "@/store/api.js"
	// import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				code:"",
				SessionKey: '',
				encryptedData:"",
				iv:"",
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse')//默认为true  记录当前用户是否是第一次授权使用的
			}
		},

		onLoad() {
			uni.login({
				success: function(res) {
					// 获取code
					console.log(1111);
					console.log(JSON.stringify(res));
					console.log(JSON.stringify(res));
					console.log(1111);
				}
			});
			// this.login()
		},
		methods: {
			// ...mapMutations(["setName"]),
			wxGetUserInfo(){ //第一授权获取用户信息===》按钮触发
			console.log(11+'start')
				let _this = this;
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: function (infoRes) {
						console.log(22+'start')
						_this.encryptedData = infoRes.encryptedData
						_this.iv = infoRes.iv
						_this.nickName = infoRes.userInfo.nickName; //昵称
						_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
						uni.setStorageSync('isCanUse', false);//记录是否第一次授权 false:表示不是第一次授权
						_this.updateUserInfo();
					},fail:function (fail){console.log("fail:",fail)}
				});
			},
						getPhoneNumber:function(e){
							this.encryptedData = e.detail.encryptedData
							this.iv = e.detail.iv
							console.log('手机号')
							console.log(e)
							console.log('手机号')
							this.login()
							uni.setStorageSync('isCanUse', false);
							// uni.navigateTo({//信息更新成功后跳转到小程序首页
							// 	url: '/pages/index/home'
							// });
						},
			login(){
				let _this = this;
				uni.showLoading({
				  title: '登录中...'
				});
				console.log(1111+'start')
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.code = loginRes.code;
						if (!_this.isCanUse) {
							// //非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log(2222+'start')
									console.log('login用户信息：',infoRes);
				 　　　　　　　　　　　//获取用户信息后向调用信息更新方法
									_this.nickName = infoRes.userInfo.nickName; //昵称
									_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
									console.log('login用户信息：',_this);
									_this.updateUserInfo();//调用更新信息方法
								}
							});
						}
						// 将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						
						uni.hideLoading();
					},
					fail:function (fail){console.log("fail:",fail)}
				})
					
			},
			updateUserInfo(){ //向后台更新信息
			  console.log(1+'end')
				// this.setName(this.nickName,this.avatarUrl)
				let _this = this;
				var obj ={
					appid:"wx69c31e66562b0293",
					secret:"cd88e8877ece9198164c384cbcf5ed16",
					code:this.code
				}
				console.log(66)
				console.log(obj)
				console.log(_this)
				console.log(66)
				// 这个接口要在后端调用(https://api.weixin.qq.com无法加入白名单)
				// https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code
				// 请求微信端地址获取用户唯一标识的
				// htxcx(obj.appid,obj.secret,obj.code).then(res=>{
				// 	console.log("res:",res)
									
				// 	res.data.openid // 唯一
				// 	res.data.session_key 
				// 	this.encryptedData
				// 	this.iv
					// uni.reLaunch({//信息更新成功后跳转到小程序首页
					// 	url: '/pages/index/home'
					// });
					// uni.navigateTo({//信息更新成功后跳转到小程序首页
					// 	url: '/pages/index/home'
					// });
				// },err=>{
				// 	console.log("err:",err)
				// })
				
				
				
				
			}
		}
	}
</script>

<style scoped>
	.header {
	    margin: 90rpx 0 90rpx 50rpx;
	    border-bottom: 1px solid #ccc;
	    text-align: center;
	    width: 650rpx;
	    height: 300rpx;
	    line-height: 450rpx;
	  }
	 
	  .header image {
	    width: 200rpx;
	    height: 200rpx;
	  }
	 
	  .content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	  }
	 
	  .content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	  }
	 
	  .bottom {
	    border-radius: 80rpx;
	    margin: 70rpx 50rpx;
	    font-size: 35rpx;
	  }
</style>

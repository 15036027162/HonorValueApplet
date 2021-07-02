<template>
	<view class="grantAuthorization">
		<cu-custom bgColor="initBg"><block slot="content">韶山市荣誉值</block></cu-custom>
		<image style="width: 100%; height: 100vh; position: absolute; top: 0;" src="http://i3.mlxcchina.com/jinshipicture/16251222602148f1260c7ffc54d618958f50817f4234a.png" mode=""></image>
		<view class="grantAuthorization_container">
			<view class="first_block">
				<view class="btnLogin">
					<button class='bottom' type='primary' open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">
					  授权登录
					</button>
				</view>
				<view class="btnNoLogin" @click="btnNoLogin">
					暂不登录
				</view>
	<!-- 			<view class="btnNoLogin" @click="updateUserInfo">
					测试本地登录
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import base_url from '@/common/config.js'
	export default {
	    name: "grantAuthorization",
		components: {
		},
		data(){
			return {
				phoneParam:{
					loginType:false,
					encryptedData:'',
					iv:'',
					
				},
				code:''
			}
		},
		onShow() {
		},
		onLoad() {
			this.login()
		},
		methods:{
			async getPhoneNumber(e){
			    this.encryptedData = e.detail.encryptedData
			    this.iv = e.detail.iv
			    this.phoneParam.encryptedData = e.detail.iv
			    this.phoneParam.iv = e.detail.iv
			    console.log('手机号')
			    console.log(e)
			    console.log('手机号')
			    uni.showLoading({
			      title: '登录中...'
			    });
			    this.updateUserInfo()

				// uni.navigateTo({//信息更新成功后跳转到小程序首页
				// 	url: '/pages/index/home'
				// });
			},
			login(){
				let _this = this;
				uni.showLoading({
				  title: '登录中...'
				});
				// const  loginType = uni.getStorageSync('loginType');
				// const  isCanUse = uni.getStorageSync('isCanUse');
					// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						uni.setStorageSync('loginType', true);
						_this.code = loginRes.code;
						console.log(_this.code)
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
									// _this.updateUserInfo();//调用更新信息方法
								}
							});
						}
						// 将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						
						uni.hideLoading();
					},
					fail:function (fail){
						console.log("fail:",fail)
							   uni.showToast({
								 title: fail,
								 icon: 'none'
							   })
						}
				})
					
	
			},
			async updateUserInfo(){ //向后台更新信息
				// this.setName(this.nickName,this.avatarUrl)
				 //    const js_code = uni.getStorageSync('js_code')
					// const js_codes = this.$store.state.loginParam.js_code
					// console.log(this.$store.state)
					// if(js_code && js_code != '' && js_code == js_codes){
					// 	uni.navigateTo({//信息更新成功后跳转到小程序首页
					// 		url: '/pages/index/home'
					// 	});
					// }
					var obj ={
						// 本地
						// appid:"wx69c31e66562b0293",
						// 政府
						// appid:"wx266002f5e7637efd",
						// secret:"cd88e8877ece9198164c384cbcf5ed16",
						js_code:this.code ,//登录code
						iv:this.iv,//	手机号加密
						encryptedData: this.encryptedData, //手机号加密
					
						m_platform:'4', // 基础参数：
						m_app_name:'shaoshan',
						// 基础参数
						NO_SIGN: "N" ,// 签名校验
						m_app_id: "MLXCIOSSTORE",
						m_device_id: "device-PC-Browser",
						m_nonce: "E6RJOI25",
						m_timestamp: "1623824039644",
						m_signature: "05c31c7f40a3b3174cf35451ae688f9d",
						m_os_version: "v-20200709",
						m_screen: "***x***",
						m_channel: "MlxcNddWeb",
						m_model: "model-PC-Browser",
						m_latitude: "",
						m_longitude: "",
						m_format: "",
						m_version: "v-20200709",
						// 
						m_token_id: "",
						member_id: "",
					}
					 console.log(1233)
					 console.log(obj)
					 uni.setStorageSync('js_code',obj.js_code)
					 uni.setStorageSync('loginForm',JSON.stringify(obj))
					 this.$store.commit('SET_LOGIN_PARAM',obj)
					 console.log(1233)
					uni.request({
					   // url:'http://10.1.1.251:10000/member/v2/login/member_QuickLoginByWeiXin',
					   url:base_url + '/member/v2/login/member_QuickLoginByWeiXin',
					   data:obj,
					   method:'post',
					   header:{
						   Token: ''
					   },
					   responseType: 'text',
					   success:res=>{
						   console.log(res)
						   console.log(res.data.status)
						   console.log(res.data.msg)
						   let status = res.data.status
						   let msg = res.msg
						   let data = res.data.data[0]
						   const  loginData = data
						   // uni.setStorageSync('isCanUse', true);
						   this.$store.commit('SET_LOGIN_DATA',loginData)
						   uni.setStorageSync('loginData',JSON.stringify(loginData))
						   if (status == 'success') {
							   console.log('success')
							setTimeout(() => {
								uni.navigateTo({//信息更新成功后跳转到小程序首页
									url: '/pages/index/home'
								});
							})
						   } else {
							   uni.showToast({
							   		title:'系统错误:' + res.data.msg,
							   		icon: 'none'
							   })
						   }
						  
					   },
					   fail:(error)=>{
						   uni.showToast({
							 title: '系统错误:' + error,
							 icon: 'none'
						   })
					   },
					})

			},
			btnNoLogin() {
				uni.clearStorageSync()
				uni.navigateTo({//信息更新成功后跳转到小程序首页
					url: '/pages/index/home'
		 		});
			}
		}
	}	   
</script>

<style lang="less" scoped>
.grantAuthorization {
	  height: 100vh;
	  width: 100%;
   //    background: url(../../static/login/bg.png) no-repeat;
	  // background-size:  100%  100%;
	.grantAuthorization_container {
		.first_block {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding:0 40px  40px;
			.btnLogin {
				height: 40px;
				background: #00D09F;
				box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
				border-radius: 25px;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
				uni-button {
					height: 40px;
					line-height: 40px;
					background: #00D09F;
					color: #FFFFFF;
				}
				button {
					height: 40px;
					line-height: 40px;
					background: #00D09F;
					color: #FFFFFF;
					font-size: 15px;
					border-radius: 24px;
				}
			}
			.btnNoLogin {
				margin-top: 15px;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				text-align: center;
			}
            
		}
	}


}
</style>

 
 
 
 <!-- 
<template>
	<view>
		<view>
		  <view>
			<view class='header'>
			</view>
			<view class='content'>
			  <view>申请获取以下权限</view>
			  <text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
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
 -->
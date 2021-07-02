 
 <template>
 	<view style="margin-top: 60px;">
 		<!-- bindgetphonenumber -->
 		<button type="primary" form-type="submit" open-type="getUserInfo" bindgetuserinfo="getUserInfo" withCredentials="true">微信登录</button>
 		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
        <button type="primary" open-type="getUserInfo"
         @getuserinfo="wxGetUserInfo">登录</button>
 	</view>
 </template>
  
 <script>
 	export default {
 		data() {
 			return {
  
 			};
 		},
 		onLoad: function() {
 			uni.login({
 				success: function(res) {
 					// 获取code
 					console.log(JSON.stringify(res));
 				}
 			});
 		},
  
 		methods: {
			wxGetUserInfo() {
				debugger
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(this.userInfo);
					},
					fail: () => {
						console.log("未授权");
					}
				})

			 },
 			getPhoneNumber: function(e) {
 				console.log(e);
 				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
  
 				} else {
  
 				}
  
 				// 				console.log(JSON.stringify(e.encryptedData));
 				// 				console.log(JSON.stringify(e.iv));
 			},
 		    getuserinfo: function(){
				debugger
 		        // wx登录
 		        wx.login({
 		          success (res) {
 		            if (res.code) {
 		              //发起网络请求
 		              var code = res.code
 		                  // 获取微信用户信息
 		                wx.getUserInfo({
 		                  success: function(res) {
 		                    var userInfo = res.userInfo
 		                    var nickName = userInfo.nickName
 		                    var avatarUrl = userInfo.avatarUrl
 		                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
 		                    var province = userInfo.province
 		                    var city = userInfo.city
 		                    var country = userInfo.country
 		                  },
 		                  fail:res=>{
 		                      // 获取失败的去引导用户授权 
 		                   }
 		                })
 		                
 		            } else {
 		                
 		            }
 		          }
 		        })
 		    },
			
			
		}
 	}
 </script>
  
 <style>
  
 </style>
<template>
		<view class="checkAuth">
				<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">实名认证</block></cu-custom>
				<view class="auth-wrap">
					<view class="infoBox">
						<view class="infoHead">
							<view class="avatarWrap">
								<image src="../../static/family/account.png" class="avatar"></image>
							</view>
							<view class="auditStatus">
								<image src="../../static/mine/pass_icon.png" v-if="authInfo.status == '1'" class="statusIcon"></image>
								<image src="../../static/mine/auditing_icon.png" v-if="authInfo.status == '3'" class="statusIcon"></image>
								<image src="../../static/mine/reject_icon.png" v-if="authInfo.status == '4'" class="statusIcon"></image>
							</view>
						</view>
						<view class="infoBody">
							<text>姓名: {{authInfo.name}}</text>
							<text>身份证号码:{{authInfo.identity}}</text>
							<text>所在乡村: {{authInfo.areaName}} - {{authInfo.streetName}} - {{authInfo.villageName}}</text>
						</view>
					</view>
					<view class="authTips">
						<text v-bind:class="{ errorTips: isErrortips }">{{authTips}}</text>
					</view>
					<view class="bottomBtn" v-if="authInfo.status == '4' ">
						<button class="cu-btn bg-red lg" @click="goChange">重新认证</button>
					</view>
				</view>
		</view>
</template>

<script>
	export default {
	    name: "checkAuth",
		components: {
		},
		data(){
			return {
				userInfo:{},
				authInfo:{
					name:'',
					identity: '',
					areaName:'',
					streetName:'',
					villageName:'',
					status:''
				},
				authTips:'',
				isErrortips: false
			}
		},
		onShow() {
			//读取用户信息缓存
			this.userInfo = uni.getStorageSync('loginData')
			this.userInfo = JSON.parse( this.userInfo )
			console.log( this.userInfo )
			this.getAuthData()
		},
		onLoad() {

		},
		methods:{
			//重新认证
			goChange(){
				uni.navigateTo({
					url: '/pages/mine/realAuthentication'
				});
			},
			//获取实名认证信息
			async getAuthData(){
				let param = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id
				};
				let result = await this.$api.getAuthInfo( param );
				if( result.code == '0' && result.status == 'success' ){
					this.authInfo = result.data[0];
					var identity = this.authInfo.identity;
					identity = identity.substr(0,6)+'**********'+identity.substr(16,2);
					this.authInfo.identity = identity;
					switch ( this.authInfo.status ){
						//审核中
						case '3':
							this.authTips = '您的实名认证正在审核中，将会在1-2个工作日内完成审核，请您耐心等待';
						break;
						//审核通过
						case '1':
							this.authTips = '';
						break;
						//审核不通过
						case '4':
							this.authTips = '您的实名认证,审核不通过! 请重新修改后提交';
							this.isErrortips = true;
						break;
					} 
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
				}
			},
		}
	}		
</script>

<style>
	.auth-wrap{
		padding:0 10px;
	}
	.checkAuth .infoBox{
		margin:10px 0;
		padding:10px;
		border-radius:4px;
		background-color: #FFFFFF;
	}
	.infoHead{
		display: flex;
		justify-content: space-between;
	}
	.avatarWrap{
		display:inline-block;
	}
	.auditStatus{
		display: inline-block;
	}
	.statusIcon{
		width:60px;
		height:47px;
	}
	.infoHead .avatarWrap .avatar{
		width: 50px;
		height: 50px;
	}
	.infoBody text{
		display: block;
		padding:4px 0;
	}
	.errorTips{
		color:#F43F3B;
	}
	.bottomBtn{
		position:absolute;
		z-index:1;
		bottom: 100px;
		left:0;
		width:100%;
		text-align:center;
		padding:0 20px;
	}
	.bottomBtn .lg{
		width:100%;
	}
</style>

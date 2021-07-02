<template name="family">
	<view class="family">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">加入家庭</block></cu-custom>
		   <view class="familyInfoWrap">
			   <view class="familyInfo">
					<view class="avatarBox"><image class="avatar" src="http://i3.mlxcchina.com/jinshipicture/1624500029849e2d276d8fec6471e8dab7759d0a3ffae.png" style="width:100px;height:100px;"></image></view>
					<view class="name"><text>{{familyInfo.doorName}}</text></view>
					<view class="address"><text>{{familyInfo.address}}</text?></view>
			   </view>
		   </view>
		   <view class="joinfamily_bg">
				<image style="height:100%; width: 100%;" src="http://i3.mlxcchina.com/jinshipicture/1624499963059b6b6f4ca0a6c42d5981fe8ee44abc353.png" mode=""></image>
		   </view>
		   <view class="bottomBtn">
				<button class="cu-btn bg-grey lg" v-if="isJoin" disabled="true">不可重复加入家庭</button>
				<button class="cu-btn bg-blue lg" v-if="!isJoin" @click="goJoinFamily">加入家庭</button>
		   </view>
    </view>
</template>

<script>
	import {mapState, mapMutations}  from 'vuex';
	export default {
		name: "joinFamily",
		components: {
		},
		data() {
			return {
				userInfo:{},
				familyInfo:{
					address: '',
					avatar:'',
					doorName:'',
					doorNum:'',
					fixedAddress:'',
					isHousehold:'',
					memberId:'',
					name:'',
					villageCode:'',
				},
				isJoin: false
			}
		},
		onShow() {
			this.getloginData();
		},
		onLoad() {
			this.getloginData();
		},
		onReady() {
			uni.hideLoading()
		},
		methods:{
			getloginData() {
				const userInfo =  uni.getStorageSync('loginData');
				this.userInfo = JSON.parse(userInfo);
				this.familyInfo = this.$store.state.familyInfoData;
				console.log( '获取家庭信息:' );
				console.log( this.familyInfo );
				if( this.userInfo.doorNum != '' ){
					this.isJoin = true;
				}else{
					this.isJoin = false;
				}
			},
			//点击加入家庭
			goJoinFamily(){
				this.joinFamilySubmit();
			},
			//加入家庭
			async joinFamilySubmit(){
				
				//记录跳转过来的组件参数,用于组件页面刷新
				this.$store.commit('SET_REFRESH_COMPONENT','family');
				
				let param = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id,
					uuid: this.familyInfo.uuid
				};
				let result = await this.$api.joinHouse( param );
				if( result.code == '0' && result.status == 'success' ){
					
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200);
					
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
				}
			}
		}
	}
	
</script>


<style>
	.family{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index:1;
		display: block;
		background-color:transparent;
	}
	.familyInfoWrap{
		position: absolute;
		z-index:99;
		left:0;
		top:300rpx;
		width: 100%;
		text-align: center;
		height: 200px;
		display: block;
		background-color:transparent;
	}
	.bottomBtn{
		position: absolute;
		z-index:99;
		left:0;
		bottom:200rpx;
		width: 100%;
		text-align: center;
		height: 80px;
		display: block;
		padding:0 20px;
		background-color:transparent;
	}
	.bottomBtn .cu-btn{
		width: 100%;
	}
	.familyInfo .name text{
		padding: 10rpx 0;
		font-size:60rpx;
		color:#fff;
	}
	.familyInfo .address text{
		padding: 10rpx 0;
		font-size:40rpx;
		color:#fff;
	}
	.joinfamily_bg{
		width: 100%;
		height: 100%;
	}
	.bottomBtn .bg-cyan{
		background-color: #00D09F;
	}
</style>

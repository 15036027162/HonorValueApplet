<template>
	<view class="householder">
		<!-- 户主转让 -->
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">成员管理</block></cu-custom>
		<!-- <view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">成员管理</block></cu-custom>
		</view>	 -->
		<view class="householder_container">
			<view class="householderBox">
				<view class="householderItem" v-for="(item,index) in familyMemberList" :key="index">
					<view class="householderInfo">
						<view class="imgBox">
							<image style="width: 48px;height: 48px;" src="../../static/family/titleImg.png" mode=""></image>
						</view>
						<view class="householderName">
							{{item.name}}
						</view>
					</view>
					<view class="householder_btn" v-bind:class="{ main: item.isHousehold == '1' }" :data-id="index" :data-name="item.name" :data-mid="item.memberId" :data-ismaster="item.isHousehold" @tap="selectedMember" data-target="DialogModal1">
						{{ item.isHousehold == '1' ? '户主' : '转让' }}
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="cu-bar bg-white justify-end"> -->
				<!-- <view class="cu-bar justify-end">
				</view> -->
				<view class="padding-xl selectBox">
		            是否将户主转让给<text class="font_style1">{{currentSeleted.name}}</text>
				</view>
				<view class="cu-bar bg-white btnBox">
					<view class="btn cancelBox" style="width: 50%; height: 48px;">
						<button class="cu-btn cancel" @tap="cancelTransfer">取消</button>
					</view>
					<view class="btn sureBox" style="width: 50%;height: 48px;">
						<button class="cu-btn sure" @tap="enterTransfer">确定</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapMutations}  from 'vuex';
	export default {
	    name: "householder",
		components: {
		},
		data(){
			return {
				modalName: null,
				familyMemberList:[],
				currentSeleted:{
					index:'',
					memberId:'',
					type:'',
					name:''
				}
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData();
			//拉取成员列表
			this.getFamilyMemberInfo();
		},
		methods:{
			//返回刷新测试
			returnTest(){
				//记录跳转过来的组件参数,用于组件页面刷新
				this.$store.commit('SET_REFRESH_COMPONENT','family');
				//返回上一个页面
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},200);
			},
			getloginData() {
				const userInfo =  uni.getStorageSync('loginData');
				this.userInfo = JSON.parse(userInfo);
			},
			//转让户主
			enterTransfer(e) {
				this.submitTransferHouseHold( this.currentSeleted.memberId );
				this.modalName = null;
			},
			//取消转让户主
			cancelTransfer(e) {
				this.currentSeleted.index = '';
				this.currentSeleted.memberId = '';
				this.currentSeleted.name = '';
				this.modalName = null;
			},
			//选中当前要设置的成员
			selectedMember(e) {
				
				let index = e.currentTarget.dataset.id;
				let mid = e.currentTarget.dataset.mid;
				let name = e.currentTarget.dataset.name;
				let ismaster = e.currentTarget.dataset.ismaster;
				
				if( ismaster == '1' ){
					return false;
				}
				
				if( this.userInfo.isHousehold != '1' ){
					uni.showModal({
						 content: '您不是户主!无法操作',
						 showCancel: false  
					});
					return false;
				}
				
				this.currentSeleted.index = index;
				this.currentSeleted.memberId = mid;
				this.currentSeleted.name = name;
				
				this.modalName = e.currentTarget.dataset.target;
				
				console.log( name );
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
				this.familyMemberList = result.data;
				for( var k in this.familyMemberList ){
					var household = this.familyMemberList[k].isHousehold;
					if( this.isHouseholdConfig.hasOwnProperty( household ) ){
						this.familyMemberList[k].relation = this.isHouseholdConfig[household];
					}else{
						this.familyMemberList[k].relation = '其他';
					}
				}
			},
			//转让户主
			async submitTransferHouseHold( member_id ){
			
				const paramForm = {
					member_id: this.userInfo.memberId,
					editMemberId: member_id,
					m_token_id: this.userInfo.token_id
				}
				let result = await this.$api.transferHouseHold(paramForm);
				if( result.code == '0' && result.status == 'success' ){
					
					//记录跳转过来的组件参数,用于组件页面刷新
					this.$store.commit('SET_REFRESH_COMPONENT','family');
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200);
					
				}else{
					if( result.msg != undefined ){
						uni.showModal({
							 content: result.msg,
							 showCancel: false  
						});  
					}else{
						uni.showModal({
							 content: '系统错误！转让户主失败',
							 showCancel: false  
						});  
					}
				}
			},
		}
	}	
</script>

<style lang="less" scoped>
.householder {
	height: 100vh;
	.top {
		// position: fixed;
		// top: 0;
		z-index: 100;
		width: 100%;
		// height: 290px;
		box-sizing: border-box;
		// padding-top: var(--status-bar-height);
		background-color: #00D09F;
		// height: 60px;
		.bg_bank {
			background-color: #00D09F;
			color: #FFFFFF;
		}
	}
    .householder_container {
		.householderBox {
			// margin-top: 60px;
			.householderItem {
				// width: 375px;
				height: 56px;
				background: #FFFFFF;
				margin-bottom: 1px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:4px 15px 4px 16px;
				.householderInfo {
					display: flex;
					align-items: center;
					.imgBox {
					}
					.householderName {
						// width: 54px;
						padding-left: 16px;
						height: 25px;
						font-size: 18px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 25px;
					}
				}
				.householder_btn.main {
					width: 62px;
					height: 26px;
					line-height: 26px;
					background: #FFFFFF;
					border-radius: 13px;
					border: 1px solid #00D09F;
					text-align: center;
					font-weight: 400;
					color: #00D09F;
					font-family: PingFangSC-Regular, PingFang SC;
				}
				.householder_btn {
					width: 62px;
					height: 26px;
					line-height: 26px;
					border-radius: 13px;
					border: 1px solid #00D09F;
					text-align: center;
					background: #00D09F;
					border-radius: 13px;
					font-weight: 400;
					color: #FFFFFF;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
				}
			}
			
		}
	}
    
	.cu-modal {
		.cu-dialog {
			width: 306px;
			.mainTitle {
				margin-top: 32px;
				height: 24px;
				font-size: 17px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 24px;
			}
			.selectBox {
				font-size: 17px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #030303;
				line-height: 24px;
                .font_style1 {
					color: #00D09F;
				}
			}
			.cu-bar .content {
				width: 100%;
			}
			.btnBox {
				.btn {
					text-align: center;
					height: 48px;
					line-height: 48px;
					border: 1px solid  #D8D8D8;
				}
				.cancelBox {
					border-right: none;
				}
				.cancel {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5D5D5D;
					background: none;
				}
				.sure {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #00D09F;
					background: none;
				}
			}
		}
	}

}
</style>

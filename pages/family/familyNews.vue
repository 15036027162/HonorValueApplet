<template>
	<view class="familyNews">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">家庭消息</block></cu-custom>
	<!-- 	<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">家庭消息</block></cu-custom>
		</view>	 -->
		<view class="familyNews_container">
			<view class="messageBox">
				<view class="messageItem" v-for="(item,index) in houseMessageList" :key="index">
					<view class="messageTip">
						{{item.content}}
					</view>
					<view class="messageDate">
						{{item.createtime}}
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let timer =null
	export default {
	    name: "familyNews",
		components: {
		},
		data(){
			return {
				loginData:{},
				houseMessageList:[],
				page:1
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
			this.houseMessageWei()
		},
		onPullDownRefresh() {
			this.page = 1
			this.isLoad = false
			this.houseMessageWei()
		},
		onReachBottom() {
			//阻止重复加载
			if(timer !== null){
				clearTimeout(timer)
			}
			timer=setTimeout(()=>this.getMorePublicityList(),500)
			// this.getMoreNews()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if (initData) {
					this.loginData = JSON.parse(initData)
				} else {
					this.loginData = {}
				}
			},
			async houseMessageWei() {
				const paramForm = {
					pageNumber:1,
					pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.houseMessageWei(paramForm)
				const dataList = data.data
				this.houseMessageList = dataList
				console.log(dataList)
			},
			async  getMoreMessageWei(){
			     uni.showNavigationBarLoading()
				 const paramForm = {
				 	pageNumber:this.page,
				 	pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				 }
				 let data = await this.$api.houseMessageWei(paramForm)
				 const code = data.code
				 const msg = data.msg
				 const status = data.status
				 const dataList = data.data
				 if (code === '0' && status === 'success') {
					 if (dataList.length > 0) {
						 this.publicityList= this.publicityList.concat(data.data)
						 //停止下拉样式
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 this.page++
					 } else {
						 this.isLoad = true
						 console.log(this.publicityList)
						 console.log(this.publicityList.length)
					 }
					
				 } else {
					 uni.showToast({
					   title:'系统错误:' + msg,
					   icon: 'none'
					 })
				 }
				
			 }
			
			
		}
	}	
</script>

<style lang="less" scoped>
.familyNews {
	height: 100vh;
	// .top {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 100;
	// 	width: 100%;
	// 	// height: 290px;
	// 	box-sizing: border-box;
	// 	// padding-top: var(--status-bar-height);
	// 	background-color: #00D09F;
	// 	// height: 60px;
	// 	.bg_bank {
	// 		background-color: #00D09F;
	// 		color: #FFFFFF;
	// 	}
	// }
    .familyNews_container {
		.messageBox {
			// margin-top: 60px;
			.messageItem {
				height: 69px;
				background: #FFFFFF;
				margin-bottom: 5px;
				padding: 10px  10px 10px 15px;
				display: flex;
				align-items: flex-start;
				flex-direction: column;
				.messageTip {
					// width: 138px;
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 22px;
				}
				.messageDate {
					// width: 138px;
					margin-top: 7px;
					height: 20px;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 20px;
				}
			}
		}
	}
}
</style>

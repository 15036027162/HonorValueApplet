<template>
	<view class="inclusiveFinance">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">普惠金融</block></cu-custom>
		<view class="inclusiveFinance_container">
			<view class="first_block" v-for="(item,index) in financeList" :key="index">
				<view class="firstItem">
					<view class="firstItemInfo">
						<view class="itemText">
							{{item.title}}
						</view>
						<view class="itemAdress">
							<text class="getAdress">{{item.creator}}</text> <text class="getDate">{{item.createTime}}</text>
						</view>

					</view>
					<view class="imgBox">
						<image v-if="item.picUrl" style="width: 90px; height: 80px;" :src="item.picUrl" mode=""></image>
						<image v-else style="width: 90px; height: 80px;" src="../../static/home/noImg1.png" mode=""></image>
					</view>
				</view>

			</view>
			<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
		</view>
	</view>
</template>

<script>
	let  page=1,timer=null
	export default {
	    name: "inclusiveFinance",
		components: {
		},
		data(){
			return {
				financeList:[],
				loadingTxt:'加载更多',
				isLoad:false
			}
		},
		onShow() {
		
		},
		onLoad(e) {
			this.getFinanceList()
		},
		onPullDownRefresh() {
			this.getFinanceList()
		},
		onReachBottom() {
			//阻止重复加载
			if(timer !== null){
				clearTimeout(timer)
			}
			timer=setTimeout(()=>this.getMoreNews(),500)
			// this.getMoreNews()
		},
		methods:{
			// 普惠金融列表
			async getFinanceList() {
				let that = this
				uni.getStorage({
				    key:'loginData',
				    success(e){
					  that.loginData = e.data
				    }
				})
				const paramForm = {
					pageNumber:1,
					pageSize:10,
				}
				let data = await this.$api.getFinanceList(paramForm)
				const dataList = data.data
				this.financeList = dataList
				this.newList= dataList
				uni.stopPullDownRefresh()
				//隐藏标题读取
				uni.hideNavigationBarLoading()
				page++
			},
			async  getMoreNews(){
			     this.loadingTxt='加载中'
			     uni.showNavigationBarLoading()
				 const paramForm = {
				 	pageNumber:page,
				 	pageSize:10,
				 }
				 let data = await this.$api.getFinanceList(paramForm)
				 const code = data.code
				 const msg = data.msg
				 const status = data.status
				 const dataList = data.data
				 if (code === '0' && status === 'success') {
					 if (dataList.length > 0) {
						 this.newList= this.newList.concat(data.data)
						 //停止下拉样式
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 page++
					 } else {
						 this.isLoad = true
						 console.log(this.newList)
						 console.log(this.newList.length)
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
.inclusiveFinance {
	height: 100vh;
	.inclusiveFinance_container {
		.first_block {
			.firstItem {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px  10px  10px  10px;
				height: 100px;
				background: #FFFFFF;
				.imgBox {
					width: 90px;
				}
				.firstItemInfo {
					display: flex;
					flex-direction: column;
					.itemText {
						height: 44px;
						font-size: 16px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 22px;
						overflow: hidden;
					}
					.itemAdress {
						height: 17px;
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 17px;
						margin-top: 17px;
						.getAdress {
							padding-right: 12px;
						}
					}
				}
			}
		}
	    .loading {
			background: #FFFFFF;
			text-align: center;
			height: 30px;
		}
	}
}
</style>

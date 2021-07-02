<template>
	<view class="pointsPublicity">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">积分公示</block></cu-custom>
		<view class="pointsPublicity_container">
			<view v-if="!noDataType" class="first_block">
				<view class="firstItem" v-for="(item,index) in publicityList" :key="index"  @click="toPointsPublicityDetail(item)">
					<view class="imgBox">
						<image v-if="item.picUrl" style="width: 90px; height: 80px;" :src="item.picUrl" mode=""></image>
						<image v-else style="width: 90px; height: 80px;" src="../../static/home/noImg1.png" mode=""></image>
					</view>
					<view class="firstItemInfo">
						<view class="firstItemT">
							<view class="firstItemTN">
								<text class="firstItemName">{{item.doorName}}</text>
							</view>
							<view class="firstItemTD" :class="item.isAddPlus==2? 'orange' : ''">
								<text v-if="item.isAddPlus==1">+{{item.scores || ''}}</text>
								<text v-if="item.isAddPlus==2">-{{item.scores || ''}}</text>
							</view>
						</view>
						<view class="firstItemB">
							{{item.remark}}
						</view>
					</view>
				</view>
			    <view v-if="stopRefreshType" class="cu-load" :class="!isLoad?'loading':'over'"></view>
			</view>
			<view v-else class="first_block">
				<view class="noDataImgbox">
					<image style="width: 100px; height: 100px;" src="../../static/public/kzt-jfgs.png" mode=""></image>
					<view class="noDataText">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let timer =null
	export default {
	    name: "pointsPublicity",
		components: {
		},
		data(){
			return {
				loginData:{},
				publicityList:[],
				clickType:true,
				isLoad:false,
				page:1,
				currentArea:{
					villageCode: ''
				},
				noDataType:false,
				stopRefreshType:true
			}
		},
		onShow() {
		
		},
		onLoad( option ) {
			this.currentArea.villageCode = option.villageCode
			this.getloginData()
			this.getPublicityList()
		},
		onPullDownRefresh() {
			this.page = 1
			this.isLoad = false
			this.getPublicityList()
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
			toPointsPublicityDetail(row) {
				console.log(row)
				uni.setStorageSync('publicityRow',JSON.stringify(row))
				uni.navigateTo({
					url: '/pages/home/pointsPublicityDetail?publicityRow='+ JSON.stringify(row)
				});
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if(initData) {
				   this.loginData = JSON.parse(initData)	
				} else {
				   this.loginData = {}
				}
				
			},
			async getPublicityList() {
				const paramForm = {
					villageCode: this.currentArea.villageCode,
					pageNumber:1,
					pageSize:10,
					member_id:this.loginData.memberId || '',
					m_token_id:this.loginData.token_id || ''
				}
				let data = await this.$api.getPublicityList(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				const dataList = data.data
				if (code === '4003' || status === 'error') {
					 this.clickType = false
					setTimeout(() => {
						uni.showModal({
						    title: '提示',
						    content: msg,
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
					},200)
				} else if (code === '0' && status === 'success') { 
					if ( dataList.length >0 && dataList.length < 10) {
						 this.publicityList = dataList
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 this.stopRefreshType = false
					} else if (dataList.length == 10) {
						 this.publicityList = dataList
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 this.page++
					} else if (this.page == 1 && dataList.length == 0) {
						this.noDataType = true
					}
				} else {
					this.clickType = false
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			},
		    async  getMorePublicityList(){
		         this.loadingTxt='加载中'
		         uni.showNavigationBarLoading()
		    	 const paramForm = {
		    	 	pageNumber:this.page,
		    	 	pageSize:10,
					member_id:this.loginData.memberId || '',
					m_token_id:this.loginData.token_id || ''
		    	 }
		    	 let data = await this.$api.getPublicityList(paramForm)
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
.pointsPublicity {
	height: 100vh;
    .pointsPublicity_container {
		 .first_block {
			 .noDataImgbox {
				 text-align: center;
				 margin: 100px auto;
				 .noDataText {
					 padding: 25px  0;
				 }
			 }
			 .firstItem {
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 padding: 10px  0  10px  10px;
				 height: 100px;
				 background: #FFFFFF;
				 .imgBox {
					 width: 90px;
				 }
				 .firstItemInfo {
					 width: 100%;
					 padding-left: 10px;
					 .firstItemT {
						 display: flex;
						 justify-content: space-between;
						 align-items: center;
						 .firstItemTN {
							 height: 25px;
							 font-size: 18px;
							 font-family: PingFangSC-Medium, PingFang SC;
							 font-weight: 500;
							 color: #000000;
							 line-height: 25px;
							 .firstItemName {
								padding-right: 3px; 
							 }
						 }
						 .firstItemTD {
							 // width: 45px;
							 height: 25px;
							 line-height: 25px;
							 font-size: 17px;
							 font-family: D-DIN-Bold, D-DIN;
							 font-weight: bold;
							 color: #FFFFFF;
							 padding-left: 14px;
							 padding-right: 10px;
							 border-top-left-radius: 12.5px;
							 border-bottom-left-radius: 12.5px;
							 // background: url(../../static/home/green.png) no-repeat;
							 background: #00d09f;
							 // background-size: 100% 100%;
						 }
						 .firstItemTD.orange {
							 background: url(../../static/home/orange.png) no-repeat;
						 }
					 }
					 .firstItemB {
						 // width: 250px;
						 height: 37px;
						 font-size: 14px;
						 font-family: PingFangSC-Regular, PingFang SC;
						 font-weight: 400;
						 color: #666666;
						 line-height: 20px;
						 overflow: hidden;
					 }
				 }
			 }
		 }
	 }  
}
</style>

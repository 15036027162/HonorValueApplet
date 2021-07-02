<template>
	<view class="informationDisclosure">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">信息公开</block></cu-custom>
		<view class="informationDisclosure_container">
			<view class="first_block">
				<scroll-view scroll-x class="bg-white nav navTab" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabTitleList" :key="index" @tap="tabSelect" :data-id="index">
						<view class="tabTitleBox" @click="tabSelectRow(item)">
							{{item.name || ''}}
						</view>
					</view>
				</scroll-view>
				
				<view v-for="(item,index) in tabTitleList" :key="index" v-if="index==TabCur" class="tabPage">
					<view class="itemPage  first_tabPage" v-for="(items ,index) in tablist" @click="toInformationDetail(items)">
						<view class="firstItem">
							<view class="firstItemInfo">
								<view class="itemText">
									{{items.title || ''}}
								</view>
								<view class="itemAdress">
									<text class="getAdress">{{items.areaName || ''}}</text> <text class="getDate">{{items.createTime}}</text>
								</view>
						
							</view>
							<view class="imgBox">
								<image v-if="items.fileUrl" style="width: 90px; height: 80px;" :src="items.fileUrl" mode=""></image>
								<image v-else style="width: 90px; height: 80px;" src="../../../static/home/noImg1.png" mode=""></image>
							</view>
						</view>

					</view>
				</view>
                <view v-if="stopRefreshType" class="cu-load" :class="!isLoad?'loading':'over'"></view>


				
				
			
			</view>
		</view>
	</view>
</template>

<script>
	let timer =null
	export default {
	    name: "informationDisclosure",
		components: {
		},
		data(){
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabTitleList:[],
				selectRow:{id:''},
				tablist: [],
				loginData:{},
				isLoad:false,
				page:1,
				//当前地区编码
				currentArea:{
					areaCode:'',
					streetCode: '',
					villageCode: ''
				},
				stopRefreshType:true
			}
		},
		onShow() {
		
		},
		onLoad(option) {
			console.log( 'option:' )
			this.currentArea.areaCode = option.areaCode
			this.currentArea.streetCode = option.streetCode
			this.currentArea.villageCode = option.villageCode
			
			console.log( option )
			
			this.getloginData()
			this.getSelectDictionary()
		},
		onPullDownRefresh() {
			this.page = 1
			this.isLoad = false
			this.getPolicyList()
		},
		onReachBottom() {
			//阻止重复加载
			if(timer !== null){
				clearTimeout(timer)
			}
			timer=setTimeout(()=>this.getMorePolicyList(),500)
			// this.getMoreNews()
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log(this.TabCur)
			},
			tabSelectRow(row) {
				this.selectRow = row
				this.getPolicyList()
				console.log(row)
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if(typeof initData == 'string' && initData.length > 0) {
					this.loginData = JSON.parse(initData)
				} else {
					console.log( '未登录' )
					
					this.loginData = ''
				}
			},
			async getSelectDictionary() {
				const paramForm = {
					type:1,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getSelectDictionary(paramForm)
				const dataList = data.data
				this.tabTitleList = dataList
				this.selectRow.id = dataList[0].id
				console.log(dataList)
				this.page = 1
				this.isLoad = false
				this.getPolicyList()
				uni.setStorageSync('tabTitleList',JSON.stringify(dataList))
			},
			async getPolicyList(row) {
				const paramForm = {
					areaCode: this.currentArea.areaCode,
					streetCode: this.currentArea.streetCode,
					villageCode:this.currentArea.villageCode,
					type: this.selectRow.id,
					isHomePage:'N',
					pageNumber:1,
					pageSize:10,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getPolicyList(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				const dataList = data.data
				if (code === '0' && status === 'success') { 
					if ( dataList.length >0 && dataList.length < 10) {
						this.tablist = dataList
						uni.stopPullDownRefresh()
						//隐藏标题读取
						uni.hideNavigationBarLoading()
						this.stopRefreshType = false
					} else if (dataList.length > 10 || dataList.length == 10) {
						 this.tablist = dataList
						 console.log(11)
						 console.log(dataList)
						 console.log(11)
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 this.page++
					} else {
						 // console.log(this.financeList)
						 // console.log(this.financeList.length)
					}
				} else {
					uni.showToast({
					  title: '系统错误'+msg,
					  icon: 'none'
					})
				}
				
				
			},
			async  getMorePolicyList(){
			     uni.showNavigationBarLoading()
				 const paramForm = {
				 	pageNumber:this.page,
				 	pageSize:10,
					type: this.selectRow.id,
					isHomePage:'N',
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				 }
				 let data = await this.$api.getPolicyList(paramForm)
				 const code = data.code
				 const msg = data.msg
				 const status = data.status
				 const dataList = data.data
				 if (code === '0' && status === 'success') {
					 if (dataList.length > 0) {
						 this.tablist= this.tablist.concat(data.data)
						 //停止下拉样式
						 uni.stopPullDownRefresh()
						 //隐藏标题读取
						 uni.hideNavigationBarLoading()
						 this.page++
					 } else {
						 this.isLoad = true
						 console.log(this.tablist)
						 console.log(this.tablist.length)
					 }
					
				 } else {
					 uni.showToast({
					   title:'系统错误:' + msg,
					   icon: 'none'
					 })
				 }
				 
			 },
			 toInformationDetail(row) {
				 const  rowIds = row.id
				 uni.navigateTo({
				 	url: '/pages/home/informationDisclosure/informationDetail?id='+ rowIds
				 });
			 }
			 
			
			
		}
	
	
	}	
</script>

<style lang="less" scoped>
.informationDisclosure {
	.informationDisclosure_container {
		.first_block {
			background: #FFFFFF;
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
	}
}
</style>

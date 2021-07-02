<template>
	<view>
		<home v-if="PageCur=='home'" homeData='homeData' ref='homePage'></home>
		<family v-if="PageCur=='family'" familyData='familyData' ref='familyPage'></family>
		<shop v-if="PageCur=='shop'" shopData='shopData' ref='shopPage'></shop>
		<mine v-if="PageCur=='mine'" mineData='mineData' ref='minePage'></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
			    <view class="actionBox" @click="changePage(0)">
			    	<view class='cuIcon-cu-image'>
			    		<image :src="'/static/menu/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
			    	</view>
			    	<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			    </view>
			</view>
			<view class="action" @click="NavChange" data-cur="family">
				<view class="actionBox" @click="changePage(1)">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/menu/circles' + [PageCur == 'family'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='family'?'text-green':'text-gray'">我的家</view>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="shop">
				<view class="actionBox" @click="changePage(2)">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/menu/shop' + [PageCur == 'shop'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='shop'?'text-green':'text-gray'">商城</view>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
		         <view class="actionBox" @click="changePage(3)">
		         	<view class='cuIcon-cu-image'>
		         		<image :src="'/static/menu/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
		         	</view>
		         	<view :class="PageCur=='mine'?'text-green':'text-gray'">我的</view>
		         </view>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				homeData: {},
			}
		},
		onLoad: function() {
			this.getHomePage()
			
		},
		onShow() {
			//获取要刷新的组件页面参数
			let refreshComponent =  this.$store.state.refreshComponent
			console.log( '主页刷新:')
			console.log( refreshComponent )
			switch( refreshComponent ){
				//刷新主页数据
				case 'home':
					this.getHomePage()
				break;
				//刷新我的家页面数据
				case 'family':
					this.getFamilyPage()
				break;
				//刷新我的页面数据
				case 'mine':
					this.getMinePage()
				break;
				//刷新商城页面
				case 'shop':
					this.getShopPage()
				break;
			} 
		},
		computed:{
		},
		onReady(){
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
		    getHomePage() {
				let that = this
				
				setTimeout(() => {
					  that.$refs.homePage.getloginData()
					  that.$refs.homePage.getAppMemberBaseInfo()
					  that.$refs.homePage.setVillageName()
                      that.$refs.homePage.getPolicyList()
                      that.$refs.homePage.getHomePageAdv()
					  that.$refs.homePage.getDoorHonorIntrgral()
					  that.$refs.homePage.getFinanceNew()
					  
				})
			},
			getFamilyPage() {
				let that = this
				setTimeout(() => {
					  that.$refs.familyPage.getInitData()
				})
			},
			getShopPage() {
				let that = this
				setTimeout(() => {
					  that.$refs.shopPage.getInitData()
				})
			},
			getMinePage() {
				let that = this
				setTimeout(() => {
					  that.$refs.minePage.getloginData()
					  that.$refs.minePage.getAppMemberBaseInfo()
					  
				})
			},
			changePage(e) {
				const pageType = e
				if(pageType === 0) {
					this.getHomePage()
				} else if (pageType === 1) {
					this.getFamilyPage()
				} else if (pageType === 2) {
					this.getShopPage()
				} else if (pageType === 3) {
					this.getMinePage()
				}
			}
			
		}
	}
</script>

<style>

</style>
 

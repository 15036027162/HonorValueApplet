<template>
	<view class="home_village">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">选择村庄</block></cu-custom>
		<view class="top">
			 <view class="village_search">
			 	<view class="cu-bar search">
			 		<view class="search-form round">
			 			<text class="cuIcon-search"></text>
			 			<input type="text" placeholder="搜索村庄" @click="clickSearchBar"  @input="search"></input>
			 		</view>
			 	</view>
			 </view>
		</view>	
		
		<view class="village_container" v-show="isSelect">
			<view class="village_tree">
				<view class="VerticalBox">
					<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh)">
						<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in streetList" :key="index" @tap="streetSelect"
						 :data-id="index" :data-streetCode="item.streetCode">
							{{item.streetName}}
						</view>
					</scroll-view>
					<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh)"
					 :scroll-into-view="'main-'+mainCur" :refresher-triggered="isShow">
						<view class="padding-top padding-lr" v-for="(item,index) in villageList" :key="index" :id="'main-'+index" :data-isopen="item.isOpen" :data-villageCode="item.villageCode">
							<view class="cu-bar solid-bottom bg-white" @click="villageSelect(item)">
								<view class="action singlevillage">
									<text v-bind:class=" { disableText : item.isOpen == '1' } "> {{item.villageName}} {{ item.isOpen == '1' ? '( 未开通 )': '' }} </text>
									<uni-text v-if=" selectedVillageCode == item.villageCode " class="lg text-green cuIcon-roundcheckfill"><span></span></uni-text>
								</view>
							</view>
							<view class="cu-list menu-avatar">

							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		  
		<view class="search_container" v-show="!isSelect">
			
			<view class="cu-list menu">
						
					<view class="cu-item" v-for="(item,index) in searchResutls" @click="villageSelect(item)">
					  <view class="action content">
						<text class="text-grey">{{item.fullName}} {{ item.isOpen == '1' ? '( 未开通 )': '' }}</text>
						<uni-text v-if=" selectedVillageCode == item.villageCode " class="lg text-green cuIcon-roundcheckfill"><span></span></uni-text>
					  </view>
					</view>
						
			</view>
			
			<view class="emptyData" v-show=" searchStatus == 'empty' "><text>没有找到此村</text></view>
			
		</view>
			
			
	</view>
</template>

<script>
	import {mapState, mapMutations}  from 'vuex';
	export default {
		name: "village",
		components: {
		},
		data() {
			return {
				userInfo:{},
				streetList: [],
				villageList:[],
				allViallageList:[],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				isShow: false,
				selectedVillageCode:'',
				selectedStreetName: '',
				selectedStreetCode: '',
				isSelect: true,
				searchResutls:[],
				searchStatus:''
			}
		},
		onShow() {
		
		},
		onLoad( option ) {
			//记录跳转过来的组件参数,用于组件页面刷新
			if( option.component != undefined ){
				this.$store.commit('SET_REFRESH_COMPONENT',option.component);
			}
			//读取用户信息缓存
			this.userInfo = uni.getStorageSync('loginData')
			this.userInfo = JSON.parse( this.userInfo )
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			//获取全部镇村信息
			this.getAllDistrictList();
		},
		onReady() {
			uni.hideLoading()
		},
		methods:{
			//点击搜索条
			clickSearchBar(){
				this.isSelect = false;
			},
			//搜索村名
			search(e){
				var keyword = e.detail.value;
				if( keyword != ''){  
					var find_pos;  
					var vResult = [];
					for(var i in this.allViallageList ){  
						var resultText = this.allViallageList[i].villageName||'';
						find_pos = resultText.indexOf(keyword);
						if(find_pos>=0){  
							vResult.push( this.allViallageList[i] );
						}  
					}
					if( vResult.length > 0 ){
						//搜索结果
						this.searchResutls = vResult;
					}else{
						//没有找到
						this.searchStatus = 'empty';
					}
				}else{
					this.searchResutls = [];
					this.searchStatus = '';
				}
			},
			//选择镇
			streetSelect(e) {
				let id = e.currentTarget.dataset.id;
				this.tabCur = id;
				this.mainCur = id;
				this.verticalNavTop = (id - 1) * 50;
				this.villageList = this.streetList[id].districtThree;
				this.selectedStreetCode = this.streetList[id].streetCode;
				this.selectedStreetName = this.streetList[id].streetName;
				this.selectedVillageCode = '';
				console.log("村列表");
				console.log( this.villageList );
			},
			//选择村
			villageSelect( item ) {
				
				//判定当前村是否开通
				if( item.isOpen == '1' ){
					uni.showModal({
						 content: '当前村未开通!无法选择',
						 showCancel: false  
					});  
					return false;
				}
				this.selectedVillageCode = item.villageCode;
				
				//搜索选中自带镇数据
				if( item.streetCode != undefined ){
					this.selectedStreetCode = item.streetCode;
				}
				if( item.streetName != undefined ){
					this.selectedStreetName = item.streetName;
				}
				
				const villageForm ={
					streetCode: this.selectedStreetCode,
					streetName: this.selectedStreetName,
					villageCode: item.villageCode,
					villageName: item.villageName
				}
				
				this.$store.commit('SET_VILLAGE_DATA',villageForm);
				
				//返回上一个页面
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},200);
			},
			//获取全部镇村信息
			async getAllDistrictList(){
				
				const paramForm = {
					areaCode: this.userInfo.areaCode,
				}
				let result = await this.$api.getAllDistrict(paramForm)
				
				console.log( '返回数据' )
				console.log( result )
				
				const data = result.data[0]
				
				//写入全部村镇列表
				this.streetList = data.districtTwo
				//默认村列表
				this.villageList = data.districtTwo[0].districtThree
				//默认镇名
				this.selectedStreetCode = this.streetList[0].streetCode
				//默认镇code
				this.selectedStreetName = this.streetList[0].streetName
				
				//遍历全部村
				for( var i in data.districtTwo ){
					for( var k in data.districtTwo[i].districtThree ){
						var currStreetName = data.districtTwo[i].streetName;
						var currStreetCode = data.districtTwo[i].streetCode;
						var currVillageCode = data.districtTwo[i].districtThree[k].villageCode;
						var currVillageName = data.districtTwo[i].districtThree[k].villageName;
						var fullName = currVillageName+' - '+ currStreetName;
						var isOpen = data.districtTwo[i].districtThree[k].isOpen;
						var itemObj = {
							villageName: currVillageName,
							villageCode: currVillageCode,
							streetName: currStreetName,
							streetCode: currStreetCode,
							fullName: fullName,
							isOpen: isOpen
						};
						this.allViallageList.push( itemObj );
					}
				}
				
				console.log( '全部村列表' )
				console.log( this.allViallageList )
				
				
			}

		}
	}
	
</script>

<style lang="less" scoped>
.home_village {
	// border: 1px solid red;
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
		// height: var(--status-bar-height);
		// titleBarHeight
		.bg_bank {
			background-color: #00D09F;
			color: #FFFFFF;
		}
		.village_search {
			background-color: #00D09F;
			// border: 1px solid red;
			height: 60px;
			// margin-top: 59px;
			.cu-bar {
				background-color: #00D09F;
				height: 60px;
			}
		}
	}
	.village_container {
		.village_tree {
			// margin-top: 125px;
			// height: 81vh;
			// border: 2px solid blue;
			.fixed {
				position: fixed;
				z-index: 99;
			}
			.VerticalNav.nav {
				width: 200upx;
				white-space: initial;
			}
			
			.VerticalNav.nav .cu-item {
				width: 100%;
				text-align: center;
				background-color: #fff;
				margin: 0;
				border: none;
				height: 50px;
				position: relative;
			}
			
			.VerticalNav.nav .cu-item.cur {
				background-color: #f1f1f1;
			}
			
			.VerticalNav.nav .cu-item.cur::after {
				content: "";
				width: 8upx;
				height: 30upx;
				border-radius: 10upx 0 0 10upx;
				position: absolute;
				background-color: currentColor;
				top: 0;
				right: 0upx;
				bottom: 0;
				margin: auto;
			}
			
			.VerticalBox {
				display: flex;
			}
			
			.VerticalMain {
				background-color: #f1f1f1;
				flex: 1;
				.singlevillage {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	.search_container{
		.content text{
			float: left;
		}
		.content .cuIcon-roundcheckfill{
			float: right;
		}
	}
	.emptyData{
		color:#888888;
		font-size:12px;
		text-align: center;
		padding:20px 0;
	}
	.disableText{
		color:#dcdcdc;
	}
	.text-green, .line-green, .lines-green{
		color: #00D09F;
	}
}	
</style>

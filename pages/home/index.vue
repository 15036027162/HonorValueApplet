<template name="home">
	<view class="home">
		<cu-custom bgColor="initBg"><block slot="content">韶山市荣誉值</block></cu-custom>
	    <scroll-view scroll-y class="page">
		   <view class="home_container">
			    <view class="home_block">
			    	  <view class="householdBlock">
			    	  	<view class="block_header">
			    	  		<view class="block_title" @click="scroll">
			    	  			我的家
			    	  			<view class="title_icon" style="display: none;">
			    	  				<image style="width: 10px; height: 10px;" src="../../static/home/icon-arrow.png" mode=""></image>
			    	  			</view>
			    	  		</view>
			    	  		<view class="block_btn" @click="toVillagePage">
			    	  			{{currentArea.villageName}}
			    	  			<view class="btn_icon">
			    	  				<image style="width: 10px; height: 10px;" src="../../static/home/icon-qiehuan.png" mode=""></image>
			    	  			</view>
			    	  		</view>
			    	  	</view>
			    	  	<view v-if="doorNumType" class="block_cont">
			    	  	     <view class="blo_Frow">
			    	  	     	  	 <view class="home_title">
			    	  	     	  	 	家庭总分
			    	  	     	  	 </view>
			    	  				 <view class="home_point">
			    	  				 	{{doorIntrgralList.honorPoint || 0}}
			    	  				 </view>
			    	  	     </view>
			    	  		 <view class="blo_Srow">
			    	  		 	   <view class="availablePoints">
			    	  		 	   	    <view class="row_fir available_text">
			    	  		 	   	    	可用积分
			    	  		 	   	    </view>
			    	  					<view class="row_sec available_num">
			    	  						{{doorIntrgralList.integralPoint || 0}}
			    	  					</view>
			    	  		 	   </view>
			    	  		 	   <view class="usedPoints">
			    	  		 	   	    <view class="row_fir available_text">
			    	  		 	   	    	已用积分
			    	  		 	   	    </view>
			    	  					<view class="row_sec available_num">
			    	  						{{doorIntrgralList.exchangePoint || 0}}
			    	  					</view>						 	   	
			    	  		 	   </view>
			    	  		 	   <view class="familyRanking">
			    	  		 	   	    <view class="row_fir available_text">
			    	  		 	   	    	家庭排名
			    	  		 	   	    </view>
			    	  					<view class="row_sec available_num">
			    	  						{{doorIntrgralList.rank || 0}}
			    	  					</view>						 	   	
			    	  		 	   </view>	
			    	  		 </view>
			    	  	</view>
			    	    <view v-else class="block_cont activeDoor">
			    	    </view>
					  </view>
					  
			    </view>
                <view class="first_block">
                	  <view class="first_item goodThings" @click="toPointsPublicity">
						   <view class="first_icon goodThings_icon">
						   	 <image src="../../static/home/icon-hrhs.png" mode=""></image>
						   </view>
						   <view class="first_text goodThings_text">
						   	  积分公示
						   </view>
                	  </view>
					  <view class="first_item" @click="toPointsDeclaration">
						   <view class="first_icon goodThings_icon">
						   	 <image src="../../static/home/icon-wysq.png" mode=""></image>
						   </view>
						   <view class="first_text goodThings_text">
						   	  积分申报
						   </view>					  	
					  </view>
					  <view class="first_item" @click="toRatingFacility">
						   <view class="first_icon goodThings_icon">
						   	 <image src="../../static/home/icon-pjsx.png" mode=""></image>
						   </view>
						   <view class="first_text goodThings_text">
						   	  评级授信
						   </view>					  	
					  </view>
					  <view class="first_item" @click="toHonorList">
						   <view class="first_icon goodThings_icon">
						   	 <image src="../../static/home/icon-yrq.png" mode=""></image>
						   </view>
						   <view class="first_text goodThings_text">
						   	  荣誉榜单
						   </view>					  	
					  </view>
					  <view class="first_item" @click="toPointsRanking">
						   <view class="first_icon goodThings_icon">
						   	 <image src="../../static/home/icon-rybd.png" mode=""></image>
						   </view>
						   <view class="first_text goodThings_text">
						   	  积分排名
						   </view>					  	
					  </view>
                </view>
                <view class="second_block">
					  <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
					   :autoplay="true" interval="5000" duration="500">
					  	<swiper-item v-for="(item,index) in swiperList" :key="index">
					  		<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					  		<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					  	</swiper-item>
					  </swiper>
                </view>
                <view class="third_block">
                	 <view class="third_header">
                	 	  <view class="third_title more_title">
							  普惠金融
                	 	  </view>
						  <view class="third_more" @click="toInclusiveFinance">
						  	   更多
						  </view>
                	 </view>
					 <view class="third_content" @click="toInclusiveDetail">
					 	   <view class="third_top">
					 	   	    <view class="third_top_text">
					 	   	    	 <view class="third_top_textT">
					 	   	    	 	{{financeNewList.title || ''}}
					 	   	    	 </view>
									 <view class="third_top_textBox">
										 <view class="third_top_textC">
											 {{financeNewList.contextDelHtml || ''}}
										 </view>
										<view class="third_line"></view>
									 </view>
					 	   	    </view>
								<view class="third_top_img">
									<image style="width: 110px;height: 80px;" :src="financeNewList.picUrl" mode=""></image>
								</view>
					 	   </view>
						   <view class="third_bottom">
						   	    <text class="bankName">{{financeNewList.creator || ''}}</text> <text class="bankDate">{{financeNewList.createTime}}</text>
						   </view>
					 </view>
                </view>
				<view class="forth_block">
					<view class="forth_header">
						  <view class="forth_title more_title">
							  信息公开
						  </view>
                          <view class="forth_more" @click="toInformationDisclosure">
                          	   更多
                          </view> 
					</view>
					<view class="forth_content" v-for="(item,index) in policyList"  :key="index">
						 <view class="forth_block" @click="toInformationDetail(item.id)">
						 	  <view class="forth_left">
						 	  	  <view class="infor_date">
						 	  	  	  <view class="infor_dateDay">
						 	  	  	  	{{item.createTime?item.createTime.substring(8,10) : ''}}
						 	  	  	  </view>
									  <view class="infor_dateMonth">
									  	{{item.createTime?item.createTime.substring(5,7) : ''}}月
									  </view>
									  <view class="infor_dateWeek">
									  	{{item.weekDay || ''}}
									  </view>
						 	  	  </view>
						 	  </view>
							  <view class="forth_right">
							  	    <view class="top_punctuation">
							  	    	<image style="width: 9px;height: 6px;" src="../../static/home/p_top.png" mode=""></image>
							  	    </view>
									<view class="infor_cont">
										<view class="infor_contT">
											{{item.title || ''}}
											<!-- 关于《韶山市知识产权奖励（资助）暂行办法》的政策解读 -->
										</view>
										<view class="infor_contC">
											{{item.delHtmlDetails || ''}}
											<!-- 随着我国经济进入高质量发展阶段，科技创新的重要性越来越突出。去年11月，中央两办下发了《关于强化知识产权保护的意见》。今年11月30日，中共中央政治局就加强我国知识产权保护工作举行第二十五次集体学习，习近平总书记作了重要指示。为加强我市知识产权保护、管理，提升我市知识产权公共服务能力，有效推进我市作为国家知识产权强县工程试点县的相应工作，韶山市市场监督管理局结合韶山实际，起草了《韶山市知识产权奖励（资助）暂行办法》。 -->
										</view>
									</view>
									<view class="bottom_punctuation">
										<image style="width: 10px;height: 6px;" src="../../static/home/p_bottom.png" mode=""></image>
									</view>
							  </view>

						 </view>
						  <!--           <view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
						                 <rich-text :nodes="item.details"></rich-text>
						             </view> -->
                    </view>
				</view>  
		   </view>
	  	</scroll-view>
	</view>
</template>

<script>
	import {mapState, mapMutations}  from 'vuex';
	export default {
	    name: "home",
		components: {
		},
		props: {
			homeData: {
				type: [String,Boolean,Number],
				default: {}
			},
		},
		data() {
			return {
				loginData: {},
				appMemberBaseInfo:{},
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/home/banner1.png'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				policyList: [],
				newsList: [],
				doorIntrgralList:{}, // 头部数据
				financeNewList:{}, // 普惠金融
				background: ['color1', 'color2', 'color3'],
				dotStyle: false,
				doorNumType:'',
				clickType:true,
				//当前地区
				currentArea:{
					areaCode:'',
					areaName: '',
					streetCode: '',
					streetName: '',
					villageCode: '',
					villageName: ''
				},
				//默认地址
				defaultArea:{
					areaCode:'430382000000',
					areaName: '韶山市',
					streetCode: '430382100000',
					streetName: '清溪镇',
					villageCode: '430382100001',
					villageName: '韶山火车站社区'
				}
			}
		},
		onLoad(e) {
			this.getDoorHonorIntrgral()
			this.getSwiperList()
			this.getPolicyList()
			this.getloginData()
		},
		onShow() {   
		},
		computed:{
		},
		mounted() {
			this.getloginData()
		},
		methods:{
			navigateClick(url) {
				uni.navigateTo({
					url: url
				});
			},
			scroll() {
				uni.navigateTo({
					url: '/pages/home/scroll'
				});
			},
			toVillagePage() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				uni.navigateTo({
					url: '/pages/home/village?component=home'
				});
			},
			// 积分公示
			toPointsPublicity() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				if (!doorNum) {
					uni.showToast({
					  title:'请先加入家庭户',
					  icon: 'none'
					})
					//获取当前账户的村code
					this.currentArea.villageCode = this.loginData.villageCode;
					//获取当前选择的村code
					const villageData = this.$store.state.villageData
					if( villageData.villageCode != undefined ){
						this.currentArea.villageCode = villageData.villageCode
					}
					return
				}
				uni.navigateTo({
					url: '/pages/home/pointsPublicity?villageCode=' + encodeURIComponent( this.currentArea.villageCode )
				})
			},
			// 积分申报
			toPointsDeclaration() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				if (!doorNum) {
					uni.showToast({
					  title:'请先加入家庭户',
					  icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/home/pointsDeclaration'
				});
			},
			// 评级授信
			toRatingFacility() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				if (!doorNum) {
					uni.showToast({
					  title:'请先加入家庭户',
					  icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/home/ratingFacility'
				});
			},
			// 荣誉榜单
			toHonorList() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				if (!doorNum) {
					uni.showToast({
					  title:'请先加入家庭户',
					  icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/home/honorList'
				});
			},
			// 积分排名
			toPointsRanking() {
				const clickType = this.clickType
				const doorNum = this.doorNumType
				if (!clickType) {
					this.noUserDataTip()
					return
				}
				if (!doorNum) {
					uni.showToast({
					  title:'请先加入家庭户',
					  icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/home/pointsRanking'
				});
			},
			// 普惠金融
			toInclusiveFinance() {
				uni.navigateTo({
					url: '/pages/home/inclusiveFinance/inclusiveFinance'
				});
			},
			// 普惠金融 -详情
			toInclusiveDetail() {
				uni.navigateTo({
					url: '/pages/home/inclusiveFinance/inclusiveDetail?id=' + encodeURIComponent(this.financeNewList.id)
				});
			},
			// 信息公开
			toInformationDisclosure() {
				
				//获取当前账户的村code
				this.currentArea.areaCode = this.loginData.areaCode
				this.currentArea.streetCode = this.loginData.streetCode
				this.currentArea.villageCode = this.loginData.villageCode
				
				//获取当前选择的村code
				const villageData = this.$store.state.villageData
				if( villageData.villageCode != undefined ){
					this.currentArea.streetCode = villageData.streetCode
					this.currentArea.villageCode = villageData.villageCode
				}
				
				uni.navigateTo({
					url: '/pages/home/informationDisclosure/informationDisclosure?areaCode=' + encodeURIComponent( this.currentArea.areaCode ) + '&streetCode=' + encodeURIComponent( this.currentArea.streetCode ) + '&villageCode=' + encodeURIComponent( this.currentArea.villageCode )
				});
				
			},
			// 信息公开 - 详情
			toInformationDetail(rowId) {
				const  rowIds = rowId
				uni.navigateTo({
					url: '/pages/home/informationDisclosure/informationDetail?id='+ rowIds
				});
			},
			//修改当前默认村名
			setVillageName(){
				
				console.log( 'setViallageName' );
				
				console.log(this.loginData)
				
				let that = this
				setTimeout(()=>{
					
					//获取当前账户的村code
					if( that.loginData.areaCode != undefined ){
						that.currentArea.areaCode = that.loginData.areaCode
					}
					if( that.loginData.areaName != undefined ){
						that.currentArea.areaName = that.loginData.areaName
					}
					if( that.loginData.streetCode != undefined ){
						that.currentArea.streetCode = that.loginData.streetCode
					}
					if( that.loginData.streetName != undefined ){
						that.currentArea.streetName = that.loginData.streetName
					}
					if( that.loginData.villageCode != undefined ){
						that.currentArea.villageCode = that.loginData.villageCode
					}
					if( that.loginData.villageName != undefined ){
						that.currentArea.villageName = that.loginData.villageName
					}
					
					//获取当前选择的村code
					const villageData = that.$store.state.villageData
					
					console.log( villageData.villageCode );
					
					if( villageData.villageCode != undefined ){
						that.currentArea.streetCode = villageData.streetCode
						that.currentArea.streetName = villageData.streetName
						that.currentArea.villageName = villageData.villageName
						that.currentArea.villageCode = villageData.villageCode
					}
					
				})
				
				
			},
			// 头部数据
			async getDoorHonorIntrgral() {
				
				//获取当前账户的村code
				if( this.loginData.villageCode != undefined ){
					this.currentArea.villageCode = this.loginData.villageCode;
				}
				
				//获取当前选择的村code
				const villageData = this.$store.state.villageData
				if( villageData.villageCode != undefined ){
					this.currentArea.villageCode = villageData.villageCode
				}
				
				console.log( this.currentArea.villageCode )
				
				const paramForm = {
					editMemberId: this.loginData.memberId || '',
					villageCode: this.currentArea.villageCode,
					sceneId:'',
					pageNumber:1,
					// pageSize:10,
					member_id: this.loginData.memberId || '',
					m_token_id: this.loginData.token_id || ''
				}
				let data = await this.$api.getDoorHonorIntrgral(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '4003' && status === 'error') {
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
					},100)
				} else if (code === '0' && status === 'success') {
					const dataList = data.data[0]
					this.doorIntrgralList = dataList
					this.$store.commit('SET_DOOR_INTRGRAL_LIST',dataList),
					uni.setStorageSync('doorIntrgralList',JSON.stringify(dataList))
				} else {
					this.clickType = false
					uni.showToast({
					  title:'系统错误:' + msg,
					  icon: 'none'
					})
				}
				
				
			},
			// 普惠金融
			async getFinanceNew() {
				const paramForm = {
					pageNumber:1,
					pageSize:10,
				}
				let data = await this.$api.getFinanceNew(paramForm)
				const dataList = data.data[0]
				this.financeNewList = dataList
			},
			// 轮播数据
			async getHomePageAdv() {
				
				//获取当前账户的村code
				if( this.loginData.villageCode != undefined ){
					this.currentArea.villageCode = this.loginData.villageCode;
				}
				
				//获取当前选择的村code
				const villageData = this.$store.state.villageData
				if( villageData.villageCode != undefined ){
					this.currentArea.villageCode = villageData.villageCode
				}
				
				const paramForm = {
					villageCode:this.currentArea.villageCode,
					pageNumber:1,
					pageSize:10,
				}
				let data = await this.$api.getHomePageAdv(paramForm)
				if (data.code === '0') {
					this.swiperList = []
					let swiperArr = data.data
					swiperArr.forEach((item,index) => {
						let  objItem = {
							id: index,
							type: 'image',
							url: item.picUrl,
							style:item.style,
							innerId:item.innerId
						}
						this.swiperList.push(objItem)
					})
					this.$store.commit('SET_SWIPERLIST',this.swiperList),
					uni.setStorageSync('swiperList',JSON.stringify(this.swiperList))
				}
			
			},
			// 信息公开列表页面
	        async getPolicyList() {
				
				//获取当前账户的村code
				if( this.loginData.areaCode != undefined ){
					this.currentArea.areaCode = this.loginData.areaCode
				}
				if( this.loginData.streetCode != undefined ){
					this.currentArea.streetCode = this.loginData.streetCode
				}
				if( this.loginData.villageCode != undefined ){
					this.currentArea.villageCode = this.loginData.villageCode
				}

				//获取当前选择的村code
				const villageData = this.$store.state.villageData
				if( villageData.villageCode != undefined ){
					this.currentArea.streetCode = villageData.streetCode
					this.currentArea.villageCode = villageData.villageCode
				}
				
				const paramForm = {
					areaCode: this.currentArea.areaCode,
					streetCode: this.currentArea.streetCode,
					villageCode:this.currentArea.villageCode,
					isHomePage:'Y',
					pageNumber:1,
					pageSize:10,
				}
				let data = await this.$api.getPolicyList(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				const dataList = data.data
				if (code === '0' && status === 'success') { 
					this.policyList = dataList
				} else {
					uni.showToast({
					  title:'系统错误:' + msg,
					  icon: 'none'
					})
				}
			},
			getloginData() {
				console.log('getLogin1')
				const initData =  uni.getStorageSync('loginData')
				
				console.log( initData )
					
				if (typeof initData == 'string' && initData.length > 0) {
					console.log('getLogin2')
					this.loginData = JSON.parse(initData)
					console.log(this.villageData)
					
					//初始化登录没有村code 按默认来
					if( this.loginData.villageCode == '' || this.loginData.villageCode == undefined ){
						this.currentArea.streetCode = this.defaultArea.streetCode
						this.currentArea.streetName = this.defaultArea.streetName
						this.currentArea.villageName = this.defaultArea.villageName
						this.currentArea.villageCode = this.defaultArea.villageCode
					}
					
				} else {
					
					console.log( '未登录' )
					
					this.loginData = ''
					this.currentArea = this.defaultArea
				}
				
			},
			async getAppMemberBaseInfo() {
				const paramForm = {
					memberId: this.loginData.memberId,
					member_id: this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getAppMemberBaseInfo(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '0' && status === 'success') { 
					const dataList = data.data[0]
					this.appMemberBaseInfo = dataList
					this.doorNumType  = dataList.doorNum
					this.$store.commit('SET_USER_DATA',dataList)
					uni.setStorageSync('userData',JSON.stringify(dataList))
					this.loginData = dataList
					console.log(dataList)
				} else if (code === '4007' && status === 'error') {
					this.clickType = false
					// uni.showToast({
					//   title: msg,
					//   icon: 'none'
					// })
				   // this.noUserDataTip()
					
				} else {
					this.clickType = false
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
				
			},
			noUserDataTip(){
				setTimeout(() => {
					uni.showModal({
					    title: '提示',
					    content: '对不起，您未登录，请登录',
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
				},100)
			}
		}
	}	
</script>

<style lang="less" scoped>
 .home {
	   padding-bottom: 53px;
	   overflow-y: hidden;
	   .home_container {
		   .home_block {
			   // margin-top: 32px;
			   background: url(../../static/home/bg.png) no-repeat;
			   background-size: 100% 100%;
			   height: 230px;
			   // padding-top: 10px;
			   .householdBlock {
			   	position: absolute;
			   	left: 15px;
			   	right: 15px;
			   	display: inline-block;
			   	// width: 345px;
			   	height: 194px;
			   	background: #FFFFFF;
			   	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
			   	border-radius: 10px;
			   	margin-top: 25px;
			   	padding: 15px;
			   	.block_header {
			   		display: flex;
			   		justify-content: space-between;
			   		.block_title {
			   			display: inline-block;
			               // width: 72px;
			               height: 25px;
			               font-size: 18px;
			               font-family: PingFangSC-Medium, PingFang SC;
			               font-weight: 600;
			               color: #282828;
			               line-height: 25px;
			   			.title_icon {
			   				display: inline-block;
			   				margin-left: 10px;
			   			}
			   		}
			   		.block_btn {
			   			display: inline-block;
			   			// width: 100px;
			   			height: 32px;
			   			background: #FFFFFF;
			   			border-radius: 16px;
			   			border: 1px solid #00D09F;
			   			text-align: center;
			   			line-height: 31px;
			   			font-size: 15px;
			   			font-family: PingFangSC-Regular, PingFang SC;
			   			font-weight: 400;
			   			color: #00D09F;
						min-width: 100px;
						padding: 0 8px;
			   			.btn_icon {
			   				display: inline-block;
			   				margin-left: 10px;
			   			}
			   		}
			   		
			   	}
				
			   	.block_cont {
			   		padding: 15px 43px 15px 16px;
			   		margin-top: 10px;
			   		height: 122px;
			   		background: url(../../static/home/bg-card1.png) no-repeat;
			   		background-size: 100% 100%;
			   		border-radius: 10px;
			   		.blo_Frow {
			   			display: flex;
			               .home_title {
			               	display: inline-block;
			   				// width: 60px;
			   				height: 30px;
			   				font-size: 15px;
			   				font-family: PingFangSC-Regular, PingFang SC;
			   				font-weight: 400;
			   				color: #FFFFFF;
			   				line-height: 30px;
			               }
			               .home_point {
			               	display: inline-block;
			   				margin-left: 21px;
			               	// width: 71px;
			               	height: 30px;
			               	font-size: 30px;
			               	font-family: D-DIN-Bold, D-DIN;
			               	font-weight: bold;
			               	color: #FFFFFF;
			               	line-height: 33px;
			               }
			   		}
			   		.blo_Srow {
			   			margin-top: 15px;
			   			display: flex;
			   			justify-content: space-between;
			   			.row_fir {
			   				// width: 48px;
			   				height: 17px;
			   				font-size: 12px;
			   				font-family: PingFangSC-Regular, PingFang SC;
			   				font-weight: 400;
			   				color: #FFFFFF;
			   				line-height: 17px;
			   			}
			   			.row_sec {
			   				margin-top: 10px;
			   				// width: 51px;
			   				height: 20px;
			   				font-size: 20px;
			   				font-family: D-DIN-Bold, D-DIN;
			   				font-weight: bold;
			   				color: #FFFFFF;
			   				line-height: 22px;
			   			}
			   		}
			   	}
				.block_cont.activeDoor{
					// background: url(../../static/public/card2@2x.png) no-repeat;
					background: url(http://i3.mlxcchina.com/jinshipicture/162502545700962641c295481408dba205d08e7a05125.png) no-repeat;
					// background: url(../../static/public/card2.png) no-repeat;
					background-size: 100% 100%;
				}
				
			   }
		   }
		   .first_block {
			   width: 100%;
			   height: 80px;
			   display: flex;
			   justify-content: space-between;
			   align-items: center;
			   background-color: #FFFFFF;
			   padding: 0 15px 0 15px;
			   .first_item {
				   width: 25%;
				   .first_icon {
					   display: flex;
					   justify-content: center;
					   padding:11px 0  8px 0 ;
					   image{
                           width: 32px;
                           height: 32px;
					   }
				   }
				   .first_text {
					   display: flex;
					   justify-content: center;
					   // width: 48px;
					   height: 17px;
					   font-size: 12px;
					   font-family: PingFangSC-Regular, PingFang SC;
					   font-weight: 400;
					   color: rgba(0, 0, 0, 0.65);
					   line-height: 17px;
				   }

			   }
		   }
		   
		   .second_block {
			  width: 100%;
			  height: 120px;
			  background-color: #FFFFFF;
			  margin-top: 10px;
			  padding: 10px 10px 5px 10px;
			  .screen-swiper {
				  min-height: 100px;
			  }
			  .screen-swiper {
				  height: 100px;
			  }
		   }
		   
		   .third_block {
			   width: 100%;
			   // height: 168px;
			   background-color: #FFFFFF;
			   margin-top: 10px;
			   padding:19px 15px 10px 15px;
			   .third_header {
				    display: flex;
					justify-content: space-between;
				   .third_title {
					   // width: 80px;
					   height: 28px;
					   font-size: 20px;
					   font-family: STSongti-SC-Black, STSongti-SC;
					   font-weight: 900;
					   color: #282828;
					   line-height: 28px;
				   }
				   .third_more {
					   width: 28px;
					   height: 30px;
					   font-size: 14px;
					   font-family: STSongti-SC-Black, STSongti-SC;
					   font-weight: 900;
					   color: #28344C;
					   line-height: 30px;
					   opacity: 0.4;
				   }
			   }
			   .third_content {
				   margin-top: 14px;
				   .third_top {
					   display: flex;
					   justify-content: space-between;
					   padding-bottom: 5px;
					   .third_top_text {
						   display: inline-block;
						   padding-right: 11px;
						   // border-bottom: 1px solid red;
						   // width: 213px;
						   .third_top_textT {
							   // width: 224px;
							   height: 40px;
							   // font-size: 18px;
							   font-size: 17px;
							   font-family: PingFangSC-Regular, PingFang SC;
							   font-weight: 400;
							   color: #282828;
							   // line-height: 20px;
							   line-height: 22px;
						   }
						   .third_top_textBox {
							   .third_top_textC {
								   padding: 5px  0;
							   		// width: 224px;
							   		// height: 38px;
							   		height: 42px;
							   		// font-size: 11px;
									font-size: 14px;
							   		font-family: PingFangSC-Regular, PingFang SC;
							   		font-weight: 400;
							   		color: #888888;
							   		// line-height: 16px;	
							   		line-height: 20px;	
							   		// white-space: nowrap; /*强制在一行显示*/
							   		text-overflow: ellipsis; /*设置超出内容显示...*/
							   		overflow: hidden; /*一定不能少 超出的内容进行隐藏*/
							   }
							   .third_line {
								    margin-top: 5px;
							   		height: 1px;
							   		background: #E8E8E8;
							   							   
							   }
						   }

					   }
					   .third_top_img {
						   display: inline-block;
						   display: flex;
						   width: 110px;
					   }
				   }
				   .third_bottom {
					   .bankName {
						   // width: 88px;
						   height: 16px;
						   font-size: 12px;
						   font-family: PingFangSC-Regular, PingFang SC;
						   font-weight: 400;
						   color: #282828;
						   line-height: 16px;
					   }
					   .bankDate {
						   // width: 60px;
						   margin-left: 15px;
						   height: 16px;
						   font-size: 11px;
						   font-family: PingFangSC-Regular, PingFang SC;
						   font-weight: 400;
						   color: #5D5D5D;
						   line-height: 16px;
					   }
				   }
			   }
		   }
		   
		   .forth_block {
			   background-color: #FFFFFF;
			   margin-top: 10px;
			   // padding:12px 15px 27px 16px;
			   padding: 4px 15px 4px 16px;
			   .forth_header {
				   display: flex;
				   justify-content: space-between;
				   .forth_title {
					   // width: 80px;
					   height: 28px;
					   font-size: 20px;
					   font-family: STSongti-SC-Black, STSongti-SC;
					   font-weight: 900;
					   color: #282828;
					   line-height: 28px;
				   }
				   .forth_more {
					   width: 28px;
					   height: 30px;
					   font-size: 14px;
					   font-family: STSongti-SC-Black, STSongti-SC;
					   font-weight: 900;
					   color: #28344C;
					   line-height: 30px;
					   opacity: 0.4;
				   }
			   }
			   .forth_content {
				   .forth_block {
					   // width: 345px;
					   height: 126px;
					   background: #FFFFFF;
					   border-radius: 15px;
					   border: 1px solid #EBECF1;
					   display: flex;
					   justify-content: space-between;
					   .forth_left {
						   padding: 10px 0 19px 0;
						   .infor_date {
							   display: inline-block;
							   width:45px ;
							   padding-right: 15px;
							   border-right: 1px solid #EBECF1;
							   text-align: center;
							   .infor_dateDay {
								   // width: 23px;
								   display: inline-block;
								   height: 33px;
								   font-size: 24px;
								   font-family: STSongti-SC-Black, STSongti-SC;
								   font-weight: 900;
								   color: #28344C;
								   line-height: 33px;
							   }
							   .infor_dateMonth {
								   // width: 18px;
								   display: inline-block;
								   height: 16px;
								   font-size: 11px;
								   font-family: PingFangSC-Regular, PingFang SC;
								   font-weight: 400;
								   color: #28344C;
								   line-height: 16px;
							   }
							   .infor_dateWeek {
								   // width: 22px;
								   display: inline-block;
								   height: 16px;
								   font-size: 11px;
								   font-family: PingFangSC-Regular, PingFang SC;
								   font-weight: 400;
								   color: #28344C;
								   line-height: 16px;
							   }
						   }
					   }
					   .forth_right {
						   padding-left: 12px;
						   width: 84%;
						   .top_punctuation {
						   }
						   .infor_cont {
							   .infor_contT {
								   // width: 264px;
								   height: 40px;
								   // font-size: 18px;
								   font-size: 17px;
								   font-family: PingFangSC-Regular, PingFang SC;
								   font-weight: 400;
								   color: #333333;
								   // line-height: 20px;
								   line-height: 22px;
								   padding-bottom: 5px;
								   margin-bottom: 5px;
							   }
							   .infor_contC {
								   // width: 264px;
								   // height: 33px;
								   height: 37px;
								   font-size: 14px;
								   font-family: PingFangSC-Regular, PingFang SC;
								   font-weight: 400;
								   color: #8A8A8A;
								   // line-height: 16px;
								   line-height: 20px;
								   text-overflow: ellipsis; /*设置超出内容显示...*/
								   overflow: hidden; /*一定不能少 超出的内容进行隐藏*/
							   }
						   }
						   .bottom_punctuation {
							   // padding-top: 11px;
							   display: flex;
							   justify-content: flex-end;
							   margin-top: 5px;
						   }
					   }
				   }
			   }
		   }
		   
	   }
	}
	
</style>

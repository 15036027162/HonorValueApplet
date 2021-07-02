<template>
	<view class="honorList">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">荣誉榜单</block></cu-custom>
		<view class="honorList_container">
			<view class="first_block">
				<view class="first_header">
					  <view class="first_title">
						  荣誉表彰
					  </view>
					  <view class="first_more" style="display: none;">
					  	   查看全部
					  </view>
				</view>
				<view class="first_content">
                    <view class="listItemBox" v-for="(item,index) in honorList" :key = "index">
                    	<view class="listItem">
                    		<view class="itemBox">
                    			<view class="imgBox">
                    				<image style="width: 62px;height: 64px;" src="../../static/home/icon-xjgr.png" mode=""></image>
                    			</view>
                    			<view class="comments">
                    				<view class="comments_left">
                    					<image style="width: 8px; height: 8px;" src="../../static/home/top_left.png" mode=""></image>
                    				</view>
                    				<view class="comments_center">
										{{item.typeExplain}}
                    				</view>
                    				<view class="comments_right">
                    					<image v-if="item.backUrl" style="width: 8px; height: 8px;" :src="honorList.backUrl" mode=""></image>
                    					<image v-else style="width: 8px; height: 8px;" src="../../static/home/top_right.png" mode=""></image>
                    				</view>
                    			</view>
                    			<view class="honnorName">
                    				{{item.publishName}}
                    			</view>
                    			<view class="remark">
                    				{{item.title}}
                    			</view>
                    			<view class="getDate">
                    				{{item.createTime}}
                    			</view>
                    		</view>
                    	</view>


                    </view>
	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "honorList",
		components: {
		},
		data(){
			return {
				loginData:{},
				honorList:[]
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
			this.honorCommendationList()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if(initData) {
				   this.loginData = JSON.parse(initData)	
				} else {
				   this.loginData = {}
				}
			},
			async honorCommendationList() {
				const paramForm = {
					winType:'1',
					pageNumber:1,
					// pageSize:10,
					member_id:this.loginData.memberId || '',
					m_token_id:this.loginData.token_id || ''
				}
				let data = await this.$api.honorCommendationListWei(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '4003' || status === 'error') {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				} else if (code === '0' && status === 'success') {
					const dataList = data.data.list
					this.honorList = dataList
					console.log(dataList)
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			}
		}
	}	
</script>

<style lang="less" scoped>
.honorList {
	height: 100vh;
	background: #FFFFFF;
	.honorList_container {
		height: 100%;
		background: #FFFFFF;
		.first_block {
			display: flex;
			flex-direction: column;
			// height: 540px;
			background: #FFFFFF;
			padding:15px  9px 20px  10px ;
			.first_header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0  6px 0 5px;
				.first_title {
					height: 28px;
					font-size: 20px;
					font-family: STSongti-SC-Black, STSongti-SC;
					font-weight: 900;
					color: #282828;
					line-height: 28px;
				}
				.first_more {
					height: 20px;
					font-size: 14px;
					font-family: STSongti-SC-Black, STSongti-SC;
					font-weight: 900;
					color: #28344C;
					line-height: 20px;
					opacity: 0.4;
				}
			}
			.first_content {
				width: 100%;
				height: 100%;
				margin-top: 10px;
				.listItem {
					float: left;
					width: 50%;
					height: 210px;
					margin-bottom: 10px;
					display: inline-block;
					.itemBox {
						background: url(../../static/home/honor_bg.png) no-repeat;
						background-size: 100% 100%;
						height: 210px;
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 13px 14px 9px 15px;
						.imgBox {
							height: 64px;
						}
						.comments {
							display: flex;
							justify-content: space-between;
							// width: 104px;
							width: 130px;
							// width: 100%;
							height: 25px;
							position: relative;
							.comments_left {
								position: absolute;
								top: 0;
								left: 0;
							}
							.comments_center {
								width: 100%;
								height: 25px;
								font-size: 16px;
								font-family: Helvetica;
								color: #FDF0CC;
								line-height: 25px;
								text-align: center;
							}
							.comments_right {
								position: absolute;
								bottom: 0;
								right: 0;
							}
						}
						.honnorName {
							background: url(../../static/home/button-bg.png) no-repeat;
							width: 100px;
							height: 30px;
							font-size: 16px;
							font-family: Helvetica;
							color: #1F1F1F;
							line-height: 30px;
							text-align: center;
							margin: 10px 0  8px 0;
						}
						.remark {
							height: 28px;
							font-size: 10px;
							font-family: Helvetica;
							color: #FFFFFF;
							line-height: 15px;
							text-align: left;
							
							 text-overflow: -o-ellipsis-lastline;
							 overflow: hidden;
							 text-overflow: ellipsis;
							 display: -webkit-box;
							 -webkit-line-clamp: 2;
							 line-clamp: 2;
							 -webkit-box-orient: vertical;
							
						}
						.getDate {
							height: 14px;
							font-size: 10px;
							font-family: Helvetica;
							color: rgba(255, 255, 255, 0.6);
							line-height: 12px;
							margin-top: 8px;
						}
					}
				}
			    .listItem:nth-child(2n + 1){
					padding-right: 5px;
				}
				.listItem:nth-child(2n){
					padding-left: 5px;
				}
			}
		}
	}
}
</style>

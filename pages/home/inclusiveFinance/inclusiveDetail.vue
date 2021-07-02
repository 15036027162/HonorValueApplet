<template>
	<view class="inclusiveDetail">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">查看详情</block></cu-custom>
	<!-- 	<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">查看详情</block></cu-custom>
		</view>	 -->
		<view class="inclusiveDetail_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="header">
					<view class="headerTitle">
						{{financeDetail.title || ''}}
					</view>
					<view class="initDate">
						{{financeDetail.updateTime || ''}}
					</view>
				</view>
				<view class="imgbox">
					<image v-if="financeDetail.picUrl" style="width: 100%; height: 100%;" :src="financeDetail.picUrl" mode=""></image>
					<image v-else style="width: 84px; height: 230px;" src="../../../static/home/icon.png" mode=""></image>
				</view>
				<view class="contentList" style="display: none;">
					<view class="rowItem">
						<view class="itemTitle">
							1、农业支持保护补贴
						</view>
						<view class="itemContent">
							主要就是三大粮食作物：水稻、玉米和小麦，均归属于农业支持保护补贴，这对于农民来说可谓是相当重要的利民政策。其中玉米补贴主要是我国东北三省和内蒙古地区发放的，之前都是一百多元一亩，预计2020年也和这个差不多；而水稻也是主要针对东三省的，据了解每亩有200多元的补贴；至于小麦，据悉农户种植冬小麦耕地地力保护补贴标准为每亩180元，较去年提高50元；农户种植春小麦补贴标准为每亩115元。
						</view>
					</view>
					<view class="rowItem">
						<view class="itemTitle">
							2、粮豆轮作补贴
						</view>
						<view class="itemContent">
							粮豆轮作补贴主要是针对种植大豆的农户，这个补贴针对的有内蒙古地区、东三省、河南、安徽等。补贴力度大概在每亩150元左右，不过有的地区低一些，有的地区高一些。
						</view>
					</view>
				</view>
			    <view class="VerticalBox" v-html="financeDetail.context" style="margin-top: 20px;">
			    	
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "inclusiveDetail",
		components: {
		},
		data(){
			return {
				financeDetail:[],
				detailId:''
			}
		},
		onShow() {
		
		},
		onLoad(option) {
			this.detailId = option.id;
			console.log(option.id)
			this.getFinanceDetail()
		},
		methods:{
			// 普惠金融详情
			async getFinanceDetail() {
				let that = this
				uni.getStorage({
				    key:'loginData',
				    success(e){
					  that.loginData = e.data
				    }
				})
				const paramForm = {
					id:this.detailId,
					pageNumber:1,
					pageSize:10,
				}
				let data = await this.$api.getFinanceDetail(paramForm)
				const dataList = data.data
				this.financeDetail = dataList
				console.log(this.financeDetail)
			},
		}
	}	
</script>

<style lang="less" scoped>
.inclusiveDetail {
	background: #FFFFFF;
	.inclusiveDetail_container {
		// margin-top: 50px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
		padding: 10px;
		.first_block {
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			.header {
				// height: 62px;
				text-align: center;
				background: #FFFFFF;
				padding-top: 10px;
				.headerTitle {
					// height: 25px;
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 25px;
				}
				.initDate {
					// height: 17px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 17px;
				}
			}
			.imgbox {
				// height: 183px;
				height: 230px;
				background: #D8D8D8;
				display: flex;
				align-items: center;
				justify-content: center;
				
			}
			.contentList {
				padding: 0  15px;
				background: #FFFFFF;
				.rowItem {
					padding: 15px  0;
					// height: 469px;
					.itemTitle {
						margin-top: 10px;
						height: 22px;
						font-size: 16px;
						font-family: Helvetica;
						color: rgba(0, 0, 0, 0.75);
						line-height: 19px;
					}
					.itemContent {
						margin-top: 12px;
						height: 224px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 28px;
					}
				}
			}
		}

	}
}
</style>

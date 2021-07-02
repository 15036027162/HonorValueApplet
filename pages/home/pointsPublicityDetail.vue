<template>
	<view class="pointsPublicityDetail">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">积分公示</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">积分公示</block></cu-custom>
		</view> -->	
		<view class="pointsPublicityDetail_container">
			<view class="first_block">
				<view class="firstItem">
					<view class="firstItemT">
						公示家庭
					</view>
					<view class="firstItemN">
						{{getInfoByData.doorName || ''}}
					</view>
				</view>
				<view class="firstItem">
					<view class="firstItemT">
						加分事项
					</view>
					<view class="firstItemN">
						{{getInfoByData.sceneName || ''}}
					</view>
				</view>
				<view class="firstItem">
					<view class="firstItemT">
						加分原因
					</view>
					<view class="firstItemN">
						{{getInfoByData.sceneExplain || ''}}
					</view>
				</view>
				<view class="firstSingItem">
					<view class="firstItemT">
						加分原因
					</view>
					<view class="firstItemN">
						{{getInfoByData.remark || ''}}
					</view>
					<view class="imgBox">
						<view class="imgShell" v-for="(item,index) in getInfoByData.picUrls" :key="index">
							<image style="width: 109px; height: 109px;" :src="item.fileUrl" mode=""></image>
						</view>
						<!-- <image style="width: 109px; height: 109px;" src="../../static/home/banner1.png" mode=""></image> -->
						<!-- <image style="width: 109px; height: 109px;" src="../../static/home/banner1.png" mode=""></image> -->
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "pointsPublicityDetail",
		components: {
		},
		data(){
			return {
				loginData:{},
				honorCode:"",
				getInfoByData:{},
			}
		},
		onShow() {
		
		},
		onLoad(options) {
			var publicityRow = JSON.parse(options.publicityRow);
			console.log(publicityRow)
			this.honorCode = publicityRow.honorCode
			console.log(publicityRow)
			this.getloginData()
			this.getInfoById()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async getInfoById() {
				const paramForm = {
					honorCode:this.honorCode,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getInfoById(paramForm)
				const dataList = data.data[0]
				this.getInfoByData = dataList
				console.log(dataList)
			}
		}
	}	
</script>

<style lang="less" scoped>
.pointsPublicityDetail {
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
    .pointsPublicityDetail_container {
		// margin-top: 60px;
		 .first_block {
			 .firstItem {
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 height: 60px;
				 background: #FFFFFF;
				 padding: 23px 15px  23px  15px;
				 margin-bottom: 5px;
				 .firstItemT {
					 height: 14px;
					 font-size: 15px;
					 font-family: PingFangSC-Medium, PingFang SC;
					 font-weight: 500;
					 color: #282828;
					 line-height: 14px;
				 }
				 .firstItemN {
					 height: 15px;
					 font-size: 15px;
					 font-family: PingFangSC-Regular, PingFang SC;
					 font-weight: 400;
					 color: #282828;
					 line-height: 15px;
				 }
			 }
			 .firstSingItem {
				 display: flex;
				 flex-direction: column;
				 background: #FFFFFF;
				 padding: 23px  15px  15px 15px ;
				 .firstItemT {
					 height: 14px;
					 font-size: 15px;
					 font-family: PingFangSC-Medium, PingFang SC;
					 font-weight: 500;
					 color: #282828;
					 line-height: 14px;
				 }
				 .firstItemN {
					 margin-top: 11px;
					 height: 168px;
					 font-size: 15px;
					 font-family: PingFangSC-Regular, PingFang SC;
					 font-weight: 400;
					 color: #282828;
					 line-height: 24px;
					 overflow: hidden;
				 }
				 .imgBox {
					 margin-top: 10px;
					 .imgShell {
						 float: left;
						 width: 33%;
						 image {
						   width: 100%;
						   padding: 4px;
						 }
					 }

				 }
			 }
		 }
	 }  
}
</style>

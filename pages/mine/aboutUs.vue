<template>
	<view class="aboutUs">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">关于我们</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">关于我们</block></cu-custom>
		</view> -->	
		<view class="aboutUs_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block">
				<view class="imgBox">
					<image style="width: 108px; height: 107px;" src="../../static/mine/group3.png" mode=""></image>
				</view>
				<view class="versionNumber">
					版本v1.0.0
				</view>
			</view>
			<view class="second_block">
				<view class="messageBox">
					荣誉值+，是我市构建数字化乡村治理的重要一环。是村民自主管理、积极参与、共同创造、提高民主管理自治水平的重要工具，是乡村治理的先头兵。
				</view>
			</view>
			<view class="third_block">
				<view class="rowTtem">
					©美丽乡村信息技术（苏州）有限公司
				</view>
				<view class="rowTtem">
					Beautiful Village Information Technology (SuZhou) Co., LTD
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    name: "aboutUs",
		components: {
		},
		data(){
			return {
				
			}
		},
		onShow() {
		
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}	
</script>

<style lang="less" scoped>
.aboutUs {
	// height: 100vh;
	// .top {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 100;
	// 	width: 100%;
	// 	// height: 290px;
	// 	box-sizing: border-box;
	// 	padding-top: var(--status-bar-height);
	// 	background-color: #00D09F;
	// 	// height: 60px;
	// 	.bg_bank {
	// 		background-color: #00D09F;
	// 		color: #FFFFFF;
	// 	}
	// }
	.aboutUs_container {
		// margin-top: 50px;
		// .marginTop {
		// 	height: var(--status-bar-height);
		// }
		.first_block {
			height: 180px;
			background: url(../../static/mine/group2.png) no-repeat;
			background-size: 100%  100%;
			padding: 16px  0  26px;
			text-align: center;
			.imgBox {
				
			}
			.versionNumber {
				height: 22px;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 22px;
			}
		}
		.second_block {
			height: 110px;
			background: #FFFFFF;
			padding:25px 18px  25px;
			.messageBox {
				height: 60px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 20px;
			}

		}
		.third_block {
			position: fixed;
			bottom: 0;
			padding: 0  20px  30px;
			text-align: center;
			.rowTtem {
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 17px;
			}
		}
	}
}
</style>

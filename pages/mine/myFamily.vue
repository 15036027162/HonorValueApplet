<template>
	<view class="myFamily">
		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">我的家庭</block></cu-custom>
		</view>	
		
	</view>
</template>

<script>
	export default {
	    name: "myFamily",
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
.myFamily {
	height: 100vh;
	.top {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		// height: 290px;
		box-sizing: border-box;
		// padding-top: var(--status-bar-height);
		background-color: #00D09F;
		// height: 60px;
		.bg_bank {
			background-color: #00D09F;
			color: #FFFFFF;
		}
	}
}
</style>

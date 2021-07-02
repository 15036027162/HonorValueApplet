<template>
	<view class="scroll">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">滚动</block></cu-custom>
		<view class="scroll_container">
			    <view>
			        <scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
			            :refresher-threshold="100" @refresherpulling="onPulling"
			            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"></scroll-view>
			    </view>

		</view>
	</view>
</template>

<script>
	export default {
	    name: "scroll",
		components: {
		},
		data(){
			return {
				   triggered: false
			}
		},
		onShow() {
		
		},
		onLoad() {
			this._freshing = false;
			setTimeout(() => {
			    this.triggered = true;
			}, 1000)
		},
		methods:{
			onPulling(e) {
			    console.log("onpulling", e);
			},
			onRefresh() {
			    if (this._freshing) return;
			    this._freshing = true;
			    setTimeout(() => {
			        this.triggered = false;
			        this._freshing = false;
			    }, 3000)
			},
			onRestore() {
			    this.triggered = 'restore'; // 需要重置
			    console.log("onRestore");
			},
			onAbort() {
			    console.log("onAbort");
			}


		}
	}	
</script>

<style lang="less" scoped>
.scroll {
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

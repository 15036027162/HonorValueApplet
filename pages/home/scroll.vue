<template>
	<view class="scroll">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">滚动</block></cu-custom>
	    <view class="container">
	        <view v-for="(item,index) in PoetsList" :key="index">
	            {{item}}
	        </view>
	    </view>
	</view>

</template>

<script>
    export default {
        data () {
            return {
                PoetsList:['苏轼','苏辙','苏洵','柳宗元','辛弃疾'],
				num:1
            }
        },
	    onPullDownRefresh () {
			    if(this.num == 1) {
			    	setTimeout(() => {
			    	    this.PoetsList = ['李白','杜甫','李贺','白居易']
			    		this.num = 2
			    	    uni.stopPullDownRefresh()
			    	})
			    }

				if (this.num == 2){
					setTimeout(() => {
					    this.PoetsList = ['苏轼','苏辙','苏洵','柳宗元','辛弃疾']
						this.num = 3
					    uni.stopPullDownRefresh()
					})
				}
				if (this.num == 3){
					setTimeout(() => {
					    this.PoetsList = ['苏轼1','苏辙2','苏洵3','柳宗元4','辛弃疾5']
						this.num = 1
					    uni.stopPullDownRefresh()
					})
				}
				
	     },
		 methods: {
		     PullDownRefresh:function(){
		         setTimeout(() => {
		             this.PoetsList = ['李白','杜甫','李贺','白居易']
		             uni.stopPullDownRefresh()
		         },1500)
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

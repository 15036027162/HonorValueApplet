<template>
	<view class="scroll">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">滚动</block></cu-custom>
	    <view class="container">
	        <view v-for="(item,index) in newList" :key="index">
	            {{item}}
	        </view>
			<view class="loading">{{loadingTxt}}</view>
	    </view>
	</view>

</template>

<script>
	let  page=1,timer=null
    export default {
        data () {
            return {
                newList:['苏轼','苏辙','苏洵','柳宗元','辛弃疾','苏轼s','苏辙s','苏洵s','柳宗元s','辛弃疾s'],
				num:1,
				loadingTxt:'加载更多'
            }
        },
		onLoad(e) {
		   this.getNews()
		},
	    onPullDownRefresh () {
			 //    if(this.num == 1) {
			 //    	setTimeout(() => {
			 //    	    this.newList = ['李白','杜甫','李贺','白居易']
			 //    		this.num = 2
			 //    	    uni.stopPullDownRefresh()
			 //    	})
			 //    }

				// if (this.num == 2){
				// 	setTimeout(() => {
				// 	    this.newList = ['苏轼','苏辙','苏洵','柳宗元','辛弃疾']
				// 		this.num = 3
				// 	    uni.stopPullDownRefresh()
				// 	})
				// }
				// if (this.num == 3){
				// 	setTimeout(() => {
				// 	    this.newList = ['苏轼1','苏辙2','苏洵3','柳宗元4','辛弃疾5']
				// 		this.num = 4
				// 	    uni.stopPullDownRefresh()
				// 	})
				// }
				// if (this.num == 4){
				// 	setTimeout(() => {
				// 	    this.newList = ['苏轼','苏辙','苏洵','柳宗元','辛弃疾','苏轼s','苏辙s','苏洵s','柳宗元s','辛弃疾s']
				// 		this.num = 1
				// 	    uni.stopPullDownRefresh()
				// 	})
				// }
				this.getNews()
	     },
		 onReachBottom() {
		             //阻止重复加载
		             if(timer !== null){
		                 clearTimeout(timer)
		             }
		             timer=setTimeout(()=>this.getMoreNews(),500)
		             // this.getMoreNews()
		 },
		 methods: {
		     // PullDownRefresh:function(){
		     //     setTimeout(() => {
		     //         this.newList = ['李白','杜甫','李贺','白居易']
		     //         uni.stopPullDownRefresh()
		     //     },1500)
		     // }
			  //下拉刷新事件
				async  getNews(){
					 page=1
					 //标题读取样式激活
					 uni.showNavigationBarLoading()
					 // uni.request({
					 //     url:'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=List1&page=1',
					 //     success: (res) => {
					 //         this.newList=res.data.split('--hcSplitor--')
					 //         //停止下拉样式
					 //         uni.stopPullDownRefresh()
					 //         //隐藏标题读取
					 //         uni.hideNavigationBarLoading()
					 //         page++
					 //     }
					 // })
					 const paramForm = {
						pageNumber:page,
						pageSize:10,
					 }
					 let data = await this.$api.getFinanceList(paramForm)
					 const dataList = data.data
					 this.newList= dataList
					 uni.stopPullDownRefresh()
					 //隐藏标题读取
					 uni.hideNavigationBarLoading()
					 page++
				 },
				   //加载更多的新闻
				async  getMoreNews(){
					 this.loadingTxt='加载中'
					 uni.showNavigationBarLoading()
					 // uni.request({
					 //     url:'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=List1&page='+page,
					 //     success: (res) => {
					 //         if(res.data===null){
					 //             this.loadingTxt="已经加载全部"
					 //             return
					 //         }
					 //         this.newList=this.newList.concat(res.data.split('--hcSplitor--'))
					 //         // this.newList=[...this.newList,res.data.split('--hcSplitor--')]
					 //         //停止下拉样式
					 //         uni.stopPullDownRefresh()
					 //         //隐藏标题读取
					 //         uni.hideNavigationBarLoading()
					 //         page++
					 //     }
					 // })
					 const paramForm = {
						pageNumber:page,
						pageSize:10,
					 }
					 let data = await this.$api.getFinanceList(paramForm)
					 const dataList = data.data
					 this.newList= this.newList.concat(data.data)
							 //停止下拉样式
							 uni.stopPullDownRefresh()
							 //隐藏标题读取
							 uni.hideNavigationBarLoading()
							 page++
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

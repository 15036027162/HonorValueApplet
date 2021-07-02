<template>
	<view class="scroll">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">滚动</block></cu-custom>
		<view class="scroll_container">
			  <view class="cu-load" :class="isLoad?'loading':'over'">
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				  	<view>1</view>
				
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
				   pageNumber: 1,//上拉加载参数设定
				   isLoad: true, //true 为加载中  false 为结束
			}
		},
		onShow() {
		
		},
		onLoad() {
			
		},
		methods:{
			    onReachBottom() {
			        let that = this;
			        that.pageNumber = that.pageNumber + 1
					console.log(that)
					console.log(this)
						uni.request({
							url:'http://10.1.1.251:10000/integratemall/v1/a/policy/policyListWei?pageSize=10&id=117&NO_SIGN=N&m_app_id=shaoshan&member_id=1&m_platform=3&m_app_name=shaoshan&m_token_id=1605256880404b192f7eb513147b2ac8d626d0032ec48&isHomePage=Y&pageNumber=' + that.pageNumber,
							data:{},
							methods:'',
							header:{},
					      	success:res=>{
								console.log(res)
								        // that.guestbooks.concat(...res.results)//合并数组，去除重复
								        //设置加载状态延迟
								        setTimeout(function() {
								            that.isLoad = false
								        }, 100)
							},
					      	fail:()=>{},
					      	// complete:=>{}
						})
			        // this.$https({
			        //     // url: '/接口地址/?offset=' + that.pagenumber,//这里的分页格式仅供参考，具体根据你的接口格式来进行更改
			        //     url: 'http://10.1.1.251:10000/integratemall/v1/a/policy/policyListWei?pageSize=10&id=117&NO_SIGN=N&m_app_id=shaoshan&member_id=1&m_platform=3&m_app_name=shaoshan&m_token_id=1605256880404b192f7eb513147b2ac8d626d0032ec48&isHomePage=Y' + that.pagenumber,//这里的分页格式仅供参考，具体根据你的接口格式来进行更改
			        //     success: (res) => {
			        //         that.guestbooks.concat(...res.results)//合并数组，去除重复
			        //         //设置加载状态延迟
			        //         setTimeout(function() {
			        //             that.isLoad = false
			        //         }, 100)
			        //     }
			        // })
			    },
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

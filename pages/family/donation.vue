<template>
	<view class="donation">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">捐赠</block></cu-custom>
	<!-- 	<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">捐赠</block></cu-custom>
		</view>	 -->
		<view class="donation_container">
			<!-- <view class="marginTop"></view> -->
			<view class="first_block" @click="toSelectDonation" style="display: none;">
				<view class="donationBox">
					<view class="imgBox">
						<image style="width: 36px; height: 36px;" src="../../static/donation/icon-jt.png" mode=""></image>
					</view>
					<view class="donationText">
						请选择要捐赠的家庭
					</view>
				</view>
				<view class="donationD">
					<text class="familyName">{{selectedFamilyData.name}}</text>>
				</view>
			</view>
			<view class="second_block">
				<input class="donationInput" :placeholder="placeholderNum" v-model="textNum"/>
				<button class='donationBtn' @click="donationBtn">全部捐赠</button>
			</view>
			<view class="third_block">
				<text>可用额度</text> <text>{{donationForm.integralPoint}}</text>
			</view>
			<view class="forth_block">
				捐赠说明： 1、可以将捐赠的积分指定给某个家庭，被捐赠后不影响家庭排名。
			</view>
			<view class="fifth_block">
				<button class='sureBtn'  @tap="showModal" data-target="DialogModal1">确定捐赠</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入验证码</view>
				    
				</view>
				<view class="buttonBtn">
					<view class="tipMessage">
						<text v-if="timer_num>0">已发送</text>
						<text v-else>将发送</text>
						验证码至
						<text>{{loginData.mobile.substring(0,3)}}****{{loginData.mobile.substring(7,11)}}</text>
					</view>
					<view class="cu-form-group">
						<input placeholder="请输入验证码" name="input" v-model="verificationCode"></input>
						<button v-if="timer_num > 0" class='getVerification timer_num'>{{timer_num}}s</button>
						<button v-else class='getVerification' @click="sendShortMessageCode">获取验证码</button>
					</view>
				</view>
				<view class="cu-bar bg-white btnBox">
					<view class="action" style="width: 50%;">
						<button class="cu-btn cancel solid-left" @tap="hideModal">取消</button>
					</view>
					<view class="action" style="width: 50%;" >
						<button class="cu-btn sure margin-left solid-left" @tap="hideModals">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
	    name: "donation",
		components: {
		},
		data(){
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				textNum:'',
				placeholderNum:'可捐赠',
				donationForm:{
					integralPoint:''
				},
				loginData:{},
				selectedFamilyData:{},
				verificationCode:'',
				sureType:'',
				timer_num:0
			}
		},
		onShow() {
		   this.getloginData()
		},
		onLoad(options) {
			if (options) {
				let donationForm = JSON.parse(options.donationForm);
				console.log(donationForm)
				this.donationForm = donationForm
				this.placeholderNum = this.placeholderNum + this.donationForm.integralPoint
			}
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				const selectedFamilyData  = this.$store.state.selectedFamilyData
				if(initData) {
				   this.loginData = JSON.parse(initData)
				   if(typeof selectedFamilyData == 'string') {
					    this.selectedFamilyData = JSON.parse(selectedFamilyData)
				   }
				   console.log(this.selectedFamilyData)
				} else {
				   this.loginData = {}
				}
				
			},
			toSelectDonation() {
				uni.navigateTo({
					url: '/pages/family/donationSelect'
				});
			},
			showModal(e) {
				if (!this.textNum || this.textNum == 0) {
					uni.showToast({
					  title: '请添加捐赠积分',
					  icon: 'none'
					})
					return
				}
				//  else if (!this.selectedFamilyData.doorNum) {
				// 	uni.showToast({
				// 	  title: '请选择捐赠的家庭',
				// 	  icon: 'none'
				// 	})
				// 	return
				// }
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			hideModals() {
				this.modalName = null
				if (!this.verificationCode) {
					uni.showToast({
					  title: '请输入验证码',
					  icon: 'none'
					})
					return
				} 
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '确定是否捐赠',
				    success: function (res) {
				        if (res.confirm) {
				           that.houseDonate()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			donationBtn() {
				this.textNum = this.donationForm.integralPoint
			},
			async sendShortMessageCode() {
				const paramForm = {
					mobile:this.loginData.mobile,
					module: "103",
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.sendShortMessageCode(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '4116' && status === 'success') {
					const dataList = data.data[0]
					this.verificationCode = dataList.code
					console.log(this.verificationCode)
					this.sendCode()
				} else {
					uni.showToast({
					  title: msg,
					  icon: 'none'
					})
				}
				
			},
			async houseDonate() {
				const paramForm = {
					amount:this.textNum,
					doorNum:this.loginData.doorNum,
					mobile:this.loginData.mobile,
					module: "103",
					// platform:'',
					code:this.verificationCode,
					
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.houseDonate(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '0' && status === 'success') {
					
					//记录跳转过来的组件参数,用于组件页面刷新
					this.$store.commit('SET_REFRESH_COMPONENT','family')
					
					const dataList = data.data
					console.log(dataList)
					uni.showToast({
					  title: '捐赠成功',
					  icon: 'none'
					})
					
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200)
					
				} else {
					uni.showToast({
					  title:'捐赠失败:'+ msg,
					  icon: 'none'
					})
				}
				
			},
			sendCode() {
				let that = this;
			    let timer_num = 60;
				that.timer_num = timer_num;
			    let timeClock=setInterval(function(){
			        timer_num--;
			        that.timer_num = timer_num;
			        if (timer_num == 0) {
			            clearInterval(timeClock);
			        } 
			    },1000)
			 
			}
		}
	}	
</script>

<style lang="less" scoped>
.donation {

	.donation_container {
		.first_block {
			height: 56px;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 12px 10px 16px;
			.donationBox {
				display: flex;
				align-items: center;
				.imgBox {
					width: 36px;
				}
				.donationText {
					padding-left: 16px;
					// width: 144px;
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 22px;
				}
			}
			.donationD {
				// width: 60px;
				text-align: right;
				.familyName {
					padding-right: 10px;
				}
			}
		}
		.second_block {
			height: 82px;
			background: #FFFFFF;
			// margin-top: 8px;
			padding:20px  16px 12px 12px;
			// .donationUsed {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.donationInput {
					// width: 260px;
					flex: 0.95;
					height: 38px;
					font-size: 27px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					// color: #D9D9D9;
					line-height: 38px;
					text-align: left;
					padding-left: 12px;
					border-bottom: 1px solid #D9D9D9;
				}
				.donationBtn {
					width: 80px;
					height: 32px;
					line-height: 32px;
					background: #00D09F;
					border-radius: 16px;
					font-size: 13px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			// }
		}
		.third_block {
			// width: 375px;
			height: 36px;
			line-height: 36px;
			background: #ECECED;
			padding-left: 12px;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #A9A9A9;
		}
		.forth_block {
			// width: 345px;
			height: 72vh;
			bottom: 0px;
			background: #FFFFFF;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 17px;
			padding:20px  15px 0px  15px;
		}
		.fifth_block {
			position: fixed;
			bottom: 0px;
			padding: 10px  16px 50px 16px;
			width: 100%;
			.sureBtn {
				// width: 100%;
				height: 47px;
				line-height: 47px;
				background: #00D09F;
				border-radius: 5px;
				font-size: 18px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
    .cu-modal {
		.cu-dialog {
			width: 306px;
			.btnBox {
				.cancel {
					height: 18px;
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5D5D5D;
					line-height: 18px;
					background: none;
				}
				.sure {
					height: 18px;
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #00D09F;
					line-height: 18px;
					background: none;
				}
			}
			.getVerification {
				width: 96px;
				height: 32px;
				background: #00D09F;
				border-radius: 16px;
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 32px;
			}
		}
	    .buttonBtn {
			background: #FFFFFF;
			.cu-form-group {
				margin-top: 9px;
				.getVerification{
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					
					width: 100px;
					height: 36px;
					background: #00D09F;
					border-radius: 4px;
					line-height: 36px;
				}
				.getVerification.timer_num{
					background: gray;
				}
			}
		}
	}
}
</style>

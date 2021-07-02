<template>
	<view class="donationSelect">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">捐赠</block></cu-custom>
<!-- 		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">捐赠</block></cu-custom>
		</view>	 -->
		<view class="donationSelect_container">
			<view class="first_block">
				<view class="village_search">
					<view class="cu-bar search">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input type="text" placeholder="搜索"  @input="searchInput" v-model="searchName"></input>
						</view>
					</view>
				</view>
			</view>
			<view class="second_block">
				<view class="donationSelectT">
					请选择要捐赠的家庭
				</view>
				<view class="donationSelectC">
					<view class="donationSelectItem" v-for="(item,index) in VillageCodeList" :key="index" @click="selectedFamily(item)">
						<view class="imgBox">
							<image v-if="item.avatar" style="width: 36px; height: 36px;" :src="item.avatar" mode=""></image>
							<image v-else style="width: 36px; height: 36px;" src="../../static/family/antImg.png" mode=""></image>
						</view>
						<view class="donationSelectName">
							<text class="dName">{{item.name}}</text>家
						</view>
					</view>
			
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "donationSelect",
		components: {
		},
		data(){
			return {
				loginData:{
					name:''
				},
				VillageCodeList:[],
				searchName:''
			}
		},
		onShow() {
		
		},
		onLoad() {
			this.getloginData()
			this.getDoorMemberByVillageCode()
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
			async getDoorMemberByVillageCode () {
				if(this.searchName == this.loginData.name) {
					uni.showToast({
					  title:'不能捐赠给自己',
					  icon: 'none'
					})
					return
				}
				const paramForm = {
					name:this.searchName,
					villageCode:this.loginData.villageCode,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				console.log(paramForm)
				let data = await this.$api.getDoorMemberByVillageCode(paramForm)
				const dataList = data.data
				this.VillageCodeList = dataList
				console.log(dataList)
			},
			searchInput() {
				this.getDoorMemberByVillageCode()
			},
			selectedFamily(row) {
				const  selectedFamilyData = row
				console.log(selectedFamilyData)
				this.$store.commit('SET_SELECTED_FAMILYDATA',JSON.stringify(selectedFamilyData))
				//返回上一个页面
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},200);
			}
		}
	}	
</script>

<style lang="less" scoped>
.donationSelect {
	// height: 100vh;
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
    .donationSelect_container {
		// margin-top: 50px;
		.first_block {
			height: 44px;
			background: #ECECED;
			box-shadow: 0px 1px 0px 0px #DDDDDD;
			display: flex;
			align-items: center;
			.village_search {
				flex: 1;
				// background-color: #00D09F;
				// border: 1px solid red;
				// height: 60px;
				// margin-top: 59px;
				.cuIcon-search {
					text-align: center ;
				}
				.cu-bar {
					// background-color: #00D09F;
					height: 28px;
					// text-align: center;
					.round {
						border-radius: 3px;
					}
					.search-form {
						.cuIcon-search {
						}
					}
				}
			}
		}
		.second_block {
			.donationSelectT {
				padding-left: 16px;
				height: 56px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 56px;
			}
			.donationSelectC {
				.donationSelectItem {
					height: 56px;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					padding: 10px  16px;
					margin-bottom: 1px;
					.imgBox {
						
					}
					.donationSelectName {
						padding-left: 16px;
						.dName {
							padding-right: 8px;
						}
					}
				}
			}
		}
	}
}
</style>

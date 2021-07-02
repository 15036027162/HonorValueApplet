<template>
	<view class="perInformation">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">个人信息</block></cu-custom>
		<view class="perInformation_container">
			<view class="first_block">
				<view class="rowItem">
					<view class="listItemTitle">
						<image v-if="imgUrl" style="width: 40px; height: 40px;" :src="imgUrl" mode="aspectFill"></image>
						<image v-else style="width: 40px; height: 40px;" src="../../static/mine/mineImg.png" mode=""></image>
					</view>
					<view class="listItemC" @tap="ChooseImage">
						<view class="listItemD">
							修改头像
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
						</view>
						<!-- <view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
							<text class='cuIcon-cameraadd'></text>
						</view> -->
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							用户名
					</view>
					<view class="listItemC"  @click="toChangeUserName">
						<view class="listItemD">
							{{appMemberBaseInfo.account}}
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							手机号
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{appMemberBaseInfo.mobile}}
						</view>
						<view class="imgBox">
							<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							姓名
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{appMemberBaseInfo.name}}
						</view>
						<view class="imgBox">
							<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							性别
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{appMemberBaseInfo.ssex == 0? '女' : '男'}}
						</view>
						<view class="imgBox">
							<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							出生年月
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{appMemberBaseInfo.birth}}
						</view>
						<view class="imgBox">
							<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							政治面貌
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<!-- {{appMemberBaseInfo.politicsFace}} -->
							<picker @change="PickerChange" :value="index" :range="picker">
								<view class="picker">
									{{index>-1?picker[index]:(appMemberBaseInfo.politicsFace?picker[appMemberBaseInfo.politicsFace - 1]:'请选择')}}
								</view>
							</picker>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							文化程度
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<!-- {{appMemberBaseInfo.eduBackground}} -->
							<picker @change="PickerChangeOne" :value="indexOne" :range="pickerOne">
								<view class="picker">
									{{indexOne>-1?pickerOne[indexOne]:(appMemberBaseInfo.eduBackground?pickerOne[appMemberBaseInfo.eduBackground - 1]:'请选择')}}
								</view>
							</picker>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							婚姻状况
					</view>
					<view class="listItemC">
						<view class="listItemD">
							<!-- {{appMemberBaseInfo.marriage == '1'? '已婚': '未婚'}} -->
							<picker @change="PickerChangeTwo" :value="indexTwo" :range="pickerTwo">
								<view class="picker">
									{{indexTwo>-1?pickerTwo[indexTwo]:(appMemberBaseInfo.marriage?pickerTwo[appMemberBaseInfo.marriage - 0]:'请选择')}}
								</view>
							</picker>
						</view>
						<view class="imgBox">
							<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="rowItem">
					<view class="listItemTitle">
							家庭住址
					</view>
					<view class="listItemC">
						<view class="listItemD">
							{{appMemberBaseInfo.address}}
						</view>
						<view class="imgBox">
							<!-- <image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image> -->
						</view>
					</view>
				</view>
				
			</view>
			<view class="second_block" style="display: none;">
				<button class="sureChange" type="default">确认修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import base_url from '@/common/config.js'
	export default {
	    name: "perInformation",
		components: {
		},
		data(){
			return {
				loginData:{},
				appMemberBaseInfo:{
					account:'',
					mobile:'',
					name:'',
					ssex:'',
					birth:'',
					address:''
				},
				imgList:'',
				imgUrl:'',
				updateType:false,
				index: -1,
				indexOne: -1,
				indexTwo: -1,
				picker: ['党员', '预备党员', '共青团员','无党派人士','港澳同胞','群众'],
				pickerOne: ['小学及以下', '初中', '高中','大学专科','研究生','博士及以上'],
				pickerTwo: ['已婚', '未婚']
			}
		},
		onShow() {
			if (this.updateType) {
				this.getAppMemberBaseInfo()
			}
		},
		onLoad() {
			this.getloginData()
			this.getAppMemberBaseInfo()
		},
		methods:{
			toChangeUserName() {
				this.updateType = true
				uni.navigateTo({
					url: '/pages/mine/perInformation/changeUserName'
				});
			},
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
			},
			async setMemberAvatar() {
				const paramForm = {
					avatarUrl:this.imgUrl,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.setMemberAvatar(paramForm)
				const code = data.code
				const status = data.status
				if(code == '0' && status == "success") {
					//记录跳转过来的组件参数,用于组件页面刷新
					this.$store.commit('SET_REFRESH_COMPONENT','mine')
					uni.showToast({
					  title: '修改成功',
					  icon: 'none'
					})
				} else {
					uni.showToast({
					  title: '修改失败',
					  icon: 'none'
					})
				}
			},
			async getAppMemberBaseInfo() {
				const paramForm = {
					memberId:this.loginData.memberId,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				let data = await this.$api.getAppMemberBaseInfo(paramForm)
				const dataList = data.data[0]
				this.appMemberBaseInfo = dataList
				this.imgUrl = dataList.avatar
				this.$store.commit('SET_USER_DATA',dataList),
				uni.setStorageSync('userData',JSON.stringify(dataList))
				console.log(dataList)
			},
			ChooseImage() {
				let that =this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original','compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// if (that.imgList.length != 0) {
						// 	that.imgList = that.imgList.concat(res.tempFilePaths)
						// 	console.log(that.imgList)
						// } else {
						// 	that.imgList = res.tempFilePaths
						// }
						that.imgList = res.tempFilePaths
						// console.log(that.imgList)
						// console.log(this.imgList)
						// console.log(res.tempFilePaths)
						     uni.uploadFile({
						         // 需要上传的地址
						         url:base_url+'/commonality/v1/qiNiuYunUpload/singleFileUpload',
						         // filePath  需要上传的文件
						         filePath: res.tempFilePaths[0],
								 // files:res.tempFilePaths[0],
								 fileType:"image",
								 formData:{  
							        type:2,
									m_platform:4
								 }, 
						         name: 'file',
						        success(res1) {
						             // 显示上传信息
						             // console.log(res1)
									 let res2 = JSON.parse(res1.data)
									 const singUrl = res2.data[0]
									 that.imgUrl = singUrl
									 that.setMemberAvatar()
									 // console.log(that.imgUrl)
						         }
					        });
					}
				});
			},
		    PickerChange(e) {
		    	this.index = e.detail.value
				this.setMemberPersonalInfo(1)
		    },
			PickerChangeOne(e) {
				this.indexOne = e.detail.value
				this.setMemberPersonalInfo(2)
			},
			PickerChangeTwo(e) {
				this.indexTwo = e.detail.value
				this.setMemberPersonalInfo(3)
			},
			async setMemberPersonalInfo(type) {
				let paramForm = {
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id
				}
				if (type == 1) {
					paramForm.politicsFace = this.index + 1 + ''
				} else if(type == 2) {
					paramForm.eduBackground = this.indexOne + 1 + ''
				} else if (type == 3) {
					paramForm.marriage = this.indexTwo + ''
				}
				let data = await this.$api.setMemberPersonalInfo(paramForm)
				const code = data.code
				const status = data.status
				if(code == '0' && status == "success") {
					uni.showToast({
					  title: '修改成功',
					  icon: 'none'
					})
				} else {
					uni.showToast({
					  title: '修改失败',
					  icon: 'none'
					})
				}
			}
		}
	}	
</script>

<style lang="less" scoped>
.perInformation {
	.perInformation_container {
		.first_block {
			// padding:15px 10px 120px;
			padding:15px 10px 20px;
			.rowItem {
				height: 60px;
				background: #FFFFFF;
				box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
				border-radius: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 23px 15px;
				margin-bottom: 5px;
				.listItemTitle {
					height: 14px;
					font-size: 15px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 14px;
					display: flex;
					align-items: center;
					.verificationCode {
						height: 14px;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #5D5D5D;
						line-height: 14px;
						padding-left: 20px;
					}
				}
				.listItemC {
					display: flex;
					align-items: center;
					.listItemD {
						height: 14px;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #5D5D5D;
						line-height: 14px;
						padding-right: 10px;
						display: flex;
						align-items: center;
						width: 100%;
						input {
							height: 14px;
							text-align: right;
							line-height: 14px;
						}
					}
					.imgBox {
						
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

			}
		}
	    .second_block {
			position: fixed;
			bottom: 0px;
			left: 0;
			right: 0;
			padding: 15px 15px 50px;
			background: #F6F7F9;
			z-index: 10;
			.sureChange {
				height: 47px;
				background: #00D09F;
				border-radius: 5px;
				font-size: 18px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 47px;
			}
		}
	}
}
</style>

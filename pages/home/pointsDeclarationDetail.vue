<template>
	<view class="pointsDeclarationDetail">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">申请加分</block></cu-custom>
		<view class="pointsDeclarationDetail_container">
<!-- 			<view class="first_block">
				<view class="declarationType">
					申报类型
				</view>
				<view class="selectDeclaration">
					请选择申报类型
					<view class="title_icon">
						<image style="width: 10px; height: 10px;" src="../../static/home/icon-arrow.png" mode=""></image>
					</view>
				</view>
			</view> -->
			<view class="first_block">
				<view class="cu-form-group first_Box">
					<view class="declarationType">
						申报类型
					</view>
					<view class="selectDeclaration" @change="clickList">
						<!-- <picker mode="multiSelector" @change="MultiChange"  @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
							<view v-if="multiArray[0].length > 0" class="picker">
								{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
							</view>
							<view v-else class="picker">
								请选择申报类型
							</view>
						</picker> -->
						<view>
							<view class="item-content"
							  @tap="handleTap('picker1')">
							  <view class="item-value">
							    <text class="item-label">{{ label1 }}</text>
							    <text v-if="!label1"
							      class="item-placeholder">请选择申报类型</text>
							  </view>
							</view>
							<lb-picker ref="picker1"
							  v-model="value1"
							  mode="multiSelector"
							  :list="listValue"
							  :level="2"
							  :dataset="{ name: 'label1' }"
							  @change="handleChange"
							  @confirm="handleConfirm"
							  @cancel="handleCancel">
							</lb-picker>
						</view>
					</view>
					
				</view>
			</view>

			<view class="second_block">
				<view class="inputBox">
					<textarea style="font-size: 16px;" class="textArea" maxlength="200" type="text" :value="remark" v-model="remark" placeholder="请输入200字以内的荣誉加分申请理由"/>
				</view>
				<view class="imgBox">
					<view class="cu-form-group">
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</view>
				<view class="imgText">
					添加举证照片（限9张以内）
				</view>
			</view>
			<view class="third_block">
				<button class="submitApplyBtn" type="default" @click="addPersonalSceneByCode">提交申请</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import base_url from '@/common/config.js'
	import LbPicker from '@/components/lb-picker'
	export default {
	    name: "pointsDeclarationDetail",
		components: {
			 LbPicker
		},
		data(){
			return {
				loginData:{},
				imgList: [],
				imgUrl:[],
				personalSceneByCode:[],
				firstArr:[],
				secondArr:[],
				multiArray:[
					// ['无脊柱动物', '脊柱动物'],
					// ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
					// ['猪肉绦虫', '吸血虫']
					[],
					[]
				],
				multiIndex:[0, 0],
				selectId:'',
				remark:'',
				wordValue:[],
				listValue:[],
				value1: [],
				label1: '',
				list: [
				  {
				    label: '选项1',
				    value: '1',
				    children: [
				      {
				        label: '选项1-1',
				        value: '1-1',
				      }
				    ]
				  },
				  
				],
				//当前地区
				currentArea:{
					areaCode:'',
					areaName: '',
					streetCode: '',
					streetName: '',
					villageCode: '',
					villageName: ''
				},
				appMemberBaseInfo:{},
				clickType:true
			}
		},
		onShow() {
		},
		onLoad() {
			this.getloginData()
			this.getAppMemberBaseInfo()
			this.getPersonalSceneByCode()
		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				if (typeof initData == 'string' && initData.length > 0) {
					this.loginData = JSON.parse(initData)
					//获取当前账户的村code
					this.currentArea.villageCode = this.loginData.villageCode;
				} else {
					this.loginData = ''
				}
			},
			handleTap (picker) {
			  this.$refs[picker].show()
			},
			handleChange (e) {
			  console.log('change::', e)
			},
			handleConfirm (e) {
			  // 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
			  console.log('confirm::', e)
			  if (e) {
			    const name = e.dataset.name
			    const label = e.item.map(m => m.label).join('-')
			    const selectId = e.item.map(m => m.id)
			    if (name && label) {
			      this[name] = label
				  // console.log('label',label)
				  // console.log('id:',selectId)
				  this.selectId = selectId[1]
			    }
			  }
			},
			handleCancel (e) {
			  console.log('cancel::', e)
			},
			// 获取申报类型
			async getPersonalSceneByCode() {
				const paramForm = {
					villageCode:this.currentArea.villageCode,
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id 
				}
				let data = await this.$api.getPersonalSceneByCode(paramForm)
				const dataList = data.data
				let  arrDataList = []
				this.personalSceneByCode = dataList
				console.log(this.personalSceneByCode)
				this.personalSceneByCode.forEach((item,index)=>{
					let  itemObj = []
					let  dataObj = {
						label: item.sceneClassifyExplain,
						value: index,
						children:itemObj
					}
					item.list.forEach((ite,ind) =>{
						let  iteObj = {
							label: ite.name,
							value:ind,
							id:ite.id
						}
						itemObj.push(iteObj)
					})
					arrDataList.push(dataObj)
				})
				this.listValue = arrDataList
				
			},
			async addPersonalSceneByCode() {
	            let picUrls = ''
				this.imgUrl.forEach((item,index) => {
					if(index == 0){
						picUrls = item
					} else {
						picUrls += ',' + item
					}
				})
				if (!this.selectId) {
					uni.showToast({
					  title:'请选择申报类型',
					  icon: 'none'
					})
					return
				} else if (!this.remark) {
					uni.showToast({
					  title:'申请理由不能为空',
					  icon: 'none'
					})
					return
				} else if (!picUrls) {
					uni.showToast({
					  title:'请选择举证照片',
					  icon: 'none'
					})
					return
				}
				console.log(this.imgUrl)
				const paramForm = {
					name:this.loginData.name,
					picUrl:picUrls,
					remark:this.remark,
					honorSetId:this.selectId,
					
					pageNumber:1,
					// pageSize:10,
				
					member_id:this.loginData.memberId,
					m_token_id:this.loginData.token_id,
				}
				console.log(paramForm)
				let data = await this.$api.addPersonalSceneByCode(paramForm)
				const code = data.code
				const msg = data.msg
				const status = data.status
				if (code === '0' && status === 'success') {
					uni.showToast({
					  title:'申请成功',
					  icon: 'none'
					})
					//返回上一个页面
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
					},200);
				} else {
					uni.showToast({
					  title:'系统错误:' + msg,
					  icon: 'none'
					})
				}
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '图片',
					content: '确定要删除这张图片么？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.imgUrl.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage() {
				let that =this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original','compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
							console.log(that.imgList)
						} else {
							that.imgList = res.tempFilePaths
						}
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
									 that.imgUrl.push(singUrl)
									 // console.log(that.imgUrl)
						         }
					        });
					}
				});
			},
            async getAppMemberBaseInfo() {
            	const paramForm = {
            		memberId: this.loginData.memberId,
            		member_id: this.loginData.memberId,
            		m_token_id:this.loginData.token_id
            	}
            	let data = await this.$api.getAppMemberBaseInfo(paramForm)
            	const code = data.code
            	const msg = data.msg
            	const status = data.status
            	if (code === '0' && status === 'success') { 
            		const dataList = data.data[0]
            		this.appMemberBaseInfo = dataList
            		// this.doorNumType  = dataList.doorNum
            		this.loginData = dataList
					this.currentArea.villageCode = dataList.villageCode
            		console.log(dataList)
            	} else if (code === '4007' && status === 'error') {
            		this.clickType = false
            		// uni.showToast({
            		//   title: msg,
            		//   icon: 'none'
            		// })
            		
            	} else {
            		this.clickType = false
            		uni.showToast({
            		  title: msg,
            		  icon: 'none'
            		})
            	}
            	
            	
            },

		}
	}	
</script>

<style lang="less" scoped>
.pointsDeclarationDetail {
	.pointsDeclarationDetail_container {
		// margin-top: 60px;
		.first_block {
			height: 60px;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 23px  20px  23px  15px;
			.cu-form-group {
				width: 100%;
				padding: 0;
			}
			.declarationType {
				height: 14px;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #282828;
				line-height: 14px;
			}
			.selectDeclaration {
				// height: 15px;
				font-size: 15px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #282828;
				// line-height: 15px;
				.title_icon {
					display: inline-block;
					margin-left: 10px;
				}
				.rowList {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.listOne {
						
					}
					.listTwo {
						
					}
				}
			}
		} 
		.second_block {
			// height: 100vh;
			margin-top: 10px;
			// height: 315px;
			background: #FFFFFF;
			box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
			padding: 15px;
			padding-bottom: 130px;
			.inputBox {
				height: 173px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #5D5D5D;
				textarea {
					width: 100%;
				}
				.textArea {
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5D5D5D;
				}
			}
			.imgBox {
				.cu-form-group {
					padding: 0;
				}
			}
			.imgText {
				height: 12px;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #5D5D5D;
				line-height: 12px;
			}

			
		}
		.third_block {
			background: #FFFFFF;
			position: fixed;
			bottom: 0px;
			left: 0;
			right: 0;
			padding: 15px 15px 50px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			.submitApplyBtn {
				height: 47px;
				background: #00D09F;
				border-radius: 5px;
				font-size: 18px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 47px;
				text-align: center;
				
			}
		}
	}
}
</style>

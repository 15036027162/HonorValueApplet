<template>
	<view class="realAuthentication">
		<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">账号设置</block></cu-custom>
		</view>	
		<view class="mine_container">
			<view class="marginTop"></view>
			<view class="first_block">
				<view class="rowItem">
					<view class="rowItemList">
						<view class="listItem" @click="selectVillage">
							<view class="listItemTitle">
								<text style="color: red;">*</text>
								所属乡村
							</view>
							<view class="listItemC">
								<view class="listItemD">
									{{villageData.villageName}}
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="lineSpace"></view>
						<view class="listItem">
							<view class="listItemTitle">
								<text style="color: red;">*</text>
								姓名
							</view>
							<view class="listItemC">
								<view class="listItemD">
									<input type="text" v-model="editForm.name" @blur="inputNameBlur" placeholder="请输入真实姓名"/>
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="lineSpace"></view>
						<view class="listItem">
							<view class="listItemTitle">
								<text style="color: red;">*</text>
								身份证号
							</view>
							<view class="listItemC">
								<view class="listItemD">
									<input type="text" v-model="editForm.identity" @blur="inputIdentityBlur" placeholder="请输入18位身份证号"/>
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="lineSpace"></view>
						<view class="listItem">
							<view class="listItemTitle">
								<text style="color: red;">*</text>
								输入密码
							</view>
							<view class="listItemC">
								<view class="listItemD">
									<input type="password" value="" v-model="password1" placeholder="请输入8-12位字母或数字组合"/>
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="lineSpace"></view>
						<view class="listItem">
							<view class="listItemTitle">
								<text style="color: red;">*</text>
								确认密码
							</view>
							<view class="listItemC">
								<view class="listItemD">
									<input type="password" value="" v-model="password2" placeholder="请再次输入密码"/>
								</view>
								<view class="imgBox">
										<image style="width: 5px; height: 6px;" src="../../static/home/icon-arrow.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					
					<view class="errorTip" v-if="errorTipsShow">
						<view class="iconImg">
							<image style="width: 12px; height: 12px;" src="../../static/mine/error.png" mode=""></image>
						</view>
						<view class="iconText">
							{{errorTips}}
						</view>
					</view>
					
				</view>
			</view>
			<view class="second_block">
				<view class="rowItem">
						<view class="tipT">
							请拍摄并上传你的身份证照片
						</view>
						<view class="itemBox">
							<view class="imgBox">
								<view class="imgBoxL" @click="uploadIdCard(1)">
									<image style="width: 108px;height: 72px;" :src="idCardImg1"></image>
									<view class="shotBtnBox">
										<view class="shotBtn">
											拍摄正面
										</view>
									</view>
								</view>
								<view class="imgBoxR" @click="uploadIdCard(2)">
									<image style="width: 108px;height: 72px;" :src="idCardImg2"></image>
									<view class="shotBtnBox">
										<view class="shotBtn">
											拍摄反面
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="tipRequirement">
							<view class="tipRequirementT">
								拍摄身份证要求
							</view>
							<view class="tipRequirementB">
								大陆公民持有的本人有效二代身份证； 拍摄时确保身份证<text class="font_style1">边框完整，字体清晰，亮度均匀</text>。
							</view>
						</view>
				</view>
			</view>
		    <view class="third_block">
		    	<button class="sureChange" @click="submitForm" type="default">提交</button>
		    </view>
		</view>
		
		<view class="cu-modal" v-bind:class="{ show: showDialogModal }">
		  <view class="cu-dialog">
		    <view class="cu-bar bg-white justify-end">
		      <view class="content">提示</view>
		    </view>
		    <view class="padding-xl">
		      您的实名认证已提交！请等待审核
		    </view>
		    <view class="cu-bar bg-white justify-end">
		      <view class="action">
		        <button class="cu-btn line-green text-green" @click="enterModel">确定</button>
		      </view>
		    </view>
		  </view>
		</view>
		
	</view>
</template>

<script>
	import base_url from '@/common/config.js';
	export default {
	    name: "realAuthentication",
		components: {
		},
		data(){
			return {
				loginData:{},
				villageData:{
					streetCode:'',
					streetName: '',
					villageCode: '',
					villageName: '请选择村'
				},
				password1:'',
				password2:'',
				errorTips:'',
				errorTipsShow:false,
				editForm:{
					name:'',
					identity:'',
					front:'',
					reverse:'',
					areaCode:'',
					areaName:'',
					streetCode:'',
					streetName:'',
					villageCode:'',
					villageName:'',
					password:'',
				},
				//单文件上传路径
				uploadApiUrl: base_url + '/commonality/v1/qiNiuYunUpload/singleFileUpload',
				//身份证正面图片
				idCardImg1: '../../static/mine/img-sfz1.png',
				//身份证背面图片
				idCardImg2: '../../static/mine/img-sfz2.png',
				//当前错误类型
				currError: '',
				//提示窗是否显示
				showDialogModal: false,
				//来源页面
				fromPage: ''
			}
		},
		onLoad( option ) {
			if( option.page != undefined ){
				this.fromPage = option.page
			}
			this.getloginData()
			//获取当前实名认证信息
			this.getAuthData();
		},
		onShow(){
             this.getloginData()
		},
		mounted(){

		},
		methods:{
			getloginData() {
				const initData =  uni.getStorageSync('loginData')
				this.loginData = JSON.parse(initData)
				this.villageData =   this.$store.state.villageData
			},
			//选择所在村
			selectVillage(){
				uni.navigateTo({
					url:'/pages/home/village'
				})
			},
			//提交表单
			submitForm(){
				let areaCode = this.loginData.areaCode;
				let areaName = '韶山市';
				if( areaCode == '' || areaCode.length < 1  ){
					areaCode = '430382000000';
				}
				this.editForm.areaCode = areaCode;
				this.editForm.areaName = areaName;
				this.editForm.streetName = this.villageData.streetName;
				this.editForm.streetCode = this.villageData.streetCode;
				this.editForm.villageCode = this.villageData.villageCode;
				this.editForm.villageName = this.villageData.villageName;
				if( this.villageData.villageCode == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请选择所属乡村';
					this.currError = 'villageName';
					return false;
				}
				if( this.editForm.name == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请输入姓名';
					this.currError = 'name';
					return false;
				}
				if( this.editForm.identity == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请输入身份证号码';
					this.currError = 'identity';
					return false;
				}
				var checkIdCard = this.checkIdCard( this.editForm.identity);
				if( !checkIdCard ){
					this.errorTipsShow = true;
					this.errorTips = '请输入正确的身份证号码';
					this.currError = 'identity';
					return false;
				}
				if( this.password1 == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请输入密码';
					this.currError = 'password1';
					return false;
				}
				var checkPassword1 = this.checkPassword( this.password1 );
				if( !checkPassword1 ){
					this.errorTipsShow = true;
					this.errorTips = '请输入8至20数字或字母的密码';
					this.currError = 'password1';
					return false;
				}
				if( this.password2 == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请输入确认密码';
					this.currError = 'password2';
					return false;
				}
				if( this.password1 != this.password2 ){
					this.errorTipsShow = true;
					this.errorTips = '两次密码输入不一致';
					this.currError = 'password2';
					return false;
				}
				this.editForm.password = this.password1;
				if( this.editForm.front == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请上传身份证正面';
					this.currError = 'front';
					return false;
				}
				if( this.editForm.reverse == '' ){
					this.errorTipsShow = true;
					this.errorTips = '请上传身份证反面';
					this.currError = 'reverse';
					return false;
				}
				
				//去除错误提示
				this.currError = '';
				this.errorTipsShow = false;
				this.errorTips = '';
				
				//提交实名认证申请
				var params = {
					member_id: this.loginData.memberId,
					m_token_id: this.loginData.token_id,
					...this.editForm
				};
				this.applyAuthentication( params );
				
			},
			enterModel(){
				this.showDialogModal = '';
				this.$store.commit('SET_REFRESH_COMPONENT', this.fromPage );
				//返回上一个页面
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},200);
			},
			//提交实名认证申请
			async applyAuthentication( param ){
				let result = await this.$api.applyAuthentication( param );
				if( result.code == '0' && result.status == 'success' ){
					this.showDialogModal = 'show';
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
				}				
			},
			//验证姓名输入
			inputNameBlur(e){
				if( e.detail.value != '' && this.currError == 'name' ){
					//去除错误提示
					this.currError = '';
					this.errorTipsShow = false;
					this.errorTips = '';
				}
			},
			//身份证输入
			inputIdentityBlur(e){
				var checkIdCard = this.checkIdCard( e.detail.value );
				if( e.detail.value != '' && this.currError == 'identity' && checkIdCard ){
					//去除错误提示
					this.currError = '';
					this.errorTipsShow = false;
					this.errorTips = '';
				}
			},
			//验证密码
			checkPassword( password ){
				var reg = /^[A-Za-z0-9]{8,20}$/;
				if(reg.test( password ) === false){
					return false;
				}
				return true;
			},
			//身份证校验
			checkIdCard( card ){
				//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
				var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
				if(reg.test(card) === false){
					return false;
				}
				return true;
			},
			//获取实名认证信息
			async getAuthData(){
				let param = {
					member_id: this.loginData.memberId,
					m_token_id: this.loginData.token_id
				};
				let result = await this.$api.getAuthInfo( param );
				if( result.code == '0' && result.status == 'success' ){
					this.editForm = result.data[0];
					this.villageData.streetCode = this.editForm.streetCode;
					this.villageData.streetName = this.editForm.streetName;
					this.villageData.villageCode = this.editForm.streetCode;
					this.villageData.villageName = this.editForm.villageName;
					console.log( this.editForm );
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
				}
			},
			//上传身份证
			uploadIdCard( type ){
				
				let that = this;
				let cardType = type;
				//选择图片
				uni.chooseImage({
					count:1,
					sizeType: "original",
					success(res){
						 if (res.tempFilePaths.length > 0) {
							 let filePath = res.tempFilePaths[0];
							 //上传图片
							 uni.uploadFile({
								 url: that.uploadApiUrl,
								 filePath: filePath,
								 name:'file',
								 formData: {
									 type: 1
								 },
								 header:{"Content-Type": "multipart/form-data"},
								 success:(result) => {
									 var res = JSON.parse( result.data );
									 if( res.code == '0' && res.status == 'success' ){
										 if( cardType == 1 ){
											 that.editForm.front = res.data[0];
											 that.idCardImg1 = res.data[0];
										 }else{
											 that.editForm.reverse = res.data[0];
											 that.idCardImg2 = res.data[0];
										 } 
									 }else{
										 uni.showModal({
											 content: res.msg,
											 showCancel: false  
										 });  
									 }
								 },
								 fail:( err ) => {
									 uni.showModal({  
										 content: err.msg,
										 showCancel: false  
									 });  
								 }
							 });
						 }
					} 
				});
			}
		}
	}	
</script>

<style lang="less" scoped>
.realAuthentication {
	height: 100vh;
	.top {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		// height: 290px;
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		background-color: #00D09F;
		// height: 60px;
		.bg_bank {
			background-color: #00D09F;
			color: #FFFFFF;
		}
	}
	.mine_container {
		margin-top: 60px;
		.marginTop {
			height: var(--status-bar-height);
		}
		.first_block {
			padding: 15px  10px  0;
			.rowItem {
				display: flex;
				flex-direction: column;
				margin-bottom: 15px;
				.rowItemList {
					margin-top: 15px;
					// height: 121px;
					background: #FFFFFF;
					box-shadow: 0px 2px 4px 0px rgba(73, 44, 112, 0.02);
					border-radius: 10px;
					padding:0 15px;
					.lineSpace {
						height: 1px;
						background: #E8E8E8;
					}
					.listItem {
						height: 60px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding:23px  0;
						.listItemTitle {
							height: 14px;
							font-size: 15px;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 14px;
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
							}
							.imgBox {
								
							}
						}
					}

				}
				.errorTip {
					display: flex;
					align-items: center;
					padding: 15px 10px;
					.iconText {
						height: 20px;
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FF4D4F;
						line-height: 20px;
						padding-left: 4px;
					}
				}
			}
		}
	    .second_block {
			padding:0 10px  120px;
			.rowItem {
				height: 311px;
				background: #FFFFFF;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				padding: 15px  0  16px  0;
				.tipT {
					height: 22px;
					font-size: 16px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 22px;
					padding-left: 8px;
				}
				.itemBox {
					margin-top: 16px;
					padding: 0  10px  ;
					.imgBox {
						height: 156px;
						display: flex;
						.imgBoxL {
							background: #F3F8FE;
							width: 48%;
							border-radius: 10px;
							margin-right: 6.5px;
							text-align: center;
							padding-top: 20px;
						}
						.imgBoxR {
							background: #F3F8FE;
							width: 48%;
							border-radius: 10px;
							margin-left: 6.5px;
							text-align: center;
							padding-top: 20px;
						}
						.shotBtnBox {
							padding: 16px 30px;
							.shotBtn {
								width: 100px;
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

				.tipRequirement {
					margin-top: 14px;
					padding: 0  10px;
					.tipRequirementT {
						height: 22px;
						font-size: 16px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #333333;
						line-height: 22px;
					}
					.tipRequirementB {
						margin-top: 10px;
						height: 40px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 20px;
						.font_style1 {
							color: #FF4D4F;
						}
					}
				}
			}
		}
		.third_block {
	    	position: fixed;
			bottom: 0;
	    	left: 0;
	    	right: 0;
	    	padding: 15px 15px 0px;
			z-index: 10;
			background: #F6F7F9;
	    	.sureChange {
	    		height: 47px;
	    		background: #00D09F;
	    		border-radius: 5px;
	    		font-size: 18px;
	    		font-family: PingFangSC-Regular, PingFang SC;
	    		font-weight: 400;
	    		color: #FFFFFF;
	    		line-height: 47px;
				margin-bottom: 50px;
	    	}
	    }
	
	}
}
</style>

<template>
	<view class="memberFamily">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">成员管理</block></cu-custom>
	<!-- 	<view class="top">
			 <cu-custom class="bg_bank" :isBack="true"><block slot="backText">返回</block><block slot="content">成员管理</block></cu-custom>
		</view>	 -->
		<view class="memberFamily_container">
			<view class="memberFamilyBox cu-list menu-avatar">
                  <view class="itemBox cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in familyMemberList" :key="index"
				  @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					  <view class="memberFamilyItem">
					  	<view class="memberFamilyInfo">
					  		<view class="imgBox">
					  			<image style="width: 48px;height: 48px;" src="../../static/family/titleImg.png" mode=""></image>
					  		</view>
					  		<view class="memberFamilyName">
					  			{{item.name}}
					  		</view>
					  	</view>
					  	<view class="memberFamily_btn" v-bind:class="{master: item.isHousehold == '1' }" :data-ismaster="item.isHousehold" :data-id="index" :data-mid="item.memberId" @tap="selectedMember" data-target="DialogModal1">
					  		{{item.relation}}
					  	</view>
						<view class="move">
							<view class="bg-red" :data-name="item.name" :data-mid="item.memberId"  @tap="removeMember" data-target="DialogModal2">删除</view>
						</view>
					  </view>
                  	
                  </view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="cu-bar bg-white justify-end"> -->
				<view class="mainTitle">
					请选择您与户主的关系
				</view>
				<view class="cu-bar justify-end">
					<view class="content">如未显示在以下选项可选其他</view>
				</view>
				<view class="padding-xs selectBox">
		              <view class="grid col-3 padding-sm">
		              	<view v-for="(item,index) in checkbox" class="padding-xs selectItem" :key="index">
		              		<button class="buttomItem" :data-title="item.name" :class="item.checked?'bgChecked':'bgUnChecked'" @tap="ChooseCheckbox"
		              		 :data-value="item.value" :data-name="item.name" :data-id="index"> {{item.name}}
		              			<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
		              		</button>
							<view class="cornerMarker" v-if="item.checked">
								<image style="width: 16px; height: 14px" src="../../static/family/cornerMarker.png" mode=""></image>
							</view>
		              	</view>
		              </view>
				</view>
				<view class="cu-bar bg-white btnBox">
					<view class="btn cancelBox" style="width: 50%; height: 48px;">
						<button class="cu-btn cancel" @tap="cancelCheckbox">取消</button>
					</view>
					<view class="btn sureBox" style="width: 50%;height: 48px;">
						<button class="cu-btn sure" @tap="submitChange">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 删除二次确认模块 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="cu-bar bg-white justify-end"> -->
				<!-- <view class="cu-bar justify-end">
				</view> -->
				<view class="padding-xl selectBox1">
		            确定要删除<text class="font_style1">{{removeMemberName}}</text> 吗？
				</view>
				<view class="cu-bar bg-white btnBox">
					<view class="btn cancelBox" style="width: 50%; height: 48px;">
						<button class="cu-btn cancel" @tap="cancelRemove">取消</button>
					</view>
					<view class="btn sureBox" style="width: 50%;height: 48px;">
						<button class="cu-btn sure" @tap="enterRemove">确定</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
	    name: "memberFamily",
		components: {
		},
		data(){
			return {
				modalName: null,
				listTouchStart: 0,
				isHouseholdConfig:{ '1': '户主', '2':'配偶', '3':'子女', '4':'父母', '5':'孙子孙女', '6':'祖父母', '7':'兄弟姐妹', '8':'女婿儿媳', '9':'其他' },
				familyMemberList:[],
				currentSeleted:{
					index:'',
					memberId:'',
					type:'',
					name:''
				},
				checkbox: [{
					value: 2,
					name: '配偶',
					checked: false,
					hot: false,
				}, {
					value: 3,
					name: '子女',
					checked: true,
					hot: false,
				}, {
					value: 4,
					name: '父母',
					checked: false,
					hot: false,
				}, {
					value: 5,
					name: '孙子孙女',
					checked: false,
					hot: false,
				},
				{
					value: 6,
					name: '祖父母',
					checked: false,
					hot: false,
				},
				{
					value: 7,
					name: '兄弟姐妹',
					checked: false,
					hot: false,
				},
				{
					value: 8,
					name: '女婿儿媳',
					checked: false,
					hot: false,
				},
				{
					value: 9,
					name: '其他',
					checked: false,
					hot: false,
				},
				],
				checkItem:{},
				cancelData:{},
				removeMemberName:''
			}
		},
		onShow() {
			this.getloginData();
		},
		onLoad() {
			this.getloginData();
			//拉取成员列表
			this.getFamilyMemberInfo();
		},
		methods:{
			getloginData() {
				const userInfo =  uni.getStorageSync('loginData');
				this.userInfo = JSON.parse(userInfo);
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			//取消删除成员
			cancelRemove(){
				this.modalName = null;
				this.removeMemberName = '';
			},
			//确定删除成员
			enterRemove(row) {
				this.cancelData = row
				const rowDataId = row.id
				const rowData = row
				console.log('删除')
				console.log( this.listData )
				this.listData.forEach((item,index) => {
					if(item.id === rowDataId) {
						this.listData.splice(index,1);
					}
				})
			},
			//选中当前要设置的成员
			selectedMember(e) {
				
				let index = e.currentTarget.dataset.id;
				let mid = e.currentTarget.dataset.mid;
				let ismaster = e.currentTarget.dataset.ismaster;
				//如果选中的是户主则无法操作
				if( ismaster == '1' ){
					return false;
				}
				//判定是否为自己
				console.log( this.userInfo )
				if( this.userInfo.memberId != mid ){
					uni.showModal({
						 content: '无法操作!只能修改自己的关系',
						 showCancel: false  
					});  
					return false;
				}

				console.log('选中的用户id');
				console.log( mid );
				
				this.currentSeleted.index = index;
				this.currentSeleted.memberId = mid;
				
				this.modalName = e.currentTarget.dataset.target;
			},
			//删除家庭成员
			removeMember(e) {
			   let mid = e.currentTarget.dataset.mid;
			   // this.removeMemberName = e.currentTarget.dataset.name;
			   setTimeout(() => {
				   const  cancelData =  this.cancelData
				   this.modalName = e.currentTarget.dataset.target
			   });
			   this.updateRemoveMember( mid );
			},
			//取消关系选择
			cancelCheckbox(e) {
				this.currentSeleted.index = '';
				this.currentSeleted.memberId = '';
				this.currentSeleted.type = '';
				this.currentSeleted.name = '';
				this.modalName = null;
			},
			//提交选中的关系
			submitChange(){
				var relation = this.currentSeleted.name;
				var index = this.currentSeleted.index;
				console.log( '选中索引:' + index);
				console.log( this.familyMemberList );
				//修改页面数据 
				this.familyMemberList[index].relation = relation;
				this.updateHouseType( this.currentSeleted.memberId, this.currentSeleted.type );
			},
			ChooseCheckbox(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				let name = e.currentTarget.dataset.name;
				
				this.currentSeleted.type = values;
				this.currentSeleted.name = name;
				
				console.log( this.currentSeleted );
				
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						if( items[i].checked === true) {
							this.checkItem = items[i]
							items.forEach((item ,index) => {
								if (index !== i){
									items[index].checked = false
								}
							})
						}
						break
					}
				}
			},
			popup() {
				uni.navigateTo({
					url: '/pages/family/popup'
				});
			},
			//获取家庭成员
			async getFamilyMemberInfo(){
			
				const paramForm = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id
				}
				let result = await this.$api.getFamilyMember(paramForm);
				//家庭成员信息
				console.log('家庭成员信息:');
				console.log( result.data );
				this.familyMemberList = result.data;
				for( var k in this.familyMemberList ){
					var household = this.familyMemberList[k].isHousehold;
					if( this.isHouseholdConfig.hasOwnProperty( household ) ){
						this.familyMemberList[k].relation = this.isHouseholdConfig[household];
					}else{
						this.familyMemberList[k].relation = '其他';
					}
				}
			},
			//提交关系修改
			async updateHouseType( mid, type ){
				const paramForm = {
					member_id: mid,
					m_token_id: this.userInfo.token_id,
					type: type
				}
				let result = await this.$api.setHouseType(paramForm);
				if( result.code == '0' && result.status == 'success' ){
					console.log( result );
					this.modalName = null;
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
					this.modalName = null;
				}
			},
			//提交关系修改
			async updateRemoveMember( mid ){
				const paramForm = {
					member_id: this.userInfo.memberId,
					m_token_id: this.userInfo.token_id,
					editMemberId: mid
				}
				let result = await this.$api.removeHouse(paramForm);
				if( result.code == '0' && result.status == 'success' ){
					console.log( result );
					this.modalName = null;
				}else{
					uni.showModal({
						 content: result.msg,
						 showCancel: false  
					});  
					this.modalName = null;
				}
			}
		}
	}	
</script>

<style lang="less" scoped>
.memberFamily {
	height: 100vh;
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

	.memberFamily_container {
		.cu-list.menu-avatar>.cu-item {
			justify-content: flex-start;
		}
		.memberFamilyBox {
			// margin-top: 60px;
			.memberFamilyItem {
				// width: 375px;
				width: 100%;
				height: 56px;
				background: #FFFFFF;
				margin-bottom: 1px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:4px 15px 4px 16px;
				.memberFamilyInfo {
					display: flex;
					align-items: center;
					.imgBox {
					}
					.memberFamilyName {
						// width: 54px;
						padding-left: 16px;
						height: 25px;
						font-size: 18px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 25px;
					}
				}
				.memberFamily_btn {
					width: 62px;
					height: 26px;
					line-height: 24px;
					background: #E8E8E8;
					border-radius: 13px;
					font-weight: 400;
					text-align: center;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
				}
				.memberFamily_btn.main {
					background: #FFFFFF;
					border: 1px solid #00D09F;
					color: #00D09F;
					
				}
				.memberFamily_btn.unit {
					border: 1px solid #00D09F;
					background: #00D09F;
					color: #FFFFFF;
				}
				.master{
					border:1px solid #00D09F;
					background: #FFFFFF;
					color:#00D09F;
				}
			}
		}
	}
    
	.cu-list>.cu-item .move {
		width: 60px;
	}
	.cu-list>.cu-item.move-cur {
	    transform: translateX(-60px);
	}
	.cu-modal {
		.cu-dialog {
			width: 306px;
			.mainTitle {
				margin-top: 32px;
				height: 24px;
				font-size: 17px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 24px;
			}
			.selectBox {
				.bgChecked {
					width: 85px;
					height: 35px;
					background: #F1FCFA;
					border-radius: 5px;
					border: 1px solid #00D09F;
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #00D09F;
					line-height: 35px;
				}
				.bgUnChecked {
					width: 85px;
					height: 35px;
					background: #FFFFFF;
					border-radius: 5px;
					border: 1px solid #E8E8E8;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5D5D5D;
					line-height: 35px;
				} 
				.selectItem {
					position: relative;
					.cornerMarker {
						position: absolute;
						bottom: 0;
						right: 5px;
					}
				}
			}
			.selectBox1 {
				font-size: 17px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #030303;
				line-height: 24px;
			    .font_style1 {
					color: #00D09F;
				}
			}
			.cu-bar .content {
				width: 100%;
			}
			.btnBox {
				.btn {
					text-align: center;
					height: 48px;
					line-height: 48px;
					border: 1px solid  #D8D8D8;
					border-bottom: none;
				}
				.cancelBox {
					border-right: none;
				}
				.cancel {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5D5D5D;
					background: none;
				}
				.sure {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #00D09F;
					background: none;
				}
			}
		}
	}


}
</style>

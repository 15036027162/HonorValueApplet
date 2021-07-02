<template>
	<view class="popup">
		<cu-custom bgColor="initBg" :isBack="true"><block slot="backText">返回</block><block slot="content">测试</block></cu-custom>
		<view class="secondBox">
		       <button @click="open">打开弹窗</button>
		       <button @tap="showModal" data-target="DialogModal1">打开弹窗</button>
		       <uni-popup ref="popup" type="dialog">
		           <uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		       </uni-popup>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入验证码</view>
				<!-- 	<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view> -->
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<input placeholder="请输入验证码" name="input"></input>
						<button class='cu-btn bg-green shadow'>获取验证码</button>
					</view>
				</view>
				<view class="cu-bar bg-white btnBox">
					<view class="action" style="width: 50%;">
						<button class="cu-btn cancel solid-left" @tap="hideModal">取消</button>
					</view>
					<view class="action" style="width: 50%;">
						<button class="cu-btn sure margin-left solid-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
	// import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	// import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	// import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		components: {
			uniPopup,
			uniPopupDialog
				// uniPopupMessage,
				// uniPopupDialog,
				// uniPopupShare
		},
		data(){
			return {
				modalName: null,
			}
		},
		methods:{
			open() {
			        this.$refs.popup.open()
			    },
			    /**
			     * 点击取消按钮触发
			     * @param {Object} done
			     */
			close() {
			        // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
			        // ...
			        this.$refs.popup.close()
			    },
			    /**
			     * 点击确认按钮触发
			     * @param {Object} done
			     * @param {Object} value
			     */
			confirm(value) {
			        // 输入框的值
			        console.log(value)
			        // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
			        // ...
			        this.$refs.popup.close()
			    },
			// colorUi
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style>
</style>

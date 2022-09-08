<template>
	  <view class="itmenavbar">
		<image v-if="isShowLeftIcon" @click="onClickLeft" class="backimg" src="../static/img/nav_icon_leftarrow.png"
			mode="widthFix"></image>
		<!-- <text>{{title}}</text> -->
	</view>

</template>

<script>
	export default {
		name: "ItemNavBar", //顶部标题栏
		components: {},
		props: {
			title: {
				type: String,
				default: "Title",
			},
			isShowLeftIcon: {
				default: true,
				type: Boolean
			},
			st: {
				default: 2,
				type: Number
			}
		},

		data() {
			return {

			};
		},
		methods: {
			onClickLeft() {
				// console.log('bbbbbbbbbbbbbbbb',this.st)
				if (this.st == 1) {
					uni.redirectTo({
						url: `./credit`
					})

				}else if(this.st == 3){
					uni.switchTab({
						url: `../index/index`
					})
				}else if(this.st == 4){
					uni.redirectTo({
						url: `../../loan/applyConfirm`
					})
				}else if(this.st == 5){
					uni.redirectTo({
						url: `./loanApply`
					})
				}else if(this.st == 6){
					uni.redirectTo({
						url: `./loanList`
					})
				}else if(this.st == 7){
					uni.switchTab({
						url: `../index/index`
					})
				}else if(this.st == 8){
					uni.redirectTo({
						url: `./cardManage`
					})
				}else if(this.st == 9){
					uni.switchTab({
						url: `../personalCenter`
					})
				} else {
					uni.navigateBack()
				}


			}
		}
	};
</script>

<style scoped lang="scss">
	.itmenavbar {
		width: 100%;
		height: 90rpx;
		background: rgb(242, 242, 242);
		color: #FF661A;
		font-size: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.backimg {
		width: 32rpx;
		position: absolute;
		left: 30rpx;
	}
</style>

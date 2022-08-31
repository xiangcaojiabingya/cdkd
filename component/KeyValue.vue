<template name="key-value">
	<!-- 左右文字显示 -->
	<view class="content">
		<view :class="['border-view',isShowLine?'':'none-border']">
			<text class="title-text">{{title}}</text>
			<text class="content-text">{{content}}</text>

		</view>

	</view>
</template>

<script>
	export default {
		name: "key-value",
		props: {
			title: {
				type: String,
				default: "标题"
			},
			content: {
				type: String,
				default: ""
			},
			isShowLine: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 0 30rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 32rpx;
		color: #333333;
		font-weight: 500;
		background-color: white;
	}

	.border-view {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		border-bottom: 2rpx solid #e6e6e6;
	}

	.title-text {
		min-width: 200rpx;
	}

	.content-text {
		width: 100%;
		margin-left: 55rpx;
		overflow-wrap: break-word;
		word-break: break-all;
		word-wrap: break-word;
		// text-align: end;
	}

	.none-border {
		border: none;
	}
</style>

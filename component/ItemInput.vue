<template>
	<view class="item-input">
		<!-- 输入框 -->
		<text class="title-text">{{title}}</text>
		<input :placeholder="placeholder" :value="value" @input="$emit('input',  $event.target.value)" />
	</view>

</template>

<script>
	export default {
		name: "ItemInput",
		props: {
			title: {
				type: String,
				default: "标题"
			},
			value: String,
			placeholder: {
				type: String,
				default: "请输入"
			}
		}
	}
</script>

<style scoped>
	.item-input {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 24rpx;
		box-sizing: border-box;
	}
	.title-text{
		min-width: 160rpx;
	}

	input {
		width: 100%;
		text-align: end;
	}
</style>

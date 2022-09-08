<template>
	<view class="content-view">
		<view class="item-picker">
			<view class="title-view">
				<text>{{title}}</text>
				<image src="../static/img/star_icon.png" mode="widthFix"></image>
			</view>

			<view class="right-view">
				<picker @change="bindPickerChange" :value="index" :range="list" :range-key="rangeKey">
					<text class="place-txt" v-if="isShow">{{placeholder}}</text>
					<view v-else class="uni-input">{{list[index][rangeKey]}}</view>
				</picker>
				<image src="../static/img/to_right_icon.png" mode="widthFix" class="to-right-img"></image>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		name: "ItemPicker",
		data() {
			return {
				list: this.array,
				index: 0,
				isShow: true
			}
		},
		props: {
			title: {
				type: String,
				default: "标题"
			},
			array: {
				type: Array,
				default: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}]
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			rangeKey: {
				type: String,
				default: "name"
			}
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
				this.isShow = false
				this.$emit("branchChange",this.index)
			},
		}
	}
</script>

<style scoped>
	.content-view {
		width: 100%;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background-color: white;
	}

	.item-picker {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 40rpx 0rpx;
		border-bottom: 2rpx solid #e6e6e6;
	}

	.right-view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.place-txt {
		color: #8F8F94;
	}

	.title-view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	image {
		width: 14rpx;
		margin-left: 5rpx;
	}

	.to-right-img {
		width: 16rpx;
		margin-left: 10rpx;
	}
</style>

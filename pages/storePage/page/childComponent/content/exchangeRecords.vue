<template>
		<tab-level>
			<view slot="top" class="item">
				<view>兌換時間</view>
				<view>{{timerS}}</view>
			</view>
			<view slot="bottom" class="item">
				<view>兌換訂單號</view>
				<view>{{numberS}}</view>
			</view>
		</tab-level>
</template>

<script>
	import tabLevel from "../common/leftAndRightLevel/index.vue"
	export default {
		components:{
			tabLevel
		},
		props:{
			numberS:{
				type:String,
				default:""
			},
			timerS:{
				type:String,
				default:""
			}
		}
	}
</script>

<style scoped>
	.item{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

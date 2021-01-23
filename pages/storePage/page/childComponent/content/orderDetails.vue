<template>
	<view class="home">
		<view class="userInfoTitle">支付信息</view>
		<tab-level>
			<view slot="top" :class="seat==='left'?'left':'centers'">
				<view>商品總額 ：</view>
				<view>1560積分</view>
			</view>
			<view slot="bottom" :class="seat==='left'?'left':'centers'">
				<view>支付方式 ：</view>
				<view>積分兌換</view>
			</view>
		</tab-level>
	</view>
</template>

<script>
	import tabLevel from "../common/leftAndRightLevel/index.vue"
	export default {
		components:{
			tabLevel
		},
		props:{
			seat:{
				type:String,
				default:""
			}
		}
	}
</script>


<style scoped>
	.home{
		margin-top: 20upx;
		background-color: #FFFFFF;
	}
	.userInfoTitle{
		height: 90upx;
		line-height: 90upx;
		border-bottom: 4upx solid  #e5e5e5;
		padding-left: 20upx;
	}
	.left{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #b7b8bd;
	}
	.centers{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #b7b8bd;
	}
</style>

<template>
	<view class="page">
		<view v-if="cpnObject.cpnType === '1'" class="box">
			<view>{{cpnObject.cpnName}}</view>
			<view>已售<span class="wordsColor">{{cpnObject.cpnCount}}</span></view>
			<view>滿 <span class="wordsColor">{{cpnObject.cpnMinCharge}}</span>減<span  class="wordsColor">{{cpnObject.cpnReduction}}</span></view>
		</view>
		<view v-if="cpnObject.cpnType === '2'" class="box">
			<view>{{cpnObject.cpnName}}</view>
			<view>已售<span  class="wordsColor">{{cpnObject.cpnCount}}</span></view>
			<view>打<span  class="wordsColor">{{data.cpnDiscount/10}}</span>折</view>
		</view>
		<view v-if="cpnObject.cpnType === '3'" class="bottomBox">
			<view>{{cpnObject.cpnName}}</view>
			<view>已售<span  class="wordsColor">{{cpnObject.cpnCount}}</span></view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			cpnObject:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.page{
		width: 100%;
		height: 164upx;
		padding-left: 20upx;
	}
	.box{
		width: 100%;
	}
	.box > uni-view:nth-of-type(2){
		margin-top: 10upx;
	}
	.box > uni-view:nth-of-type(3){
		margin-top: 10upx;
	}
	.bottomBox > uni-view:nth-of-type(2){
		margin-top: 10upx;
	}
	.wordsColor{
		color: #f4303c;
		font-weight: bold;
	}
</style>

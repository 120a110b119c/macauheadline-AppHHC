<template>
	<view class="page">
		<!-- 未过审 -->
		<view class="boxWrap">
			<view v-for="(item,index) in untriedData" :key="index" class="dataList">
				<view class="dataContent">
					<view class="boxHeader">
						<image :src="item.DatPic?item.DatPic:'../../static/lift/noData.png'" mode="aspectFill"></image>
					</view>
					<view class="boxContent">
						<view>{{item.DatTitleFT}}</view>
						<view class="btns">
							<u-button class="btn" shape="circle" size="mini" type="error" :ripple="true"  @click="deleteModel(item.DatId)">刪除</u-button>
							<u-button class="btn" shape="circle" size="mini" type="error" :ripple="true" @click="goEditDat(index)">再編輯</u-button>
						</view>
						<!-- <view class="numberList">
							<view class="images">
								<image src="../../../static/media/mediaPersonal/heart.jpg" mode="widthFix"></image>
							</view>
							<view>0</view>
							<view class="images">
								<image src="../../../static/media/mediaPersonal/eye.jpg" mode="widthFix"></image>
							</view>
							<view>0</view>
							<view class="images">
								<image src="../../../static/media/mediaPersonal/text.jpg" mode="widthFix"></image>
							</view>
							<view>0</view>
						</view> -->
					</view>
				</view>
				<view class="unitriedWhy">
					退審原因:<text v-html="item.DatRejectReason" style="color: #fa3534;"></text>
				</view>
				<view class="dataTime">{{item.DatPDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['untriedData'],
		data(){
			return{
				dataList:[]
			}
		},
		created() {
			
		},
		methods:{
			deleteModel(datId){
				this.$emit("deleteNews",3,'是否確定刪除當前新聞?',datId)
			},
			goEditDat(index){
				let datId = this.untriedData[index].DatId;
				uni.navigateTo({
					url:'./mediaWebView?datId='+ datId
				})
			}
		}
	}
</script>

<style scoped>
	.dataList{
		width: 100%;
		background-color: #fff;
		padding: 10upx 20upx;
		box-sizing: border-box;
		border-bottom: #f2f2f2 1px solid;
	}
	.dataContent{
		display: flex;
		
	}
	.page{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
	.boxWrap{
		display: flex;
		flex-direction: column;
		width: 100%;
		/* margin-right: 2%; */
	}
	.boxHeader {
		width: 30%;
		height: 250upx;
		background-color: #D2D2D2;
		border-radius: 10upx;
	}
	/* .page .boxWrap:nth-child(2n){
		margin-right: 0;
	} */
	.dataTime{
			text-align: right;
			margin-top: 10upx;
	}
	.numberList {
		position: absolute;
		bottom: 10upx;
		left: 10upx;
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
	}
	.numberList>.images{
		width: 40upx;
		margin-right: 4upx;
		margin-left: 6upx;
	}
	.numberList>.images:nth-of-type(1){
		width: 36upx;
	}
	uni-image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.boxContent {
		position: relative;
		flex: 1;
		padding-left:2%;
		box-sizing: border-box;
		background-color: #fff;
	}
	.unitriedWhy{
		margin: 10upx 0;
		
	}
	.boxContent .btns {
		position: absolute;
		bottom: 10upx;
		right: 0;
	}
	.boxContent .btns .btn{
		margin: 0 5upx;
	}
	
</style>
	
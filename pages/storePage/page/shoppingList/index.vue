<template>
	<view class="page" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
		<checkbox-group class="block" @change="changeCheckbox">
			<view class="shoppingList">
				<view v-for="(item,index) in shoppingList" class="items" :key="index">
					<view>
						<image :src="item.cmdPic"></image>
					</view>
					<view class="text">{{item.cmdName}}</view>
				</view>
			</view>
		</checkbox-group>
		<u-empty img-width='170' margin-top='-270' :show='shoppingList.length ==0' text="當前無數據" mode="list"></u-empty>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				business_list:[{
					name:"123",
					value:0
				},{
					name:"321",
					value:1
				}],
				swiperheight: 500,
				shoppingList: [{
					image: "../../../../static/index/timg.jpg",
					text: '第一张图片'
				}, {
					image: "../../../../static/index/timg.jpg",
					text: '第二张图片'
				}, {
					image: "../../../../static/index/timg.jpg",
					text: '第三张图片'
				}, {
					image: "../../../../static/index/timg.jpg",
					text: '第四张图片'
				}]
			}
		},
		onLoad() {
			const item = this.$getStorage("data");
			this.FormHomedata = item;
			this.getPageHeight(); //获取滚动页面高度
		},
		created() {
			const usrId = this.FormHomedata.usrId;
			this.$Httpps
				.sttp({
					"action": "getcmddata",
					"page":1,
					"usrId":usrId,
					"cmdStatu":1
				})
				.then(res => {
					const DataList = eval(res.data);
					this.shoppingList = DataList.data;
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
			});
		},
		methods: {
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight;
						this.swiperheight = height;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.clssisfy{
		position: fixed;
		
	}
	.page {
		position: relative;
		width: 100%;
		height: 100%;
	}

	image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.shoppingList {
		width: 100%;
		padding: 0 20upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin-top: 20upx;
	}

	.shoppingList>.items {
		position: relative;
		width: 32%;
		height: 300upx;
		text-align: center;
		padding: 10upx;
		box-sizing: border-box;
		border: 1px solid #eee;
	}

	.shoppingList>.items:nth-of-type(n+4) {
		margin-top: 20upx;
	}

	.shoppingList>.items>uni-view:nth-of-type(1) {
		width: 100%;
		height: 220upx;
	}

	.shoppingList>.items>.text {
		height: 60upx;
		line-height: 60upx;
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
</style>

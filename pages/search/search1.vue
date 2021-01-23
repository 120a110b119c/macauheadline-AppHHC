<template>
	<view class="page">
		<scroll-view scroll-y="true" :style="{height: (swiperheight) + 'px',marginTop: 0 }">
		<view v-for="(items,index) in array" :key="index">
			<view v-if="items.DatType === '0'" @click="toDatils(items)">
				<view class="navTitle">
					{{items.DatTitleFT}}
				</view>
				<view class="navBottom">
					<view class="navBottom_tit">
						{{items.DatSourceFT}}
					</view>
					<view class="navBottom_times">
						{{items.DatShowDate}}
					</view>
				</view>
			</view>
			<view v-if="items.DatType === '1'"  @click="toDatils(items)">
				<view class="navContentTwo">
					<view class="navTitleTwo">
						{{items.DatTitleFT}}
					</view>
					<view class="navImgTwo">
						<img :src="items.DatPic" alt="">
					</view>
				</view>
				<view class="navBottom">
					<view class="navBottom_tit">
						{{items.DatSourceFT}}
					</view>
					<view class="navBottom_times">
						{{items.DatShowDate}}
					</view>
				</view>
			</view>
		</view>
		<u-empty img-width='170' margin-top='-270' :show='array.length ==0' text="当前无数据" mode="list"></u-empty>
		</scroll-view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				mdlId: 0,
				array: [],
				arrayLiat:[],
				swiperheight: 0
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack();
			}
		},
		// 监听搜索框文本变化
		onNavigationBarSearchInputChanged(e) {
			if(this.name){
				e.text = this.name;
			}
		},
		// 监听点击搜索按钮事件
		onNavigationBarSearchInputConfirmed(e) {
			var me = this;
			var keyword = encodeURIComponent(e.text);
			this.$Httpps
				.sttp({
					"action": "getsearch",
					"page": 1,
					"keyword": keyword
				})
				.then(res => {
					me.array = res.data.data;
				}).catch(err => {
					console.log(err);
			});
		},
		onLoad(options) {
			this.getPageHeight();
			if(options.Name){
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewSearchInputText(options.Name);
			}
			this.name = options.Name;
			this.getContent(); //获取列表的数据
		},
		methods: {
			toDatils(item){
				console.log(item,'111');
				uni.navigateTo({
					url: '../getdatadetail/getdatadetail?item=' + item.DatId
				});
			},
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(100)
						this.swiperheight = height;
					}
				});
			},
			textChange() {
				console.log(1);
			},
			getContent() {
				var name = encodeURIComponent(this.name);
				console.log(name,'name110');
				if(name){
					this.$Httpps
					.sttp({
						"action": "getsearch",
						"page": 1,
						"keyword": name
					})
					.then(res => {
						this.array = res.data.data;
					}).catch(err => {
						console.log(err);
					});
				}
				
			}
		}
	}
</script>

<style scoped>
	.page{
		width: 100%;
		padding: 0 18upx;
		box-sizing: border-box;
	}
	.navTitle {
		text-align: justify;
		text-justify: inter-word;
		color: #000;
		font-size: 32upx;
		line-height: 40upx;
		margin-top: 20upx;
	}

	.navBottom {
		display: flex;
		margin-bottom: 20upx;
	}

	.navBottom_tit {
		text-align: left;
		font-size: 24upx;
		color: #adadad;
	}
	
	.navBottom_times {
		text-align: left;
		margin-left: 10px;
		font-size: 24upx;
		color: #adadad;
	}

	.navBottom_icon {
		flex: 6;
		text-align: right;
	}

	.navBottom_icon_con {
		float: right;
		margin-right: 20upx;
		width: 56upx;
		height: 28upx;
		margin-top: 8upx;
		line-height: 28upx;
		text-align: center;
		font-size: 22upx;
		border: 1px solid #C0C0C0;
		border-radius: 28upx;
	}
	
	.navContentTwo{
		width: 100%;
		height: 260upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.navTitleTwo{
		margin-top: 20upx;
		text-align: justify;
		text-justify: inter-word;
		display: flex;
		flex-wrap: wrap;
		color: #000;
		font-size: 32upx;
		line-height: 40upx;
		width: 320upx;
		height: 260upx;
	}
	.navImgTwo{
		width: 320upx;
		height: 260upx;
	}
	.navImgTwo>img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}
</style>

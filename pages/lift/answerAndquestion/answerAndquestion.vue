<template>
	<view>
		<view class="header">
			<view class="left" @click="navToLift">
				<span class="iconfont">&#xe670;</span>
			</view>
			<view class="header-tit">
				問答
			</view>
			<view class="right">
				<span class="iconfont">&#xe61e;</span>
			</view>
		</view>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list">
						<answer-content></answer-content>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>
<script>
	import swiperTabHead from "../../../components/swiperTabHead.vue";
	import answerContent from "./common/answerContent.vue";
	export default {
		components: {
			swiperTabHead,
			answerContent
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			})
		},
		data() {
			return {
				tabIndex: 0,
				swiperheight: 500,
				newslist: [{
						title: "11"
					},
					{
						title: "22"
					},
					{
						title: "33"
					},
					{
						title: "44"
					},
					{
						title: "55"
					},
					{
						title: "66"
					}
				],
				tabBars: [{
						MdlName: "关注",
						id: "guanzhu"
					},
					{
						MdlName: "推荐",
						id: "tuijian"
					},
					{
						MdlName: "体育",
						id: "tiyu"
					},
					{
						MdlName: "热点",
						id: "redian"
					},
					{
						MdlName: "财经",
						id: "caijing"
					},
					{
						MdlName: "娱乐",
						id: "yule"
					},
				]
			}

		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
				console.log(1);
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
				console.log(2);
			},
			navToLift() {
				uni.switchTab({
					url: "../lift",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>
<style scoped>
	.header {
		width: 100%;
		height: 100upx;
		padding: 20upx 0;
		box-sizing: border-box;
	}

	.left,
	.right {
		width: 15%;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
		text-align: right;
	}

	.left>span {
		font-size: 40upx;
		margin-left: 20upx;
	}

	.right>span {
		font-size: 70upx;
		margin-right: 20upx;
	}

	.header-tit {
		float: left;
		width: 70%;
		text-align: center;
	}
</style>

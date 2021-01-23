<template>
	<view class="page">
		<scroll-view scroll-y="true" :scroll-with-animation="true" style="height:100%">
			<!-- 轮播图 start -->
				<index-swiper :swiperList="swiperList"></index-swiper>
			<!-- 轮播图 end -->
			
			<!-- 分类 start -->
			<Panel-hot title="" titleShow="false">
				<view class="servic-wapper">
					<view class="servic-introduction" v-for="(v,i) in classify" :key="v.id">
						<image :src="v.imageSrc" class="servic_images"></image>
						<view class="servic-name">
							{{v.name}}
						</view>
					</view>
				</view>
			</Panel-hot>
			<!-- 分类 end -->
			
			<!-- 热门店铺 start -->
			<Panel-hot title="热门店铺" titleShow="true">
				<view class="area-poster" v-for="(v,i) in hotShop" :key="v.id">
					<view class="poster-wapper">
						<image :src="v.imageSrc" class="poster"></image>
					</view>
				</view>
			</Panel-hot>
			<!-- 热门店铺 end -->
			
			<!-- 商家平台 start -->
			<Panel-hot title="商家平台" titleShow="true">
				<view class="shop-wapper">
					<view class="shop-introduction">
						<span class="iconfont shop-images">&#xe698;</span>
						<view class="shop-name">
							煤氣石油
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe732;</span>
						<view class="shop-name">
							事務所
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe646;</span>
						<view class="shop-name">
							保險證券
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe687;</span>
						<view class="shop-name">
							教育培訓
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe62c;</span>
						<view class="shop-name">
							花點綠植
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe621;</span>
						<view class="shop-name">
							婚紗攝影
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe60a;</span>
						<view class="shop-name">
							旅行社
						</view>
					</view>
					<view class="shop-introduction">
						<span class="iconfont">&#xe6c1;</span>
						<view class="shop-name">
							洗衣乾洗
						</view>
					</view>
				</view>
			</Panel-hot>
			<!-- 商家平台 end -->
		</scroll-view>
	</view>
</template>

<script>
	import PanelHot from "../../../components/Panel_hot.vue"
	import indexSwiper from "../../../components/swiper.vue" 
	export default {
		data() {
			return {
				swiperList: [{
						sid: 0,
						src: '自定义src0',
						img: 'https://s2.luckincoffeecdn.com/luckywebrm/images/pimg/about/contact.png'
					},
					{
						sid: 1,
						src: '自定义src1',
						img: 'https://s2.luckincoffeecdn.com/luckywebrm/images/pimg/about/model.png'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: 'https://s2.luckincoffeecdn.com/luckywebrm/images/index/cooperation/part5_picture2.png'
					}
				],
				//分类数据
				classify:[{
					id: 1,
					imageSrc: "../../../static/theme-hot/spiderman.png",
					name:"買賣租賃"
				}, {
					id: 2,
					imageSrc: "../../../static/theme-hot/spiderman.png",
					name:"家政保潔"
				}, {
					id: 3,
					imageSrc: "../../../static/theme-hot/spiderman.png",
					name:'招聘信息'
				}, {
					id: 4,
					imageSrc: "../../../static/theme-hot/spiderman.png",
					name:"影視影院"
				},],
				//热门店铺
				hotShop:[{
					id: 1,
					imageSrc: "../../../static/theme-hot/spiderman.png"
				}, {
					id: 2,
					imageSrc: "../../../static/theme-hot/spiderman.png"
				}, {
					id: 3,
					imageSrc: "../../../static/theme-hot/spiderman.png"
				}, {
					id: 4,
					imageSrc: "../../../static/theme-hot/spiderman.png"
				}]
			}
		},
		components:{
			PanelHot,
			indexSwiper
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	@import url("classify.css");
	/* icon引入样式 end */
</style>

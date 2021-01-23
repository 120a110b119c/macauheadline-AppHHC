<template>
	<view class="wrap">
			<!-- 轮播图 start -->
			<index-swiper :swiperList="swiperList" v-show="swipterShow"></index-swiper>
			<!-- 轮播图 end -->
			<view class="content">
				<view class="content_header">
					<view class="content_header_tit">
						{{data.SevTitle}}
					</view>
					<view class="content_header_time">
						{{data.SevIDate}}
					</view>
				</view>
				<view class="detail" v-html="data.SevContent" style="font-size: 30upx;margin-top: 30upx;"></view>
				<view class="content_list">
					<view class="list">
						<view class="content_list_item">
							<view class="iconText">
								<view class="icon iconfont icon-ren"></view>
								<view class="text">聯繫人</view>
							</view>
							<view class="people">{{data.SevContact}}</view>
						</view>
						<view class="content_list_item" @click="toMap(data)">
							<view class="iconText">
								<view class="icon iconfont icon-dingwei"></view>
								<view class="text">地址</view>
							</view>
							<view class="address">{{data.SevAddr}}</view>
						</view>
						<view class="content_list_item">
							<view class="iconText">
								<view class="icon iconfont icon-dianhua1"></view>
								<view class="text">電話</view>
							</view>
							<view class="phone">{{data.SevTel}}</view>
						</view>
					</view>
					<view class="content_phone" @tap="goTelphone()">
						<view class="icon iconfont icon-dianhua1"></view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import Map from '@/utils/js/openMap.js'
	import indexSwiper from "../../../components/swiper.vue" //轮播图组件
	export default {
		components: {
			indexSwiper
		},
		data() {
			return {
				SevId: '',
				swiperList: [],
				data: {},
				swipterShow: false
			}
		},
		onLoad(options) {
			this.SevId = options.SevId;
			console.log('options.SevId',options.SevId)
			this.getItemDetail();
		},
		methods: {
			toMap(data) {
				console.log(data,'data110');
				if(data.SevPositionX !="" && data.SevPositionY !=""){
					let longitude = Number(data.SevPositionX);
					let latitude  = Number(data.SevPositionY);
					Map.openMap(latitude,longitude, data.SevAddr, 'wgs84')
				}else {
					return
				}
			},
			goPhone(val) {
				var phone = val.SevTel;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					},
				})
			},
			goTelphone() {
				var datas = this.data;
				var phone = datas.SevTel;
				console.log(phone, 'phone');
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					},
				})
			},
			getItemDetail() {
				var SevId = encodeURIComponent(this.SevId);
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl,
					data: {
						"action": 'getservicedetail',
						"sevId": SevId,
					},
					dataType: 'json',
					success: (res) => {
						this.data = res.data;
						
						uni.setNavigationBarTitle({
							title: this.data.SevTitle
						})
						
						
						if (res.data.SevFocus1 != "") {
							this.swiperList.push({
								DatPic: SevFocus1
							});
						}
						if (res.data.SevFocus2 != "") {
							this.swiperList.push({
								DatPic: SevFocus2
							});
						}
						if (res.data.SevFocus3 != "") {
							this.swiperList.push({
								DatPic: SevFocus3
							});
						}
						if (this.swiperList.length >= 2) {
							this.swipterShow = true
						}
					},
					fail: (error) => {
						console.log(error)
					}
				});
			}
		}

	}
</script>

<style scoped>
	@import url("contentDetail.css");
</style>

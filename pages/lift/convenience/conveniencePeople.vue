<template>
	<view class="page">
		<scroll-view scroll-y="true" :style="{height:swiperheight + 'px',marginTop: 0 }">
			<!-- 轮播图 start -->
			<index-swiper :swiperList="swiperList"></index-swiper>
			<!-- 轮播图 end -->
			<Panel-hot title="交通/通讯"></Panel-hot>
			<view class="wrap">
				<view class="wrap-item" @tap="f_openBM('邊境口岸實時資訊','http://www.fsm.gov.mo/psp/pspmonitor/mobile/?from=singlemessage')">
						<view class="imgs">
							<image src="../../../static/lift/j1.png" mode=""></image>
						</view>
						<view class="text">
							邊境口岸實時資訊
						</view>
				</view>
				<view class="wrap-item" @tap="f_openBM('巴士路綫查詢','http://www.dsat.gov.mo/bus/site/busstopwaiting.aspx?lang=tc');">
					<view class="imgs">
						<image src="../../../static/lift/j2.png" mode=""></image>
					</view>
					<view class="text">
						巴士路綫查詢
					</view>
				</view>
				<view class="wrap-item" @tap="f_openBM('即時路面情況','http://www.dsat.gov.mo/realtime_core.aspx?lang=tc');">
					<view class="imgs">
						<image src="../../../static/lift/j3.png" mode=""></image>
					</view>
					<view class="text">
						即時路面情況
					</view>
				</view>
				<view class="wrap-item" @tap="f_openBM('停車場車位資訊','http://www.dsat.gov.mo/dsat/carpark_realtime_core.aspx');">
					<view class="imgs">
						<image src="../../../static/lift/j4.png" mode=""></image>
					</view>
					<view class="text">
						停車場車位資訊
					</view>
				</view>
				<view class="wrap-item" @tap="f_openBM('澳門航空航班查詢','http://www.macau-airport.com:8090/mobile/mo/');">
					<view class="imgs">
						<image src="../../../static/lift/j5.png" mode=""></image>
					</view>
					<view class="text">
						澳門航空航班查詢
					</view>
				</view>
				<view class="wrap-item" @tap="f_openBM('綫上挪車','http://www.dsat.gov.mo/vehcileRemove.aspx');">
					<view class="imgs">
						<image src="../../../static/lift/j5.png" mode=""></image>
					</view>
					<view class="text">
						綫上挪車
					</view>
				</view>
				<view class="wrap-item" @tap="f_openPanel('最全澳門通訊錄','page_telphone')">
					<view class="imgs">
						<image src="../../../static/lift/r3.png" mode=""></image>
					</view>
					<view class="text">
						最全澳門通訊錄
					</view>
				</view>
		</view>
		<Panel-hot title="網上預約辦事"></Panel-hot>
		<view class="wrap">
			<view class="wrap-item" @tap="f_openBM('登記公證服務預約','https://eservice.dsaj.gov.mo/dsajservice/ServiceBooking/pages/index?lang=zh')">
				<view class="imgs">
					<image src="../../../static/lift/v1.png" mode=""></image>
				</view>
				<view class="text">
					登記公證服務預約
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('結婚登記服務預約','https://eservice.dsaj.gov.mo/dsajservice/MarriageRegistrationWeb/pages/index.htm?lang=zh')">
				<view class="imgs">
					<image src="../../../static/lift/v2.png" mode=""></image>
				</view>
				<view class="text">
					結婚登記服務預約
				</view>
			</view>
			<view class="wrap-item"  @tap="f_openBM('司法援助服務預約','https://eservice.dsaj.gov.mo/dsajservice/ServiceBookingAJ/pages/index?lang=zh')">
				<view class="imgs">
					<image src="../../../static/lift/v3.png" mode=""></image>
				</view>
				<view class="text">
					司法援助服務預約
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('交通事務局網上預約','http://www.dsat.gov.mo/dsat/subpage.aspx?a_id=1443513128')">
				<view class="imgs">
					<image src="../../../static/lift/v4.png" mode=""></image>
				</view>
				<view class="text">
					交通事務局網上預約
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('網上繳納罰款','https://app.iacm.gov.mo/rgepwebpay');">
				<view class="imgs">
					<image src="../../../static/lift/v5.png" mode=""></image>
				</view>
				<view class="text">
					網上繳納罰款
				</view>
			</view>
		</view>	
		<Panel-hot title="服務輪候查詢"></Panel-hot>
		<view class="wrap">
			<view class="wrap-item" @tap="f_openBM('服務輪候情況查詢','http://www.fsm.gov.mo/psp/smgquerysystem/listQue.aspx')">
				<view class="imgs">
					<image src="../../../static/lift/r1.png" mode=""></image>
				</view>
				<view class="text">
					服務輪候情況查詢
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('登記公證輪候查詢','https://eservice.dsaj.gov.mo/dsajservice/DSAJQueue/pages/index.htm?lang=zh')">
				<view class="imgs">
					<image src="../../../static/lift/r2.png" mode=""></image>
				</view>
				<view class="text">
					登記公證輪候查詢
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('驗車中心輪候查詢','http://www.dsat.gov.mo/vb/onlinebooking/quota_cotai');">
				<view class="imgs">
					<image src="../../../static/lift/j3.png" mode=""></image>
				</view>
				<view class="text">
					驗車中心輪候查詢
				</view>
			</view>
			<view class="wrap-item" @tap="f_openBM('公證書簽屬排期','http://eservice.dsaj.gov.mo/dsajservice/cnqueue/pages/index?lang=zh');">
				<view class="imgs">
					<image src="../../../static/lift/r4.png" mode=""></image>
				</view>
				<view class="text">
					公證書簽屬排期
				</view>
			</view>
			<view class="wrap-item"  @tap="f_openBM('登記公證進度查詢','https://eservice.dsaj.gov.mo/dsajservice/piweb/pages/index.htm?lang=zh')">
				<view class="imgs">
					<image src="../../../static/lift/r5.png" mode=""></image>
				</view>
				<view class="text">
					登記公證進度查詢
				</view>
			</view>
		</view>	
		<view class="bottomAdress">
			©澳門頭條 macauheadline.com
		</view>	
		</scroll-view>
		<custom-cover></custom-cover>
	</view>
	
</template>

<script>
	import indexSwiper from "../../../components/swiper.vue" //轮播图组件
	import PanelHot from "../../../components/Panel_hot.vue"
	export default{
		components: {
			indexSwiper,
			PanelHot
		},
		data() {
			return{
				//轮播图数据
				swiperList: [],
				swiperheight:0,
			}
		},
		onLoad(){
			this.getlunbotu();//獲取輪播圖數據
			this.getPageHeight(); //获取滚动页面高度
		},
		methods:{
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(100)
						this.swiperheight = height;
					}
				});
			},
			f_openBM(title,val){
				 uni.navigateTo({
				 	url:"../UrlDeatils/UrlDeatils?val="+val+"&title="+title
				 })
			},
			getlunbotu(){
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl+"?action=getpicnews",
					dataType: 'json',
					method: 'POST', //请求
					header:{
					      'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						const data = eval(res.data).data;
						this.swiperList = data;
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
	@import url("./conveniencePeople.css");
</style>

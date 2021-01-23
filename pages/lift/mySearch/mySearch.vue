<template>
	<view class="page">
		<load-refresh ref="loadRefresh" :pageNo="currPage" :totalPageNo="totalPage" :isRefresh="true" :refreshTime="800"
		 @loadMore="loadMore" @refresh="refresh" :message="parentMsg">
			<view slot="content-list">
				<block v-if="listStyle==='style1'" v-for="(items,index) in newsList" :key="index">
					<view class="listContent">
						<view class="listThree_header" @tap="toListItem(items)">
							<view class="listThree_title" style="width: 80%;">
								{{items.SevTitle}}
							</view>
							<view class="listThree_area" style="width: 20%;">
								{{items.SevArea}}
							</view>
						</view>
						<view class="listThree_content">
							<view class="listThree_content_left" @tap="toListItem(items)">
								<view>
									<image :src="items.SevImage!=''?items.SevImage:'../../../static/lift/noData.png'" mode=""></image>
								</view>
								<view class="content_info">
									<view class="info_SevContact">{{items.SevContact}}</view>
									<view class="info_SevCompany">{{items.SevCompany}}</view>
								</view>
							</view>
							<view class="content_phone" @tap="goPhone(items)">
								<view class="icon iconfont icon-dianhua1"></view>
							</view>
						</view>
						<view class="SevAddr" @click="toGuide(items.SevAddr)"  @tap="toListItem(items)">
							<view class="icon iconfont icon-dingwei"></view>
							<view class="address">{{items.SevAddr}}</view>
						</view>
					</view>
				</block>
				<block v-if="listStyle==='style2'" v-for="(items,index) in newsList" :key="index">
					<view class="listContent" @tap="toListItem(items)">
						<view class="listTwo_two_content">
							<view>
								<image :src="items.SevImage!=''?items.SevImage:'../../../static/lift/noData.png'" mode=""></image>
							</view>
							<view class="listTwo_two_info">
								<view class="title">
									{{items.SevTitle}}
								</view>
								<view class="SevContact">{{items.SevContact}}</view>
								<view class="SevCompany">{{items.SevCompany}}</view>
							</view>
						</view>
						<view class="SevAddr" @click="toGuide(items.SevAddr)"  @tap="toListItem(items)">
							<view class="icon iconfont icon-dingwei"></view>
							<view class="address">{{items.SevAddr}}</view>
						</view>
					</view>
				</block>
				<block v-if="listStyle==='style3'" v-for="(items,index) in newsList" :key="index">
					<view class="listContent">
						<view class="listThree_three_info">
							<view @tap="toListItem(items)">
								<image style="width: 220upx;border-radius: 20upx;" :src="items.SevImage!=''?items.SevImage:'../../../static/lift/noData.png'" mode="widthFix"></image>
							</view>
							<view class="listTwo_two_info" style="width: 60%;" @tap="toListItem(items)">
								<view class="title">
									{{items.SevTitle}}
								</view>
								<view class="SevContact">{{items.SevContact}}</view>
								<view class="SevCompany">{{items.SevCompany}}</view>
							</view>
							<view class="content_phone" @tap="goPhone(items)">
								<view class="icon iconfont icon-dianhua1"></view>
							</view>
						</view>
						<view class="SevAddr" @click="toGuide(items.SevAddr)"  @tap="toListItem(items)">
							<view class="icon iconfont icon-dingwei"></view>
							<view class="address">{{items.SevAddr}}</view>
						</view>
					</view>
				</block>
			</view>
		</load-refresh>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		data() {
			return {
				parentMsg: 'father',
				name: '',
				textList: '',
				textShow: true,
				StpId: '',
				newsList: [], //获取到的数据列表
				swiperheight: 0,
				listStyle: 0,
				currPage: 1,
				totalPage: 99, // 模拟总页数
				first: true,
				addressUrl:"../../../static/lift/noData.jpg"
			}
		},
		components: {
			loadRefresh
		},
		onNavigationBarSearchInputConfirmed(e) {
			var me = this;
			this.textList = e.text;
			var keyword = encodeURIComponent(e.text);
			this.$Httpps
				.sttp({
					"action": "getservice",
					"key": keyword,
					"stpId": 0,
					"page": 1
				})
				.then(res => {
					if (res.data.msg == "没有更多数据" || res.data.msg == "值不能为 null。参数名: String") {
						this.newsList = [];
						this.textShow = false;
					} else {
						this.newsList = res.data.data;
						uni.showToast({
							title: '对应的数据已加载到列表',
							duration: 2000,
							icon: 'none',
						});
					}
				}).catch(err => {
					console.log(err);
				});
		},
		onLoad(options) {
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			if (options.StpId) {
				this.StpId = options.StpId;
			} else {
				webView.setTitleNViewSearchInputText(options.Name);
			}
			// #endif
			this.name = options.Name;
			this.listStyle = options.StpStyle
			this.getNewsList();
			this.getPageHeight(); //获取滚动页面高度
		},
		methods: {
			toGuide(item) {
				uni.getLocation({
					success: res => {
						uni.openLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							scale: 18
						})
					}
				})
			},
			refresh() {
				this.currPage = 1;
				this.getNewsList();
			},
			loadMore() {
				this.currPage = this.currPage + 1;
				this.getNewsList();
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(88)
						this.swiperheight = height;
					}
				});
			},
			onNavigationBarButtonTap(e) {
				if (e.index == 0) {
					uni.navigateBack()
				}
			},
			// 监听搜索框文本变化
			onNavigationBarSearchInputChanged(e) {
				e.text = this.name;
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
			toListItem(items) {
				uni.navigateTo({
					url:'../../storePage/page/couponPage/index?SevId=' + items.SevId
				})
			},
			getContent() {
				var name = encodeURIComponent(this.name);
				if (name) {
					this.$Httpps
						.sttp({
							"action": "getsearch",
							"page": 1,
							"keyword": name
						})
						.then(res => {
							this.newsList = res.data.data;
						}).catch(err => {
							console.log(err);
					});
				}

			},
			getNewsList() {
				let _this = this;
				let StpId = this.StpId;
				this.$Httpps
					.sttp({
						"action": 'getservice',
						"stpId": StpId,
						"page": this.currPage
					})
					.then(res => {
						if(res.data.result == 'suc'){
							this.first = true;
							this.newsList = this.newsList.concat(res.data.data);
						}else {
							if(res.data.msg == '没有更多数据'){
								this.totalPage = this.currPage-1;
								this.$refs.loadRefresh.loadOver()
								return;
							}
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	@import url("mySearch.css");
</style>

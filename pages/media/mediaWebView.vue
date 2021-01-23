<template>
	<view class="page">
		<header-title :title='"新闻编辑"' :backText="'我的'" @toBack='toMe' :iconfont="'&#xe728;'"></header-title>
		<!-- <web-view :webview-styles="webviewStyles" class="webview"  :src='webViewUrl +"/editmmm.aspx?colEmpId=" + usrId' ref="webview" @onPostMessage="handlePostMessage">
		</web-view> -->
	</view>
</template>

<script>
	import headerTitle  from '@/components/header-title/index.vue'
	export default {
		components:{
			headerTitle
		},
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				usrId:0,
				statusBarHeight:70
			}
		},
		onLoad(params) {
			console.log(params)
			this.usrId = uni.getStorageSync("data").usrId;
			console.log(this.usrId)
			console.log('打开自媒体模块',this.webViewUrl,'?')
			// #ifdef APP-PLUS
			var that = this;
			that.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			var link = this.webViewUrl + "/editmmm.aspx?colEmpId=" + this.usrId;
			console.log("链接的路径",link)
			if(params.datId){
				link = link + '&id='+ params.datId
			}
			console.log(link)
			var w = plus.webview.create(link, 'id', {
				top: uni.getSystemInfoSync().statusBarHeight + 44 ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				//因为设置top之后 webview的高度依然不变会往下移 底部会被遮住  所以设置一下高度
				height: uni.getSystemInfoSync().windowHeight - 44 - uni.getSystemInfoSync().statusBarHeight,
			}, {
				preload: 'preload webview'
			}); // 可直接通过以下方法获取preload值
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(w); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			// #endif
		},
		methods:{
			handlePostMessage: function(data) {
				// 获取网页的参数
				console.log("得到参数", data.detail);
			},
			toMe(){
				uni.navigateTo({
					url:"./mediaPersonal"
				})
			},
		},
	}
</script>

<style scoped>
	.webview{
		top: 140upx;
	}
	
</style>

<template>
	<view>
		<view class="chat-header">
			问吧
		</view>
		<view class="chat-content">
			<view class="contentList">
				 <load-refresh ref="loadRefresh" :heightReduce="10" :backgroundCover="'#F3F5F5'" :pageNo="currPage" :totalPageNo="totalPage"
				  :isRefresh="true" :refreshTime="800" @loadMore="loadMore(index)" @refresh="refresh"
				  chat="chat">
					<view slot="content-list">
						<view class="circleWrap">
							<view class="circle" @click="myQuestion()">
								我要提问
							</view>
						</view>
						<view class="searchWrap" @tap="toSearch()">
							<view class="searchBtn">
								<view class="icon iconfont icon-sousuokuang"></view>
								<view>搜索</view>
							</view>
						</view>
						<view class="contentList-item" @tap="toChatDetail(1)">
							<view class="item-tit">问吧旅游指南</view>
							<view class="userWrap">
								<image src="../lift/image/noData.png" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
								<view style="margin-left: 10upx;font-size: 30upx;letter-spacing: 1upx;">问吧服务生</view>
							</view>
							<view class="contentText" style="margin-top: 30upx;">
								欢迎光临问吧。这里是一个开放的问答社区，你可以在此讨论与珠海相关的有意思的话题。你可以在此讨论与珠海相关的有意思的话题。
							</view>
							<view class="discussWrap">
								<view class="discussLeft">
									<view class="discussLeftContent">
										<view>6</view>
										<view>赞同</view>
										<view class="icon iconfont icon-dianzan1" style="margin-top: 2upx;font-size: 38upx;"></view>
									</view>
									<view class="fare">
										<view>分享</view>
										<view class="icon iconfont icon-fenxiang_2" style="margin-top: 6upx;"></view>
									</view>
								</view>
								<view class="discussData" style="color: #9d9d9d;">09-09</view>
							</view>
						</view>
						<template v-for="(item,index) in array">
							<chat-wrap :itemList="item" @click.native="toChatDetail(2)"></chat-wrap>
						</template>
					</view>
				</load-refresh>
			</view>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import chatWrap from './component/chatWrap.vue'
	export default {
		components: {
			loadRefresh,
			chatWrap
		},
		data() {
			return {
				list: [], // 数据集
				currPage: 1, // 当前页码
				totalPage: 1, // 总页数
				dataList: [{
						title: "我要提问"
					},
					{
						title: "我要提问"
					},
					{
						title: "我要提问"
					}
				],
				array:[]
			}
		},
		onLoad() {
			this.getSearchData()
		},
		methods: {
			myQuestion(){
				uni.navigateTo({
					url:"./question"
				})
			},
			toChatDetail(onePage){
				if(onePage == 1){
					uni.navigateTo({
						url:"./homePage"
					})
				}
			},
			getSearchData(){
				this.requestPost({
						"action": "getbbs",
						"page": this.currPage,
						"key": '',
						"userId": ""
					})
					.then(res => {
						uni.hideLoading()
						if(res.data.result == 'suc'){
							this.array = res.data.data;
							console.log('this.array',this.array)
						}
					}).catch(err => {
						console.log(err);
				});
			},
			toSearch(){
				uni.navigateTo({
					url:"./search"
				})
			},
			loadMore() {
				this.currPage  = this.currPage + 1;
				this.getSearchData()
			},
			// 下拉刷新数据列表
			refresh() {
				this.currPage  =  1;
				this.getSearchData()
			}
		}
	}
</script>

<style scoped>
	/* 标题 start */
	.chat-header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		text-align: center;
		height: 180upx;
		padding-bottom: 30upx;
		font-size: 40upx;
		font-weight: bold;
		border-bottom: 2upx sold #000000;
		box-sizing: border-box;
	}

	/* 标题 end */

	.chat-content {
		position: absolute;
		top: 180upx;
		left: 0;
	}

	.searchWrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 120upx;
		background: rgba(250, 250, 250);
		border-top: 2upx solid #d0cece;
		border-bottom: 2upx solid #d0cece;
	}

	.searchBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95%;
		border: 4upx solid #d0cece;
		height: 90upx;
		border-radius: 40upx;
		font-size: 34upx;
		letter-spacing: 2upx;
		color: #000000;
		font-weight: bold;
	}

	.searchBtn .icon-sousuokuang {
		font-size: 46upx;
		color: #000000;
		font-weight: bold;
		margin-right: 20upx;
	}

	.contentList-item {
		margin-bottom: 30upx;
	}

	.contentList-item:last-child {
		margin-bottom: 0;
	}

	.contentList-item {
		padding: 30upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.contentList-item>.item-tit {
		font-size: 40upx;
		letter-spacing: 2upx;
		margin-bottom: 30upx;
	}







	.userWrap {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.contentText {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-top: 30upx;
		width: 100%;
		height: 84upx;
		font-size: 32upx;
	}

	/* 我要提问 start*/
	.circleWrap {
		position: fixed;
		right: 10upx;
		padding: 18upx;
		bottom: 20upx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #f79393;
	}

	.circleWrap>.circle {
		width: 100%;
		height: 100%;
		padding: 16upx;
		padding-top: 10upx;
		border-radius: 50%;
		font-size: 24upx;
		text-align: center;
		background-color: #e94134;
	}

	/* 我要提问 end*/
	.discussWrap {
		width: 100%;
		margin-top: 60upx;
		display: flex;
		justify-content: space-between;
	}

	.discussLeft,
	.discussLeftContent,
	.fare {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28upx;
		color: #9d9d9d;
	}

	.discussLeftContent {
		margin-right: 20upx;
	}

	.discussLeftContent uni-view,
	.fare uni-view {
		margin-right: 8upx;
	}
</style>

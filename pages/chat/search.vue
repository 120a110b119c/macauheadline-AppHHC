<template>
	<view class="page">
		<u-navbar is-fixed title="" back-icon-color="#4f4f4f" back-icon-size='42upx'>
			<view style="width: 100%;">
				<u-search @search="searchFun" @custom='searchFun' placeholder="搜索新聞" :focus='true' :clearabled="true" v-model="searchKey"></u-search>
			</view>
		</u-navbar>
		<template v-for="(item,index) in array">
			<chat-wrap :itemList="item"></chat-wrap>
		</template>
		<u-empty img-width='170' margin-top='270' :show='noData' text="当前无数据" mode="list"></u-empty>
		<u-divider style="margin-bottom: 20upx;" v-show="noMoreData">沒有更多了</u-divider>
	</view>
</template>

<script>
	import chatWrap from './component/chatWrap.vue'
	export default {
		components: {
			chatWrap
		},
		data() {
			return {
				searchKey: '',
				page:1,
				noMoreData:false,
				noData:false,
				array:[]
			}
		},
		onReachBottom() {
			this.page  = this.page + 1;
			this.getSearchData()
		},
		methods: {
			searchFun() {
				this.page = 1;
				this.noData = false;
				this.noMoreData = false;
				this.array = []
				this.getSearchData()
			},
			loadMore() {
				console.log('loadMore')
				// 请求新数据完成后调用 组件内loadOver()方法
				// 注意更新当前页码 currPage
				this.$refs.loadRefresh.loadOver()
			},
			// 下拉刷新数据列表
			refresh() {
				console.log('refresh')
			},
			getSearchData(){
				if(this.noMoreData){
					return 
				}
				uni.showLoading({
					title:"搜索中..."
				})
				this.requestPost({
						"action": "getbbs",
						"page": this.page,
						"key": this.searchKey,
						"userId": ""
					})
					.then(res => {
						uni.hideLoading()
						if(res.data.result == 'suc'){
							this.array = res.data.data;
							console.log('this.array',this.array)
						}
						else{
							if(res.data.msg == '没有更多数据' && this.page >1){
								this.noMoreData = true;
							}else{
								console.log('無數據')
								this.noData = true
							}
						}
					}).catch(err => {
						console.log(err);
				});
			}
		}
	}
</script>

<style>
</style>

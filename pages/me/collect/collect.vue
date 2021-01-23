<template>
	<view class="page">
		<header-title :title='"收藏"' @toBack='toMe()' :backText="'我的'" :iconfont='"&#xe728;"'></header-title>
		<load-refresh v-show="collectList.length != 0" ref="loadRefresh" :heightReduce="10" :backgroundCover="'#F3F5F5'" :pageNo="collectPage" :totalPageNo="totalPage"
		 :isRefresh="true" :refreshTime="800" @loadMore="loadMore()" @refresh="refresh" style="margin-bottom: '20upx';" :collect="collect">
			<view slot="content-list" style="position: relative;">
				<view v-for="(item,index) in collectList">
					<news-item :options="item" :numbers="false" :showIndex='index'  @clickItem="tabClick(item)"></news-item>
				</view>
			</view>
		</load-refresh>
		<u-empty img-width='170' margin-top='120' :show='collectList.length == 0' text="您暫時沒有收藏的數據" mode="list"></u-empty>
	</view>
</template>

<script>
	import  headerTitle  from '../../../components/header-title/index.vue'
	import newsItem from "../components/newsItem.vue"
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default{
		data(){
			return{
				collect:"collect",
				collectList:[],
				collectPage:1,
				totalPage:999
			}
		},
		components:{
			headerTitle,
			newsItem,
			loadRefresh
		},
		onLoad(){
			this.collectList = []
			this.getCollectData()
		},
		methods:{
			toMe(){
				uni.navigateBack()
			},
			tabClick(item){
				uni.navigateTo({
					url: '../../../pages/getdatadetail/getdatadetail?item=' + item.DatId
				});
			},
			refresh(){
				this.collectPage = 1
				this.getCollectData("refresh")
			},
			loadMore(){
				this.collectPage = this.collectPage + 1;
				this.getCollectData()
			},
			getCollectData(value){
				let usrId = uni.getStorageSync("data").usrId
				uni.request({
					url: this.serverUrl,
					data: {
						"action": "getuserfav",
						"usrId":usrId,
						"page":this.collectPage
					},
					dataType: 'json',
					success: (res) => {
						if(res.data.result == 'suc'){
							console.log(res.data,'11')
							if(value == 'refresh'){
								this.collectList = [];
								this.collectPage = 1;
							}
							this.collectList = this.collectList.concat(res.data.data)
							this.$refs.loadRefresh.loadOver()
						}else {
							if(res.data.msg == '没有更多数据'){
								this.totalPage = this.collectPage-1
								console.log(this.totalPage,'222')
								this.$refs.loadRefresh.loadOver()
								return;
							}
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					},
					fail: (error) => {
					}
				});
			},
		}
		
	}
</script>

<style scoped>
.page{
	width: 100%;
	height: 100%;
}
.bgColor{
	width: 100%;
	height: 40upx;
	background-color: #dc5340;
}
.nav{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	background-color: #dc5340;
}
.navContent{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	
}
.threeRightImage{
	height:225upx
}
.navContent>.iconfont{
	color: #fff;
	font-size: 46upx;
}
.navContent>.text{
	color: #fff;
	font-size: 30upx;
}
.navContent>.title{
	width: 86%;
	text-align: center;
	color: #fff;
	font-size: 36upx;
}

.noData{
	width: 100%;
	height: 40upx;
	padding: 40upx 0 ;
	font-size: 32upx;
	text-align: center;
}

</style>

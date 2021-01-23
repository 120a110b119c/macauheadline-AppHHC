<template>
	<view class="page">
		<u-navbar is-fixed  title="" back-icon-color="#4f4f4f" back-icon-size='42upx' >
			<view style="width: 100%;">
				<u-search @search="searchFun" @custom='searchFun'  placeholder="搜索新聞"
				 :focus='true' :clearabled="true" v-model="searchKey"></u-search>
			</view>
		</u-navbar>
		<view class="content" v-if="(array.length ==0) && (!noData)" >
			<view class="historyDiv" v-show="histroyList.length > 0">
				<view class="historyTitle"><text>搜索歷史</text><image class="deleteIcon" @tap='clearHisList' src="@/static/search/deleteIcon.png"></image></view>
				<view class="historyClass">
					<view class="hisItem" v-for="(item,index) in histroyList" @tap='clickItem(item)'> {{item}}</view>
				</view>
			</view>
			<!-- <view class="searchHot">
				<view class="hotTitle">
					<view class="hotOne" @tap='chooseTitle(index)' :class="titleTypeIndex == index?'activeTitle':''" v-for="(item,index) in titleTypeList">
						<view class="">{{item}}</view>
						<text class="redLine" v-show="titleTypeIndex == index"></text>
					</view>
				</view>
				<view class=""></view>
			</view> -->
		</view>
		<view class="haveContent" v-if="array.length !=0 ">
			<view v-for="(items,index) in array" :key="index">
				<view v-if="items.DatType === '0'" @click="toDatils(items)" style="border-bottom: 1px solid #EEE;">
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
				<view v-if="items.DatType === '1'"  @click="toDatils(items)" style="position: relative;border-bottom: 1px solid #EEE;">
					<view class="navContentTwo">
						<view class="navTitleTwo">
							{{items.DatTitleFT}}
						</view>
						<view class="navImgTwo">
							<!-- <img :src="items.DatPic" alt=""> -->
							<image style="width: 100%;height: 100%;border-radius: 20upx;" mode='aspectFill' :src="items.DatPic" alt="">
						</view>
					</view>
					<view class="navBottom" style="position: absolute;bottom: 0;left: 0;">
						<view class="navBottom_tit">
							{{items.DatSourceFT}}
						</view>
						<view class="navBottom_times">
							{{items.DatShowDate}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty img-width='170' margin-top='270' :show='noData' text="当前无数据" mode="list"></u-empty>
		<u-divider style="margin-bottom: 20upx;" v-show="noMoreData">沒有更多了</u-divider>
		
		<u-modal v-model="deleteShow" title="提示" show-cancel-button content="確定清除所有的搜索記錄麼?" @confirm='deleteHistory'></u-modal>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey:"",
				histroyList:[],
				titleTypeList:['推薦','熱搜'],
				titleTypeIndex:0,
				
				name: '',
				mdlId: 0,
				page:1,
				array: [],
				arrayLiat:[],
				swiperheight: 0,
				noData:false,
				noMoreData:false,
				deleteShow:false
			}
		},
		onReachBottom() {
			this.page  = this.page + 1;
			this.getSearchData()
		},
		
		onLoad(options) {
			console.log(options)
			if(options.Name){
				this.searchKey = encodeURIComponent(options.Name);
				this.getSearchData()
			}
			this.histroyList = uni.getStorageSync("searchHistoryList")
			console.log(this.histroyList)
		},
		methods: {
			searchFun(){
				this.page = 1;
				this.noData = false;
				this.noMoreData = false;
				this.array = []
				this.getSearchData()
			},
			clearHisList(){
				this.deleteShow = true;
			},
			//去掉搜索記錄
			deleteHistory(){
				uni.setStorage({
					key:"searchHistoryList",
					data:''
				})
				this.histroyList = []
			},
			clickItem(item){
				this.page = 1;
				this.noData = false;
				this.noMoreData = false;
				this.array = [];
				this.searchKey = item;
				this.getSearchData()
			},
			getSearchData(){
				if(this.noMoreData){
					return 
				}
				if(!(this.histroyList))this.histroyList=[]
				if(!(this.histroyList.includes(this.searchKey))){
					this.histroyList.push(this.searchKey)
					uni.setStorage({
						key:'searchHistoryList',
						data:this.histroyList
					})
				}
				console.log("search")
				uni.showLoading({
					title:"搜索中..."
				})
				this.requestPost({
						"action": "getsearch",
						"page": this.page,
						"keyword": this.searchKey
					})
					.then(res => {
						uni.hideLoading()
						if(res.data.result == 'suc'){
							this.array = [...this.array,...res.data.data]
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
			},
			chooseTitle(index){
				this.titleTypeIndex = index;
			},
			
			
			toDatils(item){
				console.log(item,'111');
				uni.navigateTo({
					url: '../getdatadetail/getdatadetail?item=' + item.DatId
				});
			},
		}
	}
</script>

<style scoped>
	.content{
		width: 750upx;
		background-color: white;
	}
	.historyDiv{
		width: 100%;
		padding: 30upx 30upx;
		font-size: 32upx;
		border-bottom:#dedede 3upx solid ;
	}
	.historyTitle{
		display: flex;
		justify-content: space-between;
	}
	.historyClass{
		display: flex;
		margin-top: 20upx;
		flex-wrap: wrap;
	}
	.historyClass .hisItem{
		background-color: #f4f4f4;
		padding: 12upx 30upx;
		border-radius: 32upx;
		margin: 8upx 14upx;
	}
	.searchHot{
		padding-top:36upx;
		font-size: 32upx;
	}
	.hotTitle{
		display: flex;
	}
	.activeTitle{
		font-size: 36upx;
		color: #f20707;
		font-weight: 500;
	}
	.redLine{
		width:50upx;
		margin-top: 14upx;
		border-bottom: 2px #f20707 solid;
	}
	.hotOne{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:8upx 30upx
	}
	.deleteIcon{
		width: 38upx;
		height: 38upx;
	}
</style>
<style scoped>
	.haveContent{
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
		margin: 20upx 0;
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
		width: 370upx;
		height: 260upx;
	}
	.navImgTwo{
		width: 320upx;
		height: 260upx;
		border-radius: 20upx;
	}
</style>
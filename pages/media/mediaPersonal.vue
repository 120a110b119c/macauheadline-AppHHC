<template>
	<view class="infoContent">
		<view class="infoHead">
			<view class="infoHead_top">
				<view class="jiantou" @click="goBack">
					<view class="icon iconfont icon-zuojiantou"></view>
				</view>
				<view class="textWrap">
					<!-- <view>新聞發佈</view> -->
					<!-- <view>Press Release</view> -->
				</view>
				<view></view>
			</view>
			<view class="infoHead_bottom">
				<view class="bottom_item" style="padding: 6upx 20upx;">
					<view class="icon iconfont icon-editor" style="margin-right: 10upx;"></view>
					<view class="textContent">
						<view @tap='goEditNews' class="news">新聞編輯</view>
						<view class="englishText">
							<view class="circle"></view>
							<view class="newsText">New Editor</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="bottom_item twoTab">
					<view class="icon iconfont icon-RectangleCopy"></view>
					<view class="textContent">
						<view @tap='goodingsPush'>商品發佈</view>
						<view class="englishText">
							<view class="circle"></view>
							<view>Product Release</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="infoHead">
			<view style="display: flex;flex-direction: row;width: 100%;justify-content: space-between;height: 100upx;">
				<view class="icon iconfont icon-zuojiantou" @click="goBack"></view>
				<view class="newEditor">新闻发布</view>
				<view class="newEditor"></view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;justify-content: space-between;height: 100upx;">
				<view></view>
				<view class="submenu" style="margin-left: 200upx;" @tap='goEditNews'>新闻编辑</view>
				<view class="submenu" @tap='goEditNews'>商品发布</view>
			</view>
		</view> -->
		<view class="UserInfo">
			<view class="InfoHeader">
				<view>
					<view class="UserImges">
						<image :src="userImage != ''?userImage:'/static/logo/icon.png'" mode="aspectFill"></image>
					</view>
					<view>
						{{usrMdaName?usrMdaName:'自媒體名稱'}} 
						<br />
						<text style="color: #D80000;">{{usrMdaUpStatu == '1'?'（账号审核中）':''}}</text>
						
					</view>
					<view style="margin-left: 20upx;margin-top: 4upx;" @click="goEditPage">
						<image style="width: 40upx;height: 40upx;" src="/static/me/editMe.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="clockAndNumber" @click="noticMessage">
					<view class="clockImage">
						<image src="../../static/media/mediaPersonal/clock.png" mode=""></image>
					</view>
					<view class="clockNumber">
						0
					</view>
				</view>
			</view>
			<view class="UserDescoration">{{usrMdaDesc?usrMdaDesc:'自媒體簡介'}}</view>
			<view class="NumberList">
				<view>
					<view>關注</view>
					<view>0</view>
				</view>
				<view>
					<view>粉絲</view>
					<view>0</view>
				</view>
				<view>
					<view>點擊量</view>
					<view>0</view>
				</view>
			</view>
		</view>
		<view class="tabList">
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
				 @click="tabClick(index)">
					<view class="wrap">
						<view>{{ item.Number }}</view>
						<view>{{ item.text }}</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
				<view class="list" v-if="tabCurrentIndex === 0">
					<!-- 已发布 -->
					<load-refresh ref="loadRefresh_one" :backgroundCover="'#fff'" :pageNo="currPage" :totalPageNo="totalPage"
					 :isRefresh="true" :refreshTime="800" @loadMore="loadMoreHome" @refresh="refreshHome" v-if='releaseData.length != 0' :media="parentMsg">
						<view slot="content-list">
							<videoListHome :releaseData="releaseData" @changeStatus="showChangeStatu"></videoListHome>
						</view>
					</load-refresh>
					<u-empty img-width='170' margin-top='-100' v-if='releaseData.length == 0' text="當前無數據" mode="list"></u-empty>
				</view>
				<view class="list" v-if="tabCurrentIndex === 1">
					<!-- 审核中 -->
					<load-refresh ref="loadRefresh_two" :backgroundCover="'#fff'" :pageNo="currPageAuditing" :totalPageNo="totalPageAuditing"
					 :isRefresh="true" :refreshTime="800" @loadMore="loadMoreAuditing" @refresh="refreshAuditing"  v-if='AuditingData.length != 0' :media="parentMsg">
						<view slot="content-list">
							<auditingData :AuditingData="AuditingData" @changeStatus="showChangeStatu"></auditingData>
						</view>
					</load-refresh>
					<u-empty img-width='170' margin-top='-100' v-if='AuditingData.length == 0' text="當前無數據" mode="list"></u-empty>
				</view>
				<view class="list" v-if="tabCurrentIndex === 2">
					<!-- 未过审 -->
					<load-refresh ref="loadRefresh_three" :backgroundCover="'#fff'" :pageNo="currPageuntried" :totalPageNo="totalPageuntried"
					 :isRefresh="true" :refreshTime="800" @loadMore="loadMoreuntried" @refresh="refreshuntried"  v-if='untriedData.length != 0'  :media="parentMsg">
						<view slot="content-list">
							<untriedData :untriedData="untriedData" @deleteNews="showDeleteNews"></untriedData>
						</view>
					</load-refresh>
					<u-empty img-width='170' margin-top='-100' v-if='untriedData.length == 0' text="當前無數據" mode="list"></u-empty>
				</view>
				<view class="list" v-if="tabCurrentIndex === 3">
					<!-- 编辑中 -->
					<load-refresh ref="loadRefresh_four" :backgroundCover="'#fff'" :pageNo="currPageEditor" :totalPageNo="totalPageEditor"
					 :isRefresh="true" :refreshTime="800" @loadMore="loadMoreEditor" @refresh="refreshEditor" v-if="editorData.length != 0"  :media="parentMsg">
						<view slot="content-list">
							<editorData :editorData="editorData" @changeStatus="showChangeStatu" @deleteNews="showDeleteNews"></editorData>
						</view>
					</load-refresh>
					<u-empty img-width='170' margin-top='-100' v-if='editorData.length == 0' text="當前無數據" mode="list"></u-empty>
				</view>
				<u-toast ref="msgToast" />
			</scroll-view>
		</view>
		<u-modal v-model="toastModalShow" :content="modalContent" @confirm="goEditPage" :show-cancel-button='true' @cancel="goHome"></u-modal>
		<u-modal v-model="changeShow" :title-style="{color: 'red'}" :content="changeTitle" title="提示" 
			:show-cancel-button='true' @confirm='comfirmChangeStatus'></u-modal>
		<u-modal v-model="deleteShow" :title-style="{color: 'red'}" :content="changeTitle" title="提示"
			:show-cancel-button='true' @confirm='comfirmDeleteStatus'></u-modal>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import {
		isNeedLogin,
		goLogin,
		appendUserIntegral
	} from '@/utils/index.js'
	import videoListHome from './components/ReleaseData' //已发布组件
	import auditingData from './components/auditingData' //已发布组件
	import untriedData from './components/untriedData' //已发布组件
	import editorData from './components/editorData' //已发布组件
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		components: {
			videoListHome,
			editorData,
			auditingData,
			untriedData,
			loadRefresh
		},
		data() {
			return {
				CacheData:{},
				changeShow:false,
				deleteShow:false,
				changeTitle:'',
				changeStatus:'',
				changeIndex:"",
				changeDatId:'',
				parentMsg:"media",
				userImage: "",
				usrMdaName: '',
				usrMdaDesc: '',
				usrMdaUpStatu:0,
				//已发布 start
				currPage: 1,
				totalPage: 99,
				//已发布 end

				//审核中 start
				currPageAuditing: 1,
				totalPageAuditing: 99,
				//审核中 end

				//未过审 start
				currPageuntried: 1,
				totalPageuntried: 99,
				//未过审 end

				//编辑中 start
				currPageEditor: 1,
				totalPageEditor: 99,
				//编辑中 end

				swiperheight: 0,
				tabCurrentIndex: 0,
				navList: [{
						Number: 0,
						text: '已發佈'
					},
					{
						Number: 0,
						text: '審核中'
					},
					{
						Number: 0,
						text: '未過審'
					},
					{
						Number: 0,
						text: '編輯中'
					}
				],
				releaseData: [], //已发布
				AuditingData: [], //审核中
				untriedData: [], //未过审
				editorData: [], //编辑中
				toastModalShow: false,
				modalContent: '您沒有填寫自媒體信息,無法正常使用自媒體端',
				usrInfo:{}
				
			}
		},
		onShow() {
			this.CacheData = this.$getStorage("data");
			console.log(this.CacheData);
			this.getUserInfo();
			this.tabClick(0);
			uni.setStorageSync('stopJump',0);//长按跳转不跳转首页
		},
		onLoad() {
			this.getPageHeight();
			this.requestReleaseData(); //已发布数据
		},
		methods: {
			//回到主页个人
			goHome(){
				uni.switchTab({
					url: '../me/me'
				})
			},
			//修改自媒體新聞狀態
			showChangeStatu(changeIndex,changeStatus,changeTitle,datId){
				this.changeIndex =changeIndex
				this.changeStatus = changeStatus
				this.changeTitle = changeTitle
				this.changeDatId = datId
				this.changeShow = true
			},
			comfirmChangeStatus(){
				this.requestPost({
						"action":"updatemdanews",
						"datId":this.changeDatId,
						"usrId":this.usrInfo.usrId,
						"datStatus":this.changeStatus
					}).then(res => {
						console.log(res)
						if(res.data.result == "suc"){
							this.getUserInfo()
							this.tabClick(this.changeIndex)
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					})
					.catch((error) => {})
				
			},
			//刪除自媒體新聞
			showDeleteNews(changeIndex,changeTitle,datId){
				this.changeIndex =changeIndex
				this.changeTitle = changeTitle
				this.changeDatId = datId
				this.deleteShow = true
			},
			comfirmDeleteStatus(){
				this.requestPost({
						"action":"deletemdanews",
						"datId":this.changeDatId,
						"usrId":this.usrInfo.usrId
					}).then(res => {
						console.log(res)
						if(res.data.result == "suc"){
							this.getUserInfo()
							this.tabClick(this.changeIndex)
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					})
					.catch((error) => {})
			},
			//去编辑页面
			goEditPage() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "./infoFill"
				})
			},
			//去登录页面
			goLogin() {
				goLogin("../me/register/register")
			},
			getUserInfo() {
				const item = this.CacheData;
				this.usrInfo = item;
				const usrId = item.usrId;
				this.$Httpps
					.sttp({
						"action": "mdainfo",
						"usrId": usrId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.userImage = res.data.usrMdaHeadImg;
							this.usrMdaName = res.data.usrMdaName;
							this.usrMdaDesc = res.data.usrMdaDesc;
							this.usrMdaUpStatu = res.data.usrMdaUpStatu
							this.navList[0].Number = res.data.yFBnumber;
							this.navList[1].Number = res.data.dSHnumber;
							this.navList[2].Number = res.data.yTHnumber;
							this.navList[3].Number = res.data.bJZnmber;
							if (!this.usrMdaName) {
								this.toastModalShow = true;
							}
						}
					}).catch(err => {
						console.log(err);
					});
			},
			goBack() {
				uni.switchTab({
					url: '../index/home'
				})
			},
			noticMessage() {
				this.$refs.msgToast.show({
					title: '該功能正在開發中喲!敬請期待',
					type: 'primary',
					icon: false
				})
			},
			goEditNews() {
				uni.navigateTo({
					url: "./mediaWebView"
				})
			},
			goodingsPush(){
				uni.navigateTo({
					url: "../storePage/page/shopRelease/index"
				})
			},
			// 已发布 start
			refreshHome() {
				this.currPage = 1;
				this.requestReleaseData("refresh");
			},
			loadMoreHome() {
				this.currPage = this.currPage + 1;
				this.requestReleaseData();
			},
			requestReleaseData(value) {
				const item =  this.$getStorage("data");
				const usrId = item.usrId;
				this.$Httpps
					.sttp({
						"action": "getmedianews",
						"usrId": usrId,
						"page": this.currPage,
						"datStatus": 1
					})
					.then(res => {
						if(this.currPage == 1){
							this.releaseData =[]
						}
						console.log(res.data,'reshhc');
						if (res.data.result == 'suc') {
							if(value == 'refresh'){
								this.releaseData = [];
								this.currPage = 1;
							}
							this.releaseData = this.releaseData.concat(res.data.data);
						} else {
							if (res.data.msg == '没有更多数据') {
								this.totalPage = this.currPage - 1;
								this.$refs.loadRefresh_one.loadOver();
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			// 已发布 start

			// 审核中 start
			refreshAuditing() {
				this.currPageAuditing = 1;
				this.requestAuditingData("refresh");
			},
			loadMoreAuditing() {
				this.currPageAuditing = this.currPageAuditing + 1;
				this.requestAuditingData();
			},
			requestAuditingData(value) {
				const item = this.CacheData;
				const usrId = item.usrId;
				this.$Httpps
					.sttp({
						"action": "getmedianews",
						"usrId": usrId,
						"page": this.currPageAuditing,
						"datStatus": 2
					})
					.then(res => {
						if(this.currPageAuditing == 1){
							this.AuditingData =[]
						}
						if (res.data.result == 'suc') {
							if(value == 'refresh'){
								this.AuditingData = [];
								this.currPageAuditing = 1;
							}
							this.AuditingData = this.AuditingData.concat(res.data.data)
						} else {
							if (res.data.msg == '没有更多数据') {
								this.totalPageAuditing = this.currPageAuditing - 1;
								this.$refs.loadRefresh_two.loadOver();
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			// 审核中 end

			// 未过审 start
			loadMoreuntried() {
				this.currPageuntried = this.currPageuntried + 1;
				this.requestuntriedData();
			},
			refreshuntried() {
				this.currPageuntried = 1;
				this.requestuntriedData("refresh");
			},
			requestuntriedData(value) {
				const item = this.CacheData;
				const usrId = item.usrId;
				this.$Httpps
					.sttp({
						"action": "getmedianews",
						"usrId": usrId,
						"page": this.currPageuntried,
						"datStatus": 0
					})
					.then(res => {
						if(this.currPageuntried == 1){
							this.untriedData =[]
						}
						if (res.data.result == 'suc') {
							if(value == 'refresh'){
								this.untriedData = [];
								this.currPageuntried = 1;
							}
							this.untriedData = this.untriedData.concat(res.data.data)
						} else {
							if (res.data.msg == '没有更多数据') {
								this.totalPageuntried = this.currPageuntried - 1;
								this.$refs.loadRefresh_three.loadOver();
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			// 未过审 end

			// 编辑中 start
			loadMoreEditor() {
				this.currPageEditor = this.currPageEditor + 1;
				this.requestEditorData();
			},
			refreshEditor() {
				this.currPageEditor = 1;
				this.requestEditorData("refresh");
			},
			requestEditorData(value) {
				const item = this.CacheData;
				const usrId = item.usrId;
				this.$Httpps
					.sttp({
						"action": "getmedianews",
						"usrId": usrId,
						"page": this.currPageEditor,
						"datStatus": 3
					})
					.then(res => {
						if(this.currPageEditor == 1){
							this.editorData =[]
						}
						console.log('审核1',res)
						if (res.data.result == 'suc') {
							if(value == 'refresh'){
								this.editorData = [];
								this.currPageEditor = 1;
							}
							this.editorData = this.editorData.concat(res.data.data)
						} else {
							if (res.data.msg == '没有更多数据') {
								this.totalPageEditor = this.currPageEditor - 1;
								this.$refs.loadRefresh_four.loadOver();
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			// 编辑中 end

			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				console.log("点击的第几项",index)
				let tabIndex = this.tabCurrentIndex;
				switch (tabIndex) {
					case 0:
						this.requestReleaseData(); //已发布数据
						console.log('111111');
						break;
					case 1:
						this.requestAuditingData();//审核中数据
						break;
					case 2:
						this.requestuntriedData();//未过审数据
						break;
					case 3:
						this.requestEditorData();//编辑中数据
						break;
				}
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(720);
						this.swiperheight = height;
						console.log(this.swiperheight,'this.swiperheight');
					}
				});
			}
		}
	}
</script>

<style scoped>
	.u-drawer__scroll-view,
	.uni-scroll-view,
	.uni-scroll-view{
		position: absolute!important;
		top: -200upx!important;
	}
	.infoContent {
		width: 100%;
	}

	.infoHead {
		position: relative;
		width: 100%;
		height: 400upx;
		background: url('../../static/media/mediaPersonal/infoHeadImage.png') no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		overflow: auto;
		padding: 0 20upx;
		padding-top: 30upx;
	}
	.infoHead_top{
		position: absolute;
		top: 80upx;
		left: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.infoHead_top .jiantou{
		width: 50upx;
		height: 50upx;
		text-align: center;
		line-height: 50upx;
		border-radius: 50%;
		background-color: #FFFFFF;
	}
	.icon-zuojiantou{
		font-size: 52upx;
	}
	.infoHead_top .textWrap{
		margin-left: -40upx;
		color: #FFFFFF;
	}
	.infoHead_top .textWrap uni-view:nth-of-type(1){
		font-size: 45upx;
		letter-spacing: 4upx;
	}
	
	.infoHead_bottom{
		width: 100%;
		height: 140upx;
		margin-top: 150upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.infoHead_bottom .line{
		width: 4upx;
		height: 80upx;
		background-color: #FFFFFF;
	}
	.infoHead_bottom .bottom_item{
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #FFFFFF;
		padding: 4upx 10upx;
		border-radius: 40upx;
		box-shadow: 8upx 4upx 70upx #000;
	}
	.infoHead_bottom .bottom_item .icon{
		font-size: 72upx;
		color: #000;
	}
	.infoHead_bottom .bottom_item .textContent{
		color: #000;
		font-weight: bold;
	}
	.twoTab .textContent{
		padding-right: 0!important;
	}
	.bottom_item .textContent uni-view:nth-child(1){
		font-size: 40upx;
		letter-spacing: 2upx;
	}
	.news{
		font-size: 36upx!important;
	}
	.newsText{
		font-size: 26upx!important;
	}
	.bottom_item .textContent .englishText{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.textContent .englishText uni-view:nth-child(1){
		width: 10upx;
		height: 10upx;
		border-radius: 50%;
		background-color: #000;
	}
	.textContent .englishText uni-view:nth-child(2){
		font-size: 24upx;
		transform-origin-x: 0;
		transform: scale(0.80);
		margin-left: -12upx;
	}
	.twoTab .textContent .englishText uni-view:nth-child(2){
		font-size: 24upx;
		transform-origin-x: 0;
		transform: scale(0.80);
		margin-left: -18upx;
	}

	.UserInfo {
		/* position: relative; */
		/* z-index: 1000; */
		/* border-radius: 10upx!important; */
		/* width: 100%;
		height: 268upx; */


		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 22px 22px 0 0;
		background-color: #fff;
		z-index: 11;
		border-bottom: 8upx solid #F5F5F5;
		box-sizing: border-box;
	}

	.UserInfo>.InfoHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 30upx;
		border-radius: 10upx;
	}

	.InfoHeader>uni-view:nth-of-type(1) {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
	}

	.InfoHeader .UserImges {
		position: absolute;
		top: -60upx;
		left: 20upx;
		width: 120upx;
		height: 120upx;
	}

	.InfoHeader .UserImges>uni-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 16upx solid rgba(245, 245, 245, .6);
	}

	.InfoHeader>uni-view:nth-of-type(1)>uni-view:nth-of-type(2) {
		font-size: 36upx;
		margin-left: 180upx;
	}

	.clockAndNumber {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30upx;
		margin-top: 10upx;
		width: 80upx;
		height: 70upx;
		/* border: 2upx dotted #50A7FC; */
		background-color: #CCCCCC;
	}

	.clockAndNumber>.clockImage {
		width: 40upx;
		height: 40upx;
	}

	.clockAndNumber>.clockImage>uni-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.clockAndNumber>.clockNumber {
		position: absolute;
		top: 8upx;
		right: 8upx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24upx;
		height: 24upx;
		background: red;
		border-radius: 50%;
		font-size: 16upx;
		color: #FFFFFF;
	}

	.UserDescoration {
		color: #A7A7A7;
		font-size: 30upx;
		line-height: 60upx;
		margin-left: 20upx;
		margin-top: 10upx;
	}

	.NumberList {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-left: 20upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}

	.NumberList>uni-view {
		display: flex;
		flex-direction: row;
		margin-right: 20upx;
	}

	.NumberList>uni-view>uni-view:nth-of-type(1) {
		color: #A7A7A7;
		font-size: 26upx;
		line-height: 52upx;
		margin-right: 6upx;
	}

	.NumberList>uni-view>uni-view:nth-of-type(2) {
		font-size: 36upx;
	}

	.tabList {
		width: 100%;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.wrap {
		height: 70upx;
		border-right: 2upx solid #EEEEEE;
	}

	.navbar>.nav-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100upx;
		text-align: center;
		margin: 10upx 0;
	}

	.current {
		border-bottom: 4upx solid red;
	}

	.list {
		width: 100%;
		height: 100%!important;
		box-sizing: border-box;
	}
</style>

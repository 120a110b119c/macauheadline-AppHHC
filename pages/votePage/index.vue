<template>
	<view>
		<!-- 弹框效果 start-->
		<view>
			<u-modal ref="uModal" v-model="ClickModel" :show-cancel-button="true"
				:show-title="showTitle" :async-close="asyncClose"
				@confirm="confirm" @cancel="cancel" :content="'鉴于之前没有完成登录操作,为了不影响接下来的操作,请先去登录'"
			>
			</u-modal>
		</view>
		<!-- 弹框效果 end-->
		<header-title :title='"我要投票"' @toBack='toHome()' :backText="'首頁'" :iconfont='"&#xe735;"'></header-title>
		<view class="topBox">
			<view class="topTitle">大學生使用手機調查問卷</view>
			<view class="topImage">
				<image src="../../static/index/voteTitle.png" mode="widthFix"></image>
			</view>
			<view class="topContext">
				<view class="context">
					<span>介紹:</span>感謝您對本次問卷調查的支持。本問卷旨在深入了解大學生使用手機的情況及其對大學生學習與發展的影響。本問卷采用不記名方式,調查結果僅供本研究使用,絕對保密,請放心並如實填寫。填寫本問卷大約需要10分鐘,期待您的合作!
				</view>
				<view class="context">
					<span>填寫說明:</span>本問卷分為五部分,共4頁,請根據您的實際情況在相應選項上打"√"或者填空,如無特殊說明,均為單選題
				</view>
			</view>
			<view class="titileBox">
				<view class="titileBoxLine">
					<image src="../../static/index/rightLine.jpg" mode="widthFix"></image>
				</view>
				<view style="text-align: center;">{{contentTitle}}</view>
				<view class="titileBoxLine">
					<image src="../../static/index/leftLine.jpg" mode="widthFix"></image>
				</view>
			</view>
			<view v-if="contentShow" style="width:90%;">
				<view class="timer">
					<view class="timeItem">{{time.day}}</view>
					<view class="timeContext">天</view>
					<view class="timeItem">{{time.h}}</view>
					<view class="timeContext">时</view>
					<view class="timeItem">{{time.m}}</view>
					<view class="timeContext">分</view>
					<view class="timeItem">{{time.s}}</view>
					<view class="timeContext">秒</view>
				</view>
				<!-- 单选 -->
				<view class="contentList" v-for="(item,index) in radioList" :key="item.SubId">
					<view>{{index+1}}.{{item.SubTitle}}</view>
					<u-radio-group v-model="radioModel[index].SrtSbtTitle" :wrap="wrap" @change="radioGroupChange(index,item,$event)">
						<u-radio v-for="(val, index) in item.items" :key="val.SbtId" :name="val.SbtTitle" :disabled="item.disabled">
							{{val.SbtTitle}}
						</u-radio>
					</u-radio-group>
				</view>
				<!-- 多选 -->
				<view class="contentList" v-for="(item,index) in checkList" :key="item.SubId">
					<view>{{radioList.length+index+1}}.{{item.SubTitle}}</view>
					<u-checkbox-group :wrap="wrap">
						<u-checkbox v-model="val.checked" v-for="(val, i) in item.items" :key="val.SbtId" @change="checkboxGroupChange(item.SubId,index,item,$event)"
						 :name="val.SbtTitle">
							{{val.SbtTitle}} {{item.checked}}</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="contentList" v-for="(item,index) in textList" :key="item.SubId">
					<view>{{radioList.length+checkList.length+index+1}}.{{item.SubTitle}}</view>
					<textarea class="textarea" v-model="item.items[index].subTextContent" />
					</view>
					
				<view class="saveBtn">
					<u-button :disabled="btnDisabled" type="error" :shape="shape"  size="default" :ripple="true" @click="submit()">提交</u-button>
				</view>
			</view>
			<view v-else style="width:90%;">
				<view class="listWrap" v-for="(item,index) in radioList" :key="item.SubId">
					<view>{{index+1}}.{{item.SubTitle}}</view>
					<view class="listBox"  v-for="(val, index) in item.items" :key="val.SbtId">
						<view>{{val.SbtTitle}}</view>
						<view class="progressAndText">
							<view><u-line-progress :show-percent="false" :percent="val.SbtCount/item.SubCount*100" :round="true" active-color="#fe3000" style="width: 100%;"></u-line-progress></view>
							<view>{{val.SbtCount !=""?(val.SbtCount/item.SubCount).toFixed(2)*100+"%":0}}</view>
						</view>
					</view>
				</view>
				<view class="listWrap" v-for="(item,index) in checkList" :key="item.SubId">
					<view>{{radioList.length+index+1}}.{{item.SubTitle}}</view>
					<view class="listBox" v-for="(val, i) in item.items" :key="val.SbtId">
						<view>{{val.SbtTitle}}</view>
						<view class="progressAndText">
							<view><u-line-progress :show-percent="false" :percent="val.SbtCount/item.SubCount*100" :round="true" active-color="#fe3000" style="width: 100%;"></u-line-progress></view>
							<view>{{val.SbtCount !=""? (val.SbtCount/item.SubCount).toFixed(2)*100+"%":0}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerTitle from '../../components/header-title/index.vue'
	import {
		isNeedLogin,
		goLogin
	} from '@/utils/index.js'
	export default {
		components: {
			headerTitle
		},
		data() {
			return {
				showTitle: true,
				asyncClose: false,
				btnDisabled:false,
				ClickModel:true,
				contentShow:true,
				contentTitle:"距離截止時間還有",
				shape: 'circle',
				suggest: '',
				wrap:true,
				time: {
					day: '0',
					h: '0',
					m: '0',
					s: '0'
				},
				value:"",
				radioList:[],//单选数组
				radioModel:[],//单选初始绑定的数值集合
				checkList:[],//多选数组
				checkModel:[],//多选初始绑定的数值集合
				textList:[],//文本数组
				textModel:[],//文本域提交每条数据存储的集合
				radioSelect:{
					SubId:"",
					SubTitle:""
				},
				judge:true,
				UserWrited:"",
				UserClick:false,
				userInfo:{
					UsrName:"",//用户名称
					UsrId:"",//用户id
					DatId:""//新闻id
				},
				countdown:null//停止定时器操作
			}
		},
		onShow() {
			if (isNeedLogin()) {
				console.log('111');
			}else{
				this.btnDisabled = false;
				this.ClickModel = false;
				let NDatId = uni.getStorageSync("NDatId");
				this.userInfo.DatId = NDatId;
				let userData = uni.getStorageSync('data');
				if(userData){
					this.userInfo.UsrName = userData.usrName;
					this.userInfo.UsrId = userData.usrId;
					this.getFullData()
				}
			}
		},
		created() {
			this.getData();
		},
		onLoad(option) {
			uni.setStorageSync("NDatId",option.item);
			this.userInfo.DatId = option.item;
			this.getTime();
		},
		methods: {
			//关闭提示登录框
			cancel(){
				this.btnDisabled = true;
				this.ClickModel = false;
			},
			confirm(){
				goLogin("../me/register/register")
			},
			ifUserWrited(){
				if( this.UserWrited === '1' ) {
					this.contentShow = false
				}
			},
			getFullData(){
				const DatId = this.userInfo.DatId;
				const UsrId = this.userInfo.UsrId;
				this.$Httpps
					.sttp({
						"action": "getsubjectdetail",
						"DatId": DatId,
						"UsrId":UsrId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							if( res.data.dataFilled == '1' ){
								this.contentShow = false;
								this.contentTitle = '您已填寫完成調查'
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
				});
			},
			
			getData(){
				this.$Httpps
					.sttp({
						"action": "getsubjectdetail",
						"DatId": '252901'
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.UserWrited = res.data.dataFilled;
							let allData = res.data.data;
							let array = [];
							// 对数组中 单选 多选 文本 进行筛选 区别开来，方便对数据管理
							allData.forEach(item=>{
								if( item.SubType === '单选' ){
									this.radioList.push(item)
								}else if( item.SubType === '多选' ){
									this.checkList.push(item)
								}else if( item.SubType === '文本' ){
									this.textList.push(item)
								}
							})
							// 单选
							this.radioList.forEach((item,index) =>{
								this.radioModel.push({
									"SrtSbtTitle":'', //选项标题
									"SrtSbtId":item.items[0].SbtId,//选项id
									"SrtSubId":item.SubId//题目id
								})
							})
							//多选
							this.checkList.forEach((item,index)=>{
								item.items.forEach((val)=>{
									val.checked = false;
									val.disabled = false;
								})
							})
							
							//文本域
							this.textList.forEach((item,index)=>{
								item.items.forEach((val)=>{
									val.subTextContent = '';
								})
							})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
						
					}).catch(err => {
						console.log(err);
				});
			},
			// 选中某个多选框时，由radio时触发
			checkboxGroupChange(titleId,index,val,x) {
				this.checkList[index].items.forEach((item,i) =>{
					if( item.SbtTitle == x.name ){
						this.checkModel.push({
							"SrtSbtTitle":item.SbtTitle, //选项标题
							"SrtSbtId":item.SbtId,//选项id
							"SrtSubId":titleId//题目id
						})
					}
				})
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(index,val,x) {
				this.radioList[index].items.forEach((item,i) =>{
					if( item.SbtTitle == x ){
						this.radioModel[index].SrtSbtId = item.SbtId;
					}
				})
			},
			getTime() {
				this.countdown = setInterval(() => {
					let timers = '2020/10/01';
					// var d=new Date(g);//将时间搓转化成日期格式
					let endtime = new Date(timers).getTime();
					//获取当前的时间
					let nowtime = new Date().getTime();
					//计算出相差的秒数
					let disparity = (endtime - nowtime) / 1000;
					disparity = parseInt(disparity);
					//计算剩余的天数小时分钟秒
					this.time.day = parseInt(disparity / 86400);
					this.time.h = parseInt((disparity / 3600) % 24);
					this.time.m = parseInt(disparity / 60 % 60);
					this.time.s = disparity % 60;

					//如果时、分、秒、是一位的时候，那么就在前面加上一个 0
					if (this.time.h < 10) {
						this.time.h = '0' + this.time.h
					}
					if (this.time.m < 10) {
						this.time.m = '0' + this.time.m
					}
					if (this.time.s < 10) {
						this.time.s = '0' + this.time.s
					}
					//如果倒计时剩余的描述小于0，就停止计时器
					if (disparity <= 0) {
						clearInterval(this.countdown);
						this.countdown  = null;
					}
				}, 1000);
			},
			toHome() {
				uni.switchTab({
					url: "../index/home"
				})
			},
			formatDate(now) { 
				var year=now.getFullYear();
				var month=now.getMonth()+1;
				var date=now.getDate();     
				var hour=now.getHours();     
				var minute=now.getMinutes();
				var second=now.getSeconds();
				return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
			},
			//去登录页面
			goLogin() {
				goLogin("../me/register/register")
			},
			submit(){
				//提交前判断用户是否登录，没登录跳转登录界面进行登录
				if (isNeedLogin()) {
					this.btnDisabled = true;
					return
				}
				// 给文本域添加操作
				this.textList.forEach((item,index) =>{
					item.items.forEach((val,index) =>{
						console.log('val.SbtCount',val,val.SbtCount)
						this.checkModel.push({
							"SrtSubId":item.SubId,
							"SrtSbtTitle":item.SubTitle,//选项标题
							"SrtSbtId":val.SbtId,//选项id
							"SrtContent":'val.SbtCount'//文本内容
						})
					})
				})
				let submitObject = {
					"commitData":[]
				}
				let radioData = this.radioModel;
				let checkData = this.checkModel;
				let textData = this.textModel;
				
				this.UserClick = true;
				let numsData = radioData.concat(checkData,textData);
				submitObject.commitData = numsData;
				let submitObjectString = JSON.stringify(submitObject);//对象转化为字符串
				let DatId = this.userInfo.DatId;
				let UsrId = this.userInfo.UsrId;
				let UsrName = this.userInfo.UsrName;
				this.$Httpps
					.sttp({
						"action": "savesubject",
						"SubData": encodeURIComponent(submitObjectString),
						"DatId":DatId,
						"UsrId":UsrId,
						"UsrName": encodeURIComponent('Tiss')
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.contentShow = false;
							this.contentTitle = '您已填寫完成調查'
						}else{
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
	uni-image {
		width: 100%;
	}

	.topTitle {
		display: flex;
		width: 100%;
		height: 112upx;
		justify-content: center;
		align-items: center;
		font-size: 40upx;
		letter-spacing: 2upx;
		color: #fe3000;
		font-weight: bold;
	}

	.topBox {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.contentList:nth-of-type(n+2){
		margin-top: 20upx;
	}

	.topImage {
		display: flex;
		width: 90%;
		justify-content: center;
	}

	.topContext {
		width: 90%;
		margin: 40upx 0;
		text-align: justify;
		color: #b4acac;
		font-size: 29upx;
		letter-spacing: 3upx;
		line-height: 40upx;
	}

	.topContext>.context>span {
		color: #333333;
		font-weight: bold;
		margin-right: 10upx;
	}

	.topContext>.context:nth-child(2) {
		margin-top: 20upx;
	}

	.titileBox{
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 20upx;
		width: 84%;
		color: #010101;
		font-weight: bold;
	}
	.titileBoxLine{
		width: 130upx;
	}


	/* 倒计时 */
	.timer {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 116upx;
	}

	.timer>.timeItem {
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background-color: #fe3000;
		color: #FFFFFF;
	}
	.timer>.timeContext{
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
	}
	.contentList{
		width: 100%;
	}
	.textarea{
		border: 2upx solid #cccccc;
		margin-top: 20upx;
		width: 100%;
		height: 200upx;
		border-radius: 10upx;
	}
	.saveBtn{
		width: 80%;
		margin: 40upx auto 20upx auto;
	}
	
	
	.listWrap{
		margin-top: 40upx;
	}
	.listBox{
		padding: 40upx;
		width: 100%;
		height: 200upx;
		margin: 40upx 0;
		box-shadow:-2px 0px 8px #e4e0e0,0px -2px 8px #e4e0e0,0px 2px 8px #e4e0e0,2px 0px 8px #e4e0e0;
		box-sizing: border-box;
	}
	.progressAndText{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20upx;
	}
	.progressAndText view:nth-child(1){
		width: 85%;
	}
</style>

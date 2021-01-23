<template>
	<view>
		<header-title :title='"優惠卷發佈"' @toBack='toShoppingManage()' :backText="'返回'" :iconfont="'&#xe728;'"></header-title>
		<u-cell-group class="cellGroup">
			<u-field disabled :label="'*'+i18n.shopName" style="color:#606266">
				<view class="rightInput" slot='right'>
					<u-input v-model="headerTitle" type="text" :clearable='false' input-align='right' :placeholder='i18n.pleaseInputCounponTitle' />
				</view>
			</u-field>
			<u-cell-item :title="'*'+i18n.cuponType" :arrow="true" arrow-direction="down" :value="discountType" @tap='discountTypeListShow = true'></u-cell-item>
			<u-field disabled label="*滿" style="color:#606266" v-show="cmdType === 2">
				<view class="rightInput" slot='right'>
					<u-input v-model="cmdMinCharge" type="number" :clearable='false' input-align='right' placeholder='元' />
				</view>
			</u-field>
			<u-field disabled label="*減" style="color:#606266" v-show="cmdType === 2">
				<view class="rightInput" slot='right'>
					<u-input v-model="cmdReduction" type="number" :clearable='false' input-align='right' placeholder='元' />
				</view>
			</u-field>
			<u-field disabled :label="'*'+i18n.moneyCount" style="color:#606266" v-show="cmdType === 1">
				<view class="rightInput" slot='right'>
					<u-input v-model="cpnAmount" type="number" :clearable='false' input-align='right' placeholder='元' />
				</view>
			</u-field>
			<u-field disabled label="*折扣" style="color:#606266"  v-show="cmdType === 3">
				<view class="rightInput" slot='right'>
					<u-input v-model="cpnDiscount" type="number" :clearable='false' input-align='right' placeholder='打9折請寫90' />
				</view>
			</u-field>
			<view class="defaultBox" style="border-bottom: 2upx solid #e4e7ed;" @tap="showData = true">
				<view>*{{i18n.exChangeData}}</view>
				<view class="content">
					<view class="contentList">
						<view class="u-demo-result-line">{{ cmdDays ? cmdDays : i18n.pleaseExChangeData }}</view>
					</view>
				</view>
			</view>
			<!-- <u-field disabled label="*使用规则" style="color:#606266">
				<view class="rightInput" slot='right'>
					<u-input v-model="cmdRule" type="textarea"  :height="100" :auto-height="true" placeholder='請詳細描述優惠卷的使用規則' />
				</view>
			</u-field> -->
			<view class="defaultBox" style="border: none;">
				<view>*{{i18n.price}}</view>
				<view class="content">
					<view class="contentList">
						<u-input v-model="cmdPrice" type="number" :clearable='false' input-align='right' placeholder='0' />
					</view>
					<view>积分</view>
				</view>
			</view>
			<view class="defaultBox"  style="border: 2upx solid #e4e7ed;">
				<view>*限量</view>
				<view class="content">
					<u-switch :size="40" v-model="checked" :loading="loading" @change="change"></u-switch>
				</view>
			</view>
			<u-field disabled :label="'*'+i18n.stock" style="color:#606266" v-show="swichFalse">
				<view class="rightInput" slot='right'>
					<u-input v-model="cmdStock" type="text" :clearable='false' input-align='right' />
				</view>
			</u-field>
		</u-cell-group>
		<view class="CdefaultBox" style="border: 2upx solid #e4e7ed;border-top: none;">
			<view>*使用规则</view>
			<view class="content">
				<textarea  v-model="cmdRule" :placeholder="i18n.pleaseDireciptUseRule"  placeholder-style="color:#ccc;" />
			</view>
		</view>
		<view class="uploadImageBox">
			<view class="uploadImage">{{i18n.uploadImage}}</view>
			<u-upload :action="action" ref="uUpload" :file-list="fileList" max-count="1"></u-upload>
		</view>
		<view class="saveBtn">
			<u-button type="error" @tap='commitUserInfo()' size="default" :ripple="true">{{i18n.readyPush}}</u-button>
		</view>
		<u-action-sheet :list="discountTypeList" @click="chooesDiscountType" v-model="discountTypeListShow"
		 :safe-area-inset-bottom='true'></u-action-sheet>
		<!-- 活动结束时间选择 -->
		<u-picker v-model="cmdDaysShow" mode="time" :safe-area-inset-bottom='true' @confirm='chooesActiveEndTime'></u-picker>
		<u-picker
			:mode="mode"
			:defaultTime="defaultTime"
			v-model="showData"
			:params="params"
			end-year="2030"
			@confirm="confirm"
			:defaultSelector="defaultSelector"
		></u-picker>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	export default {
		components: {
			headerTitle
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		data() {
			return {
				input: '',
				mode: 'time',
				showData:false,
				defaultTime: '2019-12-11 20:15:35',
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: true,
					city: true,
					area: true,
					timestamp: true
				},
				defaultSelector: [0],
				action: this.serverUrl + '?action=publicuploadimage',
				fileList: [],
				headerTitle: "",//优惠卷名称
				cmdType:"",//优惠券类型
				cmdMinCharge:"",//满
				cmdReduction:"",//減或者折扣
				cmdRule:"",//使用规则
				cmdPrice: null,//优惠券价值金额(积分)
				cmdIsLimit:1,//是否限量
				cmdStock:"",//庫存
				discountType: "選擇分類",
				cmdDays: "",//兌換時間有效期
				cpnAmount:"",//現金劵要填的字段
				cpnDiscount:"",//折扣劵要填的字段
				discountTypeList: [{
						type:1,
						text: '現金劵'
					},
					{
						type:2,
						text: '滿減券'
					},
					{
						type:3,
						text: '折扣券'
					},
				],
				discountTypeListShow: false,
				cmdDaysShow: false,

				//开关
				checked: true,
				loading: false,
				// 中间变量，避免在watch中多次回调，造成无限循环
				controlStatus: false,
				//數量
				amount: null,
				swichFalse:true,
				userInfoUsrId:null,//用戶id
			}
		},
		onShow() {
			let userData = uni.getStorageSync('data');
			if(userData){
				this.userInfoUsrId = userData.usrId;
			}
		},
		methods: {
			confirm(e) {
				this.cmdDays = '';
				if (this.mode == 'time') {
					if (this.params.year) this.cmdDays += e.year;
					if (this.params.month) this.cmdDays += '-' + e.month;
					if (this.params.day) this.cmdDays += '-' + e.day;
					this.cmdDays += ' 23:59:59';
					// if (this.params.hour) this.cmdDays += ' ' + e.hour;
					// if (this.params.minute) this.cmdDays += ':' + e.minute;
					// if (this.params.second) this.cmdDays += ':' + e.second;
				}
			},
			//开关触发的函数
			change(status) {
				if(status){
					this.swichFalse = true
					this.cmdIsLimit = 1
				}else{
					this.swichFalse = false
					this.cmdIsLimit = 0
				}
			},
			toShoppingManage() {
				uni.navigateTo({
					url: "../shoppingManage/index"
				})
			},
			chooesDiscountType(index) {
				this.discountType = this.discountTypeList[index].text
				this.cmdType =  this.discountTypeList[index].type;
				console.log('this.cmdType',this.cmdType)
			},
			//選擇活动开始时间
			chooesActiveEndTime(obj) {
				this.cmdDays = obj.year + '-' + obj.month + '-' + obj.day
			},
			// 确定发布
			commitUserInfo(){
				const files = this.$refs.uUpload.lists;//获取上传图片列表
				let cpnImage = '';
				if(files != ''){
				    cpnImage = encodeURIComponent(files[0].response.image);
				}
				let userObj = {
					"action": "cpndataupload",
					"cpnBizId":this.userInfoUsrId,
					"cpnInputId":this.userInfoUsrId,
					"cpnName": encodeURIComponent(this.headerTitle),//优惠卷名称
					"cpnType":this.cmdType,//优惠卷类型
					cpnAmount:this.cpnAmount,
					cpnDiscount:this.cpnDiscount,
					"cpnMinCharge":this.cmdMinCharge,//满
					"cpnReduction":this.cmdReduction,//減
					"cpnDueDate":this.cmdDays,//兌換時間有效期
					"cpnContent":encodeURIComponent(this.cmdRule),//使用规则
					"cpnIntegral":this.cmdPrice,//优惠券价值金额(积分)
					"cpnIsLimit":this.cmdIsLimit,//是否限量
					"cpnStock":this.cmdStock,//庫存
					// 圖片上傳 start
					"cpnImage": cpnImage,
				}
				this.$Httpps
					.sttp(userObj)
					.then(res => {
						if (res.data.result == 'suc') {
							uni.showToast({
								icon: 'none',
								title: '保存資料成功'
							})
							setTimeout(() => {
								uni.navigateTo({
									url:"../shoppingManage/index"
								})
							}, 1000)
						}
					}).catch(err => {
						console.log(err);
				});
			}
		}
	};
</script>

<style scoped>
	.uni-textarea-textarea{
		text-align: right;
	}
	.defaultBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20upx 28upx;
		border-top: 1upx solid #e4e7ed;
		width: 100%;
		justify-content: space-between;
		line-height: 70upx;
	}

	.CdefaultBox{
		padding: 20upx 28upx;
		border-top: 1upx solid #e4e7ed;
		width: 100%;
		line-height: 70upx;
	}

	.CdefaultBox  textarea{
		text-align: left;
		width: 100%;
		height: 200upx;
		background-color: #f4f5f6;
	}

	.defaultBox>.content {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.contentList{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.contentList > uni-view:nth-of-type(1){
		margin-right: 20upx;
	}
	
	
	.cellGroup {
		width: 100%;
	}

	.avaterView {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rightInput {
		display: flex;
	}

	.saveBtn {
		width: 80%;
		margin: 80upx auto;
	}

	.uploadImageBox {
		margin: 20upx;
	}

	.uploadImage {
		width: 100%;
		margin-left: 10upx;
		margin-bottom: 20upx;
		font-size: 30upx;
	}
</style>

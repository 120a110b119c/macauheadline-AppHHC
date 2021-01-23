<template>
	<view>
		<view class="list" style="margin-top: 80upx;">
			<scroll-view scroll-y="true" :style="{height: swiperheight  + 'px'}">
				<checkbox-group class="block" @change="changeCheckbox">
					<view v-for="(item,index) in DataList" class="DataList" :key="index">
						<view class="DataListWrap">
							<view class="DataListWrapLeft">
								<view class="checkButoon" v-show="WaitingReviewShopping">
									<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
								</view>
								<view class="DataListimage">
									<image :src="item.cmdPic" mode="widthFix"></image>
								</view>
							</view>
							<view class="DataListWrapRight">
								<view class="DataListText">
									{{item.cmdName}}
								</view>
								<view class="deleteShopping" @click="deleteShopping(item,index)">
									{{pullOffShopping}}
								</view>
							</view>
						</view>
					</view>
				</checkbox-group>
				<view class="buttonsList" v-show="WaitingReviewShopping">
					<view v-if="DataList.length != 0">
						<checkbox-group @change="allChoose" class="checkGroup">
							<label>
								<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
							</label>
						</checkbox-group>
					</view>
					<view v-if="DataList.length != 0">
						<button type="warn" @click="delectAll">删除</button>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			WaitingReviewShopping: {
				type: Boolean,
				default: false
			},
			swiperheight:{
				type: Number,
				default: 0
			}
		},
		onShow() {
			this.getPageHeight()
		},
		data() {
			return {
				pullOffShopping: "上架商品",
				allChecked: false, //是否全选
				checkedArr: [], //复选框选中的值
				DataList: []
			}
		},
		created() {
			const item = this.$getStorage("data");
			const usrId = item.usrId;
			this.$Httpps
				.sttp({
					"action": "getcmddata",
					"page": 1,
					"usrId": usrId,
					"cmdStatu": 4
				})
				.then(res => {
					const ResList = eval(res.data);
					this.DataList = ResList.data.map((obj, index) => {
						return {
							value: index,
							...ResList.data[index]
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
		},
		methods: {
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.DataList.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.DataList) {
						let itemVal = String(item.value);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			},
			delectAll() {
				this.checkedArr.map((items, index) => {
					this.DataList.splice(this.DataList.findIndex(item => item.value === Number(items)), 1)
				})
				if (this.DataList.length == 0) {
					this.checkboxShow = false
				}
			},
			deleteShopping(item, index) {
				const cmdId = item.cmdId;
				this.$Httpps
					.sttp({
						"action": "updatecmdstatu",
						"cmdStatu": 1,
						"cmdId": cmdId
					})
					.then(res => {
						console.log(this.DataList, index, '110');
						this.DataList.splice(index, 1);
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					});
			}
		}
	}
</script>

<style scoped>

	.content {
		width: 100%;
	}

	.navbar {
		position: fixed;
		top: 0upx;
		left: 0;
		display: flex;
		width: 100%;
		height: 78upx;
		line-height: 78upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		border: 2upx solid #EEEEEE;
		background-color: #fff;
		z-index: 9999;
	}

	.nav-item {
		width: 25%;
		height: 80upx;
	}

	.current {
		border-bottom: 3upx solid red;
	}

	.DataListWrap {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.DataListWrapLeft {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 50%;
		height: 100%;
	}

	.DataListWrapRight {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
	}

	.list .DataList:nth-of-type(n+2) {
		margin-top: 30upx;
	}

	.DataList {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 200upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.DataListimage {
		width: 250upx;
	}

	.DataListimage,
	.deleteShopping {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.deleteShopping {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 180upx;
		height: 60upx;
		line-height: 30upx;
		padding: 10upx 10upx;
		text-align: center;
		border: 2upx solid #CECECE;
		border-radius: 50upx;
		box-sizing: border-box;
	}

	uni-image {
		display: block;
		width: 80%;
		height: 100%;
	}

	.DataListText {
		padding: 0 4upx;
		box-sizing: border-box;
	}


	.buttonsList {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110upx;
		background-color: #ffff;
		padding-bottom: 20upx;
		line-height: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		box-sizing: border-box;
		z-index: 9999;
	}

	.buttonsList>uni-view {
		width: 40%;
	}

	.checkGroup {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		font-size: 36upx;
		color: #000;
		width: 100%;
		height: 100%;
		line-height: 92upx;
		text-align: center;
		border-radius: 10upx;
	}

	uni-label {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.checkGroup uni-checkbox {
		position: absolute;
		left: 0;
		top: 0;
		width: 50%;
		height: 50%;
	}
</style>
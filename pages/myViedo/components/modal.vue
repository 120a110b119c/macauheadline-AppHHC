<template>
	<view>
		<view class="wrapBox animated bounceInUp" :style={height:windowHeight,width:windowWidth} :class="isShow==true">
			<view class="header">
				<view class="titleWrap">
					<view>
						我的頻道
					</view>
					<view>
						點擊進入我的頻道
					</view>
				</view>
				<view class="edit" @click="editEvent()">{{edit}}</view>
			</view>
			
			<view class="baseList">
				<view v-for="(item,index) in baseList" class="items"  @click="toHome(index)">{{item.MdlNameFT}}</view>
			</view>
			
			<view class="list navList">
				<movable-area class="drag-sort" id="drag">
					<movable-view v-for="(item, index) in currentList" :key="index" :x="item.x" v-if="item.isShows === 1" :data-index="index"
					 @touchstart="touchstart" @touchmove.stop="touchmove" @touchend="touchend" :y="item.y" :direction="direction"
					 disabled damping="40" :animation="item.animation" class="drag-sort-item" :class="{'active': active == index, 'vh-1px-t': item.index > 0}">
						<view class="item" @click="putOut(index)">
							<text>{{item.MdlNameFT}}</text>
						</view>
						<view class="out" v-if="iconShow == false" @click="outList(index)">
							X
						</view>
					</movable-view>
				</movable-area>
			</view>
			<view class="titleWrap">
				<view>
					热门精选
				</view>
				<view>
					點擊添加
				</view>
			</view>
			<view class="list" v-show=" this.recommed.length != 0 ">
				<view v-for="(item,index) in recommed" :key="index">
					<view class="listItem">
						<view class="text" @click="putIn(index)">
							{{item.MdlName}}
						</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="left" :style={color:cancelCor} hover-class="hover" @click="cancel()">
					{{cancelBtn}}
				</view>
				<view class="right" :style={color:cancelCor} hover-class="hover" @click="ok()">
					{{okBtn}}
				</view>
			</view>
		</view>
		<view class="mask" v-show="isShow"></view>
	</view>

</template>

<script>
	export default {
		name: 'drag-sort',
		mixins: [],
		components: {},
		data() {
			return {
				windowHeight: '',
				windowWidth: '',
				direction: "all",
				windowWidth: 100, //屏幕宽度
				height: 50, // 高度
				currentList: [],
				active: -1, // 当前激活的item
				index: 0, // 当前激活的item的原index
				topY: 0, // 距离顶部的距离
				topX: 0, // 距离左侧偏移位置
				deviationX: 0,
				deviationY: 0, // 偏移量
				windowHeight: '',
				windowWidth: '',
				value: '',
				animatiX: {},
				show: 'show',
				unShow: 'unShow2',
				recommed: [],
				checkedArrey: [],
				leaveList: [],
				dataList: [],
				edit: "+ 編輯",
				iconShow: true,
				endList:[]
			}
		},
		computed: {
			boxHeight() {
				return (Math.ceil((Number(this.list.length) + 1) / 4)) * this.height + 'px'
			}
		},
		props: {
			ifHome: {
				type: String,
				default: 0
			},
			isShow: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			baseList: {
				type: Array,
				default: () => {
					return []
				}
			},
			placeholder: {
				type: String,
				default: '請輸入'
			},
			inpValue: String,
			cancelBtn: {
				type: String,
				default: '取消'
			},
			okBtn: {
				type: String,
				default: '確定'
			},
			cancelCor: {
				type: String,
				default: 'black'
			},
			inp: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			list: {
				handler() {
					this.onUpdateCurrentList()
				},
				deep: true
			}
		},
		created() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.windowHeight = res.windowHeight * 0.95 + 'px'
					_this.windowWidth = res.windowWidth * 1 + 'px'
				}
			});
			if (this.ifHome === "1") {
				uni.getStorage({
					key: 'storage_recommed',
					success: function(res) {
						if (_this.recommed) {
							_this.recommed = res.data;
						} else {
							uni.removeStorage({
								key: 'storage_recommed'
							});
						}
					}
				});
				uni.getStorage({
					key: 'navlist',
					success: function(res) {
						if (res.data.length === 10) {
							uni.removeStorage({
								key: 'navlist'
							});
						} else {
							res.data.splice(0,3);
							_this.currentList = res.data;
						}
					}
				});
			} else {
				uni.getStorage({
					key: 'storage_recommedtVideo',
					success: function(res) {
						if (_this.recommed) {
							_this.recommed = res.data;
						} else {
							uni.removeStorage({
								key: 'storage_recommedtVideo'
							});
						}
					}
				});
				uni.getStorage({
					key: 'navlistVideo',
					success: function(res) {
						if (res.data.length === 14) {
							uni.removeStorage({
								key: 'navlistVideo'
							});
						} else {
							_this.currentList = res.data;
						}
					}
				});
			}
			const res = uni.getSystemInfoSync();
			this.windowWidth = res.windowWidth;
			this.onUpdateCurrentList();
		},
		mounted() {},
		updated() {},
		filters: {},
		methods: {
			editEvent() {
				this.iconShow = !this.iconShow;
				this.edit == '+ 編輯' ? this.edit = '完成' : this.edit = '+ 編輯';
			},
			outList(i) {
				let array = [];
				var item = this.currentList[i];
				this.currentList.splice(i, 1);
				this.recommed.push(item);
				this.onUpdateCurrentList(this.currentList);
			},
			putIn(i) {
				let array = [];
				var item = this.recommed[i];
				this.currentList.push(item);
				this.recommed.splice(i, 1);
				this.onUpdateCurrentList(this.currentList);
			},
			cancel() {
				uni.switchTab({
					url: '../index/home'
				})
			},
			ok() {
				this.listSort();
				uni.setStorageSync('storage_index', "0");
				if (this.ifHome === "1") {
					let recommed = this.recommed;
					if(this.currentList.length == 0){
						 this.endList = this.baseList
					}else{
						this.endList = this.baseList.concat(this.currentList);
					}
					let lists = this.endList;
					uni.setStorage({
						key: 'navlist',
						data: lists
					});
					uni.setStorage({
						key: 'storage_recommed',
						data: recommed
					});
				}
				uni.switchTab({
					url: '../index/home'
				})
			},
			putOut(i) {
				i+=2;
				this.$emit("returnDate", i);
			},
			toHome(index){
				if( index==0 ){
					this.$emit("returnDate",'0')
				}else{
					this.$emit("returnDate",index)
				}
			},
			onUpdateCurrentList(list = this.list) {
				let arr = []
				for (const key in list) {
					let height = Math.ceil((Number(key) + 1) / 4) - 1
					let x = 0
					if (key <= 3) {
						x = key * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
					} else {
						if ((Number(key) + 1) % 4 === 0) {
							x = 3 * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
						} else {
							x = ((Number(key) + 1) % 4 - 1) * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
						}

					}
					arr.push({
						...list[key],
						isShows: 1,
						index: Number(key),
						SortNumber: Number(key),
						y: height * this.height,
						x,
						animation: true
					})
				}
				this.currentList = arr;
			},
			
			// 根据排序进行重新计算位置
			moveUpdateCurrentList(index) {
				for (const i in this.currentList) {
					let key
					if (this.currentList[i].SortNumber || this.currentList[i].SortNumber === 0) {
						key = this.currentList[i].SortNumber
					} else {
						key = Number(i);
					}
					let temobj = { ...this.currentList[i]}
					this.currentList[i].y = (Math.ceil((Number(key) + 1) / 4) - 1) * this.height
					if (index == key) {
						continue;
					} else {
						if (key <= 3) {
							this.currentList[i].x = key * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
						} else {
							if ((Number(key) + 1) % 4 === 0) {
								this.currentList[i].x = 3 * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
							} else {
								this.currentList[i].x = ((Number(key) + 1) % 4 - 1) * this.windowWidth * 0.24 + this.windowWidth * 0.04 || this.windowWidth * 0.04
							}
						}
					}
				}
			},
			touchstart(e) {
				// 计算 x y 轴点击位置
				var query = uni.createSelectorQuery().in(this)
				query.select('#drag').boundingClientRect()
				query.exec((res) => {
					this.topY = res[0].top
					this.topX = res[0].left
					let touchY = e.mp.touches[0].clientY - res[0].top
					let touchX = e.mp.touches[0].clientX - res[0].left
					this.deviationY = touchY % this.height
					this.deviationX = touchX % (this.windowWidth * 0.2)
					this.active = Number(e.currentTarget.dataset.index)
					this.index = Number(e.currentTarget.dataset.index)
				})
			},
			touchmove(e) {
				let temY = e.mp.touches[0].clientY - this.topY
				let temX = e.mp.touches[0].clientX - this.topX
				let touchY = temY - 15
				let touchX = temX - this.windowWidth * 0.1
				this.currentList[this.active].y = touchY
				this.currentList[this.active].x = touchX
				this.currentList[this.active].animation = false
				this.currentList.every((res, index) => {
					let absX = Math.abs(touchX - res.x)
					let absY = Math.abs(touchY - res.y)
					// 设置元素定点距离多少进行重排
					if (0 < absX && absX <= 10 && absY > 0 && absY <= 10 && this.active != index) {
						let temNumber = this.currentList[index].SortNumber
						this.currentList.every((_res, _index) => {
							// 判断从大像小移还是从小向大移
							if (this.currentList[this.active].SortNumber < this.currentList[index].SortNumber) {
								// 移动元素比目标元素所在位置小，之间元素排序--
								if (this.currentList[_index].SortNumber > this.currentList[this.active].SortNumber && this.currentList[
										_index].SortNumber <= this.currentList[index].SortNumber) {
									_res.SortNumber--
								}
							} else {
								if (this.currentList[_index].SortNumber < this.currentList[this.active].SortNumber && this.currentList[
										_index].SortNumber >= this.currentList[index].SortNumber) {
									_res.SortNumber++
								}
							}
							return true
						}, this)
						this.currentList[this.active].SortNumber = temNumber
						this.moveUpdateCurrentList(temNumber);
						return false
					} else {
						return true
					}
					if (_res.isShow == 0){ return true }
				}, this)
			},
			touchend(e) {
				if (this.currentList[this.active]) {
					this.currentList[this.active].animation = true
				}
				this.moveUpdateCurrentList(-1)
				this.active = -1;
			},
			listSort(){
				let array = this.currentList;
				array.sort(function(a, b) {
					return a.y - b.y
				})
				array.sort(function(a, b) {
					if (a.y == b.y) {
						return a.x - b.x
					}
				})
				this.currentList = array;
				this.endList = array;
			}
		}
	}
</script>

<style lang='less' scoped>
	.baseList{
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.baseList>.items{
		width: 20%;
		height: 80upx;
		border-radius: 5px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 80upx;
		margin-left: 26upx;
		color: #CCCCCC;
	}
	.baseList>.items:nth-of-type(3){
		margin-left: 32upx;
	}
	.drag-sort {
		width: 100%;
		height: 100%;
		margin-top: 36upx;
		box-sizing: border-box;
	}

	.wrapBox {
		width: 100%;
		text-align: left;
		color: white;
		background: white;
		z-index: 99;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 5% 5% 0 0;
	}

	.drag-sort-item {
		position: absolute !important;
		display: flex;
		height: 80upx;
		line-height: 80upx;
		align-items: center;
		width: 20%;
		text-align: center;
		color: #000;
		border-radius: 5px;
		border: 1px solid #ccc;
		box-sizing: border-box;

		.item {
			position: relative;
			flex: 1;
			font-size: 16px;
		}
		.touch-tight {
			width: 24px;
			display: flex;
			justify-content: center;
		}
	}

	.touch {
		height: 100%;
		width: 50px;
	}

	.active {
		box-shadow: 0 0 40rpx #DDDDDD;
		z-index: 99;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(204, 204, 204, .5);
		z-index: 50;
	}

	.header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.edit {
		color: #000;
		height: 60upx;
		line-height: 50upx;
		width: 140upx;
		border: 1px solid red;
		border-radius: 40upx;
		text-align: center;
		margin-top: 30upx;
		padding: 0 20upx;
	}

	.titleWrap {
		height: 100upx;
		line-height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.titleWrap {
		font-family: "Microsoft Yahei";
	}

	.titleWrap view:nth-of-type(1) {
		font-size: 40upx;
		color: black;
		margin-left: 20upx;
		letter-spacing: 2upx;
		font-weight: bold;
	}

	.titleWrap view:nth-of-type(2) {
		font-size: 30upx;
		color: #ccc;
		margin-left: 20upx;
	}
	.inp {
		padding: 5px 0px;
		font-size: 13px;
		margin: auto;
		margin-top: 10%;
		color: #868686;
		width: 90%;
		border: 1.2px solid #DEDEDE;
		border-radius: 5px;
	}

	.btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		display: flex;
		font-size: 13px;
	}

	.left {
		border-top: 1px solid #EAEAEA;
		border-right: 1px solid #EAEAEA;
		width: 50%;
		color: black;
		text-align: center;
		line-height: 40px;
	}

	.right {
		border-top: 1px solid #EAEAEA;
		width: 50%;
		color: #007AFF;
		text-align: center;
		line-height: 40px;
	}

	.hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.unShow1 {
		animation: go_out .3s;
	}

	@keyframes go_out {
		0% {
			transform: translate(-50%, -47%);
		}

		100% {
			transform: translate(0, 0);
		}
	}

	.unShow2 {
		display: none;
	}

	.show {
		animation: go_in 1s;
		display: block;
	}

	@keyframes go_in {
		0% {
			opacity: 0;
		}

		25% {}

		50% {}

		100% {
			opacity: 1;
		}
	}


	.list {
		width: 100%;
		height: 440upx;
	}

	.listItem {
		position: relative;
		float: left;
		width: 25%;
		height: 70upx;
		margin-top: 20upx;
		line-height: 70upx;
	}

	.listItem>.text {
		width: 150upx;
		height: 100%;
		margin-left: 20upx;
		text-align: center;
		color: #000;
		font-size: 30upx;
		border-radius: 10upx;
		border: 1px solid #ccc;
	}

	.drag-sort uni-movable-view>uni-view:nth-of-type(2) {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 26upx;
		width: 50upx;
		text-align: center;
		line-height: 50upx;
		color: #000;
	}
</style>

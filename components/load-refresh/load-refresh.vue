<template>
	<view class="load-refresh">
		<!-- 刷新动画 -->
		<view class="refresh hollow-dots-spinner">
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
		</view>
		<view class="cover-container" :style="[{
				background: backgroundCover,
				transform: coverTransform,
				transition: coverTransition
			}]"
		 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<scroll-view scroll-y show-scrollbar="true" class="list" @scrolltolower="loadMore"  :style="{height: (height)  + 'px',overflow:'hidden' }" :scroll-top="scrollTop"
			 @scroll="scroll">
				<!-- 数据集插槽 -->
				<slot name="content-list"></slot>
				<!-- 上拉加载 -->
				<view class="load-more">{{loadText}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		name: 'loadRefresh',
		props: {
			isRefresh: {
				type: Boolean,
				defaule: true
			},
			refreshTime: {
				type: Number,
				default: 800
			},
			heightReduce: {
				type: Number,
				default: 0
			},
			backgroundCover: {
				type: String,
				default: 'white'
			},
			pageNo: {
				type: Number,
				default: 0
			},
			totalPageNo: {
				type: Number,
				default: 0
			},
			message: {
				type: String,
				default: ''
			},
			media:{
				type: String,
				default: ''
			},
			home:{
				type: String,
				default: ''
			},
			integrate:{
				type: String,
				default: ''
			},
			chat:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				integrateValue:this.integrate,
				chatValue:this.chat,
				homeValue:this.home,
				mediaValue:this.media,
				messageValue:this.message,
				height:0,
				hasMore: true,
				moving: false,
				refresh: false,
				loading: false,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				playState: 'paused', // 动画的状态 暂停/开始
				old: {
					scrollTop: 0
				},
				scrollTop: 0,
			}
		},
		created() {
			if( this.mediaValue === 'media' ){
				this.mediaValue = '';
				let height = uni.getSystemInfoSync().windowHeight -  uni.upx2px(720);
				this.height = height;
			}else if(this.integrateValue === 'father'){//我的积分
				this.integrateValue = ''
				let height = uni.getSystemInfoSync().windowHeight -  uni.upx2px(230);
				this.height = height
			}else if(this.messageValue === 'father'){
				this.messageValue = ''
				let height = uni.getSystemInfoSync().windowHeight;
				this.height = height
			}else if(this.homeValue === 'home'){//视频模块
				this.homeValue = '';
				let height = uni.getSystemInfoSync().windowHeight -  uni.upx2px(230);
				this.height = height;
			}else if( this.chatValue === 'chat' ){
				this.homeValue = '';
				let height = uni.getSystemInfoSync().windowHeight -  uni.upx2px(180);
				this.height = height;
			} else{
				let height = uni.getSystemInfoSync().windowHeight -  uni.upx2px(70);
				this.height = height;
			}
		},
		computed: {
			// 计算组件所占屏幕高度
			getHeight() {
				let height = uni.getSystemInfoSync().windowHeight;
				this.height = height
				// return `height: ${height}px;`
			},
			// 判断loadText
			// 可以根据需求自定义
			loadText() {
				const {
					pageNo,
					totalPageNo,
					loading
				} = this
				if (loading) {
					return '加载中...'
				} else if (pageNo < totalPageNo) {
					return '上拉加载更多'
				} else {
					return '已经到底啦~'
				}
			}
		},
		watch: {
			// 监听refresh值 避免多次触发@refresh
			'refresh'(val) {
				if (val) {
					this.$emit('refresh')
				}
			}
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop; 
				this.$emit("scroll",e)
			},
			// 根据pageNo和totalPageNo的值来判断 是否触发@loadMore
			loadMore() {
				const {
					pageNo,
					totalPageNo
				} = this
				if (pageNo < totalPageNo) {
					this.loading = true
					this.$emit('loadMore')
				}
			},
			// 单次加载结束
			loadOver() {
				this.loading = false
			},
			// 回弹效果
			coverTouchstart(e) {
				if (!this.isRefresh) {
					return
				}
				if (pageAtTop === false) {
					return
				}
				this.coverTransition = 'transform .1s linear'
				startY = e.touches[0].clientY
				this.playState = 'running'
			},
			coverTouchmove(e) {
				if (!this.isRefresh) {
					return
				}
				moveY = e.touches[0].clientY
				let moveDistance = moveY - startY
				if (moveDistance < 0) {
					this.moving = false
					return
				}
				this.moving = true
				if (moveDistance >= 60 && moveDistance < 100) {
					moveDistance = 60
				}
				if (moveDistance > 40 && moveDistance <= 60) {
					this.refresh = true
					this.coverTransform = `translateY(${moveDistance}px)`
				}
			},
			coverTouchend() {
				if (!this.isRefresh) {
					return
				}
				setTimeout(() => {
					if (this.moving === false) {
						return
					}
					this.moving = false
					this.refresh = false
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
					this.playState = 'paused'
				}, this.refreshTime)
			},
			runRefresh() {
				// 开始
				this.refresh = true
				this.coverTransition = 'transform .1s linear'
				this.coverTransform = `translateY(60px)`
				this.playState = 'running'
				// 结束
				setTimeout(() => {
					this.refresh = false
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
					this.playState = 'paused'
				}, this.refreshTime);
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.load-refresh {
		margin: 0;
		padding: 0;
		width: 100%;

		.refresh {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 120rpx;
			width: 100%;
		}

		.hollow-dots-spinner,
		.hollow-dots-spinner * {
			box-sizing: border-box;
		}

		.hollow-dots-spinner {
			height: 100rpx;
			width: 100%;
		}

		.hollow-dots-spinner .dot {
			width: 15px;
			height: 15px;
			margin: 0 calc(15px / 2);
			border: calc(15px / 5) solid #04C4C4;
			border-radius: 50%;
			float: left;
			transform: scale(0);
			animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
		}

		.hollow-dots-spinner .dot:nth-child(1) {
			animation-delay: calc(300ms * 1);
		}

		.hollow-dots-spinner .dot:nth-child(2) {
			animation-delay: calc(300ms * 2);
		}

		.hollow-dots-spinner .dot:nth-child(3) {
			animation-delay: calc(300ms * 3);

		}

		@keyframes hollow-dots-spinner-animation {
			50% {
				transform: scale(1);
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		.cover-container {
			width: 100%;
			margin-top: -100rpx;
			.list {
				width: 100%;

				.load-more {
					font-size: 32rpx;
					text-align: center;
					color: #AAAAAA;
					padding: 16rpx;
				}
			}
		}
	}
</style>

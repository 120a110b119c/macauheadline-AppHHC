<template>
	<view class="marquee">
		<view class="marquee_box" ref="marquee_box" style="height: 140upx;line-height: 140upx;">
			<ul class="marquee_list" :class="{marquee_top:animate}">
				<li v-for="(item,index) in list" :key="index" @click="toDeatil(item)">{{systemInfolanguage=='en'?item.DatTitleFT:item.DatTitle}}</li>
			</ul>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				animate: false,
				list: []
			}
		},
		props:{
			systemInfolanguage:{ type:String }
		},
		created() {
			// 页面显示
			setInterval(this.showMarquee, 5000);
			this.getData();
		},
		methods: {
			getData() {
				let _this = this;
				this.$Httpps
					.sttp({
						"action": "getmorningnews"
					})
					.then(res => {
						if( res.data.result == 'suc' ){
							_this.list = res.data.data;
						}
					}).catch(err => {
						console.log(err);
				});
			},
			// 处理数组方法
			showMarquee() {
				this.animate = true
				this.list.push(this.list[0])
				setTimeout(() => {
					this.list.shift()
					this.animate = false
				}, 4000)
			},
			toDeatil(item) {
				uni.navigateTo({
					url: '../index/Headlines?datId=' + item.DatId
				})
			}
		}
	}
</script>
<style scoped>
	ul li {
		list-style: none;
	}

	.marquee {
		width: 100%;
		align-items: center;
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		font-size: 36upx;
		line-height: 60upx;
		color: #010101;
	}

	.marquee_title {
		height: 60px;
		font-size: 14px;
		border-right: 1px solid #d8d8d8;
		align-items: center;
	}

	.marquee_box {
		display: block;
		position: relative;
		width: 100%;
	}

	.marquee_list {
		display: block;
		position: absolute;
		top: 0px;
		left: 0;
		padding: 0 !important;
		width: 100%;
	}

	.marquee_top {
		transition: all 1s;
		margin-top: -140upx;
	}

	.marquee_list li {
		display: flex;
		align-items: left;
		justify-content: flex-start;
		width: 100%;
		height: 140upx;
		padding-top: 10upx;
		font-size: 14px;
		font-size: 36upx;
		line-height: 60upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		box-sizing: border-box;
	}

	.marquee_list li span {
		padding: 0 2px;
	}
</style>

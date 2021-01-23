<template>
	<div class="carousel">
		<transition-group class="clearfix slide" name='image'>
			<li v-for='(item,index) in lists' :key='item.DatId' v-show='index===mark' @click="toDeatil(item)">
				{{item.DatTitleFT}}
			</li>
		</transition-group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				mark: 0,
				timer: null,
				lists: []
			}
		},
		created() {
			this.play();
			this.getData();
		},
		methods: {
			getData(){
				let _this = this;
				this.$Httpps
					.sttp({
						"action": "getbreakingnews"
					})
					.then(res => {
						_this.lists = res.data.data;
						console.log(_this.lists,'_this.lists');
					}).catch(err => {
						console.log(err);
				});
			},
			autoPlay() {
				let length = this.lists.length;
				this.mark++;
				if (this.mark === length) {
					this.mark = 0
					return
				}
			},
			play() {
				setInterval(this.autoPlay, 5000)
			},
			toDeatil(item){
				let DatId = item.DatId;
				uni.navigateTo({
					url:"../getdatadetail/getdatadetail?item="+DatId
				})
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.clearfix {
		content: '';
		clear: both;
		display: block;
	}

	.carousel {
		width: 100%;
		height: 70upx;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		background-color: rgba(95,95,95,.3);
		top: 632upx;
	}

	.slide {
		width: 100%;
		height: 50upx;
	}

	li {
		position: absolute;
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		padding-left: 10upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		box-sizing: border-box;
	}
	.v-enter-active,
	.v-leave-active,
	.image-enter-active,
	.image-leave-active,
{
		transform: translateX(0);
		transition: all 2s ease;
		opacity: 1;
	}

	.v-leave-active,
	.iamge-leave-active{
		transform: translateX(-100%);
		transition: all 2s ease;
		opacity: 0;
	}

	.v-enter,
	.image-enter{
		transform: translateX(100%);
		opacity: 1;
	}
	.v-leave,
	.image-leave {
		transform: translateX(0);
		opacity: 1;
	}
</style>

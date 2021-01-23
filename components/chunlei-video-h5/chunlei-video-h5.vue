<template>
	<view class="box">
		<video :direction="direction" :src="src" @play='videoClickPlay' :loop="loop" @timeupdate="timeupdate"
			:id="`video_${src}`" ref="chunleiVideo" class="video" objectFit="fill">
			<!-- <cover-image class="img" @tap.stop="clickMask(idx)" v-show="playIndex!=idx" :src="poster" ></cover-image>
			<cover-image v-show="playIndex!=idx" @tap.stop="clickMask(idx)" src="@/static/videoIcon/videoPlay.png" class="videoPlayImg"></cover-image> -->
		</video>
	</view>
</template>

<script>
	export default{ 
		props:{
			src:{
				type:String,
				default:''
			},
			playState:{
				type:Boolean,
				default:false
			},
			poster:{ //视频封面的图片
				type:String,
				default:''
			},
			playIndex:{
				type:Number,
				default:0
			},
			idx:{
				type:Number,
				default:0
			},
			indexNow:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				time:0,
				direction:-90,
				loop:false,
				playFirst:true
			}
		},
		mounted() {
			this.videoCtx = uni.createVideoContext(`video_${this.src}`,this)
		},
		methods:{
			timeupdate(event){
				// this.time = event.detail.currentTime
			},
			clickMask(idx){
				// this.$emit('clickMask',idx)
			},
			videoPlay(){
				if(this.play){
					this.videoCtx.play();
					if(this.playFirst){
						this.videoCtx.seek(this.startTime)
						this.playFirst = false
					} 
				}else{
					this.videoCtx.pause();
					this.$emit('pause',this.time)
				}
			},
			playVideoss(){
				console.log('调用了')
				this.videoCtx.play();
			},
			videoClickPlay(){
				
			},
			waiting(){
				
			}
		},
		watch:{
			playState(newVal,oldVal){
				console.log('来到了改变视频的方法')
				this.videoPlay()
			},
			startTime:{
				immediate: true,
				handler(newVal,oldVal){
					this.time = newVal
				}
			}
		},
		computed:{
		}
	}
</script>

<style scoped>
	.box{
		position: relative;
	}
	.video{
		height: 440upx;
		width: 750upx;
		display: flex;
	}
	.img{
		position: absolute;
		height: 440upx;
		top: 0;
		left: 0;
		width: 750upx;
		z-index: 99;
	}
	.videoPlayImg{
		width: 80upx;
		height: 80upx;
		margin: 180upx auto;
	}
</style>

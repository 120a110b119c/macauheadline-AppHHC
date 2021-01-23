<template>
	<view>
		<view class="detailHeader" @tap.self="iconHidden()">
			<view class="icon iconfont icon-zuojiantou" @tap="toHome()"></view>
			<view>
				<view v-show="!iconShow" class="icon iconfont icon-shenglvehao" @click.stop="toIconShow()"></view>
				<transition name="myBox" v-if="iconShow">
					<view class="iconBox">
						分享
					</view>
				</transition>
			</view>
		</view>
		<view class="detaileContent">
			<chat-content :itemList="itemList"></chat-content>
		</view>
	</view>
</template>

<script>
	import chatContent from './component/chatContent.vue'
	export default{
		components:{
			chatContent
		},
		data(){
			return{
				iconShow:false,
				itemList:{}
			}
		},
		methods:{
			toHome(){
				uni.switchTab({
					url:'chat'
				})
			},
			iconHidden(){
				console.log('111');
				this.iconShow = false
			},
			toIconShow(){
				console.log('22222');
				this.iconShow = true;
			}
		}
	}
</script>

<style scoped>
	.detailHeader{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30upx;
	}
	.detailHeader .icon{
		font-size: 66upx;
	}
	.iconBox{
		width: 250upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		background-color: black;
		overflow: hidden;
		color: #FFF;
	}
	.iconBox-leave-active,.iconBox-enter-active{
		transition: all 2s ease;
	}
	.iconBox-leave-active{
		margin-left: 0!important;
	}
	.iconBox-leave,.iconBox-enter-active{
		margin-left: -250upx;
	}
	.detaileContent{
		position: absolute;
		left: 0;
		top: 132upx;
	}
</style>

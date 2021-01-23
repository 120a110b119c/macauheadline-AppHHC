<template>
	<view class="page">
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
			<view class="contentWrap">
				<view class="contentList-item">
					<view class="item-tit">问吧游玩指南</view>
					<view class="userWrap">
						<image src="../lift/image/noData.png" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
						<view style="margin-left: 20upx;font-size: 34upx;letter-spacing: 1upx;">问吧服务生</view>
					</view>
					<view class="contentBox" style="margin-top: 30upx;">
						<view class="circleBox">
							<view class="icon iconfont icon-qianbi"></view>
							<view @tap="toAnswer()" style="color: #212121;font-weight: bold;letter-spacing: 1upx;font-size: 30upx;">写回答</view>
						</view>
					</view>
				</view>
				<view class="contentList-content">
					<view class="userWrap">
						<image src="../lift/image/noData.png" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
						<view style="margin-left: 40upx;font-size: 34upx;letter-spacing: 1upx;">问吧服务生</view>
					</view>
					<view class="content-header">
						欢迎光临问吧。这里是一个开放的问答社区,你可以在此讨论与珠海相关的有意思的话题。
					</view>
					<view class="content-item">
						<view>#内容分类#</view>
						<view>※在提出问题时,你可以为问题自行标注相关的标签;</view>
						<view>※若你为标注、或管理员审核后认为分类不明确,该问题的标签将被协助更改;</view>
						<view>※你还可以根据问题标签搜索感兴趣的问题;</view>
						<view>※以下是问吧内容版快设置:</view>
						<view>【地胆题】珠海本土文化、人文知识相关问题。</view>
						<view>【城事题】珠海时事相关问题。</view>
						<view>【职场题】工作、求职、跳槽相关问题。</view>
						<view>【生活题】家长里短相关问题。</view>
						<view>【情感题】爱情、亲情、友情......欢迎在此倾述真情。</view>
						<view>【赏玩题】珠海各种好玩、好吃、好看、好听的问题。</view>
						<view>【办事题】市民办事相关问题。</view>
						<view>※更多相关板块,敬情期待。</view>
					</view>
					<view class="content-item">
						<view>#提问建议#</view>
						<view>※问题是问吧发起讨论的基础,它应该是一个问句;</view>
						<view>※你可以使用"是什么""为什么""有什么""如何""怎么样"等词语完成你的问题。</view>
						<view>※如果你讨论的话题暂时未能总结出核心问题、或你不想在问题中表达倾向或观点、你可以使用"如何评价"来完成提问。</view>
						<view>※问题的叙述应当尽量客观、中立、语气平和;你可以在问题摘要中补充说明你的观点和态度。</view>
					</view>
					<view class="content-item">
						<view>#回答建议#</view>
						<view>※若你对自己在某一个问题下的回答不满意、或者你有更多希望补充的内容,你可以在同一个问题下重新作答、或者持续补充新的内容,管理员会协助你更新回答;</view>
					</view>
					<view class="content-item">
						<view>#内容规范#</view>
						<view>※问吧致力打造高质量内容生态,以下信息将被禁止发布;</view>
						<view>1、违反国家相关法律法规及[七条底线]、[九不准]管理规定的信息;</view>
						<view>2、谣言及虚假信息;</view>
						<view>3、不友善内容;</view>
						<view>4、垃圾广告信息,以推广曝光为目的、影响用户体验、扰乱问吧内容生态的内容;</view>
						<view>5、其他恶意、有害信息。</view>
					</view>
				</view>
			</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				swiperheight: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				iconShow: false
			}
		},
		methods: {
			iconHidden(){
				this.iconShow = false
			},
			toIconShow(){
				this.iconShow = true;
			},
			toHome(){
				uni.switchTab({
					url:"./chat"
				})
			},
			toAnswer() {
				uni.navigateTo({
					url: './answer'
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		background: #F3F3F3;
	}
	
	
	.contentWrap {
		position: absolute;
		top: 182upx;
		left: 0;
		width: 100%;
	}

	.contentList-item {
		display: inline-block;
		width: 100%;
		background-color: #FFFFFF;
	}

	.contentList-item:last-child {
		margin-bottom: 0;
	}

	.contentList-item {
		width: 100%;
		padding: 30upx;
		padding-top: 0;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.contentList-item>.item-tit {
		font-size: 46upx;
		letter-spacing: 2upx;
		margin-bottom: 30upx;
		color: #212121;
		font-weight: bold;
	}

	.contentList-content {
		margin-top: 30upx;
		width: 100%;
		padding: 30upx;
		background-color: #FFFFFF;
	}

	.userWrap {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.contentBox {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.circleBox {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200upx;
		height: 80upx;
		border-radius: 50upx;
		border: 2upx solid #CCCCCC;
	}

	.circleBox>.icon {
		margin-right: 10upx;
		font-size: 36upx;
	}

	.detailHeader {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30upx;
		padding-top: 90upx;
		padding-bottom: 0;
		background-color: #FFFFFF;
	}

	.detailHeader .icon {
		font-size: 66upx;
	}

	.iconBox {
		width: 250upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		background-color: black;
		overflow: hidden;
		color: #FFF;
	}

	.iconBox-leave-active,
	.iconBox-enter-active {
		transition: all 2s ease;
	}

	.iconBox-leave-active {
		margin-left: 0 !important;
	}

	.iconBox-leave,
	.iconBox-enter-active {
		margin-left: -250upx;
	}


	.content-header {
		margin: 30upx 0;
		font-size: 32upx;
		color: #212121;
	}

	.content-item {
		margin-bottom: 30upx;
		font-size: 32upx;
		line-height: 50upx;
		color: #212121;
	}
</style>

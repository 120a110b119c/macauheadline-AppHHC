<template>
	<view class="wrap">
		<view class="nav">{{datTitle}}</view>
		<view class="nav_bottom">
			<view>全部評論</view>
			<view class="numbers">{{list.length}}</view>
		</view>
		<view class="wrapSend">
			<block v-for="(items,index) in list" :key="index">
				<view class="userSend">
						<view class="navImage">
							<image src="../../static/logo/icon.png" mode=""></image>
						</view>
						<view class="content">
							<view class="top">
								<view >{{items.DdsUsrName}}</view>
							</view>
							<view class="centers">{{items.DdsContent}}</view>
						<!-- 	<view class="bottoms" @click="deleteItems(index)">删除</view> -->
						</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datTitle: '',
				list:[],
				length:0
			}
		},
		methods: {
			// 删除
			deleteItems(i){
				this.list.splice(i,1);
			}
		},
		onLoad(opation) {
			console.log(opation,'110');
			this.datTitle = opation.datTitle;
			this.list = JSON.parse(decodeURIComponent(opation.sendArray));
			this.length = opation.length;
		}
	}
</script>

<style scoped>
	.wrap {
		width: 100%;
		height: 100%;
		
	}

	.nav {
		font-size: 50upx;
		color: #343434;
		font-weight: bold;
		width: 100%;
		text-align: justify;
		text-justify: inter-word;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.nav_bottom{
		width: 100%;
		margin-top: 30upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.nav_bottom>view{
		margin-right: 10upx;
	}
	
	
	
	.wrapSend{
		margin-top: 50upx;
		width: 100%;
		height: 100%;
	}
	.bgColor{
		color: red!important;
	}
	.userSend{
		width: 100%;
		padding: 0 20upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		box-sizing: border-box;
		margin-bottom: 70upx;
	}
	.userSend>.navImage{
		margin-top: 30upx;
		width: 80upx;
		height: 80upx;
		margin-right: 10upx;
	}
	.userSend>.navImage uni-image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.userSend>.content,
	.userSend>.content>.top{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20upx;
	}
	.userSend>.content>.top{
		flex-direction: row;
	}
	.userSend>.content>.centers{
		text-align: left;
	}
	.userSend>.content>.bottoms{
		margin-top: 30upx;
		text-align: left;
		font-size: 32upx;
		color: #CCCCCC;
	}
	/* userSend  end */
</style>

<template>
	<view>
		我是语音合成界面
		<button type="default" @click="list">大V今年是大V你</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			list(){
				uni.request({
					url: 'http://openapi.baidu.com/oauth/2.0/token',
					method: 'POST',
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {
						grant_type: 'client_credentials',
						client_id: '22939351',
						client_secret: 'ZNgUDDZqfawGjlcgO0qnGmhL',
						'tex': '塑胶地板是发布是安徽省吧擦HSBCA货素材吧换算成把安徽市场部'
					},
					success: (result) => {
						console.log('result',result)
						if (result.statusCode !== 200) {
							return;
						}
						uni.setStorageSync('videoUrl',result.data.body.video_url)
						this.$set(this,'videoUrl',result.data.body.video_url);
						this.$set(this,'videoUrlImage',result.data.body.cover_url);
					},
					fail: (err) => {
						console.log('获取接口返回错误:', err);
					},
				});
			}
		}
	}
</script>

<style>
</style>

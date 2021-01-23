<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>

<script>
	import {
		isNeedLogin
	} from '@/utils/index.js'
	if (uni.getSystemInfoSync().platform === 'android') {
		const main = plus.android.runtimeMainActivity();
		const Intent = plus.android.importClass("android.content.Intent");
	}
	export default {
		onLaunch() {
			if (uni.getSystemInfoSync().platform == 'ios') {
				
				this.checkArguments(); // 检测启动参数 // 这是默认的监听参数 也就是应用初始化的时候监听  
				// #ifdef APP-PLUS
				// 监听后台恢复 这是利用5+的方式 处理 APP进入后台后 再进入到APP前台时参数监听  
				plus.globalEvent.addEventListener('newintent', (e) => {
					this.checkArguments(); // 检测启动参数  
				});
				// #endif
			}
			setTimeout(() => {
				// #ifdef APP-PLUS
				var args = plus.runtime.arguments;
				//去新聞詳情
				if (args.indexOf("datId") > 0) {
					let datDetailId = args.substring(args.indexOf("datId") + 5, args.length)
					uni.setStorageSync("datDetailId", datDetailId);
				}
				// #endif
			}, 10);
		},
		onShow() {
			if (uni.getSystemInfoSync().platform === 'android') {
				this.setPath();
			}
		},
		onHide() {
			uni.removeStorageSync("datDetailId");
		},
		methods: {
			checkArguments() {
				// #ifdef APP-PLUS
				if (plus.runtime.launcher == 'shortcut') {
					try {
						var cmd = JSON.parse(plus.runtime.arguments);
						var type = cmd && cmd.type;
						setTimeout(r => {
							switch (type) {
								case 'push':
									if (isNeedLogin()) {
										uni.navigateTo({
											url: '/pages/me/register/register'
										});
										return
									}
									uni.navigateTo({
										url: '/pages/media/mediaPersonal'
									});
									break;
								case 'tfboys':
									uni.navigateTo({
										url: '/pages/index/tipster/index'
									});
									break;
							}
						}, 800);
					} catch (e) {
						console.log('Shortcut-exception: ' + e);
					}
				}
			    // #endif
			},
			
			setPath() {
				/**
				 * XZH-Shortcut 开始
				 */
				uni.setStorageSync('stopJump',1);
				const main = plus.android.runtimeMainActivity();
				const Intent = plus.android.importClass("android.content.Intent");
				const intent = main.getIntent();
				let path = intent.getStringExtra("path"); // list 里面的 path
				//根据 path路径 进行跳转
				if (path === null) return;
				//使用 $nextTick 延时跳转，避免在 tabBar 页面出现 BUG
				this.$nextTick(function() {
					if (!uni.getStorageSync('data') && path == '/pages/media/mediaPersonal') { //判断是否登录  判断跳转的路径是否要登录才能跳转
						path = '/pages/me/register/register' //把跳转的页面路径替换成登录页
					}
					uni.navigateTo({
						url: path,
						success() {
							//移除跳转路径，避免重复跳转
							intent.removeExtra("path");
						},
						fail() {
							console.log('失败');
						}
					});
				})
				/**
				 * XZH-Shortcut 结束
				 */
			}
		}
	}
</script>
<style>
	@import url("./utils/css/common.css");
	@import url("./utils/css/animate.css");
	@import '@/common/icon.css';

	/* 修改tabbar角标样式 */
	.uni-tabbar__badge {
		border: 1px solid #FFFFFF !important;
		line-height: 14px;
		font-size: 10px;
	}
</style>

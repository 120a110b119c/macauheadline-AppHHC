<template>
    <view class="easy-loadimage">
        <image class="origin-img" :src="imageSrc" :mode="mode"
            v-show="showImg"
            @load="handleImgLoad" >
        </image>
        <view class="easy-loadimage" style="background-color: #ababab;" v-show="!showImg"></view>
    </view>
</template>
<script>
// 生成全局唯一id
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}
export default{
    props:{
        imageSrc:{
            type: String,
        },
        mode:{
            type: String,
        },
        loadingMode:{
            type: String,
            default:'looming-gray'
        },
        openTransition:{
            type: Boolean,
            default:true,
        },
    },
    data(){
        return {
            loadImg:false,
            showImg:false,
            isLoadError:false,
            showTransition:false,
        }
    },
    methods:{
        handleImgLoad(e){
           let imgsetTime = setTimeout(()=>{
			    this.showImg = true;
				clearTimeout(imgsetTime)
		   },500)
        },
    },
}
</script>

<style scoped>
    /* 官方优化图片tips */
    image{
        will-change: transform
    } 
    /* 渐变过渡效果处理 */
    .origin-img{
        width: 100%;
        height: 100%;
		transform:fadeShow 0.5s ;
    }
	@keyframes fadeShow{
		0%{ opacity: 0;}
		100%{opacity: 1;}
	}
	.easy-loadimage{
		width: 100%;
		height: 100%;
	}
    
   
</style>


<template>
		<view :class="darkMode?'cover':''">
			<!--  -->
			
		</view>
</template>

<script>
	export default {
		name:'customCover',
		data() {
			return {
				darkMode:false
			}
		},
		created(){
			if(uni.getStorageSync('darkMode')){
				this.darkMode = true
			}else{
				this.darkMode = false
			}
		},
		methods: {
			changeDarkMode(value){
				this.darkMode = value
			},
		}
	}
</script>

<style scoped>
.cover{
    position:fixed;
    top: 0px;
    left: 0px;
    outline:5000px solid rgba(0, 0, 0, 0.3);
    z-index: 99999999;
}
</style>

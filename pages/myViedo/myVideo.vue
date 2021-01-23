<template>
	<view>
		<modalDiy @returNavList=returNavList :ifHome="ifHome" @returnList=returnList @returnDate=returnDate :list="list" :baseList="baseList"  :isShow="show" @cancel='cancel()' :inp=true @ok='ok()' okCor='red'></modalDiy>
	</view>
</template>

<script>
	import modalDiy from './components/modal.vue'
	export default {
		components:{
			modalDiy
		},
		data(){
			return{
				show:true,
				list:[],
				ifHome:0,
				baseList:[]
			}
		},
		onLoad(options) {
		  let obj = JSON.parse(options.data);
		  let baseList = obj.splice(0,2);
		  this.baseList = baseList;
		  this.list = obj;
		  this.ifHome = options.indexs;
		},
		methods:{
			returnDate(i){
				uni.setStorageSync('storage_index', i);
				if( this.ifHome ==='1' ){
					uni.switchTab({
						url: '../index/home'
					})
				}else{
					uni.switchTab({
						url: '../video/video'
					})
				}
			},
			returNavList(d){
				this.list = d;
			},
			returnList(d){
				if( this.ifHome ==='1' ){
					uni.setStorage({key: 'storage_homeList',data: d});
					uni.switchTab({
						url: '../index/home'
					})
				}else{
					uni.switchTab({
						url: '../video/video'
					})
				}
			}
		}
	}
</script>

<style>
</style>

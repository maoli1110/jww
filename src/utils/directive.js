import Vue from 'vue'
Vue.directive('img',{
	inserted:function(el,binding){
		setTimeout(function(){
			console.log('我是指令控制的文件')
		},100)
	}
})

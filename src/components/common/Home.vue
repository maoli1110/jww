<template>
    <div class="wrapper">
        <div class="content">
            <transition name="move" mode="out-in">
                    <router-view></router-view>
            </transition>
            <audio id="bg-music" controls="controls" autoplay="autoplay" style="display:none" loop="loop">
              <source :src="audioUrl" type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
function audioAutoPlay(id){ 
    let audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function (){
       play(); 
    }, false);
    document.addEventListener("touchstart",play, false);
}
export default {
    data(){
        return{
            audioUrl:'./static/win.mp3'
        }  
    }, 
    methods:{
        setAuthority(){
            this.$refs.navbar.selectMenu()
        }
    },
    mounted() {
        audioAutoPlay('bg-music');
    }
}
</script>
<style scoped>
</style>


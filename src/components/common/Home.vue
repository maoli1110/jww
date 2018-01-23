<template>
    <div class="wrapper">
        <div class="content">
            <transition name="move" mode="out-in">
                    <router-view></router-view>
            </transition>
            <audio controls="controls" autoplay="autoplay" style="display:none" loop="loop">
              <source :src="audioUrl" type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
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
    }
}
</script>
<style scoped>
</style>


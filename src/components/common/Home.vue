<template>
    <div class="wrapper">
        <div class="content">
            <transition name="move" mode="out-in">
                    <router-view></router-view>
            </transition>
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
    },
    mounted() {
    }
}
</script>
<style scoped>
</style>


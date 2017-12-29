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


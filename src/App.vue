<template>
    <div id="app" >
        <router-view ref="main" ></router-view>
    </div>
</template>
<style>
@import '../static/css/common.css';
@import '../static/css/app.min.css';
#app {
    height: 100%;
}
.wrapper, .content, .in-game{
	height: 100%;
}
</style>
<script>
    export default {
    data(){
        return {
        }
    },
}

</script>

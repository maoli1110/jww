<template>
<div>
    <div class="ingame-1"></div>
    <div class="ingame-2"></div>
    <div class="ingame-3"></div>
    <div class="op-btn">
        <div></div>
        <div></div>
    </div>
    <div class="go-bt"><img src="" alt=""></div>
    <div class="pay-bag-button">
        <div class="pay"><img :src="pay1Img" alt=""></div>
        <div class="bag"><img :src="bag1Img" alt=""></div>
    </div>
    <div class="back" @click="back()"><img :src="back1Img" alt=""></div>
</div>
</template>
</template>


<script>
export default {
    data() {
        return {
            btGo1Img:'./static/img/ingame_btn_go1.png',
            btGo2Img:'./static/img/ingame_btn_go2.png',
            btLeft1Img:'./static/img/ingame_btn_left1.png',
            btLeft2Img:'./static/img/ingame_btn_left2.png',
            btRight1Img:'./static/img/ingame_btn_right2.png',
            btRight2Img:'./static/img/ingame_btn_right2.png',
            btUp1Img:'./static/img/ingame_btn_up1.png',
            btUp2Img:'./static/img/ingame_btn_up2.png',
            btDown1Img:'./static/img/ingame_btn_down1.png',
            btDown2Img:'./static/img/ingame_btn_down2.png',
            pay1Img:'./static/img/ingame_btn_pay1.png',
            pay2Img:'./static/img/ingame_btn_pay2.png',
            pay3Img:'./static/img/ingame_btn_pay3.png',
            bag1Img:'./static/img/ingame_btn_bag1.png',
            bag2Img:'./static/img/ingame_btn_bag2.png',
            back1Img:'./static/img/ingame_btn_back1.png',
            back2Img:'./static/img/ingame_btn_back2.png'
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        }
    },
    created(){ 
        
    }
}
</script>

<style scoped>
.container{
    overflow: hidden;
}
.ingame-1 {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg1.png") no-repeat center fixed;
    background-size:100% 100%;
}
.ingame-2 {
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg2.png") no-repeat center fixed;
    background-size:100% 100%;
}
.ingame-3 {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg3.jpg") no-repeat center fixed;
    background-size:100% 100%;
}
.pay-bag-button {
    position: fixed;
    z-index: 4;
    bottom: 0;
    width: 100%;
    height: 16%;
}
.pay-bag-button .pay{
    width: 30%;
    float: left;
}
.pay-bag-button .bag{
    width: 30%;
    float: right;
}
.back{
    position: fixed;
    z-index: 4;
    top: 0;
    width: 100%;
    height: 16%;
}
</style>

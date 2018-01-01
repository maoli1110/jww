<template>
<div>
    <div class="ingame-1"></div>
    <div class="ingame-2"></div>
    <div class="ingame-3"></div>
    <div class="level__medium">
    <div id="ex_doll_game">
        <div class="doll-machine">
            <div class="machine" id="machine">
                <div class="machine-clip" id="machine-clip"
                     style="transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75); transform: translateY(0px);">
                    <i class="machine-clip-line" id="machine-clip-line" style="height: 433px;"></i>
                    <i class="machine-clip-origin"></i>
                    <div class="machine-clip-arm machine-clip-arm__left">
                        <i class="machine-clip-arm_item"></i>
                    </div>
                    <div class="machine-clip-arm machine-clip-arm__right">
                        <i class="machine-clip-arm_item"></i>
                    </div>
                </div>
                <div class="doll-box">
                    <ul class="doll-list rolling" id="doll-list" style="width:10rem;"></ul>
                </div>
                <div class="doll-box doll-box__small">
                    <ul class="doll-list" id="doll-list__small"
                        style="width:15rem;-webkit-animation:dollListMove__small 15s .1s cubic-bezier(0.43, 0.43, 0.56, 0.56) infinite both;animation:dollListMove__small 15s .1s cubic-bezier(0.43, 0.43, 0.56, 0.56) infinite both">
                    </ul>
                </div>
                <i class="machine-bg_bd"></i>
                <i class="machine-bg_floor" id="machine-bg_floor"></i>
                <i class="machine-bg_bot"></i>
                <i class="machine-bg_repeat"></i>
                <div class="atm">
                    <img src="static/img/packet.png" alt="">
                </div>
            </div>
            <i class="doll-machine_corner doll-machine_corner__1"></i><i
                class="doll-machine_corner doll-machine_corner__2"></i><i
                class="doll-machine_corner doll-machine_corner__3"></i><i
                class="doll-machine_corner doll-machine_corner__4"></i>
            <div class="machine-tips-box cpm-hide">
                <div class="machine-tips">
                    <div class="machine-tips_txt"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="op-btn clearfix">
        <div class="operation-btn pull-left">
            <div class="left-right">
                <img :src="btLeft1Img" alt="">
                <img :src="btRight1Img" alt="">
            </div>
            <div class="up-down ">
                <img :src="btUp1Img" alt="">
                <img :src="btDown1Img" alt="">
            </div>    
        </div>
        <div class="doll-bets-btn pull-right"><img :src="btGo1Img" alt=""></div>
    </div>
    <div class="go-bt"><img src="" alt=""></div>
    <div class="pay-bag-button">
        <div class="pay" @click="payVisbile=true;"><img :src="pay1Img" alt=""></div>
        <div class="bag" @click="recordVisible=true;"><img :src="bag1Img" alt=""></div>
    </div>
    <div class="back" @click="back()"><img :src="back1Img" alt=""></div>
    <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
    <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide"></v-record>
</div>
</template>
<script>
import vPaylist from "../CompanyProfile/pay.vue";
import vRecord from '../CompanyProfile/record.vue';
export default {

    data() {
        return {
            btGo1Img:'./static/img/ingame_btn_go1.png',
            btGo2Img:'./static/img/ingame_btn_go2.png',
            btLeft1Img:'./static/img/ingame_btn_left1.png',
            btLeft2Img:'./static/img/ingame_btn_left2.png',
            btRight1Img:'./static/img/ingame_btn_right1.png',
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
            back2Img:'./static/img/ingame_btn_back2.png',
            payVisbile:false,
            recordVisible:false,
        }
    },
    methods: {
        panelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
        },
        back(){
            this.$router.go(-1);
        }
    },
    components: {vPaylist,vRecord},
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
    height: 10%;
}
.back>img{
    height: 0.6rem;
    float:left;
    padding:0.1rem;
}
.op-btn {
    position: absolute;
    z-index: 3;
    width: 1rem;
    bottom: 14%;
    width: 100%;
}
.left-right {
    position: absolute;
    bottom: 21%;
    left: 5%;
}
.left-right > img {
    width: 25%;
    display: inline-block;
    margin-left: 15%;

}
.up-down {
    width: 20%;
    position: absolute;
    bottom: -19%;
    margin-left: 19%;
}
.up-down > img{
    padding: 13%;
}
.doll-bets-btn{
    width: 30%;
    margin-right: 10%;
}
</style>

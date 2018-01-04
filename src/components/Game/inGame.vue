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
                        <li class="doll-item doll-item-single" data-index="453" data-theme="1" style="display:none">    
                             <div class="doll-img doll-img__monkey">     
                                <div class="doll-img_move">       
                                    <i class="doll-img_face doll-img_face__1"></i>      
                                    <div class="doll-img_name doll-img_name__goods">         
                                        <span class="doll-img_txt"></span>        
                                    </div>         
                                       <i class="doll-img_body"></i>     
                                </div>    
                                <i class="doll-img_shadow"></i>   
                                <i class="doll-img_smoke"></i>     
                                <i class="doll-img_tag"></i>    
                            </div>  
                        </li>
                    </div>
                    <div class="doll-box">
                        <ul class="doll-list" id="doll-list3">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="doll-list" id="doll-list2">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="doll-list" id="doll-list1">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
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
    <div class="toys">
        <img :src="allToysImg" alt="">
    </div>   
    <div class="op-btn clearfix">
        <div class="operation-btn pull-left">
            <div></div>
            <div class="btn-up"></div>
            <div></div>
            <div class="btn-left"></div>
            <div></div>
            <div class="btn-right"></div>
            <div></div>
            <div class="btn-down"></div>
            <div></div>
            <!-- <img :src="btLeft1Img" alt="" class="btn-left">
            <img :src="btRight1Img" alt="" class="btn-right">
            <img :src="btUp1Img" alt="" class="btn-up">
            <img :src="btDown1Img" alt="" class="btn-down"> -->
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
// import "../../../static/js/move.min.js";
// import "../../../static/js/web.min.js";
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
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
            allToysImg:'./static/img/ingame-all.png',
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
            this.$router.push('home');
        }
    },
    components: {vPaylist,vRecord},
    created(){
         setTimeout(function(){
            var a = document.querySelectorAll(".doll-bets-btn")[0];
            if ("undefined" != typeof a ) {
                    var b = new ClampDoll;
                    a.addEventListener("click",function(){
                        if($("#machine-clip").offset().left < 20) return;
                        if(games.isRun===0) return;
                        console.log(games.isRun,'games.isRun');
                        b.init();
                        games.isRun = 0;

                    });
            }
            App.move();
        },0);
    }
}
</script>

<style scoped>
.container{
    overflow: hidden;
}
.ingame-1 {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg1.png") no-repeat center fixed;
    background-size:100% 100%;
}
.ingame-2 {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg2.png") no-repeat center fixed;
    background-size:100% 100%;
}
.ingame-3 {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg3.jpg") no-repeat center fixed;
    background-size:100% 100%;
}
.pay-bag-button {
    position: absolute;
    z-index: 4;
    bottom: 0;
    width: 100%;
    height: 11%;
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
    position: absolute;
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
    width: 100%;
    bottom: 12%;
    width: 100%;
}
.operation-btn {
    width: 50%;
}
.operation-btn > div {
    height: .3rem; 
    width: 25%;
    /*border: 1px solid #ddd;*/
    display: inline-block;
}
.doll-bets-btn{
    width: 30%;
    margin-right: 10%;
    margin-top: 6%;
}
.toys{
    position: absolute;
    z-index: 1;
    bottom: 3px;
}
.operation-btn > div:nth-child(2){
    background: url('../../../static/img/ingame_btn_up1.png') no-repeat 2px 5px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(4){
    background: url('../../../static/img/ingame_btn_left1.png') no-repeat 6px 3px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(6){
    background: url('../../../static/img/ingame_btn_right1.png') no-repeat -4px 4px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(8){
    background: url('../../../static/img/ingame_btn_down1.png')no-repeat 3px 1px ;
    background-size: 100% 100%;
}
.doll-machine{
    perspective: 600px;
}
.doll-box ul > li {
    width: 18%;
    height: 1rem;
    display: inline-block;
    border: 1px solid #ccc;
}
.doll-list{
    width: 100%;
}
#doll-list3{
    position: absolute;
    z-index: 1;
    top: 0;
}
#doll-list2{
    position: absolute;
    z-index: 2;
    top: 0.3rem;
}
#doll-list1{
    position: absolute;
    z-index: 3;
    top: 1rem;
}
.doll-list > li{
    background: url('../../../static/img/all_toy.png') -50px -90px no-repeat;
    background-size: 100% 100%;
}
#doll-list3{
    position: absolute;
    z-index: 1;
    top: 0;
}
</style>

<template>
    <div class="in-game">
        <div class="absol mask" style="display:none" >

        </div>
        <div class="success align-v-h" @click="closeMask">
            <img :src="successImg1" alt="" v-show="isSuccess1">
            <img :src="successImg2" alt="" v-show="!isSuccess1">
        </div>
        <div class="fail align-v-h" @click="closeMask">
            <img :src="failImg1" alt="" v-show="isfail1">
            <img :src="failImg2" alt="" v-show="!isfail1">
        </div>
        <div class="ingame-1"></div>
        <div class="ingame-2"></div>
        <div class="ingame-3"></div>
        <img class="light-left" :src="lightUrl" alt="">
        <img class="light-right" :src="lightUrl" alt="">
        <div class="user-wrap">
            <div class="user-info">
            </div>
            <img :src="headImg" alt="">
            <p class="user-name substr yellow">{{userInfo.username}}</p>
            <p class="money yellow" @click="recharge">{{userInfo.goldCounts}}</p>
        </div>
        <i class="machine-shadow-fixed"></i>
        <div class="message" @click="messageVisbile=true;">
        </div>
        <div class="level__medium">
            <div id="ex_doll_game">
                <div class="doll-machine">
                    <div class="machine" id="machine">
                        <i class="machine-bar1"></i>
                        <div class="machine-clip" id="machine-clip"
                         style="transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75); transform: translateY(0px);-webkit-transform: translateY(0px)">
                        <i class="machine-bar"></i>
                        <i class="machine-clip-line" id="machine-clip-line" style="height: 433px;"></i>
                        <i class="machine-clip-origin"></i>
                        <i class="machine-shadow"></i>
                        <div class="machine-clip-arm machine-clip-arm__left">
                            <i class="machine-clip-arm_item"></i>
                        </div>
                        <div class="machine-clip-arm machine-clip-arm__right">
                            <i class="machine-clip-arm_item"></i>
                        </div>
                        <li class="doll-item doll-item-single" data-index="453" data-theme="1" style="display:none">
                            <div class="doll-img doll-img__monkey">
                                <div class="doll-img_move">
                                    <div class="doll-img_name doll-img_name__goods">
                                    </div>
                                </div>
                                <i class="doll-img_shadow"></i>
                                <i class="doll-img_smoke"></i>
                                <i class="doll-img_tag"></i>
                            </div>
                        </li>
                        </div>
                    </div>
                    <div class="machine-tips-box cpm-hide">
                        <div class="machine-tips">
                            <div class="machine-tips_txt"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="doll-box">
                <ul class="doll-list" id="doll-list3">
                    <li class="doll-item" data-index="1"></li>
                    <li class="doll-item" data-index="2"></li>
                    <li class="doll-item" data-index="3"></li>
                    <li class="doll-item" data-index="4"></li>
                    <li class="doll-item" data-index="5"></li>
                </ul>
                <ul class="doll-list" id="doll-list2">
                    <li class="doll-item" data-index="6"></li>
                    <li class="doll-item" data-index="7"></li>
                    <li class="doll-item" data-index="8"></li>
                    <li class="doll-item" data-index="9"></li>
                    <li class="doll-item" data-index="10"></li>
                </ul>
                <ul class="doll-list" id="doll-list1">
                    <li class="doll-item" data-index="11"></li>
                    <li class="doll-item" data-index="12"></li>
                    <li class="doll-item" data-index="13"></li>
                    <li class="doll-item" data-index="14"></li>
                    <li class="doll-item" data-index="15"></li>
                </ul>
        </div>
        <div class="toys">
        </div>
        <div class="op-btn">
            <div class="operation-btn">
                <div></div>
                <div class="btn-up"></div>
                <div></div>
                <div class="btn-left"></div>
                <div></div>
                <div class="btn-right"></div>
                <div></div>
                <div class="btn-down"></div>
                <div></div>
            </div>
            <div class="doll-bets-btn pull-right">
                <div class="btn-go"></div>
            </div>
        </div>
        <mt-tabbar>
            <mt-tab-item id="tab1" >
                <img slot="icon" :src="pay1Img" @click="payClick()">
            </mt-tab-item>
            <mt-tab-item id="tab2" >
                <img slot="icon" :src="bag1Img" @click="bagClick()">
            </mt-tab-item>
        </mt-tabbar>
        <div class="back" @click="back()">
            <img :src="back1Img" alt="">
        </div>
        <v-paylist v-show="payVisbile" :is-show="payVisbile" @payPanelHide="payPanelHide"></v-paylist>
        <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide" ref="recordList"></v-record>
        <v-message v-show="messageVisbile" :is-show="messageVisbile" @panelHide="panelHide"></v-message>
        <audio id="bg-music1" controls="controls" autoplay="autoplay" style="display:none" loop="loop">
          <source :src="audioUrl" type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
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
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
import vMessage from '../Game/message.vue';
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
import { getWawaStatus, getUserInfo } from '../../api/getData.js';
var setIntervalIndex;
let initFresh = false;      //刷新状态
export default {
    data() {
        return {
            isRun:0,
            currentToyInfo:'',
            currentToyUrl:'',
            audioUrl:'./static/win.mp3',
            headImg:'./static/img/defalut.png',
            packetUrl:'',
            lightUrl:'./static/img/ingame_gif.gif',
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
            successImg1:'./static/img/success_1.png',
            successImg2:'./static/img/success_2.png',
            failImg1:'./static/img/fail_1.png',
            failImg2:'./static/img/fail_2.png',
            payVisbile:false,
            recordVisible:false,
            messageVisbile:false,
            userInfo:{
                username:'',
                goldCounts:'',
                bagCounts:''
            },
            isSuccess1:false,
            isfail1:false,
            reFresh:false //刷新
        }
    },
    methods: {
        panelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
            this.messageVisbile = visible;
        },
        payPanelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
            this.messageVisbile = visible;
            //执行userinfo刷新
            this.getUser();
        },
        back(){
            this.$router.push('/main/home');
        },
        recharge() {
          this.payVisbile = true;
        },
        closeMask() {
            clearInterval(setIntervalIndex);
            $('.success').hide();
            $('.fail').hide();
            $('.mask').hide();
        },
        getUser(){
            getUserInfo().then((res)=>{
                this.userInfo = res.data.data; //当前页面赋值用户信息
                this.headImg = this.userInfo.headimgurl?this.userInfo.headimgurl:this.headImg;
            });
        },
        bagClick(){
            if(!this.isRun){
                this.recordVisible=true;
                this.$refs.recordList.getBackpackList();
            }
        },
        payClick(){
            if(!this.isRun){
                this.payVisbile = true;
            }
        }
    },
    components: {vPaylist,vRecord,vMessage},
    created(){
        this.currentToyInfo = getSessionstorage('currentToyInfo');
        //获取用户信息
        getUserInfo().then((res)=>{
            console.log(res.data,'res.data')
            this.userInfo = res.data.data; //当前页面赋值用户信息
            this.headImg = this.userInfo.headimgurl?this.userInfo.headimgurl:this.headImg;
        });
    },
    beforeRouteEnter (to, from, next) {//判断是不是手动刷新
        if(from.path=='/'){
            initFresh = true;       //刷新状态
        }else{
            initFresh = false;
        }
        next();
    },
    mounted() {
        this.reFresh = initFresh;   //刷新状态
        audioAutoPlay('bg-music1');
        self = this;
        document.body.addEventListener('touchstart', function () {});
        // console.log(this.$route.params.num)
        let toyNum = this.$route.params.num;
        // let packetNum = parseInt(toyNum) + 1 ;
        let moveBottom = $('#doll-list2').offset().top+$('#doll-list2').height()-$("#machine-clip").height();
        let documentWidth = $(document).width(); //document width
        let keyCodeArry=[];
        // console.log(moveBottom)
        var m = 0;
        var n = 0;
        var isCatch = false,realCatch = false;
        var isVisibleGo = true;
        var currentCatch;//当前抓娃娃index
        // this.packetUrl = './static/img/'+packetNum+'.png';
        $(".doll-img_name__goods").css("background",'url('+this.currentToyInfo.imgUrl+') 47% 0 no-repeat');
        $(".doll-img_name__goods").css("background-size",'150%');
        $(".doll-item").css("background",'url('+this.currentToyInfo.imgUrl +') 36% 0 no-repeat');
        $(".doll-item").css("background-size","150%");
        function isInWechat() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("micromessenger") >= 0
        }

        function isIos() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("iphone") >= 0 || a.indexOf("ipad") >= 0
        }

        function isAndroid() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("android") >= 0
        }

        function isUrl(a) {
            return !!a && (a.indexOf("http://") >= 0 || a.indexOf("https://") >= 0)
        }

        function isArray(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function isNumber(a) {
            return "number" == typeof a
        }

        function getRandomNum(a, b) {
            var c = b - a,
                d = Math.random();
            return a + Math.round(d * c)
        }

        function getFormatDate() {
            var a = new Date,
                b = new Date(a.setHours(a.getHours() + 8)).toISOString();
            return b.substring(0, b.indexOf("T"))
        }

        function restTransition(domName,type) {
            if(domName == 'xy'){
                $('#machine-clip').css('transform', 'translateX(' + m + 'px)');
                  $('.machine-bar1').css('transform', 'translateX(' + m + 'px)');

                $('#machine-clip').css('-webkit-transform', 'translateX(' + m + 'px)');
                $('.machine-bar1').css('-webkit-transform', 'translateX(' + m + 'px)');

                $('#machine-clip').css('transition-duration', '0.5s');
                $('.machine-bar1').css('transition-duration', '0.4s');

                $('#machine-clip').css('-webkit-transition-duration', '0.5s');
                $('.machine-bar1').css('-webkit-transition-duration', '0.4s');
            } else {
                $('.machine').css('transform', 'translateZ(' + n + 'px)');
                $('.machine').css('-webkit-transform', 'translateZ(' + n + 'px)');
                $('.machine').css('transition-duration', '0.5s');
                $('.machine').css('-webkit-transition-duration', '0.5s');
                if(n== -30 || n== 30 ){
                    return;
                } else {
                    moveBottom = -Math.abs(moveBottom);
                    if(type == 'up'){
                        moveBottom = moveBottom + 25;
                        let tempMoveBottom = moveBottom;
                        // console.log('up')
                        // console.log(moveBottom)
                        $('.machine-shadow').animate({bottom:tempMoveBottom,speed:1000,easing:'linear'});
                    } else {
                        moveBottom = moveBottom - 25;
                        let tempMoveBottom = moveBottom;
                        // console.log('down')
                        // console.log(moveBottom)
                        $('.machine-shadow').animate({bottom:tempMoveBottom,speed:1000,easing:'linear'});
                    }
                }
            }
        }

        function getLevel(n) {
            var level;
            if(n>=-10 && n<=10 ){ //第二层
                level=2;
            } else if(n>10 && n<=30){ //第一层
                level=1;
            } else if(n>=-30 && n<10){ //第三层
                level=3;
            }
            return level;
        }

        /**
         * 同时按住按钮
         * @param {[type]} num 按键名称
         * @param {[type]} arr [description]
         */
        function addKeyCodeArry(num,arr){
            var check=0;
            for (var i=0;i<arr.length;i++) {
                if (arr[i]==num) {
                    check=1;
                }
            }
            if (check==0) {
                arr.push(num);
            }
            return arr;
        }
        /**
         * 手指松开清除按键
         * @param  {[type]} num 按键名称
         * @param  {[type]} arr [description]
         */
        function deletKeyCodeArry(num,arr){
            for (var i=0;i<arr.length;i++) {
                if (arr[i]==num) {
                    arr.splice(i,1);
                }
            }
            return arr;
        }

        /*games对象*/
        function Games() {
            var a = this;
            this.isRun = !1,
            this.dollSerial = -1,
            this.hit = !1,
            this.clip = document.getElementById("machine-clip"), /*钩子*/
            this.$clip = $(this.clip),
            this.getDoll = function(b) {
                currentCatch = $(".doll-box").find("[data-index=" + b + "]");
                window.xuanze = b;
                if (a.dollSerial = b, currentCatch.length, realCatch) {
                    // var d = $(c).eq(0).clone();
                    // var d = $(c).eq(0).addClass("doll-rise");
                    $(currentCatch).addClass("v-hidden")
                    // $("#machine-clip").append(d)
                } else this.$clip && this.$clip.removeClass("catch")

            },

            this.doOffDoll = function(b, c) {
                var d = $("#machine-clip").find(".doll-item");
                this.$clip && this.$clip.removeClass("catch"),
                move(d[0]).y(b).duration(c).ease("linear").end(),
                $(d).css('display', 'none');
                $(d).css('transformY', '0px');
                setTimeout(()=>{
                    // games.isRun = 0;
                    // self.isRun = 0;
                },100)
            },

            this.offDoll = function(b, c) {

                var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500,
                    e = $("#machine-clip").find(".doll-item");
                    e.length ? setTimeout(function() {
                        var c = window.record;
                        a.doOffDoll(b, d);
                    }.bind(this), c * (.5 + .3 * Math.random())) : a.packetFly(b / 2, d, 600, !0)
            },

            this.mcFloorClose = function(a) {


                setTimeout(function() {
                        var a = $("#machine i.machine-bg_floor"),
                            b = $("#machine i.machine-bg_bot");
                        a.removeClass("open"),
                            b.removeClass("open")
                    },
                    a)
            },

            this.packetFly = function(b, c) {
                var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 600,
                    e = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    f = $(".atm");
                setTimeout(function() {
                    move(f[0]).set("opacity", 1).y(-b / 2 - 75).scale(.6).rotate(30).then().set("opacity", 0).rotate(-30).delay("0.2s").duration(d).pop().end(),
                        this.mcFloorClose(d),
                        setTimeout(function() {
                                $(".games-dialog-mod").addClass("open"),
                                    $(".games-dialog-mod .packet-dialog").addClass("open"),
                                    a.onOpenRecord(e)
                            },
                            d + 600)
                }.bind(this), c)
            },

            this.onOpenRecord = function() {

                // alert(window.xuanze);

                var zhongjiangcode = window.xuanze;

                var chang = $(".quota-btn.active").data("price");

            },

            this.machineTips = function(a) {
                if (a) {
                    switch ($(".machine-tips-box").removeClass("cpm-hide"), a) {
                        case "error":
                            $(".fail").css('display','flex');
                            $(".mask").show();
                            games.isRun = 0; //激活go按钮
                            self.isRun = 0;
                            setIntervalIndex = setInterval(()=>{
                                self.isfail1 = !self.isfail1;
                            },300)
                            break;
                        case "success":
                            $(".success").css('display','flex');
                            $(".mask").show();
                             games.isRun = 0; //激活go按钮
                            self.isRun = 0;
                            setIntervalIndex = setInterval(()=>{
                                self.isSuccess1 = !self.isSuccess1;
                            },300)
                    }
                    setTimeout(function() {
                        $(".machine-tips-box").addClass("cpm-hide");
                    },1500)
                }
            }
        }

        function initDollItems(a) {
            var b = {
                dolls: a.concat(a)
            };
            $("#doll-list,#doll-list__small").html(""),
            $("#doll-items-tmpl").tmpl(b).appendTo("#doll-list"),
            $("#small-doll-items-tmpl").tmpl(b).appendTo("#doll-list__small")
        }


        var games = new Games,
            record = {},
            App = {};
        var timeOutEvent,timer;

        function ClampDoll() { /*钩子*/

            games.isRun = !1,
                this.clip = document.getElementById("machine-clip"),
                this.$clip = $(this.clip),
                this.setTime = {
                    falling: 600,
                    rising: 2e3
                },
                this.setTime.clipCatchStart = 100,
                this.setTime.fallingToRising = this.setTime.falling,
                this.setTime.risingEnd = this.setTime.falling + this.setTime.rising,
                this.getHeight = function() {
                    var level = getLevel(n);
                    var a = $(document).height(),
                        b = $("#machine-clip").height(),
                        c = $(document.getElementById("doll-list"+level)).offset().top,
                        d = c-b/2;
                    return d
                },
                this.screen_h = $(document).height(),
                this.falling = function() { /*钩子开始下落*/
                    this.running = !0;
                    let tempM;
                    tempM = m<0?0:m;
                    // console.log(tempM)
                    var a = "translate3d(" + tempM + "px," + this.getHeight() + "px,"+n+"px)";
                    move(this.clip).set("transform", a).duration(this.setTime.falling).ease("linear").end()
                },

                this.rising = function() { /*钩子触碰到*/
                    let tempM;
                    tempM = m<0?0:m;
                    var a = "translate(" + tempM + "px," + 0 + "px)";
                    var b = "translate(" + 0 + "px," + 0 + "px)";
                    var _clip = this.clip;
                    var _this = this;
                    if(isCatch && realCatch){
                        $(".doll-item-single").removeAttr("style").addClass('doll-rise');
                    }
                    move(this.clip).set("transform", a).duration(this.setTime.rising).ease("linear").end();

                    setTimeout(()=> {
                        $(".machine-bar1").css('display','none');
                        $(".machine-bar").css('display','block');
                        move(_clip).set("transform", b).duration(1700).ease("linear").end();
                        
                    }, 2e3);

                    m = 0;
                },

                this.clipStarting = function() {
                    /*钩子开始下落*/
                    setTimeout(function() {
                        this.$clip.addClass("catch")
                    }.bind(this), this.setTime.clipCatchStart)
                },

                this.catchDoll = function(a) {
                    var _this = this;
                    var b = 1;
                    return setTimeout(function() {
                        var a = -1;
                        var level = getLevel(n);
                        b = this.$clip.offset().left;
                        $('#doll-list'+level+' >li').map(function(c, d) {
                            var e = Math.abs($(d).offset().left);
                            if(Math.abs(e-b) <= 10 && ($(d).css('visibility')!='hidden')){
                                a = $(d).attr("data-index");
                                isCatch = true;
                                /**
                                * 1.接口判断时候抓成功
                                * 2.不成功则娃娃掉下 重新洗牌页面
                                */
                                $.ajax({
                                    type: "GET",
                                    async: false,
                                    url: window.serverPath.url+'/app/getWawaStatus/'+toyNum+'/1',
                                    success: function(res){
                                        console.log(res)
                                        res = JSON.parse(res)
                                           if(res.data==="success"){
                                                realCatch = true;
                                                setTimeout(()=> {
                                                    games.offDoll.call(_this, _this.screen_h, 2000)
                                                }, 2e3);
                                            } else {
                                                realCatch = false;
                                                setTimeout(()=> {
                                                    games.offDoll.call(_this, _this.screen_h, 10)
                                                }, 2e3);
                                            }
                                        }
                                 })
                            }

                        })
                        if(!realCatch){
                            getWawaStatus({id:toyNum,status:0}).then((res)=>{
                                self.getUser();
                            });
                            console.log("!realCatch")
                            realCatch = false;
                            setTimeout(()=> {
                                games.isRun = 0;
                                self.isRun = 0;
                            }, 3000);
                        }
                        games.getDoll.call(this, a);
                    }.bind(this), this.setTime.fallingToRising),
                    b
                },
                this.clipRising = function() {
                    setTimeout(function() {
                        this.rising()
                    }.bind(this), this.setTime.fallingToRising)

                },
                this.clipEnd = function(a) {
                    setTimeout(function() {
                        if(isCatch && realCatch){
                            self.getUser();
                            setTimeout(()=>{
                                games.machineTips("success");
                            },1500);
                        } else {
                            setTimeout(()=>{
                                games.machineTips("error");
                                games.isRun = 0;
                                self.isRun = 0;
                            },1500)
                        }
                        //保持影子不动
                        $(".machine-shadow-fixed").css({'left':-100,'top':-100});
                        $(".machine-shadow").css('display','block');
                        setTimeout(()=>{
                            $(currentCatch).removeClass('v-hidden').fadeIn();
                        },2000)

                    }.bind(this), this.setTime.risingEnd)
                },

                this.init = function(a) {
                        this.falling(),
                        this.clipStarting(),
                        this.catchDoll(),
                        this.clipRising(),
                        this.clipEnd()
                }
        }
        function moveDirection(directionObj,direction) {
            var timeout;
            //鼠标按下 或 手指触摸屏幕时触发
            $(directionObj).bind('touchstart mousedown', function (event) {
                isVisibleGo = false;
                event.stopPropagation();
                event.preventDefault();
                keyCodeArry=addKeyCodeArry(direction,keyCodeArry);
                if(keyCodeArry.length>1) return;
                console.log(keyCodeArry,'keyCodeArry');
                if(!games.isRun){
                    App.playMove(direction);
                    timeout = setTimeout(function () {
                         App.longPlayMove(direction);
                    }, 100);

                }
                $(".btn-"+direction).addClass('btn-'+direction+'-active')
            });
            //鼠标松开 或 手指从屏幕上离开时触发
            $(directionObj).bind('touchend mouseup', function (event) {
                isVisibleGo = true;
                clearTimeout(timeout);
                keyCodeArry=deletKeyCodeArry(direction,keyCodeArry);
                $(".btn-"+direction).removeClass('btn-'+direction+'-active')
                clearInterval(timer)
                // console.log('end')
            });
            //鼠标移出、手指停止触摸屏幕时触发
            $(directionObj).bind('touchcancel mouseout', function (event) {
                clearTimeout(timeout);
                // $(this).removeClass('bghover');
                keyCodeArry=deletKeyCodeArry(direction,keyCodeArry);
                 $(".btn-"+direction).removeClass('btn-'+direction+'-active')
                 clearInterval(timer)
            });

        }
        /**爪子左右移动**/
        App.move = function() {
            var left = document.querySelector('.btn-left');
            var right = document.querySelector('.btn-right');
            var up = document.querySelector('.btn-up');
            var down = document.querySelector('.btn-down');
            // var timer = null;
            var max = $(".doll-machine").width() - $(".machine-clip").width();
            var min = -30;
            //方向按键
            moveDirection(left,'left');
            moveDirection(right,'right');
            moveDirection(up,'up');
            moveDirection(down,'down');

            this.longPlayMove = function(dir) {
                var speed ;
                switch (dir) {
                    case 'left':
                    speed = -8;
                    break;
                    case 'up':
                    speed = -10;
                    break;
                    case 'right':
                    speed = 8;
                    break;
                    case 'down':
                    speed = 10;
                    break;
                }
                // hidden timer temp
                timer = setInterval(function() {
                    // console.log("timer....")
                    if ((dir == 'left') || (dir == 'right')) {
                        m = m + speed;
                        if (m > max) {
                            m = max;
                        } else if (m < min) {
                            m = min;
                        }
                        if(m<0 || m>313) return;
                        // console.log('left',m)
                        restTransition('xy','');
                    } else {
                        n = n + speed;
                        if (n > 30) {
                            n = 30;
                        } else if (n < -30) {
                            n = -30;
                        }
                        restTransition('z',dir);
                    }
                }, 50);
            };
            this.playMove = function(dir) {
                var speed ;
                switch (dir) {
                    case 'left':
                    speed = -15;
                    break;
                    case 'up':
                    speed = -10;
                    break;
                    case 'right':
                    speed = 15;
                    break;
                    case 'down':
                    speed = 10;
                    break;
                }
                if ((dir == 'left') || (dir == 'right')) {
                    m = m + speed;
                    if (m > max) {
                        m = max;
                    } else if (m < min) {
                        m = min;
                    }
                    if(m<0) return;
                    restTransition('xy','');
                } else {
                    n = n + speed;
                    if (n > 30) {
                        n = 30;
                    } else if (n < -30) {
                        n = -30;
                    }
                    restTransition('z',dir);
                }
            };
        };
        setTimeout(function(){
            var a = document.querySelectorAll(".btn-go")[0];
            if ("undefined" != typeof a ) { 
                var b = new ClampDoll;
                $(a).bind("touchstart",function(e){
                    //判断金币不足->提示->跳转到充值界面
                    // if(parseFloat(self.currentToyInfo.timeMoney) < parseFloat(self.userInfo.goldCounts)){
                        //判断背包是否满15个,提示背包将满, 无法获得物品, 最多20个
                        if(games.isRun===1 || !isVisibleGo)  return; //游戏过程中，go按键不可以按下
                        getUserInfo().then((res)=>{
                            // debugger
                            // if(res.data.data.bagcounts<15){
                                if(games.isRun===1 || !isVisibleGo)  return; //游戏过程中，go按键不可以按下
                                isCatch = false;
                                realCatch = false;
                                let shadowLeft = $(".machine-shadow").offset().left;
                                let shadowTop = $(".machine-shadow").offset().top;
                                //游戏过程中不重复操作影子
                                if(!games.isRun){
                                    $(".machine-shadow").css('display','none');
                                    $(".machine-shadow-fixed").show();
                                    $('.machine-shadow-fixed').css({'left':shadowLeft,'top':shadowTop})
                                }
                                b.init();
                                games.isRun = 1;
                                self.isRun = 1;
                                $(".machine-bar1").css('display','block');
                                $(".machine-bar").css('display','none');
                            // } else {
                            //     alert('背包将满,无法获得物品！')
                            // }
                        })
                    // } else {
                    //     alert("金币不足,请充值！")
                    //     self.payVisbile = true;
                    // }
                });
            }
            App.move();
        },0);
    },
    watch:{
        reFresh:function(newVal,oldVal){//监听刷新状态
            if(newVal!=oldVal && newVal){
                this.back();
            }
        },
        '$route' (to,from){             //监听路由 改变刷新状态
            if(from.path){
                this.reFresh = true;
            }else{
                this.reFresh = false;
            }
        },
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
    height: 100%;
    background: url("../../../static/img/ingame_bg1.png") no-repeat;
    background-size:100% 100%;
}
.ingame-2 {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: url("../../../static/img/ingame_bg2.png") no-repeat;
    background-size:100% 100%;
}
.ingame-3 {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url("../../../static/img/ingame_bg3.jpg") no-repeat;
    background-size:100% 100%;
}
.pay-bag-button {
    position: absolute;
    z-index: 4;
    bottom: 0;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    text-align: center;
}
.pay-bag-button > div {
    flex: 1;
}
.pay-bag-button >div img {
    vertical-align: bottom;
    height: 1.4rem;
}

.op-btn {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 17%;
    bottom: 12.6%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
}
.op-btn > .operation-btn {
    flex:1;
}
.op-btn > .doll-bets-btn {
    flex:0 0 34%;
    vertical-align: middle;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
.op-btn > .doll-bets-btn .btn-go {
    background: url('../../../static/img/ingame_btn_go1.png') no-repeat;
    background-size: 100%;
    width: 1.86rem;
    height: 1.46rem;
    display: inline-block;
    margin-top: 0.3rem;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
.op-btn > .doll-bets-btn .btn-go:active {
    background: url('../../../static/img/ingame_btn_go2.png') no-repeat;
    background-size: 100%;
    width: 1.86rem;
    height: 1.46rem;
    display: inline-block;
    margin-top: 0.3rem;
}
.operation-btn {
    display: flex;
    display: -webkit-flex;
    flex-wrap:wrap;
    margin-left: .6rem;
}
.operation-btn > div {
    height: .56rem;
    width: .96rem;
}

.doll-bets-btn{
    width: 28%;
    margin-right: 10%;
    text-align: right;
}

.doll-bets-btn > img {
    height: 1rem;
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
.operation-btn > div:nth-child(2):active{
    background: url('../../../static/img/ingame_btn_up2.png') no-repeat 2px 5px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(4):active{
    background: url('../../../static/img/ingame_btn_left2.png') no-repeat 6px 3px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(6):active{
    background: url('../../../static/img/ingame_btn_right2.png') no-repeat -4px 4px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(8):active{
    background: url('../../../static/img/ingame_btn_down2.png')no-repeat 3px 1px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(2).btn-up-active{
    background: url('../../../static/img/ingame_btn_up2.png') no-repeat 2px 5px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(4).btn-left-active{
    background: url('../../../static/img/ingame_btn_left2.png') no-repeat 6px 3px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(6).btn-right-active{
    background: url('../../../static/img/ingame_btn_right2.png') no-repeat -4px 4px ;
    background-size: 100% 100%;
}
.operation-btn > div:nth-child(8).btn-down-active{
    background: url('../../../static/img/ingame_btn_down2.png')no-repeat 3px 1px ;
    background-size: 100% 100%;
}
.doll-machine{
    perspective: 600px;
}
.doll-box ul > li {
    width: 19%;
    height: 100%;
    display: inline-block;
    /*border: 1px solid #ccc;*/
}
.doll-list{
    width: 100%;
}
#doll-list3{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 10px;
    width: 97%;
}
#doll-list2{
    position: absolute;
    z-index: 2;
    top: 1rem;
}
#doll-list1{
    position: absolute;
    z-index: 3;
    top: 2rem;
}
#doll-list1 > li:nth-child(1),
#doll-list1 > li:nth-child(2){
    visibility: hidden;
}

#doll-list3 > li{
    background: url('../../../static/img/toy_01.png') 0 0 no-repeat;
    background-size: 90%;
    width: 18%
}

#doll-list3 > li:nth-child(2){
    background-size: 92%;
}
#doll-list3 > li:nth-child(4){
    background-size: 92%;
}
#doll-list2 > li{
    background: url('../../../static/img/toy_01.png') 0 0 no-repeat;
    background-size: contain;
    width: 19%
}
#doll-list2 > li:nth-child(2){
    background-size: 100%;
}
#doll-list2 > li:nth-child(4){
    background-size: 100%;
}
#doll-list1 > li{
    background: url('../../../static/img/toy_01.png') 0 0 no-repeat;
    background-size: 100%;
    width: 18%
}
.user-info,.user-wrap {
    width: 3.2rem;
    height: 1.9rem;
    position: absolute;
    right: 0;
    top: .19rem;
    z-index: 8;
    font-size: .24rem;
    font-weight: 800;
}
.user-info {
    top: 0;
    background: url('../../../static/img/ingame_table_information.png') no-repeat;
    background-size: 3rem 1.1rem;
}
.user-wrap >img {
    position: absolute;
    width: .8rem;
    height: .7rem;
    z-index: 1;
    top: .2rem;
    left: .2rem;
}
.user-wrap .user-name {
    max-width: 1.7rem;
    position: absolute;
    top: .15rem;
    right: .3rem;
    z-index: 9;
}
.user-wrap .money {
    max-width: 1.7rem;
    position: absolute;
    top: .62rem;
    right: .56rem;
    z-index: 9;
    height: .32rem;
    line-height: .32rem;
}
.user-wrap .money:after{
    content: '';
    background:url('../../../static/img/ingame_btn_pay3.png');
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    position: absolute;
}
.message {
    position: absolute;
    left: .3rem;
    top: 1.4rem;
    z-index: 6;
    background:url('../../../static/img/message-icon.png');
    width: .9rem;
    height: .68rem;
    background-size: 100% 100%;

}
.doll-list-wrap {
    position: relative;
    height: 300px;
    width: 100%;
}
.light-left{
    position: absolute;
    top: 14%;
    left: 2px;
    z-index: 3;
    height: 56%;
}
.light-right{
    position: absolute;
    top: 14%;
    right: 2px;
    z-index: 3;
    height: 56%;
}
.success>img, .fail>img{
    width: 5rem;
    height: 4rem;
    display: block
}
.success, .fail {
    position: absolute;
    z-index: 11;
    display: none;
}
</style>
<style>
.in-game .mint-tabbar .mint-tab-item-icon {
    width: 50% !important;;
    height: 100%;
}

</style>

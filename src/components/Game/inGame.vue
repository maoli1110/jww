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
                         style="transition-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75); transform: translateY(0px);"> <i class="machine-clip-line" id="machine-clip-line" style="height: 433px;"></i> <i class="machine-clip-origin"></i>
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
                        <i class="machine-bg_bd"></i>
                        <i class="machine-bg_floor" id="machine-bg_floor"></i>
                        <i class="machine-bg_bot"></i>
                        <i class="machine-bg_repeat"></i>
                        <div class="atm">
                            <img src="static/img/packet.png" alt=""></div>
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
            <!-- <img :src="allToysImg" alt="">--></div>
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
                <img :src="btDown1Img" alt="" class="btn-down">--></div>
            <div class="doll-bets-btn pull-right">
                <img :src="btGo1Img" alt=""></div>
        </div>
        <div class="pay-bag-button">
            <div class="pay" @click="payVisbile=true;">
                <img :src="pay1Img" alt=""></div>
            <div class="bag" @click="recordVisible=true;">
                <img :src="bag1Img" alt=""></div>
        </div>
        <div class="back" @click="back()">
            <img :src="back1Img" alt=""></div>
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
         
    },
    mounted() {


        function isInWechat() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("micromessenger") >= 0
        }

        function isIos() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("iphone") >= 0 || a.indexOf("ipad") >= 0 || a.indexOf("applewebkit") >= 0
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

        function changeTitle(a) {
            if (document.title = a, navigator.userAgent.toLowerCase().indexOf("iphone") >= 0) {
                var b = $("body"),
                    c = $('<iframe src="/favicon.ico"></iframe>');
                c.on("load",
                    function() {
                        setTimeout(function() {
                                c.off("load").remove()
                            },
                            0)
                    }).appendTo(b)
            }
        }

        function alertUI(a, b, c) {
            var d = document.getElementById("alertUI");
            if (b = b ? b : "温馨提示", a = a ? a : "", null == d) {
                var e = '<div id="alertUI" style="width:100%;height:100%; background:rgba(0,0,0,0.5);position: fixed; left:0px; top: 0px; z-index: 999999999;display:none;"><div  style="width:85%; background: #FFF; margin: 220px auto;border: 1px solid #CFCFCF;border-radius:3px;max-width:500px;"><h1 class="alertUI_title" style="margin:0px; padding: 15px 0 5px; font-family:\'arial\';font-size: 22px;line-height:30px;font-weight: normal;color:#000;text-align:center;">温馨提示</h1><div class="alertUI_content" style="padding:5px 20px;font-size: 17px;font-family:\'arial\'; color: #676767;"></div><p style="margin:0px; border-top:1px solid #cfcfcf; text-align:center; margin-top:20px"><a class="alertUI_button" style="font-family:\'arial\'; font-size:18px;color:#3cc51f;cursor: pointer;display:block;line-height:50px;text-align:center;">确定</a></p></div></div>';
                document.body.insertAdjacentHTML("beforeEnd", e)
            }
            var d = document.getElementById("alertUI");
            return d.querySelectorAll(".alertUI_title")[0].innerHTML = b,
                d.querySelectorAll(".alertUI_content")[0].innerHTML = a,
                d.querySelectorAll(".alertUI_button")[0].onclick = function() {
                    d.style.display = "none",
                        "function" == typeof c && c()
                },
                d.style.display = "block", !1
        }


        var m = 0;
        var n = 0;
        var isCatch = false;

        /*games对象*/
        function Games() {
            var a = this;
            this.isRun = !1,
            this.dollSerial = -1,
            this.hit = !1,
            this.clip = document.getElementById("machine-clip"), /*钩子*/
            this.$clip = $(this.clip),
            this.getDoll = function(b) {
                var c = $(".doll-box").find("[data-index=" + b + "]");
                window.xuanze = b;
                if (a.dollSerial = b, c.length) {
                    // var d = $(c).eq(0).clone();
                    // var d = $(c).eq(0).addClass("doll-rise");
                    $(c).addClass("v-hidden")
                    // $("#machine-clip").append(d)
                } else this.$clip && this.$clip.removeClass("catch")

            },

            this.doOffDoll = function(b, c) {
                var d = $("#machine-clip").find(".doll-item");
                this.$clip && this.$clip.removeClass("catch"),
                move(d[0]).y(b).duration(c).ease("linear").end(),
                $(d).css('display', 'none');
                $(d).css('transformY', '0px');
                games.isRun = 1;
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
                    switch ($(".machine-tips-box").removeClass("cpm-hide"), $(".machine-tips-box .machine-tips").addClass("machine-tips__" + a), a) {
                        case "error":
                            var b = ["换个姿势再来一次！"];
                            $(".machine-tips-box .machine-tips .machine-tips_txt").html(b[Math.floor(Math.random() * b.length)]);
                            break;
                        case "success":
                            $(".machine-tips-box .machine-tips .machine-tips_txt").html("恭喜你夹中了！")
                    }
                    setTimeout(function() {
                            $(".machine-tips-box").addClass("cpm-hide"),
                                $(".machine-tips-box .machine-tips").removeClass("machine-tips__" + a)
                        },
                        1500)
                }
            }
        }

        function ClampDoll() { /*钩子*/

            games.isRun = !1,
                this.clip = document.getElementById("machine-clip"),
                this.$clip = $(this.clip),
                this.setTime = {
                    falling: 600,
                    rising: 4e3
                },
                this.setTime.clipCatchStart = 100,
                this.setTime.fallingToRising = this.setTime.falling,
                this.setTime.risingEnd = this.setTime.falling + this.setTime.rising,
                this.getHeight = function() {
                    var a = document.getElementById("machine").offsetHeight,
                        b = document.getElementById("machine-clip").offsetHeight,
                        c = document.getElementById("doll-list1").offsetHeight,
                        d = a - b - c + 24 - 170;
                    return console.log(d),
                        d
                },
                this.screen_h = $(document).height(),


                this.falling = function() { /*钩子开始下落*/
                    this.running = !0;
                    // var a = "translate(" + m + "px," + this.getHeight() + "px)";
                    var a = "translate3d(" + m + "px," + this.getHeight() + "px,"+n+"px)";
                    move(this.clip).set("transform", a).duration(this.setTime.falling).ease("linear").end()
                },


                this.rising = function() { /*钩子触碰到*/
                    var a = "translate(" + m + "px," + 0 + "px)";
                    var b = "translate(" + 0 + "px," + 0 + "px)";
                    var _clip = this.clip;
                    var _this = this;
                    if(isCatch){
                        $(".doll-item-single").removeAttr("style").addClass('doll-rise');
                    }
                    move(this.clip).set("transform", a).duration(this.setTime.rising).ease("linear").end();
                    setTimeout(function() {
                        move(_clip).set("transform", b).duration(3e3).ease("linear").end();
                        games.offDoll.call(_this, _this.screen_h, _this.setTime.rising)
                    }, 4e3);
                    m = 0;
                },

                this.clipStarting = function() {
                    /*钩子开始下落*/

                    setTimeout(function() {
                        this.$clip.addClass("catch")
                    }.bind(this), this.setTime.clipCatchStart)

                },
                this.catchDoll = function(a) {
                    var b = 1;
                    console.log(n,'n')
                    return setTimeout(function() {
                        var a = -1;
                        var level = 0;
                        b = this.$clip.offset().left;
                        console.log(this.$clip.css('transform'),'this.$clip');
                        if(n>=-10 && n<=10 ){ //第二层
                            level=2;
                        } else if(n>10 && n<=30){ //第一层
                            level=1;
                        } else if(n>=-30 && n<10){ //第三层
                            level=3;
                        }
                        $('#doll-list'+level+' >li').map(function(c, d) {
                            console.log(d,'eee')
                            var e = Math.abs($(d).offset().left);
                            // (Math.abs(e-b) <= 40) && (a = $(d).attr("data-index")) &&(isCatch = true)
                            if(Math.abs(e-b) <= 20 && ($(d).css('visibility')!='hidden')){
                                a = $(d).attr("data-index");
                                isCatch = true;
                            }
                        }),
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
                        if(isCatch){
                            games.machineTips("success");
                        } else {
                            games.machineTips("error");
                        }
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

        /**爪子左右移动**/
        App.move = function() {
            var left = document.querySelector('.btn-left');
            var right = document.querySelector('.btn-right');
            var up = document.querySelector('.btn-up');
            var down = document.querySelector('.btn-down');
            var timer = null;
            // var width = css($('.paodao')[0], 'width') / 2 - css($('.hand')[0], 'width') / 2;
            var max = $(".doll-machine").width() - $(".machine-clip").width();
            var min = -30;

            left.addEventListener('touchstart', function(e) {
                e.preventDefault();
                App.playMove('left');
            });

            left.addEventListener('touchend', function(e) {
                clearInterval(timer);
            });

            right.addEventListener('touchstart', function(e) {
                e.preventDefault();
                App.playMove('right');
            });
            right.addEventListener('touchend', function(e) {
                clearInterval(timer);
            });

            up.addEventListener('touchstart', function(e) {
                e.preventDefault();
                App.playMove('up');
            });

            up.addEventListener('touchend', function(e) {
                clearInterval(timer);
            });

            down.addEventListener('touchstart', function(e) {
                e.preventDefault();
                App.playMove('down');
            });

            down.addEventListener('touchend', function(e) {
                clearInterval(timer);
            });

            this.playMove = function(dir) {
                // $('#machine-clip').css('transform','translateX(93px)');
                // App.handAnim('handAnim', App.animArr, 'litre', 'loop', -1, 35, 30);
                // if (!off) return;
                var speed ;
                switch (dir) {
                    case 'left':
                    speed = -50;
                    break;
                    case 'up':
                    speed = -10;
                    break;
                    case 'right':
                    speed = 50;
                    break;
                    case 'down':
                    speed = 10;
                    break;
                }
                timer = setInterval(function() {
                    // css($('.hand')[0], 'left', m);
                    if ((dir == 'left') || (dir == 'right')) {
                        m = m + speed;
                        if (m > max) {
                            m = max;
                        } else if (m < min) {
                            m = min;
                        }
                        $('#machine-clip').css('transform', 'translateX(' + m + 'px)');
                    } else {
                        n = n + speed;
                        if (n > 30) {
                            n = 30;
                        } else if (n < -30) {
                            n = -30;
                        }
                        $('.machine').css('transform', 'translateZ(' + n + 'px)');
                    }
                    // $('#machine-clip').css('left',m+'px');
                }, 550);
            };
        };
        setTimeout(function(){
            var a = document.querySelectorAll(".doll-bets-btn")[0];
            if ("undefined" != typeof a ) {
                    var b = new ClampDoll;
                    a.addEventListener("click",function(){
                        isCatch = false;
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
    bottom: 10%;
    width: 100%;
}
.operation-btn {
    width: 50%;
}
.operation-btn > div {
    height: .3rem; 
    width: 26%;
    float: left;
}
.doll-bets-btn{
    width: 30%;
    margin-right: 10%;
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
    width: 19%;
    height: 1rem;
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
}
#doll-list2{
    position: absolute;
    z-index: 2;
    top: 0.5rem;
}
#doll-list1{
    position: absolute;
    z-index: 3;
    top: 1rem;
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

</style>
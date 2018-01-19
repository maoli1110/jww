<template>
    <div class="in-game">
        <div class="ingame-1"></div>
        <div class="ingame-2"></div>
        <div class="ingame-3"></div>
        <div class="user-info">
        </div>
        <i class="machine-shadow-fixed"></i>
        <div class="message" @click="messageVisbile=true;">
        </div>
        <div class="level__medium">
            <div id="ex_doll_game">
                <div class="doll-machine">
                    <div class="machine" id="machine">
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
                        <div class="atm">
                            <img :src="packetUrl" alt=""></div>
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
                <span class="btn-go"></span>
            </div>
        </div>
        <mt-tabbar>
            <mt-tab-item id="tab1" >
                <img slot="icon" :src="pay1Img" @click="payVisbile=true;">
            </mt-tab-item>
            <mt-tab-item id="tab2" >
                <img slot="icon" :src="bag1Img" @click="recordVisible=true;">
            </mt-tab-item>
        </mt-tabbar>
        <!-- <div class="pay-bag-button">
            <div class="pay" @click="payVisbile=true;">
                <img :src="pay1Img" alt="">
            </div>
            <div class="bag" >
                <img :src="bag1Img" alt="">
            </div>
        </div> -->
        <div class="back" @click="back()">
            <img :src="back1Img" alt="">
        </div>
        <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
        <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide"></v-record>
        <v-message v-show="messageVisbile" :is-show="messageVisbile" @panelHide="panelHide"></v-message>
    </div>
</template>
<script>
// import "../../../static/js/move.min.js";
// import "../../../static/js/web.min.js";
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
import vMessage from '../Game/message.vue';
export default {
    data() {
        return {
            packetUrl:'',
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
            messageVisbile:false
        }
    },
    methods: {
        panelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
            this.messageVisbile = visible;
        },
        back(){
            this.$router.push('/main/home');
        }
    },
    components: {vPaylist,vRecord,vMessage},
    created(){
         
    },
    mounted() {
        console.log(this.$route.params.num)
        let packetNum = this.$route.params.num + 1 ;
        let moveBottom = $('#doll-list2').offset().top-$("#machine-clip").height()/3;
        this.packetUrl = './static/img/'+packetNum+'.png';
        $(".doll-img_name__goods").css("background",'url(./static/img/'+this.$route.params.num+'.png) 47% 0 no-repeat');
        $(".doll-img_name__goods").css("background-size",'150%');
        $(".doll-item").css("background",'url(./static/img/'+this.$route.params.num+'.png) 36% 0 no-repeat');
        $(".doll-item").css("background-size","150%");
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

        function restTransition(domName,type) {
            
            if(domName == 'xy'){
                $('#machine-clip').css('transform', 'translateX(' + m + 'px)');
                $('#machine-clip').css('-webkit-transform', 'translateX(' + m + 'px)');
                $('#machine-clip').css('transition-duration', '0.5s');
                $('#machine-clip').css('-webkit-transition-duration', '0.5s'); 
            } else {
                $('.machine').css('transform', 'translateZ(' + n + 'px)');
                $('.machine').css('-webkit-transform', 'translateZ(' + n + 'px)');
                $('.machine').css('transition-duration', '0.5s');
                $('.machine').css('-webkit-transition-duration', '0.5s');
                if(n== -30 || n== 30 ){
                    return; 
                } else {
                    // console.log(n)
                    moveBottom = -Math.abs(moveBottom);
                    if(type == 'up'){
                        // console.log('up')
                        moveBottom = moveBottom + 25;
                        console.log(moveBottom)
                        $('.machine-shadow').animate({bottom:moveBottom});
                    } else {
                        moveBottom = moveBottom - 25;
                        // console.log('down')
                        // console.log(moveBottom)
                        $('.machine-shadow').animate({bottom:moveBottom,speed:1000,easing:'linear'});
                    }
                }
            }
        }

        function getLevel() {
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
                setTimeout(()=>{
                    games.isRun = 0;
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
                    rising: 2e3
                },
                this.setTime.clipCatchStart = 100,
                this.setTime.fallingToRising = this.setTime.falling,
                this.setTime.risingEnd = this.setTime.falling + this.setTime.rising,
                this.getHeight = function() {
                    var level = getLevel();
                    var a = $(document).height(),
                        b = $("#machine-clip").height(),
                        c = $(document.getElementById("doll-list"+level)).offset().top,
                        d = c-b/2;
                        console.log(a,c) 
                    console.log('ddd')
                    return d
                },
                this.screen_h = $(document).height(),
                this.falling = function() { /*钩子开始下落*/
                    this.running = !0;
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
                        move(_clip).set("transform", b).duration(1700).ease("linear").end();
                        games.offDoll.call(_this, _this.screen_h, _this.setTime.rising)
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
                    var b = 1;
                    return setTimeout(function() {
                        var a = -1;
                        var level = getLevel();
                        b = this.$clip.offset().left;
                        $('#doll-list'+level+' >li').map(function(c, d) {
                            var e = Math.abs($(d).offset().left);
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
                        //保持影子不动
                        $(".machine-shadow-fixed").css({'left':-100,'top':-100});
                        $(".machine-shadow").css('display','block');
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
        var timeOutEvent;

        /**爪子左右移动**/
        App.move = function() {
            var left = document.querySelector('.btn-left');
            var right = document.querySelector('.btn-right');
            var up = document.querySelector('.btn-up');
            var down = document.querySelector('.btn-down');
            var timer = null;
            var max = $(".doll-machine").width() - $(".machine-clip").width();
            var min = -30;
            $(left).on({
                touchstart: function(e){
                    console.log(games.isRun)
                    if(!games.isRun){
                        timeOutEvent = setTimeout(function() {
                            timeOutEvent = 0;   
                            console.log("长按事件触发发"); 
                            App.longPlayMove('left');
                        },200);  
                        e.preventDefault();
                    }
                },  
                touchmove: function(){  
                    clearTimeout(timeOutEvent);
                    timeOutEvent = 0;
                },  
                touchend: function(){  
                    clearTimeout(timeOutEvent);  
                    if(timeOutEvent!=0){ 
                        if(!games.isRun){
                            App.playMove('left');
                            console.log("你这是点击，不是长按");
                        }
                    } else {
                        clearInterval(timer);
                    }
                    return false;
                }  
            });

            $(right).on({
                touchstart: function(e){
                    console.log(games.isRun)
                    if(!games.isRun){
                        timeOutEvent = setTimeout(function() {
                            timeOutEvent = 0;   
                            console.log("长按事件触发发"); 
                            App.longPlayMove('right');
                        },200); 
                        e.preventDefault();
                    }
                },  
                touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                    timeOutEvent = 0;
                },  
                touchend: function(){  
                    clearTimeout(timeOutEvent);  
                    if(timeOutEvent!=0){  
                        if(!games.isRun){
                            App.playMove('right');
                            console.log("你这是点击，不是长按");
                        } 
                    } else {
                        clearInterval(timer);
                    }
                    return false;   
                }  
            });

            $(up).on({
                touchstart: function(e){
                    if(!games.isRun){
                        timeOutEvent = setTimeout(function() {
                            timeOutEvent = 0;   
                            console.log("长按事件触发发"); 
                            App.longPlayMove('up');
                        },200);  
                        e.preventDefault();
                    }
                },  
                touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                    timeOutEvent = 0;
                },  
                touchend: function(){  
                    clearTimeout(timeOutEvent);  
                    if(timeOutEvent!=0){   
                        if(!games.isRun){
                            App.playMove('up');
                            console.log("你这是点击，不是长按");
                        }
                    } else {
                        clearInterval(timer);
                    }
                    return false;   
                }  
            });

            $(down).on({
                touchstart: function(e){
                    if(!games.isRun){
                        timeOutEvent = setTimeout(function() {
                            timeOutEvent = 0;   
                            console.log("长按事件触发发"); 
                            App.longPlayMove('down');
                        },200);  
                        e.preventDefault();
                    }
                },  
                touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                    timeOutEvent = 0;
                },  
                touchend: function(){  
                    clearTimeout(timeOutEvent);  
                    if(timeOutEvent!=0){   
                        if(!games.isRun){
                            App.playMove('down');
                            console.log("你这是点击，不是长按");
                        }
                    } else {
                        clearInterval(timer);
                    }
                    return false;   
                }  
            });

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
                    console.log("timer....")
                    if ((dir == 'left') || (dir == 'right')) {
                        m = m + speed;
                        if (m > max) {
                            m = max;
                        } else if (m < min) {
                            m = min;
                        }
                        restTransition('xy');
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
                    speed = -30;
                    break;
                    case 'up':
                    speed = -10;
                    break;
                    case 'right':
                    speed = 30;
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
                    restTransition('xy');
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
            var a = document.querySelectorAll(".doll-bets-btn")[0];
            if ("undefined" != typeof a ) {
                    var b = new ClampDoll;
                    a.addEventListener("click",function(){
                        isCatch = false;
                        if($("#machine-clip").offset().left < 20) return;
                        let shadowLeft = $(".machine-shadow").offset().left;
                        let shadowTop = $(".machine-shadow").offset().top;
                        $(".machine-shadow").css('display','none');
                        //保持影子不动
                        $(".machine-shadow-fixed").show();
                        $('.machine-shadow-fixed').css({'left':shadowLeft,'top':shadowTop})
                        console.log(games.isRun);
                        if(games.isRun===1) return;
                        console.log(games.isRun,'games.isRun');
                        b.init();
                        games.isRun = 1;
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
    background: url("../../../static/img/ingame_bg1.png") no-repeat;
    background-size:100% 100%;
}
.ingame-2 {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/ingame_bg2.png") no-repeat;
    background-size:100% 100%;
}
.ingame-3 {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100vh;
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
    bottom: 12%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
}
.op-btn > .operation-btn {
    flex:1;
}
.op-btn > .doll-bets-btn {
    flex:0 0 40%;
    vertical-align: middle;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
.op-btn > .doll-bets-btn .btn-go {
    background: url('../../../static/img/ingame_btn_go1.png') no-repeat;
    background-size: 100%;
    width: 2rem;
    height: 1.5rem;
    display: inline-block;
    margin-top: 0.3rem;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
.op-btn > .doll-bets-btn .btn-go:active {
    background: url('../../../static/img/ingame_btn_go2.png') no-repeat;
    background-size: 100%;
    width: 2rem;
    height: 1.5rem;
    display: inline-block;
    margin-top: 0.3rem;
}
.operation-btn {
    display: flex;
    display: -webkit-flex;
    flex-wrap:wrap;
    margin-left: .4rem;
}
.operation-btn > div {
    height: .65rem; 
    width: 30%;
}

.doll-bets-btn{
    width: 30%;
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
    /*left: 10px;*/
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
.user-info {
    width: 2.9rem;
    height: 1.9rem;
    position: absolute;
    right: 0;
    top: .19rem;
    z-index: 8;
    background: url('../../../static/img/ingame_table_information.png') no-repeat;
    background-size: 2.69rem 1.1rem;
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
</style>
<style>
.in-game .mint-tabbar .mint-tab-item-icon {
    width: 70% !important;;
    height: 100%;
}

</style>
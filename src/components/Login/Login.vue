<template>
    <div class="login-wrap">
        <div class="login-bg"><img :src="bgImg" alt=""></div>
            <!-- <div class="login-button login-wx" @click="wxLogin"><img :src="wxLoginImg" alt=""></div> -->
            <a :href="weixinUrl"><div class="login-button login-wx" @click="wxLogin"><img :src="wxLoginImg" alt=""></div></a>
            <div class="login-button login-account" @click="accountLogin"><img :src="accountLoginImg" alt=""></div>
            <!-- 支付宝 qq登录 勿删 -->
            <!-- <div class="login-button login-ali-qq">
                <img :src="aliLoginImg" alt="" @click="wxLogin">
                <img :src="qqLoginImg" alt="" @click="wxLogin">
            </div> -->
        </div>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
import { login } from "../../api/getData.js";
export default {
    data() {
        return {
            weixinUrl:'',
            bgImg:'./static/img/login_bg.jpg',
            wxLoginImg:'./static/img/login_btn_wx1.png',
            accountLoginImg:'./static/img/login_btn_account1.png',
            aliLoginImg:'./static/img/login_btn_ali1.png',
            qqLoginImg:'./static/img/login_btn_qq1.png',
            loginForm: {
                username: "",
                password: ""
            },
            device:""
        }
    },
    created() {
        //http://192.168.1.8:8889/#/login?code=1,从url获取参数塞到登录地址
        let params  = window.location.href.split('?')[1];
        if(params){
            let item = {},name;
            params = params.split('&');
            params.forEach((val,key)=>{
                name = val.split('=')[0];
                val = val.split('=')[1];
                item[name] = val;
            })
            this.device = item.code;
        }

        if(isNaN(this.device) && this.device){
            this.device ='1';
        }
        //存储deviceCode
        sessionStorage.removeItem('deviceCode');
        sessionStorage.setItem('deviceCode',this.device);

        this.weixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeee9fa8365ffb733&redirect_uri=http://game.yocatch.com/back/app/login&response_type=code&scope=snsapi_userinfo&state='+this.device+'#wechat_redirec';
        console.log(this.weixinUrl)
    },
    methods: {
        // wx登录
        wxLogin() {
            login().then();
            this.$router.push("/main/home");
        },
        // 账号登录
        accountLogin() {
            this.$router.push("/account");
        }
    },
    watch:{

    }
}
</script>
<style scoped>
.login-bg > img {
    height: 110%;
    position: fixed;
    z-index: 0;
    user-select: none;
}
.login-wx > img {
    position: fixed;
    width: 3rem;
    margin: 0 auto;
    right: 0;
    left: 0;
    bottom: 1.5rem;
    /*height: .6em;*/
    user-select: none;
}
.login-account > img {
    position: fixed;
    width: 3rem;
    margin: 0 auto;
    right: 0;
    left: 0;
    bottom: .5rem;
    /*height: .6em;*/
    user-select: none;
}
.login-ali-qq {
    display: flex;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0.2rem;
}
.login-ali-qq >img{
    display: inline-block;
    width: 47%;
    padding: 3%;
    height: 1rem;
    flex: 1;
}

</style>

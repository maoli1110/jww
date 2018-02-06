<template>
    <div class="login-wrap">
        <div class="login-bg"><img :src="bgImg" alt=""></div>
        <div class="login-button login-wx" @click="wxLogin"><img :src="wxLoginImg" alt=""></div>
        <div class="login-button login-ali-qq">
            <img :src="aliLoginImg" alt="" @click="wxLogin">
            <img :src="qqLoginImg" alt="" @click="wxLogin">
        </div>
    </div>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
import { login } from "../../api/getData.js";
export default {
    data() {
        return {
            bgImg:'./static/img/login_bg.jpg',
            wxLoginImg:'./static/img/login_btn_wx1.png',
            aliLoginImg:'./static/img/login_btn_ali1.png',
            qqLoginImg:'./static/img/login_btn_qq1.png',
            loginForm: {
                username: "",
                password: ""
            }
        }
    },
    created() {
    },
    methods: {
        wxLogin() {
            login().then();
            this.$router.push("/main/home");
        }
    },
    watch:{

    }
}
</script>
<style scoped>
.login-bg > img {
    width: 100%;
    height: 100%;
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
    height: .6em;
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

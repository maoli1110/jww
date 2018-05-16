<template>
    <div>
        <div class="address" :style="{backgroundImage:`url(${bgUrl})`}">
            <div class="back">
                <img :src="back1Img" alt="" @click="back">
            </div>
            <div class="address_content_history">
                <div class="history_address" >
                    <div>
                        <div class="clearfix address_list my_address"> 
                            <div class="f_l" style="height:130px;">
                                <p class="font-26">
                                    <img class="rece-address" :src="mineInfo.defaultUrl" alt="">
                                </p>
                                <p class="font-26">{{mineInfo.defaultAddress.reciveName}}&nbsp;{{mineInfo.defaultAddress.phoneNumber}}&nbsp;{{mineInfo.defaultAddress.province}}{{mineInfo.defaultAddress.city}}{{mineInfo.defaultAddress.detailAddress}}</p>
                            </div>
                        </div>
                        <div class="mine-log clearfix">
                            <div class="mine-log-wrap">
                                <div class="log-list">
                                    <div  v-for="(item,index) in mineInfo.logList" class="clearfix">
                                        <div class="font-26" style="width:100%;height:30px">
                                            <p class="font-26" style="float:left">{{item.createTime}}</p>
                                            <span v-if="item.status==1" class="green font-26" style="float:right">抓取成功</span>
                                            <span  v-if="item.status==0" class="red font-26" style="float:right">抓取失败</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="new-address log-btn"  @click="logOut">
                        <mt-button type="default" class="Grid-cell" @click="logOut"></mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import vPaylist from "../Game/pay.vue";
    import vRecord from '../Game/record.vue';
    import  '../../../static/css/home.css';             //主页样式
    import {getOldAddress,myWawaLog} from "../../api/getData.js"
    import { dateFormat,setSessionstorage, getSessionstorage } from "../../utils/common.js";
    let initFresh = false;      //刷新状态
    export default {
        data() {
            return {
                selected:"",                    //tab选中状态
                back1Img:'./static/img/ingame_btn_back1.png',
                bgUrl:"./static/img/home_bg2.png",
                reFresh:false,       //刷新状态
                addressList:[],
                mineInfo:{
                    defaultUrl:"./static/img/mine_text_myaddress.png",
                    defaultAddress:{},
                    logUrl:"./static/img/mine_text_myrecord.png",
                    logList:[]
                }
            }
        },
        components: {},
        methods: {
            //组件关窗通信
           /* panelHide(visible){
                this.payVisbile =visible;
            },*/
            back(){
                this.$router.push('/main/home');
            },
            // 获取地址列表
            getOldAddress() {
                getOldAddress().then((res)=>{
                    if(res.data.data.length){
                        this.addressList = res.data.data;
                        this.mineInfo.defaultAddress = res.data.data[0];
                    }
                })
            },
            //我的战绩
            wawaLog(){
                myWawaLog().then((res)=>{
                   this.mineInfo.logList = res.data.data.content;
                   this.mineInfo.logList.forEach((val,key)=>{
                       val.createTime = dateFormat(val.createTime,'mate')
                   })
                })
            },
            logOut(){   //退登
                this.$router.push('/login');//退出当前登录
            },
            defaultPicture(){ //默认背景
                this.bgUrl = "./static/img/home_bg2.png";
            },
        },
        beforeRouteEnter (to, from, next) {//判断是不是手动刷新
            if(from.path=='/'){
                initFresh = true;       //刷新状态
            }else{
                initFresh = false;
            }
            next();
        },
        created(){
            // 获取地址列表
            this.defaultPicture();
            this.getOldAddress();
            this.wawaLog();
            this.reFresh = initFresh;   //刷新状态
        },
        mounted(){

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
    .mint-tab-item{
        padding:0 !important;
    }
    .mint-tab-item-icon > *{
        height:84%;
    }
    .address-mask{
        width:100%;height:100%;background:#000;opacity:0.5;z-index:4
    }
    .rece-address{
        width:44%;margin:0 0 6px 0;
        opacity: 0;
    }
    .mine-log{
        height: calc(100vh - 540px);
        overflow:auto;
        background: url('../../../static/img/mine_record_table.png') no-repeat;
        background-size: 100% 100%;
    }
    .mine-log >div {
        height:calc(100% - 100px);
    } 
    .wawa-log{
        width:28%;margin:0 0 6px 0;
    }
    .log-btn .mint-button{
        color: #fff;
        position: fixed;
        width: 5.4rem;
        margin: 0 auto;
        right: 0;
        left: 0;
        bottom: .04rem;
        height: 6em;
        background:url('../../../static/img/mine_btn_exit1.png') no-repeat 0 0;
        background-size:100%;
    }
    .address_list {
        border-radius: 10px;
        margin-bottom: 10px;
    }
    .history_address .my_address {
        background: url('../../../static/img/mine_address_table.png') no-repeat;
        background-size: 100%;
        height: 153px;
    }
    .mine-log-wrap {
        overflow: hidden;
        margin-top: 70px;
        height: calc(100% - 50px);
    }
    /* 判断iphonex */
    @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3){
        .mine-log-wrap {
            overflow: hidden;
            margin-top: 100px;
            height: calc(100% - 50px);
        }
    }
    .log-list {
        overflow:auto;
        height: calc(100% - 50px);
    }
</style>

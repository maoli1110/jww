<template>
<div class="home">
    <div class="address">
        <div class="back">
            <img :src="back1Img" alt="">
        </div>
        <div class="location-select rela" v-if="isSlectProvince">
            <div class="font-16x title algin align-center"><span>请选择省份</span><span class="icon" @click="ok"></span></div>
            <mt-picker :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
        </div>
        <div class="location-select rela" v-if="isSlectCity">
            <div class="font-16x title algin align-center"><span>请选择城市</span><span class="icon" @click="ok"></span></div>
            <mt-picker :slots="slots1" @change="onValuesChange1"></mt-picker>
        </div>
        <div class="address_content">
            <div class="new_address">
                <div style="font-size:16px;" class="location username">
                    <label for="" style="width:101px;">收货人姓名</label>
                    <input class="select-input" placeholder="请输入收货人姓名" type="text" v-model="address.username">
                </div>
                <div style="font-size:16px;" class="location phone">
                    <label for="" style="width:101px;">手机号码</label>
                    <input class="select-input"  placeholder="请输入11位手机号码" type="" name="" v-model="address.phoneNumer"></span>
                </div>
                <div style="font-size:16px;" class="location">
                    <label for="" style="width:101px;">请选择省份</label>
                    <span class="select" @click="selectProvince">{{province}}</span>
                    <span class="icon" @click="selectProvince"></span>
                </div>
                <div class="" style="font-size:16px;" class="location">
                    <label for="" style="width:101px;">请选择城市</label>
                    <span class="select" @click="selectCity">{{city}}</span>
                    <span class="icon" @click="selectCity"></span>
                </div>
                <mt-field label="详细地址" placeholder="xx区9999弄99号999室" type="textarea" rows="2" v-model="address.detailAddress"></mt-field>
                <hr>
                <label class="address-checkbox-select"><input type="checkbox" class="checkbox-input"> <span class="address-checkbox-core"></span>  
                </label>
            </div> 
            <div class="new_address history_address">
                <p class="font-32">使用历史地址</p>
                <div>
                    <hr>
                    <div class="clearfix">
                        <div class="f_l">
                            <p class="font-20">地址1</p>
                            <p class="font-20"><span>我我我</span><span>1878787878</span></p>
                            <p class="font-20">地址1</p>
                            <label class="address-checkbox-select"><input type="checkbox" class="checkbox-input"> <span class="address-checkbox-core"></span>  
                            </label>
                        </div>
                        <div class="f_r">
                            <label class="address1-checkbox-select"><input type="checkbox" class="checkbox-input"> <span class="address1-checkbox-core"></span>  
                            </label> 
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="save_address">
            <mt-button type="default" class="Grid-cell" @click="deleteMsg(detailMessageInfo.id)"></mt-button>
        </div>
    </div>
    <div class="main-nav">
           <mt-tabbar v-model="selected" :value="selected">
               <mt-tab-item id="home">
                   <img slot="icon" :src="homeNavImg" @click="selectItem('home')">
               </mt-tab-item>
               <mt-tab-item id="bag">
                   <img slot="icon" :src="bagNavImg">
               </mt-tab-item>
               <mt-tab-item id="mine">
                   <img slot="icon" :src="mineNavImg">
               </mt-tab-item>
           </mt-tabbar>
    </div>
    <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
    <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHideRecord" ref="recordList"></v-record>
</div>
</template>
<script>
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
import  '../../../static/css/home.css';             //主页样式
import { getWlist,getUserInfo } from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
export default {
    data() {
        return {
            selected:"",                    //tab选中状态
            isSlectProvince:false,
            isSlectCity:false,
            defalultWW:'./static/img/ingame_toy.png',
            homeNavImg:'./static/img/home_btn_home1.png',
            bagNavImg:'./static/img/home_btn_bag1.png',
            mineNavImg:'./static/img/home_btn_my1.png',
            back1Img:'./static/img/ingame_btn_back1.png',
            back2Img:'./static/img/ingame_btn_back2.png',
            payVisbile:false,
            recordVisible:false,
            list:[],
            userInfo:{},
            address:{
                username:'',
                phoneNumer:'',
                detailAddress:''
            },
            province:'请选择',
            city:'请选择',
            proviceList:[],
            cityList:[],
            slots:[{
              flex: 1,
              values: JSON.parse(localStorage.getItem('locationObj')).provinces,
              className: 'slot1',
              textAlign: 'center'
            }],
            slots1:[{
              flex: 1,
              values:[],
              className: 'slot1',
              textAlign: 'center'
            }]
        }
    },
    components: {vPaylist,vRecord},
    methods: {
        //组件关窗通信
        panelHide(visible){
            this.payVisbile =visible;

        },
        panelHideRecord(visible){
          this.recordVisible = visible;
        },
        //tab 背景重置
        restNavBg() {
            this.homeNavImg='./static/img/home_btn_home1.png',
            this.mineNavImg='./static/img/home_btn_my1.png',
            this.bagNavImg = './static/img/home_btn_bag1.png'
        },
        //初始化跳链接
        inGame(index){
            index = index +1;
            this.$router.push('/main/ingame/'+index);

            // if(index==0){
            //     this.$router.push('/main/ingame');
            // }else if(index==1){
            //    window.location.href="http://www.910nice.com";
            // }else if(index==2){
            //     window.location.href='http://h.mashangzhua.com/pages/index.html?appId=ba82de9ff96248569eef2ccc796000f3';
            // }
        },
        selectItem(type){
            this.$router.push('/main/home');
        },
        recharge() {
          this.payVisbile = true;
        },
        selectProvince() {
            this.isSlectProvince = true;
        },
        selectCity() {
            this.isSlectCity = true;
        },
        onValuesChange(index,value) {
            console.log(value.name)
            this.province = value[0].name;
            this.citysList = value[0].citys;
            this.slots1[0].values = this.citysList;
        },
        onValuesChange1(index,value) {
            console.log(value.name)
            this.city = value[0];
        },
        ok(){
            this.isSlectCity = false;
            this.isSlectProvince = false;
        }
    },
    created(){
        // this.selected = 'home'; //默认选中home页
        console.log(window.locationObj.provinces);
    },
    mounted(){
        //获取列表
        this.list = getSessionstorage('wlist');
        if(!this.list){
           getWlist().then((res)=>{
              this.list = res.data.data.content;
              setSessionstorage('wlist',res.data.data.content);
            });
        }
        //获取用户信息并保存至sessionStorage
        window.userInfo = getSessionstorage('userInfo');
        this.userInfo = window.userInfo; //当前页面赋值用户信息
        if(!window.userInfo){
            getUserInfo().then((res)=>{
               setSessionstorage('userInfo',res.data.data); //sessionStorage存用户信息
               window.userInfo = getSessionstorage('userInfo'); //window全局存用户信息
               this.userInfo = window.userInfo; //当前页面赋值用户信息
            });
        }
    },
    watch:{
        selected:function(newVal,oldVal){//tab索引值监听
            this.restNavBg();
            if(newVal !=oldVal){
               if(newVal=='bag'){
                 this.$refs.recordList.getBackpackList();
                   this.recordVisible = true;
                   this.bagNavImg = './static/img/home_btn_bag2.png';
               }else if(newVal=='mine'){
                 this.$refs.recordList.getBackpackList();
                   this.mineNavImg = './static/img/home_btn_my2.png';
                   this.recordVisible = true;
               }else if(newVal=='home'){
                   this.homeNavImg = './static/img/home_btn_home2.png';
               }
           }
        },
        recordVisible:function(newVal,oldVal){
            if(newVal!=oldVal && !newVal){
                this.selected = '';//关闭弹窗的选种路径清空
                this.restNavBg();
            }
        },
        payVisbile:function(newVal,oldVal){
            if(newVal!=oldVal && !newVal){
                this.selected = '';//关闭弹窗的选种路径清空
                this.restNavBg();
            }
        }
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
</style>

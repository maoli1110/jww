<template>
<div class="home">
    <div class="address">
        <div class="back">
            <img :src="back1Img" alt="" @click="back">
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
            <div class="new_address" v-show="isNewAddress">
                <div style="font-size:16px;" class="location username">
                    <label for="">收货人姓名</label>
                    <input class="select-input" placeholder="请输入收货人姓名" type="text" v-model="address.username">
                </div>
                <div style="font-size:16px;" class="location phone">
                    <label for="">手机号码</label> 
                    <input class="select-input"  placeholder="请输入11位手机号码" type="number" name="" v-model="address.phoneNumer"></span>
                </div>
                <div style="font-size:16px;" class="location">
                    <label for="">请选择省份</label>
                    <span class="select" @click="selectProvince">{{province}}</span>
                    <span class="icon" @click="selectProvince"></span>
                </div>
                <div class="" style="font-size:16px;" class="location">
                    <label for="">请选择城市</label>
                    <span class="select" @click="selectCity">{{city}}</span>
                    <span class="icon" @click="selectCity"></span>
                </div>
                <mt-field label="详细地址" placeholder="xx区9999弄99号999室" type="textarea" rows="2" v-model="address.detailAddress"></mt-field>
                <hr>
                <label class="address-checkbox-select" @click="setDefaultAddress('new')"><input type="checkbox" class="checkbox-input"><span class="address-checkbox-core"></span>
                </label>
                <!-- <div class="save_address">
                    <mt-button type="default" class="Grid-cell" @click="saveAddress"></mt-button>
                </div> -->
                <div class="save_address">
                    <mt-button type="default" class="Grid-cell" @click="saveAddress">保存</mt-button>
                </div>
            </div> 
            <div class="new_address history_address" v-show="isAddressList">
                <p class="font-32 title">地址列表</p>
                <div>
                    <div class="clearfix address_list" v-for="(item,index) in addressList">
                        <div class="f_l">
                            <p class="font-20">地址{{index+1}}</p>
                            <p class="font-20"><span style="margin-right:20px">{{item.reciveName}}</span><span>{{item.phoneNumber}}</span></p>
                            <p class="font-20">{{item.detailAddress}}</p>
                            <label class="address-checkbox-select" @click="setDefaultAddress('history')"><input type="checkbox" class="checkbox-input"> <span class="address-checkbox-core"></span>  
                            </label>
                        </div>
                        <div class="f_r">
                            <label class="address1-checkbox-select" ><input type="checkbox" class="checkbox-input" value="this.historyAddressId" @click="setHistoryAddress('1',$event)"> <span class="address1-checkbox-core"></span>  
                            </label> 
                        </div>
                    </div>
                    <div class="clearfix address_list" v-for="(item,index) in addressList">
                        <div class="f_l">
                            <p class="font-20">地址{{index+1}}</p>
                            <p class="font-20"><span style="margin-right:20px">{{item.reciveName}}</span><span>{{item.phoneNumber}}</span></p>
                            <p class="font-20">{{item.detailAddress}}</p>
                            <label class="address-checkbox-select" @click="setDefaultAddress('history')"><input type="checkbox" class="checkbox-input"> <span class="address-checkbox-core"></span>  
                            </label>
                        </div>
                        <div class="f_r">
                            <label class="address1-checkbox-select" ><input type="checkbox" class="checkbox-input" value="this.historyAddressId" @click="setHistoryAddress('1',$event)"> <span class="address1-checkbox-core"></span>  
                            </label> 
                        </div>
                    </div>
                </div>
                <div class="save_address">
                    <mt-button type="default" class="Grid-cell" @click="saveAddress">添加新地址</mt-button>
                </div>
                    

            </div>
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
import { getWlist,getUserInfo,setApplyWawa,addNewAddress,setDefaultAddress,getOldAddress} from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
export default {
    data() {
        return {
            isNewAddress:true,
            isAddressList:false,
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
            historyAddressId:'',
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
            }],
            addressList:[]
        }
    },
    components: {vPaylist,vRecord},
    methods: {
        //字段处理验证
        valiDataAddress(addressObj) {
            for(var key in addressObj){
                console.log("属性：" + key + ",值：" + addressObj[key]);
                if(!addressObj[key]){
                    alert("请填写"+key);
                    return false;
                } 
                return true
            }
        },
        
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
        onValuesChange1 (index,value) {
            console.log(value.name)
            this.city = value[0];
        },
        ok() {
            this.isSlectCity = false;
            this.isSlectProvince = false;
        },
        back(){
            this.$router.push('/main/home');
        },
        saveAddress() {
            if(this.valiDataAddress(this.address)){
                this.isAddressList = true; //显示列表页面
                this.isNewAddress = false; //显示新增地址页面
            }
            // if(true){
            //     this.isAddressList = true;
            //     this.isNewAddress = false;
            // }
               
        },
        // 设置默认地址
        setDefaultAddress(type,id) {
            // if(type==='new'){
            //     this.valiDataAddress(this.address);
            // }
        },
        // 设置历史地址
        setHistoryAddress(id,event) {
            let isSelected = $('.address1-checkbox-select .checkbox-input').prop('checked');
            if(isSelected){
                this.historyAddressId = id;
            } else {
                this.historyAddressId = '';
            }
        }
    },
    created(){
        // this.selected = 'home'; //默认选中home页
        // 获取地址列表
        getOldAddress().then((res)=>{
            console.log(res)
            if(res.data.data.length){
                this.isAddressList = true;
                this.isNewAddress = false;
                this.addressList = res.data.data;
                console.log(this.addressList)
            }
        })

    },
    mounted(){
    
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

<template>
<div>
    <div class="address" :style="{backgroundImage:`url(${bgUrl})`}">
        <div class="back">
            <img :src="back1Img" alt="" @click="back">
        </div>
        <div class="absol address-mask" style="" v-if="isSlectProvince || isSlectCity "></div>
        <div class="location-select rela" v-if="isSlectProvince">
            <div class="font-32 title algin align-center"><span class="font-32">请选择省份</span><span class="icon" @click="ok"></span></div>
            <mt-picker :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
        </div>
        <div class="location-select rela" v-if="isSlectCity">
            <div class="font-32 title algin align-center"><span class="font-32">请选择城市</span><span class="icon" @click="ok"></span></div>
            <mt-picker :slots="slots1" @change="onValuesChange1"></mt-picker>
        </div>
        <div class="address_content" v-show="isNewAddress">
            <div class="new_address">
                <div class="new_address_wrap">
                    <div style="font-size:16px;" class="location username">
                        <label for="">收货人姓名</label>
                        <input class="select-input" placeholder="请输入收货人姓名" type="text" v-model="address.reciveName">
                    </div>
                    <div style="font-size:16px;" class="location phone">
                        <label for="">手机号码</label>
                        <input class="select-input"  placeholder="请输入11位手机号码" type="number" name="" v-model="address.phoneNumber"></span>
                    </div>
                    <div style="font-size:16px;" class="location">
                        <label for="">请选择省份</label>
                        <span class="select" @click="selectProvince">{{address.province}}</span>
                        <span class="icon" @click="selectProvince"></span>
                    </div>
                    <div class="" style="font-size:16px;" class="location">
                        <label for="">请选择城市</label>
                        <span class="select" @click="selectCity">{{address.city}}</span>
                        <span class="icon" @click="selectCity"></span>
                    </div>
                    <mt-field label="详细地址" style="color:#BF9563;" placeholder="xx区9999弄99号999室" type="textarea" rows="2" v-model="address.detailAddress"></mt-field>
                    <hr>
                    <label class="address-checkbox-select"><input id="new_set_default" type="checkbox" class="checkbox-input"><span class="address-checkbox-core"></span>
                    </label>
                </div>
            </div>
            <div class="save_address">
                <mt-button type="default" class="Grid-cell" @click="saveAddress"></mt-button>
            </div>
        </div>
        <div class="address_content_history" v-show="isAddressList">
            <div class="history_address" >
                <div>
                    <div class="clearfix address_list" v-for="(item,index) in addressList">
                        <div class="f_l">
                            <p class="font-26">地址{{index+1}}</p>
                            <p class="font-26"><span style="margin-right:20px">{{item.reciveName}}</span><span>{{item.phoneNumber}}</span></p>
                            <p class="font-26">{{item.detailAddress}}</p>
                            <label class="address-checkbox-select"><input type="checkbox" class="checkbox-input"  :class="'defaultSelected'+index" @click="setDefaultAddress('history',item.id,index)" :data-id="'defaultSelected'+index"> <span class="address-checkbox-core"></span>
                            </label>
                        </div>
                        <div class="f_r">
                            <label class="address1-checkbox-select" ><input type="checkbox" class="checkbox-input" :class="'addressSelected'+index" :data-id="'addressSelected'+index" value="this.historyAddressId" @click="setAddress(index,item.id)"> <span class="address1-checkbox-core"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="new-address">
                    <mt-button type="default" class="Grid-cell" @click="toAddNew"></mt-button>
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
import { getWlist,getUserInfo,setApplyWawa,addNewAddress,setDefaultAddress,getOldAddress} from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
let initFresh = false;      //刷新状态
export default {
    data() {
        return {
            istest:0,
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
                reciveName:'',
                phoneNumber:'',
                province:'请选择',
                city:'请选择',
                detailAddress:'',
                isDefault:"0"
            },
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
            addressList:[],
            bgUrl:"",
            reFresh:false       //刷新状态
        }
    },
    components: {vPaylist,vRecord},
    methods: {
        //字段处理验证
        valiDataAddress(addressObj) {
            for(var key in addressObj){
                if(!addressObj[key]){
                    alert("请填写完整收货信息！");
                    return false;
                }
                //手机号正则
                var phoneReg = /(^1[3|4|5|6|7|8]\d{9}$)|(^09\d{8}$)/;
                //电话
                var phone = $.trim(addressObj.phoneNumber);
                if (!phoneReg.test(phone)) {
                    alert('请输入有效的手机号码！');
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
            if(this.address.province==="请选择" || !this.address.province){
                alert('请先选择省份！')
            } else {
                this.isSlectCity = true;
            }
        },
        onValuesChange(index,value) {
            // console.log(value.name)
            this.address.province = value[0].name;
            this.citysList = value[0].citys;
            this.slots1[0].values = this.citysList;
        },
        onValuesChange1 (index,value) {
            // console.log(value.name)
            this.address.city = value[0];
        },
        ok() {
            this.isSlectCity = false;
            this.isSlectProvince = false;
        },
        back(){
            this.$router.push('/main/home');
        },
        showAddressList() {
            this.isNewAddress = false;
            this.isAddressList = true;
        },
        showNewAddress() {
            this.isNewAddress = true;//显示列表页面
            this.isAddressList = false;//显示新增地址页面
        },
        saveAddress() {
            if(this.valiDataAddress(this.address)){
                //判断新增地址是否选中
                if($("#new_set_default").prop('checked')){
                    this.address.isDefault="1";
                } else {
                    this.address.isDefault="0";
                }
                let params = this.address;
                //调用新增地址接口
                addNewAddress(params).then((res)=>{
                   // showAddressList();
                   this.getOldAddress();
                });
            }
            this.defaultPicture();
        },
        toAddNew() {
            this.defaultPicture();
            this.showNewAddress();
        },
        // 设置默认地址
        setDefaultAddress(type,id,index) {
            // console.log(id,'id')
            if(type==='new'){
                let isSelected = $('#new_set_default').prop('checked');
                if(isSelected){
                    this.address.isDefault = 1;
                } else {
                    this.address.isDefault = 0;
                }
                this.valiDataAddress(this.address);
                let params = {id:id};
                //调用新增地址接口
                addNewAddress(params).then((res)=>{
                    this.showAddressList;
                });
            } else {
                //1.选择历史地址
                let isSelected = $('.defaultSelected'+index).prop('checked');
                if(!isSelected) {
                    $('.defaultSelected'+index).prop('checked',true)
                    return false;
                } else {
                    $('.address_content_history .address-checkbox-select .checkbox-input').each(function(){
                        console.log($(this).attr("data-id")!=("defaultSelected"+index));
                        if($(this).attr("data-id")==("defaultSelected"+index)){
                            $(this).prop('checked',true);
                        }else{
                            $(this).prop('checked',false);
                        }
                    })
                    //调用设置默认地址接口
                    let params = {id:id}
                    setDefaultAddress(params).then((res)=>{
                        console.log('setDefaultAddress success')
//                        this.getOldAddress();
                    })
                }
            }
        },
        // 选择收货地址并调用提取娃娃接口,完成提取娃娃最后一步
        setAddress(index,id) {
            let isSelected = $('.addressSelected'+index).prop('checked');
            if(!isSelected) {
                return false;
            } else {
                $('.address_content_history .address1-checkbox-select .checkbox-input').each(function(){
                    if($(this).attr("data-id")!=="addressSelected"+index){
                        $(this).prop('checked',false);
                    }
                })
                let params = {
                    bId:JSON.parse(sessionStorage.getItem('extractIdList')), //娃娃ID
                    sendAddressId:id, //收货地址
                }
                setApplyWawa(params).then((res)=>{
                    if(res.data.data){
                        alert('提取成功');
                        //提取成功之后跳转到wwj列表页面
                        this.$router.push('/main/home');
                    }else{
                        alert('提取失败');
                    }
                })
            }
        },
        // 获取地址列表
        getOldAddress() {
             getOldAddress().then((res)=>{
                // console.log(res)
                 let index = '';
                if(res.data.data.length){
                    this.showAddressList();
                    this.addressList = res.data.data;
                    res.data.data.forEach((value,key)=>{
                        value.isDefault = parseInt(value.isDefault);
                        if(value.isDefault==1){
                            index = key;
                        }
                    })
                   setTimeout(()=>{
                       $('.address_content_history .address-checkbox-select .checkbox-input').each(function(){
                           console.log($(this).attr("data-id")!=("defaultSelected"+index));
                           if($(this).attr("data-id")==("defaultSelected"+index)){
                               $(this).prop('checked',true);
                           }else{
                               $(this).prop('checked',false);
                           }
                       })
                   },100)

                }
            })
        },
        defaultPicture(){
            console.log(this.isAddressList,'log');
            if(this.isAddressList){
                this.bgUrl = "./static/img/new_address_bg.jpg";
            }else{
                this.bgUrl = "./static/img/manage_address_bg.jpg";
            }
        },
        refreashPage(){
            this.$router.push('/main/home');
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
        this.reFresh = initFresh;   //刷新状态
    },
    mounted(){

    },
    watch:{
        reFresh:function(newVal,oldVal){//监听刷新状态
            if(newVal!=oldVal && newVal){
               this.refreashPage();
            }
        },
        '$route' (to,from){             //监听路由 改变刷新状态
            if(from.path){
                this.reFresh = true;
            }else{
                this.reFresh = false;
            }
        },
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
    .address-mask{
        width:100%;height:100%;background:#000;opacity:0.5;z-index:4
    }
    .save_address .mint-button {
        width: 271px;
        height: 89px;
    }
    .mint-cell-value textarea {
        border-radius:16px;
    }
    .new_address label{
        color:#BF9563;
    }
    /*.select-title {
        font-size: 20px;
    }*/
</style>

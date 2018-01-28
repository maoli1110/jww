<template>
    <div>
        <div class="absol mask">

        </div>
        <div v-show="isShow" class="absol recode-bg">
            <!--关闭按钮-->
            <div class="recode-close absol" @click="panelClose">
                <span></span>
            </div>
            <div class="absol recode-list">
            
                <!--table选项卡--> 
                <mt-navbar v-model="selected" class="absol" style="top:23%;z-index:100">
                    <mt-tab-item id="list" style=" ">
                        <img :src="tableSwitch.mineUrl" alt="">
                    </mt-tab-item>
                    <mt-tab-item id="history">
                        <img :src="tableSwitch.historyUrl" alt="">
                    </mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                    <mt-tab-container v-model="selected" class="record-content relat">
                        <mt-tab-container-item id="history">
                            <div class="extract-info">
                                <span>提取内容</span> 
                                <span>提取时间</span> 
                            </div>
                            <div class="record-list-wrapper" style=".2rem">
                                <mt-cell class="relat item-infos" v-for="item in payInfo" :key="item.price">
                                    <div class="record-type" @click="panelClose">
                                        <img slot="icon" :src="item.imgUrl" alt="" width="46">
                                    </div>
                                    <div class=" relat record-list-them ">
                                        {{item.name}}
                                    </div>
                                    <div class="record-list-time absol substr" >
                                        {{item.sendTime}}
                                    </div>
                                </mt-cell>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="list">
                            <div class="history-list" >                        
                               <div class="history-list-item relat" v-for="(item,index) in extractList" >
                                    <label class="checkbox-select"><input type="checkbox" :data-list="item.bId" class="checkbox-input"  @change="checkedList"> <span class="checkbox-core"></span>
                                    </label>
                                    <div style="width:100%">
                                       <img slot="icon" :src="item.imgUrl" alt="" width="66">
                                       </div>
                                    <p style="display:block;">{{item.name}}</p>
                                </div>
                            </div>
                        </mt-tab-container-item>       
                    </mt-tab-container>
                     <div class="extract-pro absol" @click="extract">
                        <img src="../../../static/img/my_btn_pickup1.png" alt="">
                    </div>                      
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/record.css";
    import {
        getBackpack,//抓娃娃列表
        setApplyWawa,//申请提取
        getExtractLog,//提取纪录
    } from '../../api/getData.js';
    import { dateFormat } from "../../utils/common.js";

    let exportedList = [];
    export default{
        props: {isShow: Boolean},
        data(){
            return {
                selected: "",   //tab索引
                payInfo: [],    //提取记录
                extractList:[], //我的娃娃导出记录
                hidePanel: false,
                tableSwitch:{
                    mineUrl:'./static/img/my_btn_mine1.png',
                    historyUrl:'./static/img/my_btn_record1.png',
                },        
            }
        },
        methods: {
            panelClose(){
                this.hidePanel = false;
                this.$emit('panelHide', this.hidePanel)
            },
            //初始化tab选项卡的状态
            restUrl(){
                this.tableSwitch.mineUrl = './static/img/my_btn_mine1.png';
                this.tableSwitch.historyUrl = './static/img/my_btn_record1.png';
            },
            //获取娃娃列表
            getBackpackList(){
                getBackpack().then((res)=>{
                    this.extractList = res.data.data.content;
                })
            },
            //申请提取
            setApplyWawaInfos(params){
                setApplyWawa(params).then((res)=>{
                    if(res.data.data){
                        console.log('提取成功');
                    }else{
                        console.log('提取失败');
                    }
                })
            },
            getData(){
                // this.getBackpackList();
            },
            //提取娃娃
            extract(){
                if(exportedList.length){
                    this.setApplyWawaInfos({bId:exportedList,sendAddress:"",sendPhone:""})
                }else{
                    alert('请选择要提取的娃娃信息');
                }
                
            },
            //提取纪录
            getExtractLogs(params){
                getExtractLog(params).then((res)=>{
                   if(res.data.data!=null){
                        this.payInfo = res.data.data.content;
                        this.payInfo.forEach((value,key)=>{
                            value.sendTime = dateFormat(value.sendTime);
                        })
                   }
                })
            },
            //选中要提取的娃娃
            checkedList(event){
                if($(event.target)[0].checked && exportedList.indexOf($(event.target).attr('data-list'))==-1){
                    exportedList.push($(event.target).attr('data-list'));
                }else if(!$(event.target)[0].checked){
                    let index = exportedList.indexOf($(event.target).attr('data-list'));
                    exportedList.splice(index,1)
                }
                console.log(exportedList,'提取娃娃的id数组')
            }
        },

        created(){
            this.selected = 'list';
            this.getData();
        },

        watch:{
            selected:function(newVal,oldVal){
                if(newVal!=oldVal){
                    this.restUrl();
                    if(newVal=='list'){
                        this.getBackpackList();
                        this.tableSwitch.mineUrl = './static/img/my_btn_mine2.png'
                    }else if(newVal=='history'){
                        console.log(newVal)
                        let param = {};
                        this.getExtractLogs(param);
                        this.tableSwitch.historyUrl = './static/img//my_btn_record2.png'
                    }
                }
            },
            value:function(newVal,oldVal){
                 console.log(newVal);
            }
        
        }
    }
</script>
<style scoped>

</style>

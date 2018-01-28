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
                                        {{item.them}}
                                    </div>
                                    <div class="record-list-time absol substr" >
                                        {{item.time}}
                                    </div>
                                </mt-cell>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="list">
                            <div class="history-list" >                        
                               <div class="history-list-item relat" v-for="(item,index) in 18" >
                                    <label class="checkbox-select"><input type="checkbox" :data-list="index" class="checkbox-input"  @change="checkedList"> <span class="checkbox-core"></span>
                                    </label>
                                    <div style="width:100%">
                                       <img slot="icon" src="../../../static/img/ingame_toy.png" alt="" width="66">
                                       </div>
                                    <p style="display:block;">这是一只哇哇哇哇哇哇哇</p>
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
    import {getBackpack} from '../../api/getData.js';
    let exportedList = [];
    export default{
        props: {isShow: Boolean},
        data(){
            return {
                selected: "",
                payInfo: [
                    {
                        ppid:1,
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    }, {
                        ppid:2,
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    }, {
                        ppid:3,
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    },
                ],
                hidePanel: false,
                tableSwitch:{
                    mineUrl:'./static/img/my_btn_mine1.png',
                    historyUrl:'./static/img/my_btn_record1.png',
                },
                value:[],
                optionList:[],
            
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
            getBackpackList(params){
                getBackpack(params).then((res)=>{
                    console.log(res.data,'res')
                })
            },
            getData(){
                this.getBackpackList()
            },
            //提取娃娃
            extract(){
                console.log('提取成功');
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
            let count = [];
            this.selected = 'list';
            this.payInfo.forEach((val,key)=>{
                count.push(val.ppid)
            })
            this.optionList = count;
        },

        watch:{
            selected:function(newVal,oldVal){
                if(newVal!=oldVal){
                    this.restUrl();
                    if(newVal=='list'){
                        this.tableSwitch.mineUrl = './static/img/my_btn_mine2.png'
                    }else if(newVal=='history'){
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

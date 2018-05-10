<template>
    <div>
        <div class="absol mask">
        </div>
        <div v-show="isShow" class="absol recode-bg">
            <!--关闭按钮-->
            <div class="recode-close absol" @click="panelClose">
            </div>
            <!-- 兑换碎片按钮 -->
            <div class="piece-exchange absol" @click="exchange"></div>
            <!-- 非兑换碎片界面 -->
            <div class="absol recode-list no-exchange common-dialog" v-show="!isExchange">
                <!--table选项卡-->
                <mt-navbar v-model="selected" class="absol" style="">
                    <mt-tab-item id="list" style=" ">
                        <img :src="tableSwitch.mineUrl" alt="">
                    </mt-tab-item>
                    <mt-tab-item id="piece">
                        <img :src="tableSwitch.pieceUrl" alt="">
                    </mt-tab-item>
                    <mt-tab-item id="history">
                        <img :src="tableSwitch.historyUrl" alt="">
                    </mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                    <mt-tab-container v-model="selected" class="record-content relat">
                        <mt-tab-container-item id="history">
                            <div class="record-list-wrapper" >
                                <mt-cell class="relat item-infos" v-for="item in payInfo" :key="item.price">
                                    <div class="record-type" @click="panelClose">
                                        <img slot="icon" :src="item.imgUrl" alt="" width="46">
                                    </div>
                                    <div class=" relat record-list-them">
                                        {{item.name}}
                                    </div>
                                    <div class="record-list-time absol substr">
                                        {{item.sendTime}}
                                    </div>
                                </mt-cell>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="piece">
                            <div class="piece-list history-list">
                               <div class="piece-list-item history-list-item relat" v-for="(item,index) in pieceInfo" >
                                    <label class="checkbox-select"><input type="checkbox" :data-list="item.pid" :name="item.name" :total="item.totoal" :current="item.currentCounts" :img="item.imgUrl" class="checkbox-input"  @change="checkedRadioList"> 
                                        <span class="checkbox-core"></span>
                                        <span class="piece-count-default piece-count" v-show="item.currentCounts == item.totoal">{{item.currentCounts}}/{{item.totoal}}</span>
                                        <span class="piece-count-default" v-show="item.currentCounts !== item.totoal">{{item.currentCounts}}/{{item.totoal}}</span>
                                        <div style="width:100%;height:100%">
                                            <img slot="icon" :src="item.imgUrl" alt="" width="66">
                                        </div>
                                        <p class="descr-info">{{item.name}}</p>
                                    </label>
                                </div>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="list">
                            <div class="history-list" >
                               <div class="history-list-item relat" v-for="(item,index) in extractList" >
                                    <label class="checkbox-select"><input type="checkbox" :data-list="item.bId" class="checkbox-input"  @change="checkedList"> <span class="checkbox-core"></span>
                                        <div style="width:100%;height:100%">
                                            <img slot="icon" :src="item.imgUrl" alt="" width="66">
                                        </div>
                                        <p class="descr-info">{{item.name}}</p>
                                    </label>
                                </div>
                            </div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- 提取娃娃 -->
                    <div class="extract-pro absol" @click="extract" v-show="selected=='list'">
                        <img src="../../../static/img/my_btn_pickup1.png" alt="">
                    </div>
                    <!-- 合成娃娃 -->
                    <div class="extract-pro absol" @click="transCompound" v-show="selected=='piece'">
                        <img src="../../../static/img/my_compose_btn_compose1.png" alt="">
                    </div>
            </div>
            <!-- 兑换碎片界面 -->
            <div class="absol recode-list exchange" v-if="isExchange">
                <!--table选项卡-->
                <mt-navbar v-model="selected" class="absol" style="">
                    <mt-tab-item id="exchangeList" style=" ">
                        <img :src="tableSwitch.exchangeMineUrl" alt="">
                    </mt-tab-item>
                    <mt-tab-item id="exchangeHistory">
                        <img :src="tableSwitch.exchangeHistoryUrl" alt="">
                    </mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected" class="record-content relat">
                    <mt-tab-container-item id="exchangeHistory">
                        <div class="record-list-wrapper" >
                            <mt-cell class="relat item-infos" v-for="item in exchangeInfo" :key="item.price">
                                <div class="record-type" @click="panelClose">
                                    <img slot="icon" :src="item.imgUrl" alt="" width="46">
                                </div>
                                <div class=" relat record-list-them">
                                    {{item.name}}
                                </div>
                                <div class="record-list-time absol substr">
                                    {{item.sendTime}}
                                </div>
                            </mt-cell>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="exchangeList">
                        <div class="history-list" >
                           <div class="history-list-item relat" v-for="(item,index) in extractList" >
                                <label class="checkbox-select"><input type="checkbox" :data-list="item.bId" class="checkbox-input"  @change="checkedList"> <span class="checkbox-core"></span>
                                    <div style="width:100%;height:100%">
                                        <img slot="icon" :src="item.imgUrl" alt="" width="66">
                                    </div>
                                    <p class="descr-info">{{item.name}}</p>
                                </label>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
                <!-- 兑换娃娃 -->
                <div class="extract-pro absol" @click="exchangeGold" v-show="selected=='exchangeList'">
                    <img src="../../../static/img/exchange_btn_exchange1.png" alt="">
                </div>
            </div>
        </div>
        <div class="compound-detail absol" v-show="isCompound">
            <div class="compound-img"><img :src="currentCompundInfo.imgUrl" alt=""></div>
            <div class="compound-info Grid">
                <div class="Grid-cell u-lof25 align-v-h small-compound-img"><img :src="currentCompundInfo.imgUrl" alt=""></div>
                <div class="Grid-cell align-v-h compound-name">{{currentCompundInfo.name}}</div>
                <div class="Grid-cell u-lof20 align-v-h total">{{currentCompundInfo.total}}</div>
            </div>
            <div class="op-btn Grid">
                <mt-button type="default" class="Grid-cell" @click="compound"></mt-button>
                <div class="Grid-cell u-lof10"></div>
                <mt-button type="primary" class="Grid-cell" @click="backPiece"></mt-button>
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
        getLocation,//省市
        exchangeGold,//娃娃or虚拟物品兑换金币
        getExchangeLog,//兑换记录
        getPieceList,//我的碎片
        pieceCompose//碎片合成
    } from '../../api/getData.js';
    import { dateFormat } from "../../utils/common.js";

    let exportedList = [];
    let exhangeExportedList = [];
    export default{
        props: {isShow: Boolean},
        data(){
            return {
                isExchange:false,//兑换界面标志位
                isCompound:false,//是否合成的标志位
                selected: "",   //tab索引
                payInfo: [],    //提取记录
                exchangeInfo:[], //兑换记录
                pieceInfo:[],   //我的碎片
                extractList:[], //我的娃娃导出记录
                exhangeExportedList:[],//我的娃娃兑换记录
                hidePanel: false,
                tableSwitch:{
                    mineUrl:'./static/img/my_btn_mine1.png',
                    historyUrl:'./static/img/my_btn_record1.png',
                    pieceUrl:'./static/img/my_btn_piece1.png',
                    exchangeMineUrl:'./static/img/exchange_btn_mine1.png',
                    exchangeHistoryUrl:'./static/img/exchange_btn_record1.png'
                },
                slots: [
                {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot1',
                  textAlign: 'center'
                }
              ],
                back1Img:'./static/img/ingame_btn_back1.png',
                compoundImg:'',
                compoundId:'',
                currentCompundInfo:[] //选中的合成碎片信息
            }
        },
        methods: {
            panelClose(){
                this.hidePanel = false;
                this.isExchange = false;
                this.selected = 'list';
                this.$emit('panelHide', this.hidePanel)
                $('.checkbox-input').prop('checked',false);
                exportedList = [];
            },
            //初始化tab选项卡的状态
            restUrl(){
                this.tableSwitch.mineUrl = './static/img/my_btn_mine1.png';
                this.tableSwitch.historyUrl = './static/img/my_btn_record1.png';
                this.tableSwitch.pieceUrl = './static/img/my_btn_piece1.png';
                this.tableSwitch.exchangeMineUrl = './static/img/exchange_btn_mine1.png';
                this.tableSwitch.exchangeHistoryUrl = './static/img/exchange_btn_record1.png';
            },
            //获取娃娃列表
            getBackpackList(){
                getBackpack().then((res)=>{
                    if(res.data.status=='nologin'){

                    }else{
                        this.extractList = res.data.data.content;
                    }

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
                this.getBackpackList();
            },
            //提取娃娃
            extract(){
                /**
                 * 1.娃娃提取->填写收货地址
                 * 2.虚拟物品提取->弹框提示请在提取记录查看
                 */
                if(exportedList.length){
                    sessionStorage.setItem('extractIdList',JSON.stringify(exportedList));
                    this.$router.push('/main/address');
                } else {
                    alert('请选择要提取的娃娃信息');
                }
            },
            //合成碎片
            transCompound(){
                if(this.currentCompundInfo.total === this.currentCompundInfo.currentCounts){
                    this.isCompound = true;
                } else {
                    alert('请选择已搜集完成的碎片！')
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
            //兑换记录
            getExchangeLog(){
                getExchangeLog().then((res)=>{
                   if(res.data.data!=null){
                        this.exchangeInfo = res.data.data.content;
                        this.exchangeInfo.forEach((value,key)=>{
                            value.sendTime = dateFormat(value.createTime);
                        })
                   }
                })
            },
            //我的碎片列表
            getPieceList(){
                getPieceList().then((res)=>{
                    this.pieceInfo = res.data.data.content;
                });
                // getBackpack().then((res)=>{
                //     if(res.data.status=='nologin'){

                //     }else{
                //         this.pieceInfo = res.data.data.content;
                //     }
                // })
            },
            //确认碎片合成
            compound(){
                let params = {
                    pid:this.compoundId
                }
                pieceCompose(params).then((res)=>{
                    this.isCompound = false;
                    this.panelClose();
                    alert('合成成功！')
                })
            },
            //返回碎片列表
            backPiece(){
                this.isCompound = false;
            },
            //选中要提取的娃娃
            checkedList(event){
                if(!this.isExchange){
                    if($(event.target)[0].checked && exportedList.indexOf($(event.target).attr('data-list'))==-1){
                        exportedList.push($(event.target).attr('data-list'));
                    } else if(!$(event.target)[0].checked){
                        let index = exportedList.indexOf($(event.target).attr('data-list'));
                        exportedList.splice(index,1)
                    }
                    sessionStorage.setItem('currentExtractObj',JSON.stringify(exportedList));//存储当前的提取娃娃的id list
                    console.log(exportedList,'提取娃娃的id数组')
                } else {
                    if($(event.target)[0].checked && exhangeExportedList.indexOf($(event.target).attr('data-list'))==-1){
                        exhangeExportedList.push($(event.target).attr('data-list'));
                    } else if(!$(event.target)[0].checked){
                        let index = exhangeExportedList.indexOf($(event.target).attr('data-list'));
                        exhangeExportedList.splice(index,1)
                    }
                }
                
            },
            //选中要合成的碎片
            checkedRadioList(event){
                // console.log($(event.target).parent().parent().siblings().find('checkbox-input'))
                if($(event.target)[0].checked){
                    this.compoundId = $(event.target).attr('data-list');
                    $(event.target).parent().parent().siblings().find('.checkbox-input').prop('checked',false)
                    this.currentCompundInfo = {
                        total:$(event.target).attr('total'),
                        currentCounts:$(event.target).attr('current'),
                        name:$(event.target).attr('name'),
                        imgUrl:$(event.target).attr('img')
                    }
                }
            },
            //点击兑换跳转按钮
            exchange(){
                this.selected = 'exchangeList';
                this.isExchange = true;
            },
            //点击内页兑换按钮
            exchangeGold(){
                if(exhangeExportedList.length){
                    //兑换金币流程
                    let param = {bIds:exhangeExportedList}
                    // console.log(param,'exportedList')
                    exchangeGold(param).then((res)=>{
                        if(res.data.data.status){
                            exhangeExportedList = [];
                            this.panelClose();
                            alert('成功兑换'+res.data.data.gold+'个金币！')
                        }
                    })
                }else{
                    alert('请选择要兑换的娃娃信息');
                }
            }
        },

        created(){
            this.selected = 'list';
            this.getData();
        },
        mounted(){
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
                        this.tableSwitch.historyUrl = './static/img/my_btn_record2.png'
                    } else if(newVal=='exchangeHistory'){
                        this.getExchangeLog();
                        this.tableSwitch.exchangeHistoryUrl = './static/img/exchange_btn_record2.png'
                    } else if(newVal=='piece') {
                        this.getPieceList();
                        this.tableSwitch.pieceUrl = './static/img/my_btn_piece2.png'
                    } else {
                        this.getBackpackList();
                        this.tableSwitch.exchangeMineUrl = './static/img/exchange_btn_mine2.png'
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
/*我的娃娃描述信息*/
.descr-info{
    display: block;
    padding: 0 8px;
    text-align: left;
    font-size: 0.18rem;
    font-weight: bold;
}
</style>

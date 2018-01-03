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
                <mt-navbar v-model="selected" class="absol" style="top:1.2rem;z-index:100">
                    <mt-tab-item id="list" style=" ">
                        <img :src="tableSwitch.mineUrl" alt="">
                    </mt-tab-item>
                    <mt-tab-item id="history">
                        <img :src="tableSwitch.historyUrl" alt="">
                    </mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected" class="record-content">
                    <mt-tab-container-item id="list">
                        <div class="record-list-wrapper">
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
                    <mt-tab-container-item id="history">
                        <div class="history-list" >
                            <div class="history-list-item" v-for="item in 12" >
                                <img slot="icon" src="../../../static/img/ingame_toy.png" alt="" width="66">
                                <p>这是一只哇哇哇哇哇哇哇</p>
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
    export default{
        props: {isShow: Boolean},
        data(){
            return {
                selected: "",
                payInfo: [
                    {
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    }, {
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    }, {
                        imgUrl: "./static/img/ingame_toy.png",
                        them: '这是一只大娃娃',
                        time: '2017年12月31日 17:42'
                    },

                ],
                hidePanel: false,
                tableSwitch:{
                    mineUrl:'./static/img//my_btn_mine1.png',
                    historyUrl:'./static/img/my_btn_record1.png',
                }
            }
        },
        methods: {
            panelClose(){
                this.hidePanel = false;
                this.$emit('panelHide', this.hidePanel)
            },
            //初始化tab选项卡的状态
            restUrl(){
                this.tableSwitch.mineUrl = './static/img//my_btn_mine1.png';
                this.tableSwitch.historyUrl = './static/img/my_btn_record1.png';
            },
            //提取娃娃
            extract(){
                console.log('提取成功')
            }
        },
        created(){
            this.selected = 'list';
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
            }
        }
    }
</script>
<style scope>

</style>

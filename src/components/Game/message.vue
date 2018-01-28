<template>
    <div>
        <div class="absol mask"> </div>
        <div class="absol mask1" v-show="deleteDialogVisible"> </div>
        <div v-show="isShow" class="absol message-bg align-h-v">
            <!--关闭按钮-->
            <div class="dialog-close absol" @click="panelClose">
                <span ></span>
            </div>
            <div class="absol message-list" >
                <div class="message-list-wrapper common-list-wrapper">
                    <!--站内信list-->
                   <div class="message-list-item Grid" v-for="item in messageInfo" v-show="listVisible">
                        <div class="Grid-cell u-lof25 icon align-h-v">
                            <img :src="defaultHeaderImg" alt="">
                        </div>
                        <div class="Grid-cell cloumn-center from">
                            <p class="grey font-16">From</p>
                            <p class="raduis-1 manager grey">{{item.from}}</p>  
                        </div>
                        <div class="Grid-cell u-lof40 cloumn-center align-r">
                            <p class="grey">{{item.sendTime}}</p>
                            <p>{{item.theme}}</p>
                            <p @click="detail(item.id)" class="green"><span class="detail"></span></p>
                        </div>
                   </div>
                   <!-- 站内信详情 -->
                   <div class="message-detail" v-show="detailVisible">
                    <div class="main-content"> 
                        <div class="Grid header">
                            <div class="Grid-cell u-lof40 grey1 align-v-h">发件人：{{detailMessageInfo.sendName}}</div>
                            <div class="Grid-cell"></div>    
                            <div class="Grid-cell grey1">{{detailMessageInfo.sendTime}}</div>
                        </div>
                        <p class="align-center title red font-26">{{detailMessageInfo.contentTitle}}</p>
                        <p class="grey1">{{detailMessageInfo.content}}</p>
                    </div>
                    <div class="op-btn Grid">
                        <mt-button type="default" class="Grid-cell" @click="deleteMessage">删除</mt-button>
                        <div class="Grid-cell"></div>
                        <mt-button type="primary" class="Grid-cell" @click="panelClose">关闭</mt-button>
                    </div>
                   
                   </div>

                </div>
            </div>
            <div class="delete-dialog" v-show="deleteDialogVisible">
                <div  class="op-btn Grid">
                    <mt-button type="default" class="Grid-cell" @click="deleteMsg(detailMessageInfo.id)">确定</mt-button>
                    <div class="Grid-cell"></div>
                    <mt-button type="primary" class="Grid-cell" @click="deleteDialogVisible=false">取消</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/message.css";
    import { getMailList,getMail,hideMail } from "../../api/getData.js";
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                name:"",
                listVisible:true,
                detailVisible:false,
                deleteDialogVisible:false,
                defaultHeaderImg:"./static/img/message_pic_image.png",
                messageInfo:[],
                detailMessageInfo:{},
                hidePanel:false,
            }
        },
        methods:{
            reset() {
                this.detailVisible = false;
                this.deleteDialogVisible = false;
                this.listVisible = true;
            },
            panelClose(){
                this.reset();
                this.hidePanel = false;
                this.$emit('panelHide',this.hidePanel)
            },
            detail(id){
                this.detailVisible = true;
                this.listVisible = false;
                getMail(id).then((res)=>{
                    console.log('success')
                    this.detailMessageInfo =res.data.data;

                });

            },
            deleteMessage(id) {
                this.deleteDialogVisible = true;
            },
            deleteMsg(id) {
                hideMail(id).then((res)=>{
                    console.log('delete success')
                    this.reset();
                    getMailList().then((res)=>{
                        this.messageInfo = res.data.data.content;
                        console.log(this.messageInfo)
                    });
                });
            }
        },
        created() {
            getMailList().then((res)=>{
                this.messageInfo = res.data.data.content;
                console.log(this.messageInfo)
            });
        }
    }
</script>
<style>

</style>

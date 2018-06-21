<template>
    <div>
        <div class="absol mask"> </div>
        <div class="absol mask1" v-show="deleteDialogVisible"> </div>
        <div v-show="isShow" class="absol message-bg">
            <!--关闭按钮-->
            <div class="dialog-close absol" @click="messagePanelHide">
                <span ></span>
            </div>
            <div class="absol message-list common-dialog">
                <div class="message-list-wrapper common-list-wrapper">
                    <!--站内信list-->
                   <div class="message-list-item Grid" v-for="item in messageInfo" v-show="listVisible">
                        <div class="Grid-cell u-lof25 icon align-h-v">
                            <img :src="defaultHeaderImg" alt="">
                        </div>
                        <div class="Grid-cell cloumn-center from">
                            <p class="yellow2 font-32">From</p>
                            <p class="raduis-1 manager">{{item.from}}</p>
                        </div>
                        <div class="Grid-cell u-lof40 cloumn-center align-r">
                            <p class="yellow3 bold">{{item.sendTime}}</p>
                            <p class="yellow3 bold">{{item.theme}}</p>
                            <p @click="detail(item.id)" class="green"><span class="detail"></span></p>
                        </div>
                   </div>
                   <!-- 站内信详情 -->
                   <div class="message-detail" v-show="detailVisible">
                    <div class="Grid header">
                        <div class="Grid-cell u-lof40 yellow2 align-v-h bold">发件人：{{detailMessageInfo.sendName}}</div>
                        <div class="Grid-cell yellow2 align-right bold" style="margin-right:16px;">{{detailMessageInfo.sendTime}}</div>
                    </div>
                    <div class="main-content">
                        <p class="align-center title red font-26">{{detailMessageInfo.contentTitle}}</p>
                        <p class="grey1">{{detailMessageInfo.content}}</p>
                    </div>
                    <div class="op-btn Grid">
                        <mt-button type="default" class="Grid-cell" @click="deleteMessage"></mt-button>
                        <div class="Grid-cell"></div>
                        <mt-button type="primary" class="Grid-cell" @click="messagePanelHide"></mt-button>
                    </div>
                   </div>
                </div>
            </div>
            <div class="delete-dialog" v-show="deleteDialogVisible">
                <div  class="op-btn Grid">
                    <mt-button type="default" class="Grid-cell" @click="deleteMsg(detailMessageInfo.id)"></mt-button>
                    <div class="Grid-cell"></div>
                    <mt-button type="primary" class="Grid-cell" @click="deleteDialogVisible=false"></mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/message.css";
    import { getMailList,getMail,hideMail } from "../../api/getData.js";
    import { dateFormat } from "../../utils/common.js";
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
            messagePanelHide(){
                debugger
                this.reset();
                this.hidePanel = false;
                this.$emit('messagePanelHide',this.hidePanel)
            },
            detail(id){
                this.detailVisible = true;
                this.listVisible = false;
                getMail(id).then((res)=>{
                    console.log('success')
                    this.detailMessageInfo =res.data.data;
                    this.detailMessageInfo.sendTime = dateFormat(this.detailMessageInfo.sendTime);
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
                this.messageInfo.forEach((value,key)=>{
                    value.sendTime = dateFormat(value.sendTime);
                })
            });
        }
    }
</script>
<style scope>
 /*   .message-bg .dialog-close{
        right: 2%;
        top: 16%;
        z-index: 12!important;
    }*/
</style>

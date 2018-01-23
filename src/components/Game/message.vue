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
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <div class="Grid-cell cloumn-center from">
                            <p class="grey font-16">From</p>
                            <p class="raduis-1 manager grey">管理员</p>  
                        </div>
                        <div class="Grid-cell u-lof40 cloumn-center align-r">
                            <p class="grey">2017年12月12日</p>
                            <p>xxx兑换码</p>
                            <p @click="detail" class="green"><span class="detail"></span></p>
                        </div>
                   </div>
                   <!-- 站内信详情 -->
                   <div class="message-detail" v-show="detailVisible">
                    <div class="main-content"> 
                        <div class="Grid header">
                            <div class="Grid-cell grey1">发件人：xx</div>
                            <div class="Grid-cell"></div>    
                            <div class="Grid-cell grey1">2017.12.12</div>
                        </div>
                        <p class="align-center title red font-26">标题标题标题</p>
                        <p class="grey1">详细content</p>
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
                    <mt-button type="default" class="Grid-cell">确定</mt-button>
                    <div class="Grid-cell"></div>
                    <mt-button type="primary" class="Grid-cell" @click="deleteDialogVisible=false">取消</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/message.css";
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                name:"",
                listVisible:true,
                detailVisible:false,
                deleteDialogVisible:false,
                messageInfo:[
                    {
                        imgUrl:"./static/img/message_pic_image.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:50,
                        count:50
                    },{
                        imgUrl:"./static/img/message_pic_image.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:60,
                        count:100
                    },{
                        imgUrl:"./static/img/message_pic_image.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:70,
                        count:200
                    }
                ],
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
            detail(){
                this.detailVisible = true;
                this.listVisible = false;
            },
            deleteMessage() {
                this.deleteDialogVisible = true;
            }
        }
    }
</script>
<style>

</style>

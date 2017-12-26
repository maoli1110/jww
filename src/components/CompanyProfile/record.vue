<template>
    <div>
        <div class="absol mask">

        </div>
        <div v-show="isShow" class="absol recode-bg">
            <!--关闭按钮-->
            <div class="recode-close absol" @click="panelClose">
                <span ></span>
            </div>
            <ul class="absol recode-list recode-list">
                <li class="recode-list-info" v-for="item in payInfo" :key="item.price" >
                    <div @click="panelClose">
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="order-price relat">
                        <span calss="absol">{{item.count}}</span>
                        <span calss="absol">{{item.price}}</span>
                    </div>
                    <div class="payaway">
                        <img :src="item.btnBg" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                payInfo:[
                    {
                        imgUrl:"../../../static/img/pay_icon_coin50.png",
                        btnBg:"../../../static/img/pay_btn_buy1.png",
                        price:50,
                        count:100
                    },{
                        imgUrl:"../../../static/img/pay_icon_coin50.png",
                        btnBg:"../../../static/img/pay_btn_buy1.png",
                        price:50,
                        count:100
                    },{
                        imgUrl:"../../../static/img/pay_icon_coin50.png",
                        btnBg:"../../../static/img/pay_btn_buy1.png",
                        price:50,
                        count:100
                    },{
                        imgUrl:"../../../static/img/pay_icon_coin50.png",
                        btnBg:"../../../static/img/pay_btn_buy1.png",
                        price:50,
                        count:100
                    }

                ],
                hidePanel:false,
            }
        },
        methods:{
            panelClose(){
                this.hidePanel = false;
                this.$emit('panelHide',this.hidePanel)
            }
        }
    }
</script>
<style scope>
    .mask{background:#000;opacity:0.6;z-index:10;width:100%;height:100%;top:0;}
    .absol{position:absolute;top:0}
    .relat{position:relative}
    .recode-bg{
        width: 100%;
        height: 100%;
    }
    .recode-bg .recode-close {
        width: 124px;
        height: 90px;
        margin-top:10px;
        background: url("../../../static/img/my_btn_cancel1.png") center no-repeat;
        background-size: 35%;
        right: -4%;
        top: 8%;
        z-index: 12;
    }
    .recode-bg .recode-list{
        width:100%;
        height:70%;
        font-size:12px;
        background:url('../../../static/img/my_frame_bg.png') center 0 no-repeat;
        z-index:10;
        z-index: 10;
        top: 7%;
        background-size: 3.5rem;
    }
    .recode-list-info{
        height:83px;line-height:83px;padding:0 15%;
    }
    .recode-list-info>div{height:0.75rem;width:0.75rem;float:left;}

    .recode-list-info:first-child{
        margin-top:1.85rem;
    }
    .recode-list-info div:first-child>img{
        width:88%;background:#fff;border-radius: 5px;
    }
    .recode-list-info>div:last-child{float:right;}
    .recode-list-info div:last-child>img{
        width:88%;background:#fff;border-radius: 5px;
    }
    .recode-list-info .order-price span{
        font-size:0.2rem;
        position: absolute;
        top: -0.29rem;
    }
    .recode-list-info .order-price span:last-child{
        top: 0rem;
    }
    .recode-list-info div.payaway{
        float:right;
    }
    .pay-count{top:-2rem}
</style>

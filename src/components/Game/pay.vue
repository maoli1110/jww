<template>
    <div>
        <div class="absol mask"> </div>
        <div v-show="isShow" class="absol pay-bg">
            <!--关闭按钮-->
            <div class="dialog-close absol" @click="panelClose">
                <span ></span>
            </div>
            <!--充值身体部分-->
            <div class="absol pay-list">
               <div class="pay-list-wrapper common-list-wrapper">
                   <div class="pay-list-item Grid" v-for="item in payInfo">
                        <div class="Grid-cell u-lof4 icon align-h-v">
                            <img slot="icon" v-show ="item.count==50" :src="item.imgUrl" alt="" width="80" >
                            <img slot="icon" v-show ="item.count==100" :src="item.imgUrl" alt="" width="80" >
                            <img slot="icon" v-show ="item.count==200" :src="item.imgUrl" alt="" width="80" >
                            <img slot="icon" v-show ="item.count==400" :src="item.imgUrl" alt="" width="80" >
                        </div>
                        <div class="Grid-cell count">
                            <div class="substr">X {{item.count}}</div>
                            <div class="substr price">￥ {{item.price}}</div>
                        </div>
                        <div class="Grid-cell u-lof3 buy" @click="callpay(item.count)">
                             <img :src="item.btnBg" alt="" width="70">
                        </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../static/css/pay.css";
    import {getUserInfo} from '../../api/getData';
    import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
    let coin = {"coin50":50,"coin100":100,"coin200":200,'coin400':400}
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                name:"",
                payInfo:[
                    {
                        imgUrl:"./static/img/pay_icon_coin50.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"0.50",
                        count:1
                    },{
                        imgUrl:"./static/img/pay_icon_coin100.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"1.00",
                        count:100
                    },{
                        imgUrl:"./static/img/pay_icon_coin400.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"2.00",
                        count:200
                    },{
                        imgUrl:"./static/img/pay_icon_coin400.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"4.00",
                        count:400
                    }
                ],
                hidePanel:false,
            }
        },
        methods:{
            panelClose(){
                this.hidePanel = false;
                this.$emit('payPanelHide',this.hidePanel);
            },
            //调用微信JS api 支付
             jsApiCall(coin)
                {
                    let self = this;
                    coin = !coin?1:coin;
                    $.get("http://game.yocatch.com/back/wxpay/pay/jsapi.php",{gold:coin}, function(result){
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            result,
                            function(res){
                                WeixinJSBridge.log(res.err_msg);
                                if(res.err_msg=='get_brand_wcpay_request:ok'){
                                    self.$toast({
                                        message: '充值成功',
                                        iconClass: 'icon icon-success',
                                        duration: 5000
                                    });
                                    self.hidePanel = false;
                                    self.$emit('payPanelHide',self.hidePanel);
                                }
//                                alert(res.err_msg)
//                                alert(res.err_code+res.err_desc+res.err_msg+'哈哈***');
                            }
                        );
                    },"json");

                },

             callpay(coin)
                {
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                        }
                    }else{
                        this.jsApiCall(coin);
                    }
                }
            }
        }
</script>
<style scope>
    .mask{
        z-index:9;
    }
    .dialog-close{
        z-index:11
    }
</style>

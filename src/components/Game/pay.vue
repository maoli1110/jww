<template>
    <div>
        <div class="absol mask"> </div>
        <div v-show="isShow" class="absol pay-bg">
            <!--关闭按钮-->
            <div class="dialog-close absol" @click="panelClose">
                <span ></span>
            </div>
            <!--充值身体部分-->
            <div class="absol pay-list common-dialog">
               <div class="pay-list-wrapper common-list-wrapper">
                   <div class="pay-list-item Grid" v-for="item in payInfo">
                        <div class="Grid-cell u-lof4 icon align-h-v">
                            <img slot="icon" v-show ="item.count==600" :src="item.imgUrl" alt="" width="100" >
                            <img slot="icon" v-show ="item.count==1800" :src="item.imgUrl" alt="" width="100" >
                            <img slot="icon" v-show ="item.count==6800" :src="item.imgUrl" alt="" width="100" >
                            <img slot="icon" v-show ="item.count==9800" :src="item.imgUrl" alt="" width="100" >
                        </div>
                        <div class="Grid-cell count">
                            <div class="substr">X {{item.count}}</div>
                            <div class="substr price">￥ {{item.price}}</div>
                        </div>
                        <div class="Grid-cell u-lof3 buy" @click="callpay(item.count,item.price)">
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
    import { setSessionstorage, getSessionstorage,isWeixin } from "../../utils/common.js";
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                name:"",
                payInfo:[
                    {
                        imgUrl:"./static/img/pay_icon_coin50.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"6.00",
                        // count:600
                        count:1
                    },{
                        imgUrl:"./static/img/pay_icon_coin100.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"18.00",
                        count:1800,
                        count:1
                    },{
                        imgUrl:"./static/img/pay_icon_coin400.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"68.00",
                        count:6800,
                        count:1
                    },{
                        imgUrl:"./static/img/pay_icon_coin400.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:"98.00",
                        count:9800,
                        count:1
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
            jsApiCall(coin,price)
                {
                    let self = this;
                    coin = !coin?1:coin;
                    $.get(window.serverPath.url+"/wxpay/pay/jsapi.php",{gold:coin}, function(result){
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

             callpay(coin,price)
                {
                    /**
                     * 判断是否是微信客户端
                     * 是：调用微信支付
                     * 不是：调用支付宝支付
                     */
                    let isWeixinClient = isWeixin();
                    if(isWeixinClient){
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
                    } else {
                        window.location.href=window.serverPath.url+"/alipay/wap.php?gold="+price;
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

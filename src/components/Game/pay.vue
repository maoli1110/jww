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
                  <!--  <mt-cell class="relat item-infos" v-for="item in payInfo" :key="item.price">
                       <div class="pay-type" @click="panelClose">
                           <img slot="icon" v-show ="item.count==50" :src="item.imgUrl" alt="" width="80" >
                           <img slot="icon" v-show ="item.count==100" :src="item.imgUrl" alt="" width="80" >
                           <img slot="icon" v-show ="item.count==200" :src="item.imgUrl" alt="" width="80" >
                       </div>
                       <div class="order-price relat">
                           <div class="absol substr">X{{item.count}}</div>
                           <div class="absol substr">${{item.price}}</div>
                       </div>
                       <div class="payaway absol">
                           <img :src="item.btnBg" alt="" width="70">
                       </div>
                   </mt-cell> -->
                   <div class="pay-list-item Grid" v-for="item in payInfo">
                        <div class="Grid-cell u-lof4 icon align-h-v">
                            <img slot="icon" v-show ="item.count==50" :src="item.imgUrl" alt="" width="80" >
                            <img slot="icon" v-show ="item.count==100" :src="item.imgUrl" alt="" width="80" >
                            <img slot="icon" v-show ="item.count==200" :src="item.imgUrl" alt="" width="80" >
                        </div>
                        <div class="Grid-cell count">
                            <div class="substr">X{{item.count}}</div>
                            <div class="substr price">${{item.price}}</div>
                        </div>
                        <div class="Grid-cell u-lof3 buy" @click="callpay">
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
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                name:"",
                payInfo:[
                    {
                        imgUrl:"./static/img/pay_icon_coin50.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:50,
                        count:50
                    },{
                        imgUrl:"./static/img/pay_icon_coin400.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:60,
                        count:100
                    },{
                        imgUrl:"./static/img/pay_icon_coin100.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:70,
                        count:200
                    }
                ],
                hidePanel:false,
            }
        },
        methods:{
            panelClose(){
                this.hidePanel = false;
                this.$emit('panelHide',this.hidePanel)
            },
            //调用微信JS api 支付
             jsApiCall()
                {
                    let self = this;
                    $.get("http://game.yocatch.com/back/wxpay/pay/jsapi.php",{gold:'1'}, function(result){
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            result,
                            function(res){
                                WeixinJSBridge.log(res.err_msg);
                                if(res.err_msg=='get_brand_wcpay_request:ok'){
                                    //执行外面ajax刷新
                                   /* self.$alert('支付成功', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                           /!* getUserInfo().then((res)=>{
                                                setSessionstorage('userInfo',res.data.data); //sessionStorage存用户信息
                                                window.userInfo = getSessionstorage('userInfo'); //window全局存用户信息
                                                self.userInfo = window.userInfo; //当前页面赋值用户信息
                                                self.userInfo.goldCounts= self.userInfo.goldCounts.toFixed(0);
                                            });*!/
                                            self.hidePanel = false;
                                            self.$emit('panelHide',self.hidePanel);
                                        }
                                    })*/
                                    alert(res.err_msg+123)
                                    Toast({
                                        message: '充值成功',
                                        iconClass: 'icon icon-success',
                                        duration: 5000
                                    });
                                    self.hidePanel = false;
                                    self.$emit('panelHide',self.hidePanel);
                                }
//                                alert(res.err_msg)
//                                alert(res.err_code+res.err_desc+res.err_msg+'哈哈***');
                            }
                        );
                    },"json");

                },

             callpay()
                {
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                        }
                    }else{
                        this.jsApiCall();
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

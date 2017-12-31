<template>
    <div>
        <div class="absol mask"> </div>
        <div v-show="isShow" class="absol pay-bg">
            <!--关闭按钮-->
            <div class="pay-close absol" @click="panelClose">
                <span ></span>
            </div>
            <!--充值身体部分-->
            <div class="absol pay-list">
               <div class="pay-list-wrapper">
                   <mt-cell class="relat item-infos" v-for="item in payInfo" :key="item.price">
                       <div class="pay-type" @click="panelClose">
                           <img slot="icon" :src="item.imgUrl" alt="" width="80" >
                       </div>
                       <div class="order-price relat">
                           <span calss="absol">X{{item.count}}</span>
                           <span calss="absol">${{item.price}}</span>
                       </div>
                       <div class="payaway absol">
                           <img :src="item.btnBg" alt="" width="70">
                       </div>
                   </mt-cell>
               </div>
            </div>

        </div>
    </div>
</template>
<script>
    import "../../../static/css/pay.css";
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
                        count:100
                    },{
                        imgUrl:"./static/img/pay_icon_coin50.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
                        price:50,
                        count:100
                    },{
                        imgUrl:"./static/img/pay_icon_coin50.png",
                        btnBg:"./static/img/pay_btn_buy1.png",
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

</style>

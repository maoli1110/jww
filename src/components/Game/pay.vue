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
                        <div class="Grid-cell u-lof3 buy">
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
            }
        }
    }
</script>
<style>

</style>

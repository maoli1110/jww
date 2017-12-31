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
    import "../../../static/css/record.css";
    export default{
        props:{isShow:Boolean},
        data(){
            return {
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

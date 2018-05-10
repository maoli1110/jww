<template>
    <div>
        <div class="absol mask"> </div>
        <div class="absol pay-bg rule">
            <!--关闭按钮-->
            <div class="dialog-close absol" @click="panelClose">
                <span ></span>
            </div>
            <!--rule content-->
            <img  class="absol rule-content" :src="ruleImg" alt="">
        </div>
    </div>
</template>
<script>
    export default{
        props:{isShow:Boolean},
        data(){
            return {
                hidePanel:false,
                ruleImg:"./static/img/text_rule2.png",
                ruleTitleImg:"./static/img/text_rule.png"
            }
        },
        methods:{
            panelClose(){
                this.hidePanel = false;
                this.$emit('payPanelHide',this.hidePanel);
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
    .rule .rule-content {
        width: 90%;
        font-size: 12px;
        position: absolute;
        z-index: 10;
        top: 80px;
        left: 50%;
        margin-left: -45%;
    }
    .rule .rule-title {
        position: absolute;
        z-index: 11;
        top: 50%;
        left: 50%;
        margin-left: -174px;
        margin-top: -504px;
    }
</style>

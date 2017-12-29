<template>
    <div>
        <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
        <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide"></v-record>
    </div>
</template>
<script>
    import vPaylist from "../CompanyProfile/pay.vue";
    import vRecord from '../CompanyProfile/record.vue';
    export default{
        data(){
            return {
                payVisbile:false,
                recordVisible:true,
            }
        },
        methods:{
            panelHide(visible){
                this.payVisbile =visible;
                this.recordVisible = visible;
            },
        },
        components: {vPaylist,vRecord},
    }
</script>

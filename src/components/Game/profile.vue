 <template>
 <div class="home-wrap">
    <div class="home">
        <div class="login-out"></div>
        <div class="relat">
            <div class="game-them">{{them}}</div>
            <div class="absol add-coin"><img src="../../../static/img/ingame_btn_pay3.png" alt=""></div>
        </div>

       <div class="select-list">
           <ul>
               <li class="raduis-1 relat" v-for="(item,index) in 10">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2"><span class="pay-coin block"></span>99&nbsp;/次</span><span class="go raduis-2" @click="inGame(index)">GO</span></div>
                   <div class="absol switch text-color"><span class="block switch-text" >碎片合成</span></div>
               </li>
           </ul>
       </div>
       <div class="main-nav">
           <mt-tabbar v-model="selected" :value="selected">
               <mt-tab-item id="home">
                   <img slot="icon" :src="homeNavImg">
               </mt-tab-item>
               <mt-tab-item id="bag">
                   <img slot="icon" :src="bagNavImg">
               </mt-tab-item>
               <mt-tab-item id="mine">
                   <img slot="icon" :src="mineNavImg">
               </mt-tab-item>
           </mt-tabbar>
       </div>
       <div class="goBack"><img src="" alt=""></div>
    </div>
     <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
     <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide"></v-record>
</div>
</template>

<script>
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
import  '../../../static/css/home.css';             //主页样式
export default {
    data() {
        return {
            selected:"",                    //tab选中状态
            defalultWW:'./static/img/ingame_toy.png',
            homeNavImg:'./static/img/home_btn_home1.png',
            bagNavImg:'./static/img/home_btn_bag1.png',
            mineNavImg:'./static/img/home_btn_my1.png',
            them:'选择娃娃机',
            payVisbile:false,
            recordVisible:false,
        }
    },
    components: {vPaylist,vRecord},
    methods: {
        //组件关窗通信
        panelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
        },
        //tab 背景重置
        restNavBg() {
            this.homeNavImg='./static/img/home_btn_home1.png',
            this.mineNavImg='./static/img/home_btn_my1.png',
            this.bagNavImg = './static/img/home_btn_bag1.png'
        },
        //初始化跳链接
        inGame(index){
            if(index==0){
                this.$router.push('/main/ingame');
            }else if(index==1){
               window.location.href="http://www.910nice.com";
            }else if(index==2){
                window.location.href='http://h.mashangzhua.com/pages/index.html?appId=ba82de9ff96248569eef2ccc796000f3';
            }
        }
    },
    created(){
        this.selected = 'home'; //默认选中home页
    },
    watch:{
        selected:function(newVal,oldVal){//tab索引值监听
            this.restNavBg();
            if(newVal !=oldVal){
               if(newVal=='bag'){
                   this.recordVisible = true;
                   this.bagNavImg = './static/img/home_btn_bag2.png';
               }else if(newVal=='mine'){
                   this.mineNavImg = './static/img/home_btn_my2.png';
                   this.payVisbile = true;
               }else if(newVal=='home'){
                   this.homeNavImg = './static/img/home_btn_home2.png';
               }
           }
        }
    }
}
</script>

<style scoped>

</style>

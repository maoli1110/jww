 <template>
 <div class="home-wrap">
    <div class="home">
        <div class="back" @click="loginOut">
            <img :src="back1Img" alt="">
        </div>
        <a>
          <div class="vedio-show" @click="vedioShow"></div>
        </a>
        <div class="relat xuanze relat"  style="height:4%">
            <p class="substr absol add-coin yellow1" @click="recharge">{{userInfo.goldCounts}}</p>
        </div>

       <div class="select-list">
           <ul>
               <li class="raduis-1 relat" v-for="(item,key) in list" @click="inGame(item.wid,item)">
                  <p>{{item.title}}</p>
                  <div><img :src="item.imgUrl" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-1"><span class="pay-coin block"></span>{{item.timeMoney?item.timeMoney:0}}&nbsp;/次</span><span class="go raduis-1" >GO</span></div>
                   <!-- <div class="absol switch text-color"><span class="block switch-text">碎片合成</span></div> -->
               </li>
           </ul>
       </div>
       <div class="main-nav">
           <mt-tabbar v-model="selected" :value="selected">
               <mt-tab-item id="home" @click="selectItem('home')">
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
    <v-paylist v-show="payVisbile" :is-show="payVisbile" @payPanelHide="payPanelHide"></v-paylist>
    <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHideRecord" ref="recordList"></v-record>
    <audio id="bg-music" controls="controls" autoplay="autoplay" style="display:none" loop="loop">
      <source :src="audioUrl" type="audio/mpeg" />
    Your browser does not support the audio element.
    </audio>
</div>
</template>

<script>
function audioAutoPlay(id){
    let audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function (){
       play();
    }, false);
    document.addEventListener("touchstart",play, false);
}
import vPaylist from "../Game/pay.vue";
import vRecord from '../Game/record.vue';
import  '../../../static/css/home.css';             //主页样式
import { getWlist,getUserInfo,getLocation,getGotoUrl } from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
export default {
    data() {
        this.$router.replace('/main/home')
        return {
            audioUrl:"./static/happy.mp3",
            selected:"", //tab选中状态
            defalultWW:'./static/img/ingame_toy.png',
            homeNavImg:'./static/img/home_btn_home1.png',
            bagNavImg:'./static/img/home_btn_bag1.png',
            mineNavImg:'./static/img/home_btn_my1.png',
            back1Img:'./static/img/ingame_btn_back1.png',
            back2Img:'./static/img/ingame_btn_back2.png',
            payVisbile:false,
            recordVisible:false,
            list:[],
            userInfo:{}
        }
    },
    components: {vPaylist,vRecord},
    methods: {
        //组件关窗通信
        panelHide(visible){
            this.payVisbile =visible;
        },
        payPanelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
            this.messageVisbile = visible;
            //执行userinfo刷新
            getUserInfo().then((res)=>{
                this.userInfo = res.data.data; //当前页面赋值用户信息
            });
        },
        panelHideRecord(visible){
          this.recordVisible = visible;
        },
        //tab 背景重置
        restNavBg() {
            this.homeNavImg='./static/img/home_btn_home1.png',
            this.mineNavImg='./static/img/home_btn_my1.png',
            this.bagNavImg = './static/img/home_btn_bag1.png'
        },
        //初始化跳链接
        inGame(wid,item){
            setSessionstorage('currentToyInfo',item);
            this.$router.push('/main/ingame/'+wid);

            // if(index==0){
            //     this.$router.push('/main/ingame');
            // }else if(index==1){
            //    window.location.href="http://www.910nice.com";
            // }else if(index==2){
            //     window.location.href='http://h.mashangzhua.com/pages/index.html?appId=ba82de9ff96248569eef2ccc796000f3';
            // }
        },
        selectItem(type){
          console.log(type,'type')
        },
        recharge() {
          this.payVisbile = true;
        },
        //切换账号 退登
        loginOut(){
            this.$router.push('/login');
            //此处执行退登接口
        },
        //刷新
        refreshPage(){
            this.$router.push('/main/home')
        },
        vedioShow() {
          //调用后端接口扣金币
          getGotoUrl().then((res)=>{
            if(res.data.data === 'success'){
              setTimeout(()=>{
                window.location.href= "http://wwj.agoraio.cn/play.html?account=rNQszzDai4&machine=wawaji_machine_leidi";
              },5)
            } else if (res.data.data === "noGold"){
              alert("金币不足,请充值！")
            }
          });
        }

    },
    created(){
        this.selected = 'home'; //默认选中home页
        getLocation().then((res)=>{
            localStorage.setItem('locationObj', JSON.stringify(res.data));
            // console.log(localStorage.getItem('locationObj'))
        });
        // this.vedioUrl = "http://wwj.agoraio.cn/play.html?account=rNQszzDai4&machine=wawaji_machine_leidi";
    },
    mounted(){
        //获取列表
        // this.list = getSessionstorage('wlist');
        // if(!this.list){
           getWlist().then((res)=>{
            console.log(res.data.data.content,'res.data.data.content')
              this.list = res.data.data.content;
              setSessionstorage('wlist',res.data.data.content);
            });
        // }
        //获取用户信息
        getUserInfo().then((res)=>{
            console.log(res.data,'res.data')
            this.userInfo = res.data.data; //当前页面赋值用户信息
        });
        audioAutoPlay('bg-music');
    },
    watch:{
        selected:function(newVal,oldVal){//tab索引值监听
            this.restNavBg();
            if(newVal !=oldVal){
               if(newVal=='bag'){
                 this.$refs.recordList.getBackpackList();
                   this.recordVisible = true;
                   this.bagNavImg = './static/img/home_btn_bag2.png';
               }else if(newVal=='mine'){
                   this.$router.push('/main/mine');
                   // this.$refs.recordList.getBackpackList();
                   // this.mineNavImg = './static/img/home_btn_my2.png';
                   // this.recordVisible = true;
               }else if(newVal=='home'){
                   this.homeNavImg = './static/img/home_btn_home2.png';
               }
           }
        },
        recordVisible:function(newVal,oldVal){
            if(newVal!=oldVal && !newVal){
                this.selected = '';//关闭弹窗的选种路径清空
                this.restNavBg();
            }
        },
        payVisbile:function(newVal,oldVal){
            if(newVal!=oldVal && !newVal){
                this.selected = '';//关闭弹窗的选种路径清空
                this.restNavBg();
            }
        }
    }
}
</script>

<style scoped>
    .mint-tab-item{
        padding:0 !important;
    }
    .mint-tab-item-icon > *{
        height:84%;
    }
</style>

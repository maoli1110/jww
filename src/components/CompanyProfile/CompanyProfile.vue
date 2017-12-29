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
           <ul>
               <li @click="changebg('home')"><img :src="homeNavImg" alt=""></li>
               <li @click="changebg('bag')"><img :src="bagNavImg" alt=""></li>
               <li @click="changebg('mine')"><img :src="mineNavImg" alt=""></li>
               <!--<li><router-link to="/main/big" ><img :src="bagNavImg" alt=""></router-link></li>
               <li><router-link to="/main/mine" ><img :src="mineNavImg" alt=""></router-link></li>-->
           </ul>
       </div>
       <div class="goBack"><img src="" alt=""></div>
    </div>
     <v-paylist v-show="payVisbile" :is-show="payVisbile" @panelHide="panelHide"></v-paylist>
     <v-record v-show="recordVisible" :is-show="recordVisible" @panelHide="panelHide"></v-record>
</div>
</template>

<script>
    import vPaylist from "../CompanyProfile/pay.vue";
    import vRecord from '../CompanyProfile/record.vue';
export default {
    data() {
        return {
            defalultWW:'./static/img/ingame_toy.png',
            homeNavImg:'./static/img/home_btn_home1.png',
            bagNavImg:'./static/img/home_btn_bag1.png',
            mineNavImg:'./static/img/home_btn_my1.png',
            them:'选择娃娃机',
            payVisbile:false,
            recordVisible:false,
        }
    },
    methods: {
        panelHide(visible){
            this.payVisbile =visible;
            this.recordVisible = visible;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        restNavBg() {
            this.homeNavImg='./static/img/home_btn_home1.png',
            this.mineNavImg='./static/img/home_btn_my1.png'
        },
        changebg(type) {
            this.restNavBg();
            switch (type) {
                case "home":
                this.homeNavImg = './static/img/home_btn_home2.png';
                break;
                case "bag":
                    this.recordVisible = true;
                // this.bagNavImg = './static/img/home_btn_bag2.png';
                break;
                case "mine":
                this.mineNavImg = './static/img/home_btn_my2.png';
                    this.payVisbile = true;
                break;
            }
        },
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
    },
    components: {vPaylist,vRecord},
}
</script>

<style scoped>
  .text-color{color:#af6c00;}
 .relat{position:relative}
 .absol{position:absolute}
 .block{display:block;}
 .switch-text{
     font-size: 0.15rem;
     line-height: 0.18rem;
     width:0.2rem;
     font-weight:bold;
     padding:0.05rem 0 0.05rem 0.08rem;
 }
 .switch{
     width: 0.35rem;
     height: 45%;
     top: 0.45rem;
     left: -0rem;
     background:url('../../../static/img/home_bg_info.png') center no-repeat;
     background-size:0.35rem;

 }
 .pay-coin{
     width:0.2rem;
     height:100%;
     float:left;
     margin-left:0.1rem;
     background:url('../../../static/img/pay_icon_coin50.png') center no-repeat;
     background-size:0.3rem;
 }
.container{
    overflow: hidden;
}
.home-wrap {
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/home_bg1.jpg") no-repeat center fixed;
    background-size:100% 100%;
}
.home {
    width: 100%;
    height: 100vh;
    background: url("../../../static/img/home_bg2.png") no-repeat center fixed;
    background-size:100% 100%;
}
.main-nav > ul{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    height: 10.4%
}
.main-nav ul > li {
    float: left;
    width: 28%;
    font-size: 10px;
    margin: 0 2%;
}
.home .select-list {
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 12%;
    width: 100%;
    overflow: auto;
}
.home .select-list ul>li {
    float: left;
    width: 46%;
    font-size: 10px;
    list-style-type: none;
    background: #fff;
    margin: 2%;
    padding: 0.1rem;
}
.home .select-list ul>li>div img {
    display: block;
    margin: 0 auto;
    width: 0.8rem;
}
.home .select-list ul>li>p{
    font-weight: bold;
    color: #8c8a8b;
    font-size: 0.16rem;
    text-align: center;
    padding-right: 0.15rem;
}
.home .select-list li .li-bottom {
    padding: 0 0.1rem;
}
.home .select-list li .time {
    display: inline-block;
    background: #af6c00;
    width: 70%;
    height: 0.25rem;
    line-height: 0.25rem;
    color: #ead06d;
    text-align: right;
    padding-right: 0.1rem;
    font-weight: bold;
}
.home .select-list li .go {
    width: 25%;
    height: 0.27rem;
    line-height: 0.27rem;
    display: inline-block;
    background: #ff4e3d;
    color: #fff;
    text-align: center;
    font-weight: bold;
    float:right;
}
.home .goBack {

}
.home .login-out{
    width: 0.4rem;
    height: 9%;
    margin:0 10px;
    background:url('../../../static/img/ingame_btn_back1.png') center no-repeat;background-size: 0.4rem;

}
    /*them*/
.game-them{font-size:0.25rem;color:#FFFEAE;text-align:center;height:0.6rem;line-height:0.6rem;font-weight:bold;}
.add-coin{    right: 0.18rem;
    top: 0.2rem;
    height: 37%;}
  .add-coin>img{width:0.2rem;float:left;}
</style>

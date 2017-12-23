 <template>
 <div class="home-wrap">
    <div class="home">
       <div class="select-list">
           <ul>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2" @click="inGame">GO</span></div>
               </li>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2">GO</span></div>
               </li>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2">GO</span></div>
               </li>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2">GO</span></div>
               </li>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2">GO</span></div>
               </li>
               <li class="raduis-1">
                  <p>这是一只大娃娃</p>
                  <div><img :src="defalultWW" alt=""></div>
                  <div class="li-bottom"><span class="time raduis-2">99/次</span><span class="go raduis-2">GO</span></div>
               </li>
           </ul>
       </div>
       <div class="main-nav">
           <ul>
               <li @click="changebg('home')"><img :src="homeNavImg" alt=""></li>
               <li @click="changebg('bag')"><img :src="bagNavImg" alt=""></li>
               <li @click="changebg('mine')"><img :src="mineNavImg" alt=""></li>
           </ul>
       </div>
       <div class="goBack"><img src="" alt=""></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            defalultWW:'./static/img/ingame_toy.png',
            homeNavImg:'./static/img/home_btn_home1.png',
            bagNavImg:'./static/img/home_btn_bag1.png',
            mineNavImg:'./static/img/home_btn_my1.png'
        }
    },
    methods: {
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
                // this.bagNavImg = './static/img/home_btn_bag2.png';
                break;
                case "mine":
                this.mineNavImg = './static/img/home_btn_my2.png';
                break;
            }
        },
        inGame(){
            this.$router.push('/main/ingame');
        }
    },
    created(){
    }
}
</script>

<style scoped>
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
    height: 1.40rem;
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
    height: 0.21rem;
    line-height: 0.21rem;
    margin-right: 0.1rem;
    color: #ead06d;
    text-align: right;
    padding-right: 0.1rem;
    font-weight: bold;
}
.home .select-list li .go {
    width: 20%;
    height: 0.21rem;
    line-height: 0.21rem;
    display: inline-block;
    background: #ff4e3d;
    color: #fff;
    text-align: center;
    font-weight: bold;
}
.home .goBack {

}
</style>

 <template>
 <div class="home-wrap account">
    <div class="home">
        <div class="back" @click="goBack">
            <img :src="back1Img" alt="">
        </div>
       <div class="goBack"><img src="" alt=""></div>
       <div class="wrap">
            <div class="register" v-show="isRegister">
                <div class="form">
                    <div style="font-size:16px;" class="username">
                        <label for="">用户名</label>
                        <input id="username" class="select-input" placeholder="请输入用户名" type="text" v-model="username">
                        <span class="success" v-show="usernameInvalid"></span>
                        <span class="error" v-show="!usernameInvalid"></span>
                    </div>
                    <div style="font-size:16px;" class="password">
                        <label for="">密码</label>
                        <input id="password" class="select-input"  placeholder="请输入密码"  type="password" name="" v-model="password" ></span>
                        <span class="success" v-show="passwordInvalid"></span>
                        <span class="error" v-show="!passwordInvalid"></span>
                    </div>
                    <div style="font-size:16px;" class="repassword">
                        <label for="">确认密码</label>
                        <input id="repassword" class="select-input"  placeholder="请再次输入密码" type="password" name="" v-model="repassword"></span>
                        <span class="success" v-show="repasswordInvalid"></span>
                        <span class="error" v-show="!repasswordInvalid"></span>
                    </div>
                </div>
                <div class="register-btn">
                    <mt-button type="default" class="Grid-cell"></mt-button>
                </div>
            </div>
            <div class="register login" v-show="isLogin">
                <div class="form">
                    <div style="font-size:16px;" class="username">
                        <label for="">用户名</label>
                        <input class="select-input" placeholder="请输入用户名" type="text" >
                    </div>
                    <div style="font-size:16px;" class="password">
                        <label for="">密码</label>
                        <input class="select-input"  placeholder="请输入密码" type="number" name="" ></span>
                    </div>
                </div>
                <div class="login-btn">
                    <mt-button type="default" class="Grid-cell"></mt-button>
                    <mt-button type="default" class="Grid-cell"></mt-button>
                </div>
                <div class="register-go">
                    <mt-button type="default" class="Grid-cell" @click="registerGO"></mt-button>
                </div>
            </div>
            
       </div> 
    </div>
</div>
</template>

<script>
//验证用户名是否由3-10位的字母、数字和下划线组成的
function checkeusername(username){
    var str=username;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression=/^(\w){3,10}$/; 
    var objExp=new RegExp(Expression); //创建正则表达式对象
    if(objExp.test(str)==true){ //通过正则表达式验证
    return true;
    }else{
    return false;
    }
}
//验证密码是否由6-20位的字母、数字组成，必须以字母开头
function checkePWD(PWD){
    var str=PWD;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression=/^[A-Za-z]{1}([A-Za-z0-9]){5,19}$/; 
    var objExp=new RegExp(Expression); //创建正则表达式对象
    if(objExp.test(str)==true){ //通过正则表达式验证
    return true;
    }else{
    return false;
    }
}
import  '../../../static/css/home.css';             //主页样式
import { getWlist,getUserInfo,getLocation,getGotoUrl } from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
export default {
    data() {
        return {
            isRegister:false,
            isLogin:true,
            usernameInvalid:false,
            passwordInvalid:false,
            repasswordInvalid:false,
            back1Img:'./static/img/ingame_btn_back1.png',
            back2Img:'./static/img/ingame_btn_back2.png',
            username:'',
            password:'',
            repassword:''
        }
    },
    methods: {
        //切换账号 退登
        goBack(){
            if(this.isLogin){
                this.$router.push('/login');
            } else { 
                this.isLogin = true;
                this.isRegister = false;
            }
        },
        registerGO() {
            this.isRegister = true;
            this.isLogin = false;
        },
        // 判断页面的input是否有焦点
        getFocusResult() {
            let x = document.getElementById("username") == document.activeElement;
            let y = document.getElementById("password") == document.activeElement;;
            let z = document.getElementById("repassword") == document.activeElement;;
            if(x||y||z){
                return true;
            } else {
                return false;
            }
        }
    },
    created(){
        
    },
    mounted(){
        let self = this;
       
        $("#username").blur(function(){
             if(self.getFocusResult()) return false;
            //1.验证是否满足正则
            //2.验证是否重名
            if(!checkeusername(self.username)){
                alert('用户名必须由3-10位的字母、数字和下划线组成！');
                return;
            } else {
                //验证是否重名,调用后端接口
                self.usernameInvalid=true;
                return;
            }
            
        });
        $("#password").blur(function(){
            if(self.getFocusResult()) return false;
            //1.验证是否满足正则
            if(!checkePWD(self.password)){
                alert('密码必须6-20位的字母、数字组成，必须以字母开头！');
                return;
            } else {
                self.passwordInvalid = true;
                return;
            }
        });
        $("#repassword").blur(function(){
            if(self.getFocusResult()) return false;
            //1.验证两次密码是否相同
            if(self.password === self.repassword && self.password!="" && self.repassword!=""){
                self.repasswordInvalid = true;
                return;
            } else {
                alert('请输入正确的密码！');
                return;                
            }
        });
    },
    watch:{
        
    }
}
</script>

<style scoped>
.account .register .form {
    margin-top: 20%;
    margin-left: 3%;
    margin-right: 3%;
    background-color: #fff;
    border-radius: 6px;

}
.register>div>div{
    padding: 14px;
    margin: 0 10px;
    position: relative;
}
.register>div>div>input{
    border: transparent;
    outline: none;
}
.register>div>div:nth-child(1),.register>div>div:nth-child(2){
    border-bottom: 1px solid #ccc;
}
.register>div>div>label{
    width: 1.33rem;
    font-size: .23rem;
}
.register .username >span{
    width: 1.6rem;
    position: absolute;
    right: 10px;
    height: 14px;
    top: 22px;
}
.register .password >span,.register .repassword >span{
    width: .4rem;
    line-height: 20px;
    position: absolute;
    right: 10px;
    height: 20px;
    top: 22px;
}
.register-btn .mint-button {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 20px;
    width: 5.4rem;
    height: 2.8em;
    background:url('../../../static/img/btn_zc2.png');
    background-size: 100% 100%;
}
.login-btn {
    width: 100%;
    height: 1.4rem;
}
.login-btn .mint-button {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 20px;
    width: 5.4rem;
    height: 2.8em;
    background:url('../../../static/img/btn_dl2.png');
    background-size: 100% 100%;
}
.register-go .mint-button {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 20px;
    width: 1rem;
    height: 1.2em;
    background:url('../../../static/img/btn_zcnew.png') no-repeat;
    background-size: 100% 100%;
}
.register .username .success {
    background:url('../../../static/img/icon_name1.png') no-repeat;
    background-size: 100% 100%;
}
.register .password .success,.register .repassword .success {
    background:url('../../../static/img/icon_right2.png') no-repeat;
    background-size: 100% 100%;
}
.register .password .error,.register .repassword .error {
    background:url('../../../static/img/icon_right1.png') no-repeat;
    background-size: 100% 100%;
}
</style>

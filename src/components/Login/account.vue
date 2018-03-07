 <template>
 <div class="home-wrap account">
    <div class="home">
        <img :src="registerSuccessImg" alt="" class="registerSuccess" v-show="registerIconStatus">
        <img :src="loginTitle" class="login-title" alt="" v-show="isLogin">
        <img :src="registerTitle" class="register-title" alt="" v-show="isRegister">
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
                        <span class="success" v-show="usernameInvalid===1"></span>
                        <span class="error" v-show="usernameInvalid===0"></span>
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
                    <mt-button type="default" class="Grid-cell" @click="registerAccount"></mt-button>
                </div>
            </div>
            <div class="register login" v-show="isLogin">
                <div class="form">
                    <div style="font-size:16px;" class="username">
                        <label for="">用户名</label>
                        <input class="select-input" placeholder="请输入用户名" type="text" v-model="loginUsername">
                    </div>
                    <div style="font-size:16px;" class="password">
                        <label for="">密码</label>
                        <input class="select-input" type="password" placeholder="请输入密码" name="" v-model="loginPassword"></span>
                    </div>
                </div>
                <div class="login-btn">
                    <mt-button type="default" class="Grid-cell" @click="loginAccount"></mt-button>
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
//验证密码是否由6-12位的字母、数字组成，必须以字母开头
// function checkePWD(PWD){
//     var str=PWD;
//     //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
//     var Expression=/^[A-Za-z]{1}([A-Za-z0-9]){5,12}$/; 
//     var objExp=new RegExp(Expression); //创建正则表达式对象
//     if(objExp.test(str)==true){ //通过正则表达式验证
//     return true;
//     }else{
//     return false;
//     }
// }
//验证密码是否由6-12位的字母、数字组成
function checkePWD(PWD){
    var str=PWD;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression=/^([A-Za-z0-9]){5,12}$/; 
    var objExp=new RegExp(Expression); //创建正则表达式对象
    if(objExp.test(str)==true){ //通过正则表达式验证
    return true;
    }else{
    return false;
    }
}
import  '../../../static/css/home.css';             //主页样式
import { verifyUserName,userRegister,userLogin} from "../../api/getData.js"
import { setSessionstorage, getSessionstorage } from "../../utils/common.js";
export default {
    data() {
        return {
            registerIconStatus:false,
            isRegister:false,
            isLogin:true,
            usernameInvalid:'',
            passwordInvalid:false,
            repasswordInvalid:false,
            back1Img:'./static/img/ingame_btn_back1.png',
            back2Img:'./static/img/ingame_btn_back2.png',
            registerSuccessImg:'./static/img/icon_success.png',
            registerTitle:'./static/img/register-title.png',
            loginTitle:'./static/img/login-title.png',
            username:'',
            password:'',
            repassword:'',
            loginPassword:'',
            loginUsername:''
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
        },
        //注册用户(成功之后跳转到登录) =============接口=============
        registerAccount() {
            if(!this.usernameInvalid || !this.passwordInvalid ||!this.repasswordInvalid) return;
            let params = {
                name:this.username,
                password:this.password,
            }
            userRegister(params).then((res)=>{
                if(res.data.status==="true"){
                    // alert("注册成功！")
                    this.registerIconStatus = true;
                    setTimeout(()=>{
                        this.registerIconStatus = false;
                        this.isLogin = true;
                        this.isRegister = false;
                    },1000)
                }
            })
        },
        //登录用户 =============接口=============
        loginAccount() {
            // this.$router.push("/main/home");
            let params = {
                name:this.loginUsername,
                password:this.loginPassword,
                code:sessionStorage.getItem('deviceCode')?getSessionstorage.getItem('deviceCode'):'1'
            }
            userLogin(params).then((res)=>{
                console.log(res,'res')
                if(res.data.status==="true"){
                    // alert("登录成功！")
                    this.$router.push("/main/home");
                } else {
                    alert(res.data.message)
                }
            })
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
            if(!self.username){
                self.usernameInvalid='';
                alert('用户名不能为空！');
                return false;
            } 
            if(!checkeusername(self.username)){
                self.usernameInvalid='';
                alert('用户名必须由3-10位的字母、数字和下划线组成！');
                return;
            } else {
                //验证是否重名,调用后端接口 =============接口=============
                verifyUserName({username:self.username}).then((res)=>{
                    if(res.data.status==="false"){
                        self.usernameInvalid=1;
                    } else {
                        self.usernameInvalid=0;
                    }
                })
                return;
            }
            
        });
        $("#password").blur(function(){
            if(self.getFocusResult()) return false;
            if(!self.password){
                self.passwordInvalid = false;
                alert('密码不能为空！')
                return false;
            }
            //1.验证是否满足正则
            if(!checkePWD(self.password)){
                self.passwordInvalid = false;
                alert('密码必须6-12位的字母、数字组成，必须以字母开头！');
                return;
            } else {
                self.passwordInvalid = true;
                return;
            }
        });
        $("#repassword").blur(function(){
            if(self.getFocusResult()) return false;
            //1.验证是否满足正则
            if(!checkePWD(self.repassword)){
                self.repasswordInvalid = false;
                alert('密码必须6-12位的字母、数字组成，必须以字母开头！');
                return;
            } else {
                self.repasswordInvalid = true;
                return;
            }
            //1.验证两次密码是否相同
            if(self.password === self.repassword && self.password!="" && self.repassword!=""){
                self.repasswordInvalid = true;
                return;
            } else if (self.password !== self.repassword && self.password!="" && self.repassword!="") {
                self.repasswordInvalid=false;
                alert('两次密码不一致！');
                return;
            }
        });
    },
    watch:{
        
    }
}
</script>

<style scoped>
.account .home{
    width: 100%;
    height: 100%;
    background: url(/static/img/bg.jpg) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    right: 0;
}
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
.register .username .error {
    background:url('../../../static/img/icon_name2.png') no-repeat;
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
.registerSuccess {
    width: 80px;
    height: 90px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -25px;
    z-index: 1;
}
.login-title,.register-title {
    position: absolute;
    top: 1.2rem;
}
</style>

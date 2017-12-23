<template>
    <div>
        <!--帮助中心提示-->
        <el-dialog title="问题反馈" :modal="false" id="helpCenterBox" :visible.sync="isShow" size="tiny" class="modalBox bimAppBox" :close-on-click-modal="true" :before-close="handleClose">
            <el-form :model="ruleFormhelp" :rules="ruleshelp" ref="ruleFormhelp" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="type">
                    <el-select v-model="ruleFormhelp.itype" placeholder="问题类型" style="width:100%;height:30px;line-height:30px;">
                        <el-option
                            v-for="item in userInfo.itemList"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="mes" style="margin-bottom:26px">
                    <el-input @change='change' type="textarea" :rows="5"  placeholder="向myluban反馈问题或提建议:" v-model="ruleFormhelp.mes" ></el-input >
                    <el-col style="position:absolute;bottom:0px;">
                      <span style="float:right;position:relative;right:4%;font-size:12px">(
                      <span style="color:#6595f2;">{{remainLengthhelp}}</span>/300)</span>
                    </el-col>
                </el-form-item>
                <el-form-item>
                     <el-upload id="upload-picture-card" class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemove" :file-list="fileList" :auto-upload="false"
                         >
                        <el-button size="small" :disabled="disImg"  class="loaclhostImg" style="border:none;">+ 本地图片 </el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="phone" style="margin-bottom: 0px">
                    <el-input v-model="userInfo.phone" placeholder="联系方式" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button type="button" class="el-button el-button--yellow"  @click="submitFormhelp"><!---->
                    <!----><span>发 送</span></button></span>

        </el-dialog>
    </div>
</template>
<script>
    export default{
        props:{isShow:Boolean,userInfo:Object},
        data(){
            return {
                //帮助
                ruleFormhelp:{
                    itype:'',
                    mes:'',
                    phone:this.userInfo.phone,
                },
                ruleshelp: {

                },
                issueVis:false,
                optionsType:[],
                remainLengthhelp: '300',
                helpImgUrl:'',
                disImg:false,
                fileList: []
            }
        },
        methods:{
            //关闭弹窗
            handleClose(done){
                this.issueVis = false;
                this.$emit('closeDialog',this.issueVis);
            },
            //上传问题图片
            handleAvatarSuccess(res, file ,fileList) {
                this.imgList=fileList;
                if(fileList.length>=6){
                    this.disImg=true;
                }else{
                    this.disImg=false;
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp' || file.type === 'image/gif';
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 jpg/png/bmp/gif 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5M!');
                }
                return isJPG && isLt5M;
            },
            //帮助中心
            //备注
            change() {
                let txtVal = this.ruleFormhelp.mes.length;
                this.remainLengthhelp = 300 - txtVal;
                if(this.ruleFormhelp.mes.length>=300){
                    this.$nextTick(() => {
                        this.ruleFormhelp.mes = this.ruleFormhelp.mes.substring(0,300);
                        this.remainLengthhelp = 0;
                    })
                }
            },
            handleRemove(file, fileList) {
                this.imgList=fileList;
                if(fileList.length>=6){
                    this.disImg=true;
                }else{
                    this.disImg=false;
                }
            },
            showPerson(){
                this.dialogVisiblePerson = true;
                this.showPersonConn=false;
                this.makeCodeBund=false;
                this.nshow60=true;
                this.ruleFormemail={
                    email:'',
                    phone:null,
                    codenew:null,
                    password:'',
                };
            },
            //发送
            submitFormhelp(){
                this.issueVis = false;
                this.$emit('closeDialog',this.issueVis);
                console.log(this.ruleFormhelp,'ruleFormhelp')
            },
        }
    }
</script>
<style scope>
    .el-upload--picture-card{width:100% !important;height:40px!important;background:transparent;line-height:37px;}
    .el-upload-list--picture-card .el-upload-list__item{width:40px;height:40px;}
    .el-upload-list__item-status-label{display:block;}
</style>

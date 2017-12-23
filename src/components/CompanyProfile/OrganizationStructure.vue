<template>
    <div class="org">
        <div class="header">
            <!-- 负责人界面start -->
            <div class="el-popover" v-show="isPopover">
                <div class="pop-manager-dialog">
                    <div class="pop-header">
                        <p class="enterprise-name">企业名称</p>
                        <p class="company-name">{{orgNodeInfo.org.name}}</p>
                    </div>
                    <div class="pop-manager-list">
                        <p class="name">负责人</p>
                        <div class="list">
                            <span v-for="item in orgNodeInfo.admins"><i class="iconfont icon-user"></i>{{item.id}}</span>
                        </div>
                    </div>
                    <div class="pop-operation">
                        <el-button type="primary" class="basic-btn" icon="plus" @click="dialogVisible = true">添加</el-button>
                        <el-button type="primary" class="basic-btn" icon="plus">删除</el-button>
                        <el-button type="primary" class="basic-btn" icon="plus">编辑</el-button>
                    </div>
                    <div x-arrow="" class="popper__arrow" style="top: 112.5px;"></div>
                </div>
            </div>
            <!-- 负责人界面end -->
            <el-button type="primary" class="basic-btn" icon="plus" @click="expandTree(true)">全部展开</el-button>
            <el-button type="primary" class="basic-btn" icon="minus" @click="expandTree(false)">全部收起</el-button>
            <!-- <el-button type="primary" class="basic-btn manager-popover" icon="plus" v-popover:popover4>负责人界面</el-button> -->
            <el-button type="primary" class="basic-btn" icon="plus" @click="dialogVisible = true">添加项目部</el-button>
        </div>
        <div class="org-wrap">
            <div class="root-node">
                <div>PDS没网测试公司</div>
            </div>
            <div id="organization-tree" class="clearfix"></div>
        </div>
        <!-- 添加分公司界面start -->
        <el-dialog title="添加分公司" :visible.sync="dialogVisible" size="tiny">
            <el-radio-group v-model="orgForm.resource">
                <el-radio label="分公司"></el-radio>
                <el-radio label="项目部"></el-radio>
            </el-radio-group>
            <el-form :model="companyForm" :rules="companyRules" ref="companyForm" label-width="100px">
                <!-- 分公司 -->
                <div class="branch-company">
                    <el-form-item label="分公司名称："  prop="name">
                        <el-input v-model="companyForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="分公司负责人：" prop="responsible">
                        <el-input v-model="companyForm.responsible"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-form :model="projectForm" :rules="projectRules" ref="projectForm" label-width="100px">
                <!-- 项目部 -->
                <div class="project">
                    <el-form-item label="项目名称：" prop="name">
                        <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人：">
                        <multiple-select  v-bind:optionsdata="multiple.originOptions" v-bind:selecteddata="multiple.selectedList" v-on:selected="multipleCallback"></multiple-select>
                    </el-form-item>
                    <el-form-item label="项目经理：" prop="manager">
                        <el-input v-model="projectForm.manager" placeholder="请输入项目经理"></el-input>
                    </el-form-item>
                    <!-- </el-form-item> -->
                    <el-form-item label="手机号码：" prop="mobile">
                        <el-input v-model="projectForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="项目开工日期：">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="projectForm.startDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="项目竣工日期：">
                        <el-form-item prop="date2">
                            <el-date-picker type="date" placeholder="选择日期" v-model="projectForm.endDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="建筑面积(m2)">
                        <el-input v-model="projectForm.area" placeholder="请输入建筑面积大小，例：8888.00"></el-input>
                    </el-form-item>
                    <el-form-item label="里程：">
                        <el-input v-model="projectForm.mileage"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地：">
                        <el-input v-model="projectForm.location"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="projectForm.contractType" placeholder="请选择">
                            <el-option
                              v-for="item in contractTypeOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="projectForm.status" placeholder="请选择">
                            <el-option
                              v-for="item in statusOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remarks">
                        <el-input type="textarea" v-model="projectForm.remarks"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" class="dialog-btn dialog-btn-ok" @click="createOrgNode">确 定</el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 添加分公司界面end -->
        </div>
</template>
<script>
import '../../../static/css/select-vue-component.css'; // select2样式
import axios from "axios";
import {getOrgTreeList,createBranchCompany,createProject,getOrgNodeInfo,editBranchCompany,editProject,deleteNode} from '../../api/getData-mll.js';   // 接口
import {basePath,transformToObjFormat} from "../../utils/common.js"; // 通用模块
import {
  validatephoneNumber,
  validateEmail
} from "../../utils/validate";

//公用参数及常量定义
let baseUrl = window.serverPath.builderUrl;
let selectedNode,selectedTreeId;
const validateMobile = (rule, value, callback) => {
  if (validatephoneNumber(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的用户信息"));
  }
};

export default {
    data() {
        return {
            isPopover: false,
            //测试multiple select2
            single: {
                originOptions: [],
                selected: {}
            },
            multiple: {
                originOptions: [],
                selectedList: []
            },
            customMultiple: {
                selectedList: []
            },
            multipleSimplify: {
                originOptions: [],
                selectedList: []
            },
            //dialog属性
            dialogVisible: false,
            orgForm: {
                resource:'分公司'
            },
            companyForm: {
                admins: [],
                name:''
            },
            orgNodeInfo: {
                org:{},
                admins:[]
            },
            projectForm: {
                name: "新增项目部节点",
                admins: [],
                manager: "string",
                managerId: "string",
                managerName: "string",
                mobile: "string",
                startDate: "2017-12-06T07:50:54.471Z",
                endDate: "2017-12-06T07:50:54.471Z",
                area: 0,
                mileage: 0,
                location: 0,
                contractType: '1',
                status: '1',
                remarks: "string"
            },
            companyRules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3-25个字符', trigger: 'blur' }
                ]
            },
            projectRules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3-25个字符', trigger: 'blur' }
                ],
                manager: [
                    { required: true, message: '请输入项目经理', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 3-25个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, trigger: "blur", validator: validateMobile }
                ],
                remarks: [
                    { max: 150, message: '最多150个字符', trigger: 'blur' }
                ]
            },
            contractTypeOptions:[{
                value: '1',
                label: '单价合同'
                }, {
                value: '2',
                label: '总价合同'
                }, {
                value: '3',
                label: '成本加酬金合同'
            }],
            statusOptions:[{
                value: '0',
                label: '未开工'
                }, {
                value: '1',
                label: '在建'
                }, {
                value: '2',
                label: '竣工'
            }],
            // 树数据
            url: "../../../static/orgs-old.json",
            // url: "../../../static/orgs.json",
            setting: {
                view: {
                  showIcon: true,
                  addHoverDom: this.addHoverDom,
                  removeHoverDom: this.removeHoverDom,
                },
                callback: {
                    onExpand: this.zTreeOnExpand,
                    beforeExpand: this.zTreeBeforeExpand,
                    onClick: this.ztreeOnclick
                    // onRightClick: OnRightClick,
                    // beforeRename: beforeRename,
                    // onRename: onRename
                }
            },
            zNodes: []
        };
    },
    mounted() {
        // 获取原始树结构
        getOrgTreeList({url:baseUrl}).then(res => {
            // 组合树结构需要的参数
            let param = {
                orgNodeKey: "id",
                nodesCol:'children',
                orgNodeParentKey: "parentId"
            }
            // 处理原始树结构,返回生成树结构所需要的对象()
            for(let i=0;i<res.data.result.length;i++){
                if(res.data.result[i].root === true){
                    res.data.result[i].parentId = '0';
                }
            }

            let tempzNodes = transformToObjFormat(param,res.data.result);

            tempzNodes = tempzNodes[0].children;
            /**
             * 给数组添加key值
             * @yield {obj} 返回都带有key键值的obj
             */
            function* entries(tempzNodes) {
                for (let key of Object.keys(tempzNodes)) {
                    yield [key, tempzNodes[key]];
                }
            }
            
            this.zNodes = tempzNodes;

            for(let [key,value] of entries(tempzNodes)){
                let lineStyle = "";
                if(key != 0 && key != tempzNodes.length-1){
                    lineStyle = 'middleHLine';
                } else if (key == "0"){
                    lineStyle = 'firstHLine';
                } else if(key == tempzNodes.length-1) {
                    lineStyle = 'noneHLine';
                }
                let tree = '<ul id="ztree-'+key+'" class="ztree"></ul>';
                let longLine ='<div class="'+lineStyle+'" style=""></div><div class="longitudinalLine2" style="height:25px;border-left:1px solid #4778c7;margin-left:120px"></div>';
                let html = '<div style="float:left">'+longLine+''+tree+'</div>';
                $("#organization-tree").append(html);
                $.fn.zTree.init($("#ztree-"+key), this.setting, value);
            }
            $("#organization-tree").width(this.getOrgTreeWidth());
        });
    },
    methods: {
        //测试multiple select2
        queryData: function(){
            let self = this;
            // do ajax here
            // 多选
            self.multiple.originOptions = [{"id":"1","name":"lemon"},{"id":"2","name":"mike"},{"id":"3","name":"lara"},{"id":"4","name":"zoe"},{"id":"5","name":"steve"},{"id":"6","name":"nolan"}];
            self.multiple.selectedList = [{"id":"1","name":"lemon"},{"id":"3","name":"lara"}]

            self.orgForm.originOptions = [{"id":"1","name":"lemon"},{"id":"2","name":"mike"},{"id":"3","name":"lara"},{"id":"4","name":"zoe"},{"id":"5","name":"steve"},{"id":"6","name":"nolan"}];
            self.orgForm.selectedList = [{"id":"1","name":"lemon"},{"id":"3","name":"lara"}]
            // 多选（数据格式简化 非json）
            self.multipleSimplify.originOptions = ["lemon","mike","lara","steve","zoe","lion"];
            self.multipleSimplify.selectedList = ["lemon","lara"];

            // Dom发生变化之后的回调函数
            this.$nextTick(function(){

            })
        },

        // vue-multiple-select2 callback
        multipleCallback: function(data){
            this.multiple.selectedList = data;
            console.log('父级元素调用multipleSelected 选中的是' + JSON.stringify(data))
        },

        // vue-multipleSimple-select2 callback
        multipleSimplifyCallback: function(data){
            this.multipleSimplify.selectedList = data;
            console.log('父级元素调用multipleSimplifySelected 选中的是' + JSON.stringify(data))

        },

        log: function(){
            let self = this
            // console.log('单选输出结果' + JSON.stringify(this.single));
            console.log('多选输出结果' + JSON.stringify(this.multiple));
            // console.log('自定义输入输出结果' + JSON.stringify(this.customMultiple));
            // console.log('多选（数据格式简化 非json）' + JSON.stringify(this.multipleSimplify));
        },

        change: function(){
            let self = this;
            self.multiple.originOptions = [{"id":"2","name":"mike"},{"id":"3","name":"lara"}]
            self.multiple.selectedList = [{"id":"4","name":"zoe"},{"id":"5","name":"steve"}]
        },
        // 根据生成的树结构计算总宽度
        getOrgTreeWidth() {
            let tempWidth = 0;
            if($("#organization-tree > div").length){
                $("#organization-tree > div").each(function(){
                tempWidth += $(this).width();
                });
                return tempWidth;
            }
        },
        zTreeBeforeExpand() {
            $("#organization-tree").width(this.getOrgTreeWidth()+300);
        },
        //监控树节点展开
        zTreeOnExpand() {
            // $("#organization-tree").width(this.getOrgTreeWidth()+300);
            // setTimeout(()=>{
            //     $("#organization-tree").width(this.getOrgTreeWidth());
            // },100)
            $("#organization-tree").width(this.getOrgTreeWidth());
        },
        //组织结构全部展开，全部收起
        expandTree(source){
            console.log(this.zNodes.length,'length');
            for(let i=0;i<this.zNodes.length;i++){
                let x= 'treeObj'+i;
                x = $.fn.zTree.getZTreeObj("ztree-"+i);
                x.expandAll(source);
            }
            $("#organization-tree").width(this.getOrgTreeWidth());
        },
        //mouseOn显示负责人信息
        addHoverDom(treeId,treeNode) {
            console.log('add');
            console.log(treeId,'treeId')
            console.log(treeNode,'treeId')
            /** 
             * 1.获取当前鼠标的位置
             * 2.更改属性显示界面，获取数据
             */
            selectedNode = treeNode;
            selectedTreeId = treeId;
            let params = {
                orgId: selectedNode.id,
            };
            //获取对应节点的信息
            getOrgNodeInfo({url:baseUrl,params:params}).then((res)=>{
                this.orgNodeInfo.admins = res.data.result.admins;
                this.orgNodeInfo.org = res.data.result.org;
                console.log(this.orgNodeInfo.admins,'admins')
            });
            if($(".el-popover").css('display') === 'block') return;
            
            let aObj = $("#" + treeNode.tId + "_a");
            let mX = aObj.offset().left,
                mY = aObj.offset().top;
            let changePosition = function(){
                 $(".el-popover").css('left',mX+185);
                 $(".el-popover").css('top',mY-10);
            }
            this.isPopover = true;
            changePosition();
        },
        //mouseOff鼠标划过负责人信息
        removeHoverDom(treeId,treeNode) {
            console.log('remove')
            let popDiv = $(".el-popover");
            this.isPopover = false;
            popDiv.mouseover(()=>{
                this.isPopover = true;
            })
        },

        //创建分公司、项目部节点
        createOrgNode() {
            let self = this;
            console.log(this.orgForm.resource)
            /**
             * 创建树节点
             * @param {obj} selectedNode 当前选中节点
             * @param {obj} newNodes     新节点对象
             */
            function addTreeNode(selectedNode, newNodes) {
                console.log(selectedNode,'selectedNode')
                let treeNode = selectedNode;
                let zTree = $.fn.zTree.getZTreeObj(selectedTreeId);
                if (treeNode) {
                    treeNode = zTree.addNodes(treeNode, newNodes);
                } else {
                    treeNode = zTree.addNodes(null, newNodes);
                }
                if (!treeNode) {
                    alert('当前节点，无法添加子节点');
                }
                $("#organization-tree").width(this.getOrgTreeWidth());
            }
            
            if(this.orgForm.resource === '分公司'){
                this.$refs.companyForm.validate(valid => {
                    if (valid) {
                        let params = {
                            orgId: selectedNode.id,
                            companyInfo: this.companyForm
                        };
                        createBranchCompany({url:baseUrl,params}).then((data)=>{
                            let tempNode = data.data.result;
                            addTreeNode(selectedNode, tempNode);
                            self.dialogVisible = false;
                        });
                    } else {
                      console.log("error submit!!");
                      return false;
                    }
                });
            } else {
                this.$refs.projectForm.validate(valid => {
                    if (valid) {
                        let params = {
                            parentId: selectedNode.id,
                            projectInfo: this.projectForm
                        };
                        createProject({url:baseUrl,params}).then((data)=>{
                            let tempNode = data.data.result;
                            addTreeNode(selectedNode, tempNode);
                        });
                    } else {
                      console.log("error submit!!");
                      return false;
                    }
                });
                
            }
        }
    },
    watch:{
        'orgForm.resource' (val,oldVal){
            if(val !== oldVal){
                if(val === '分公司'){
                    $(".branch-company").css('display','block');
                    $(".project").css('display','none');
                } else {
                    $(".branch-company").css('display','none');
                    $(".project").css('display','block');
                     this.queryData();

                }
            }
        },
        'dialogVisible' (val,oldVal) {
            console.log('dialogVisible',val, oldVal)
            if(val !== oldVal){
                this.queryData();
            }
        }
    }
};
</script>
<style>
.org {
  height: calc(100vh - 218px);
  overflow: auto;
  background: #fff;
}
.org .header {
    border-bottom: 1px solid #e6e6e6;
    background-color:#fff;
    padding: 10px 10px;
}
.org .basic-btn {
    width: auto;
}
.org .ztree li a {
    line-height: 32px;
    width: 150px;
}
.org .ztree li span.button.ico_open,.org .ztree li span.button.ico_close{
    background-position: -237px -18px;
}
.org .ztree li span.button.ico_docu {
    background-position: -237px -36px;
}
.org ul.ztree{
    float: left;
}
.org ul.ztree {
  margin-top: 10px;
  margin: 0 auto;
  min-width: 260px;
}
.org #organization-tree {
    margin: 0 auto;
}
.org .org-wrap .root-node > div {
    margin: 0 auto;
}
.org .ztree li a {
    border: 2px solid #4778c7;
    /*margin: 10px;*/
    margin: 0;
    height: 40px;
    line-height: 40px;
    width: 170px;
}
.org .ztree li span.button {
    margin: 0 !important;
}
.org #organization-tree > ul {
    min-width: 230px;
}
.org .firstHLine {
    margin: 0px;
    margin-left: 120px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .middleHLine  {
    margin: 0px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .noneHLine {
    margin: 0px;
    margin-right: 112px;
    height: 1px;
    display: block;
    padding: 0px;
    background: url(../../../static/img/line_conn2.png) repeat-x;
    font: 0px/0px tahoma,"微软雅黑";
    COLOR: #4778c7;
    overflow: hidden;
}
.org .org-wrap .root-node {
    position:relative;
}
.org .org-wrap .root-node > div {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
}
.org .ztree li ul.line {
    background: url(../../../static/img/line_conn1.png) repeat-y;
    background-position: 17px 0;
}
.org .ztree li span.button.switch {
    width: 50px !important; 
    height: 59px;
}

.org .ztree li span.button {
    background-image: url(../../../static/img/org-tree-new.png);
}
.org .ztree li span.button.root_docu {
    background-position: -6px -84px;
}
.org .ztree li span.button.root_close {
    background-position: -6px -84px;
}
.org .ztree li span.button.root_open {
    background-position: -13px -130px;
}
.org .ztree li span.button.center_open {
    background-position: -185px -144px;
}
.org .ztree li span.button.center_docu {
    background-position: -2px -206px;
}
.org .ztree li span.button.center_close {
    background-position: -117px -144px;
}
.org .ztree li span.button.bottom_docu {
    background-position: -2px -245px;
}
.org .ztree li span.button.bottom_open {
    background-position: -184px -6px;
}
.org .ztree li span.button.bottom_close {
    background-position: -117px -6px;
}
/*el-popover*/
.el-popover {
    padding: 0;
    width: 500px;
    position: fixed;
}
.el-popover .pop-header {
    border-bottom: 1px solid #e6e6e6;
}
.el-popover .pop-operation {
    border-top: 1px solid #e6e6e6;
}
.el-popover .pop-header .en{
    padding: 20px 10px;
}
.el-popover .pop-header .enterprise-name,.el-popover .pop-manager-list .name{
    font-size: 14px;
    font-weight: bold;
    padding: 20px 10px;
}
.el-popover .pop-header .company-name {
    font-size: 14px;
    padding: 0 10px 20px 10px;
}
.el-popover .pop-manager-list .list > span {
    width: 110px;
    height: 30px;
    display: inline-block;
}
.el-select-dropdown__item.selected {
  color: rgb(72, 106, 106);
  background-color: #fff;
}
.el-popover .pop-manager-list .list {
    padding: 0 10px 20px 10px;
}
.el-popover .pop-operation {
    padding: 20px 35px;
}
.el-popover:before{
    content: '';
    border-top: 9px solid transparent;/*方框上部分背景颜色为透明*/
    border-bottom: 9px solid transparent;/*方框下部分背景为透明*/
    border-right: 9px solid #eee;/*箭头背景颜色*/
    position: absolute;/*绝对定位1*/
    top: 25px;/*距离顶部位置偏移量2*/
    left: -9px;/*距离左边位置偏移量3*/ /*123都是控制显示位置的*/
}

.el-popover:after{
    content: '';
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid #fbfdfb;/*箭头背景颜色，覆盖前面的#eee颜色，使其颜色与整体颜色一致*/
    position: absolute;
    top: 27px;
    left: -7px;
}

.selectStatus {
  position: absolute;
  left: 36px;
  top: 5px;
}
.selcetNodes{
  position: absolute;
  left: 93px;
  top: 5px;
}
.select-dropdown ul {
  position: absolute;
  width: 120px;
  border: 1px solid rgb(209, 229, 229);
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  margin: 5px 0;
  display: none;
  z-index: 999;
}
.select-dropdown ul li {
  font-size: 14px;
  padding: 8px 10px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(72, 106, 106);
  height: 36px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
}
.dialog-footer {
  text-align: center;
}
.multi-textarea .el-button {
  width: 116px;
}


</style>
<style scoped>
    .el-radio-group {
        padding: 10px;
    }
    .el-dialog .project {
        display: none;
    }
</style>

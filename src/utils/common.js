/**
 * 分页序号处理
 * params:data 要处理的对象
 * params:currentPage 当前页
 * params:pagesize    每页显示多少条
 * 公式（n-1）*pagesize+currentIndex
 */
function FormIndex(data, currentPage, pagesize) {
    console.log('序列累加');
    data.forEach(function (val, key) {
        val.index = (currentPage - 1) * pagesize + val.index;
    })
}

/**
 * 简要数据转换为标准JSON数组
 * @param  {obj} param          获取树结构需要的临时参数
 * @param  {obj} simpleOrgNode  原始数据
 * @return {obj}                返回生成树结构所需要的对象
 */
function transformToObjFormat(param, simpleOrgNodes) {
    var i,l;
    var key = param.orgNodeKey;
    var parentKey = param.orgNodeParentKey;
    if (!key || key=="" || !simpleOrgNodes) return [];

    if ($.isArray(simpleOrgNodes)) {
        var r = [];
        var tmpMap = [];
        for (i=0, l=simpleOrgNodes.length; i<l; i++) {
            tmpMap[simpleOrgNodes[i][key]] = simpleOrgNodes[i]; //引用赋值
        }
        for (i=0, l=simpleOrgNodes.length; i<l; i++) {
            if (tmpMap[simpleOrgNodes[i][parentKey]]) {
                if (!tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol]){
                    tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol] = [];
                }
                tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol].push(simpleOrgNodes[i]);
            } else {
                r.push(simpleOrgNodes[i]);
            }
        }
        return r;
    }else {
        return [simpleOrgNodes];
    }
}

/**
 *
 * @param localhost     分属模块
 * @returns {basePath}  分属模块对应的路径
 */
function basePath(localhost) {
    let baseUrl = "";
    switch (localhost) {
        //cas
        case '/authority/administrators-list':             //权限管理->管理员管理
            baseUrl = 'http://192.168.13.195:8989/cas/';
            break;
        case '/companyprofile/space-usage':                //企业概况->空间使用
            baseUrl = 'http://192.168.13.195:8989/cas/';
            break;

        //hello
        case '/companyprofile/organization-structure':     //企业概况->组织结构
            baseUrl = window.serverPath.builderUrl;
            break;
        case '/authority/member-management':               //权限管理->成员管理
            baseUrl = window.serverPath.builderUrl;
            break;
        case '/authority/role-management':                 //权限管理->角色管理
            baseUrl = window.serverPath.builderUrl;
            break;

        case '/bimlib/housing/bim-lib/1':                  //Bim库->房建->工程库
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/bimlib/housing/recycle-bin/1":
            baseUrl = window.serverPath.builderUrl;
            break;

        case '/bimlib/housing/working-set/1':               //Bim库->房建->工作集库
            baseUrl = window.serverPath.builderUrl;
            break;
        case '/bimlib/housing/pdf-drawing':               //Bim库->房建->PDF图纸
            baseUrl = window.serverPath.builderUrl;
            break;
        case '/bimlib/BaseBuild/bim-lib/2':                  //Bim库->基建->工程库
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/bimlib/BaseBuild/recycle-bin/2":
            baseUrl = window.serverPath.builderUrl;
            break;

        case '/bimlib/BaseBuild/working-set/2':              //Bim库->基建->工作集库
            baseUrl = window.serverPath.builderUrl;
            break;
        case '/bimlib/decoration/bim-lib/4':                  //Bim库->家装->工程库
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/bimlib/decoration/recycle-bin/4":
            baseUrl = window.serverPath.builderUrl;
            break;

        case "/configuration/common/data-catalog":        //应用配置->通用->资料目录
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/attribute-template":   //应用配置->通用->属性模板
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/logo-management":      //应用配置->通用->标识管理
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/label-management":     //应用配置->通用->标签管理
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/form-management":      //应用配置->通用->表单管理
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/process-template":     //应用配置->通用->工序管理
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/common/color-template":       //应用配置->通用->颜色模板
            baseUrl = window.serverPath.builderUrl;
            break;

        case "/configuration/o-bw":                        //应用配置->原bw
            baseUrl = window.serverPath.builderUrl;
            break;
        case "/configuration/o-govern":                    //应用配置->原bw
            baseUrl = window.serverPath.builderUrl;
            break;

        case "/configuration/govern":                      //应用配置->govern
            baseUrl = window.serverPath.builderUrl;
            break;



        // palace
        case "/componentlib/remiz-comp":           //构件库->remiz
            baseUrl = 'http://192.168.13.195:8989/palace/';
            break;
        case "/componentlib/remiz-temp":
            baseUrl = 'http://192.168.13.195:8989/palace/';
            break;
        case "/componentlib/remiz-mate":
            baseUrl = 'http://192.168.13.195:8989/palace/';
            break;

        // builderCiVil
        case "/configuration/BaseBuild":           //应用配置->市政
            baseUrl = 'http://192.168.13.195:8989/builderCiVil/';
            break;
        case "/configuration/explorerCivil":       //应用配置->explorerCivil
            baseUrl = 'http://192.168.13.195:8989/builderCiVil/';
            break;

        // cloud
        case "/componentlib/luban-mep":        //构件库->鲁班安装
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/componentlib/luban-steel":      //构件库->鲁班钢筋
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case '/quotalib/automatic-template':   //定额库->自动套
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case '/indicatorslib/unchecked/civilEngineering-index':    //指标库->未审核->土建指标
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case '/indicatorslib/unchecked/reinforcement-index':       //指标库->未审核->钢筋指标
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case '/indicatorslib/passed/civil-engineering-index':      //指标库->已审核->土建指标
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case '/indicatorslib/passed/reinforcement-index':          //指标库->已审核->土建指标
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/authority/basic-client":        //权限管理->应用分配>基础客户端
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/authority/system-client":       //权限管理->应用分配->系统客户端
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/authority/bim-meal":            //权限管理->应用分配->BIM应用套餐
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/authority/quota-lib":           //权限管理->应用分配->定额库
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/system/lubancoins-management":  //系统->鲁班币
            baseUrl = 'http://192.168.13.195:8989/cloud/';
            break;
        case "/system/order-management/orders":
            baseUrl = 'http://192.168.13.195:8989/cloud/';
        case "/system/order-management/orders-detail/:id":
            baseUrl = 'http://192.168.13.195:8989/cloud/';
        case "/system/order-management/eds-orders":
            baseUrl = 'http://192.168.13.195:8989/cloud/';

        case "/system/system-log/govern-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/explorer-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/civil-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/works-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/plan-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/prevbw-log":
            baseUrl = window.serverPath.builderUrl;
        case "/system/system-log/prevgovern-log":
            baseUrl= 'http://192.168.13.195:8989/hello/';
        case "/system/system-log/remiz-log":
            baseUrl= 'http://192.168.13.195:8989/hello/';
        default:
            break;
    }
    return baseUrl;
}
function dateFormat(date){
    date = new Date(date);
    let getYear = date.getFullYear();
    let getMonth = date.getMonth();
    let getdate = date.getDate();
    let getHou = date.getHours();
    let getMin = date.getMinutes();
    date = `${getYear}.${getMonth}.${getdate}  ${getHou}:${getMin}`;
    return date;
}
/*function apiBase() {
 let hostname = window.location.hostname,
 API_BASE_URL = 'http://test2api.dunizb.com';//默认环境
 if(hostname === 'crm.dunizb.cn') {  //正式环境
 API_BASE_URL = 'http://api.dunizb.cn';
 } else if(hostname === 'admin.dunizb.com') {//公网测试环境
 API_BASE_URL = 'http://testapi.dunizb.com';
 } else if(hostname === 'manager.dunizb.com') {//内网测试环境
 API_BASE_URL = 'http://test2api.dunizb.com';
 }
 return API_BASE_URL;
 }*/
export {
    FormIndex,
    basePath,
    transformToObjFormat,
    dateFormat
}

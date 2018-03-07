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

function dateFormat(date,mate){
    // date = date+'';
    date = date.replace(/-/g,"/");
    date = new Date(date);
    let getYear = date.getFullYear();
    let getMonth = date.getMonth()<10?'0'+(date.getMonth()+1):date.getMonth()+1;
    let getdate = date.getDate()<10?'0'+date.getDate():date.getDate();
    // let getdate = date.getDate();
    let getHou = date.getHours()<10?'0'+date.getHours():date.getHours();
    let getMin = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();;
    if(mate){
        date = `${getYear}年${getMonth}月${getdate}日     ${getHou}:${getMin}`;
    }else{
        date = `${getYear}.${getMonth}.${getdate}  ${getHou}:${getMin}`;
    }

    return date;
}
function setSessionstorage(name,obj){
    let string = sessionStorage.setItem(name,JSON.stringify(obj));
}
function getSessionstorage(name){
    let tempObj = sessionStorage.getItem(name);
    let obj;
    if(tempObj && tempObj!="undefined"){
        obj = JSON.parse(sessionStorage.getItem(name));
    } else {
        obj = '';
    }
    return obj;
}
function isWeixin() { 
    var ua = window.navigator.userAgent.toLowerCase(); 
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
        // $("#rs").text("微信浏览器"); 
        return true;
    } else { 
        // $("#rs").text("不是微信浏览器"); 
        return false;
    } 
}
export {
    isWeixin,
    FormIndex,
    transformToObjFormat,
    dateFormat,
    setSessionstorage,
    getSessionstorage
}

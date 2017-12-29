/**
 * Created by yhj on 2017/11/7.
 */

/*   后端server五大模块
 {builder}      'http://192.168.13.195:8989/builder/';
 {cloud}        'http://192.168.13.195:8989/cloud/';
 {builderCiVil} 'http://192.168.13.195:8989/builderCiVil/';
 {cas}          'http://192.168.13.195:8989/cas/';
 {palace}       'http://192.168.13.195:8989/palace/';
 */
import axios from "axios";

let base = './static/workSeting.json';
let route = './static/routes.json';
let first, second, third;
//egg
// let base = 'http:192.168.13.215:8080/main';
/**
 * axios.get访问的三种形式
 * 1.不带参数
 * 2.参数拼接
 * 3.传入对象
 * */
// export const getWorksetingList = params => axios.get(`${base}`);
// export const getWorksetingList = params => axios.get(`${base}/${params.id}`);
// export const getWorksetingList = params => axios.get(`${base}`,{params:params});
//post方式-->不携带参数 略
// export const getWorksetingList = params => axios.post(`${base}`,params);
//    http://192.168.13.195:8989/cloud/payment/alipay/alipayCloseTradeNotify
export const tests = params=> axios.get(`${params.url}` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('./static/js/citys.json')
export const getNewCitys = params => axios.get('./static/js/newcity.json')
export const cloudTree = params=> axios.get("./static/datasource.json");
export const router = params=> axios.get(`${route}`);
// 订单管理
// GET /order/manage/getEnterpriseServiceList/{currentPage}/{pageSize} 分页获取企业服务列表
export const getOrderManagementList = params=> axios.get(`${params.url}order/manage/getEnterpriseServiceList/${params.currentPage}/${params.pageSize}`);
// POST /order/manage/getBindingList 获取服务与硬件绑定列表
export const getBindingList = params=>axios.post(`${params.url}order/manage/getBindingList`, params.getBindingListParam)
// POST /order/manage/unbinding/{bindingId} 解除服务与硬件绑定
export const unBindingList = params=>axios.post(`${params.url}order/manage/unbinding/${params.bindingId}`)

// EDS订单
// GET /eds/order/getEnterpriseOrderList/{recentMonth}/{currentPage}/{pageSize} 获取EDS订单列表
export const getEnterpriseOrderList = params=> axios.get(`${params.url}eds/order/getEnterpriseOrderList/${params.recentMonth}/${params.currentPage}/${params.pageSize}`);
// GET /eds/order/generatePayUrl/{orderId}/{packageName} 生成支付宝付款地址
export const generatePayUrl = params=> axios.get(`${params.url}eds/order/generatePayUrl/${params.orderId}/${params.packageName}`);
// POST /eds/order/cancelOrder/{orderId} 取消EDS订单
export const cancelOrder = params=> axios.post(`${params.url}eds/order/cancelOrder/${params.orderId}`);

//GET /luban/bi/queryEnterpriseLubanBiList/{beginTime}/{endTime}/{currentPage}/{pageSize} 获取企业鲁班币列表
export const queryEnterpriseLubanBiList = params=> axios.get(`${params.url}luban/bi/queryEnterpriseLubanBiList/${params.beginTime}/${params.endTime}/${params.currentPage}/${params.pageSize}`);
// GET /luban/bi/getEnterpriseCurrentLubanBiCount 获取企业当前鲁班币数量
export const getEnterpriseCurrentLubanBiCount = params=> axios.get(`${params.url}luban/bi/getEnterpriseCurrentLubanBiCount`);

// GET /luban/bi/getContactAddress 查询联系人地址信息
export const getContactAddress = params=> axios.get(`${params.url}luban/bi/getContactAddress`);
// POST /luban/bi/validateVouchers/{vouchersPassword} 验证代金券-加入可使用范围
export const validateVouchers = params=> axios.post(`${params.url}luban/bi/validateVouchers/${params.vouchersPassword}`);
// POST /luban/bi/addLubanBiChargeOrder 添加鲁班币充值订单
export const addLubanBiChargeOrder = params=>axios.post(`${params.url}luban/bi/addLubanBiChargeOrder`, params.lubanBiChargeParam)

//get 快递费计算相关
export const getGoldInvoiceExpress = params=>axios.get(`${params.url}luban/bi/getGoldInvoiceExpress`)
// POST /luban/bi/getLubanBiMembers 查询待分配鲁班币名单
export const getLubanBiMembers = params=>axios.post(`${params.url}luban/bi/getLubanBiMembers`, params.getLubanBiMembersParam)
// GET /luban/bi/getLubanBiAllocateList/{historyId} 获取鲁班币分配名单
export const getLubanBiAllocateList = params=> axios.get(`${params.url}luban/bi/getLubanBiAllocateList/${params.historyId}`);
// POST /luban/bi/allocateLubanBi 分配鲁班币
export const allocateLubanBi = params=>axios.post(`${params.url}luban/bi/allocateLubanBi`, params.allocateLubanBiParam)



/**
 * 应用配置
 */
 export const getLogs = params=> axios.get(`${params.url}business/${params.type}/logs/${params.args}`);
 export const getLogsDownload = params=> axios.get(`${params.url}business/${params.type}/logs/download/${params.args}`);

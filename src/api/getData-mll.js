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

let base = '../../static/workSeting.json';
let route = '../../static/routes.json';
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

export const tests = params=> axios.get(`${params.url}` + "payment/alipay/alipayCloseTradeNotify");
export const getWorksetingList = params => axios.get(`${base}`);
export const getCitys = params => axios.get('../../static/js/citys.json');
export const cloudTree = params=> axios.get("../../static/datasource.json");
export const router = params=> axios.get(`${route}`);

/**
 * 登录
 */
//cas登录
export const casLogin = params=> axios.get(`${params.url}/login`);
//获取企业列表
export const getCompanyList = params=> axios.get(`${params.url}/rs/centerLogin/companyList`);
//center登录
export const centerRealLogin = params=> axios.post(`${params.url}/rs/centerLogin/login`,params.params);
//获取菜单
export const getMenusList = params=> axios.get(`${params.url}/rs/centerLogin/menu/-1`);
/**
 * 组织结构
 */
//查询组织机构树
export const getOrgTreeList = params=> axios.get(`${params.url}/org/nodes`);
//查询有组织机构信息，携带管理员信息
export const getOrgNodeInfo = params=> axios.get(`${params.url}/org/${params.params.orgId}`);
//创建新的组织机构
export const createBranchCompany = params=> axios.post(`${params.url}/org/${params.params.orgId}/subs`,params.params.companyInfo);
//创建新的项目部
export const createProject = params=> axios.post(`${params.url}/org/${params.params.parentId}/depts`,params.params.projectInfo);
//编辑组织机构
export const editBranchCompany = params=> axios.put(`${params.url}/org/${params.params.orgId}`,params.params.companyInfo);
//编辑项目部信息
export const editProject = params=> axios.put(`${params.url}/org/${params.params.orgId}/depts/${params.params.deptId}`,params.params.projectInfo)
//删除节点
export const deleteNode = params=> axios.delete(`${params.url}/org/${params.params.orgId}`);

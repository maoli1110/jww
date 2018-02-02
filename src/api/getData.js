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
// let serverUrl = 'http://wwj.gamesoul.com.cn/back';
let serverUrl = 'http://wwj.test.gamesoul.com.cn/back';

//bim创建工程 example
export const createProject = params=>axios.post(`${params.url}rs/bimRest/createProject`,params.param);

//1.登录 app/login ok
export const login = params =>axios.get(`${serverUrl}/app/login`);
//2.获取娃娃机列表 app/getWlist/$page ok
export const getWlist = params =>axios.get(`${serverUrl}/app/getWlist/1`);
//3.娃娃机点击(get)：app/hit/$id
//4.获取当前用户信息(get): app/getUserInfo ok
export const getUserInfo = params =>axios.get(`${serverUrl}/app/getUserInfo`);
//5.抓娃娃是否成功(get): app/getWawaStatus/$wawa_id/$status   //$wawa_id 娃娃机ID $status 是否抓取成功
export const getWawaStatus = params =>axios.get(`${serverUrl}/app/getWawaStatus/${params.id}/${params.status}`);
//6.我的娃娃(get): app/getBackpack/$page //$page 当前页
export const getBackpack = params =>axios.get(`${serverUrl}/app/getBackpack/1`);
//7.申请提取 (post): app/applyWawa
export const setApplyWawa = params=>axios.post(`${serverUrl}/app/applyWawa`,params);
//7.提取纪录 (get): app/getExtractLog/$page //$page 当前页
export const getExtractLog = params =>axios.get(`${serverUrl}/app/getExtractLog/1`);
//8.站内信列表(get): app/getMailList/$page //$page 当前页
export const getMailList = params =>axios.get(`${serverUrl}/app/getMailList/1`);
//9.站内信详细内容(get): app/getMail/$id 
export const getMail = params =>axios.get(`${serverUrl}/app/getMail/${params}`);
//10.删除站内信(get): app/hideMail/$id 
export const hideMail = params =>axios.get(`${serverUrl}/app/hideMail/${params}`);

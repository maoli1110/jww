/**
 * Created by yhj on 2017/11/7.
 */

import axios from "axios";
// let serverUrl = 'http://wwj.gamesoul.com.cn/back';
// let serverUrl = 'http://wwj.test.gamesoul.com.cn/back';
// let serverUrl = 'http://game.yocatch.com/back';
let serverUrl = window.serverPath.url;

//bim创建工程 example
export const createProject = params=>axios.post(`${params.url}rs/bimRest/createProject`,params.param);
//获取省市
export const getLocation = params =>axios.get(`./static/js/citys.json`);
//1.登录 app/login ok
export const login = params =>axios.get(`${serverUrl}/app/login`);
//2.获取娃娃机列表 app/getWlist/$page ok
export const getWlist = params =>axios.get(`${serverUrl}/app/getWlist/${params.page}`);
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
//11.新增地址界面
export const addNewAddress = params =>axios.post(`${serverUrl}/app/addAddress`,params);
//12.设为默认地址
export const setDefaultAddress = params =>axios.get(`${serverUrl}/app/setDefaultAddress/${params.id}`);
//13.历史地址列表
export const getOldAddress = params =>axios.get(`${serverUrl}/app/getOldAddress`);
//游戏币充值
//14.我的战绩
export const myWawaLog = params=>axios.get(`${serverUrl}/app/myWawaLog/1`);
// export const myWawaLog = params=>axios.get(`http://172.16.21.157/wwj/back/app/myWawaLog`);
//15.直播扣金币
export const getGotoUrl = params=>axios.get(`${serverUrl}/app/getGotoUrl`);
//16.验证重名
export const verifyUserName = params =>axios.get(`${serverUrl}/app/isNameRepeat/${params.username}`);
//17.注册
export const userRegister = params =>axios.post(`${serverUrl}/app/userRegister`,params);
//18.登录
export const userLogin = params =>axios.post(`${serverUrl}/app/userLogin`,params);
//22.兑换功能：将已经抓到的娃娃或虚拟物品 兑换成金币 (post): app/exchange
export const exchangeGold = params =>axios.post(`${serverUrl}/app/exchange`,params);
//23.兑换记录 (get): app/getExchangeLog/$page //$page 当前页
export const getExchangeLog = params =>axios.get(`${serverUrl}/app/getExchangeLog/1`);
//24.我的碎片(get): app/getPieceList/$page //$page 当前页
export const getPieceList = params =>axios.get(`${serverUrl}/app/getPieceList/1`);
//25.碎片合成 (get): app/pieceCompose/$pid 
export const pieceCompose = params =>axios.get(`${serverUrl}/app/pieceCompose/${params.pid}`);






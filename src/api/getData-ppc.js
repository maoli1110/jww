import axios from 'axios';
/**
 * builder模块
 * Url = 'http://192.168.13.195:8989/builder/';
 */
let builderUrl = 'http://192.168.13.195:8989/hello/'
/**
 * 组织树结构
 */
export const getOrgTreeList = params => {
    return axios.get(`${builderUrl}org/nodes`);
};
/**
 * 权限管理-角色管理
 */
/**
 * @param {*} params 
 * 获取角色列表
 */
export const getRoleList = params => {
    return axios.post(`${builderUrl}roleRest/findPageRoles`, params);
};
/**
 * @param {*} params 
 * 获取角色类型
 */
export const getRoleType = params => {
    return axios.get(`${builderUrl}roleRest/findRoleType`);
};
/**
 * @param {
 * roleId
 * } 
 * 获取角色客户端权限码
 */
export const getRoleAuthCodes = params => {
    return axios.get(`${builderUrl}roleRest/findRoleAuthCodes/${params}`);
};
/**
 * @param {*
 * roleId
 * } params 
 * 获取角色信息
 */
export const getRoleInfo = params => {
    return axios.get(`${builderUrl}roleRest/findRole/${params}`);
};
/**
 * @param {*} params 
 * 获取角色列表客户端权限信息
 */
export const getRoleClientAuthInfo = params => {
    return axios.get(`${builderUrl}roleRest/findClientAuthInfos`);
};
/**
 * @param {*} params 
 * 删除角色
 */
export const deleteRole = params => {
    return axios.delete(`${builderUrl}roleRest/deleteAuth/${params}`);
};
/**
 * @param {*} params
 * 更新保存角色信息
 */
export const updateRoleAuth = params => {
    return axios.post(`${builderUrl}roleRest/saveOrUpdateRoleAuth`, params);
};
/**
 * 应用配置-通用-资料目录
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取组织节点的资料目录
 */
export const getDataDirectoryInfoWrapper = params => {
    return axios.post(`${builderUrl}appconfig/general/data/directory/getDataDirectoryInfoWrapper`, params);
};
/**
 * @param {*} params
 * 删除组织节点的资料目录
 */
export const delDataDirectoryInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/data/directory/delDataDirectoryInfo`, params);
};
/**
 * @param {*} params
 * 创建组织节点的资料目录
 */
export const createDataDirectoryInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/data/directory/createDataDirectory`, params);
};
/**
 * @param {*} params
 * 查询组织节点的目录树(修改树使用)
 */
export const getDirectoryTreeInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/data/directory/getDirectoryTreeInfos`, params);
};
/**
 * @param {*} params
 * 修改组织节点的目录数据
 */
export const modDirectoryInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/data/directory/modifyDirectoryInfo`, params);
};
/**
/**
 * 应用配置-通用-属性模板
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取实现模板列表
 */
export const getAttributeTemplateList = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/getAttributeTemplateList`, params);
};
/**
 * @param {*} params
 * 获取属性模板信息
 */
export const getAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/getAttributeTemplateInfoList`, params);
};
/**
 * @param {*} params
 * 编辑属性模板信息
 */
export const modAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/modifyAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 添加属性模板信息
 */
export const addAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/addAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 删除属性模板信息
 */
export const delAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/deleteAttributeTemplateInfo`, params);
};
/**
 * @param {*} params
 * 上移 下移模板
 */
export const moveAttributeTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/attribute/template/moveAttributeTemplateInfo`, params);
};
/**
 * 应用配置-通用-工序模板
 * baseUrl = 'http://192.168.13.195:8989/builder/';
 */
/**
 * @param {*} params
 * 获取工序模板列表
 */
export const getProcessTemplateInfo = params => {
    return axios.post(`${builderUrl}appconfig/general/process/template/getProcessTemplateInfoWrapper`, params);
};
/**
 * @param {*} params
 * 查询工序模板详情
 */
export const getProcessTemplateTreeInfo = params => {
    return axios.get(`${builderUrl}appconfig/general/process/template/getProcessTemplateTreeInfo/${params}`);
};
/**
 * @param {*} params
 * 获取默认工序模板树
 */
export const getDefaultProcessTemplateTreeInfo = params => {
    return axios.get(`${builderUrl}appconfig/general/process/template/getDefaultProcessTemplateTreeInfo`)
};

/**
 * @param {*} params
 * 添加工序模板
 */
export const addProcessTemplateInfo = params => {
    return axios.put(`${builderUrl}appconfig/general/process/template/addProcessTemplateInfo`,params)
};

/**
 * @param {*} params
 * 批量删除工序模板
 */
export const deleteProcessTemplateInfos = params => {
    return axios.post(`${builderUrl}appconfig/general/process/template/deleteProcessTemplateInfos`,params)
};


import axios from 'axios'
import { ElNotification , ElMessageBox, ElMessage, ElLoading } from 'element-plus'


let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/ez',
  // 超时
  timeout: 90000
})

function CtFormArrayEncode(arr,prf,isCtMain){
  var res='';
  if(!arr) return res;
  if(isCtMain){
    //子表每一条记录的值要对齐，即每一条记录拥有相同数据的键值对，没有的要补空
    var dskeys={};
    for(var idx in arr){
      var item=arr[idx];
      if(typeof item == 'object'){
        if(!item){
          continue;
        } else if(Array.isArray(item)){
          continue;
        } else {
          for(var key in item){
            dskeys[key]=1;
          }
        }
      }
    }
    
    for(var idx in arr){
      var item=arr[idx];
      if(typeof item == 'object'){
        if(!item){
          continue;
        } else if(Array.isArray(item)){
          continue;
        } else {
          for(var key in dskeys){
            if(typeof item[key]=='undefined'){
              item[key]=null;
            }
          }
        }
      }
    }
  }

  for(var idx in arr){
    var item=arr[idx];
    if(typeof item == 'object'){
      if(!item){//null
        var pv=encodeURIComponent(prf)+'=';
        res+=pv+'&';
      } else if(Array.isArray(item)){
        if(isCtMain){
          var pv=encodeURIComponent(prf)+'='+encodeURIComponent(JSON.stringify(item));
          res+=pv+'&';
        } else {
          var pv=CtFormArrayEncode(item, prf+'['+idx+']');
        }
        res+=pv;
      } else {
        var pv=CtFormObjEncode(item, prf+'.',isCtMain);
        res+=pv;
      }
    } else {
      var pv=encodeURIComponent(prf)+'='+encodeURIComponent(item+'');
      res+=pv+'&';
    }
  }
  return res;
}

function CtFormObjEncode(obj,prf,isCtMain){
  var res='';
  if(!obj) return res;
  if(!prf) prf='';
  if(prf=='main.'){
    isCtMain=true;
  }
  for(var key in obj){
    var item=obj[key];
    if(typeof item == 'object'){
      if(!item){ //null
        var pv=encodeURIComponent(prf+key)+'=';
        res+=pv+'&';
      } else if(Array.isArray(item)){
        if(prf=='main.' && key.indexOf('DataBand_')==0){
          var pv=CtFormArrayEncode(item, prf+key, true);
          res+=pv;
        } else if (isCtMain){
          var pv=encodeURIComponent(prf+key)+'='+encodeURIComponent(JSON.stringify(item));
          res+=pv+'&';
        } else {
          var pv=CtFormArrayEncode(item, prf+key, false);
          res+=pv;
        }
      } else {
        if(isCtMain){
          var pv=encodeURIComponent(prf+key)+'='+encodeURIComponent(JSON.stringify(item));
          res+=pv+'&';
        } else {
          var pv=CtFormObjEncode(item, prf+key+'.',false);
          res+=pv;
        }
      }
    } else if(typeof item == 'undefined'){
      var pv=encodeURIComponent(prf+key)+'=';
      res+=pv+'&';
    } else {
      var pv=encodeURIComponent(prf+key)+'='+encodeURIComponent(item+'');
      res+=pv+'&';
    }
  }
  return res;
}

function needConvertCtFormEncode(config){
  if(typeof config.data != "object"){
    return false;
  }
  if(!config.headers) return true;

  if(!config.headers['Content-Type']) return true;

  if(config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded')==0){
    return true;
  }

  return false;
}

function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

// request拦截器
service.interceptors.request.use(config => {
  //必须要有ctname
  if(!config.ctname){
    const message = config.url+' CT请求未指定ctname参数';
    console.error(message)
    return Promise.reject(new Error(message))
  }
  //console.log('ctreq:'+config.ctname,config);
  

  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  //if (getToken() && !isToken) 
  {
    //config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get') {
    if(config.params || config.data){
      let url = config.url;
      if(url.indexOf('?')==-1){
        url+='?';
      } else {
        url+='&';
      }
      if(config.params){
        url = url + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
      }
      if(config.data){
        url = url + tansParams(config.data);
        url = url.slice(0, -1);
        config.data = {};
      }
      config.url = url;
    }
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    /*
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                // 请求地址
      const s_data = sessionObj.data;              // 请求数据
      const s_time = sessionObj.time;              // 请求时间
      const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }*/
  } 
  if(needConvertCtFormEncode(config)){
    config.data = CtFormObjEncode(config.data);    
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    var code = res.data.resultCode;
    if(typeof code == "undefined"){
      if(typeof res.config.defResultCode != "undefined"){
        code=res.config.defResultCode;
      } else if(res.config.resultCodeField){
        code=res.data[res.config.resultCodeField];
      }
    }
    
    if(typeof code == "undefined")
      code=-1;
    // 获取错误信息
    var msg = res.data.errorMsg || '未知错误'
    // 二进制数据则直接返回
    if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer' || res.config.dataType=='string'){
      return res.data
    }
    if (code == -1){
      if(!msg)
        msg="未知错误";
      if(msg.indexOf('[PasswordExpired]')==0){
        var uname=ctsets.lastLoginUserName;
        
        if (isRelogin.show || !uname) {
          ElMessage({ message: msg.substring(17), type: 'error' })
        } else {
          ElMessageBox.confirm(msg.substring(17), '密码过期', {
              confirmButtonText: '立即修改密码', cancelButtonText: '取消', type: 'error',
              closeOnClickModal: false
            }).then(() => {
              isRelogin.show = false;
              ctOpenDialog({title:'修改密码',viewName:'editPassword', userName:uname, needRelogin:true, width:'400px', heightX:'600px'})
          }).catch(() => {
            isRelogin.show = false;
          });
        }
        return Promise.reject(msg)
      }
      if(msg.indexOf('重新登录')>=0){
        if (!isRelogin.show) {
          isRelogin.show = true;
          ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
             confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning',
             closeOnClickModal: false
            }).then(() => {
            isRelogin.show = false;
            useUserStore().logOut().then(() => {
              location.href = ctsets.getWebBasePath()+'/';
            })
          }).catch(() => {
            isRelogin.show = false;
          });
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      } else {
        ElMessage({ message: msg, type: 'error' })
        return Promise.reject(new Error(msg))
      }
    }
    if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else {
      return  Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename, config) {
  downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...config
  }).then(async (data) => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || '未知错误'
      ElMessage.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
}

export function uploadFile(file, fileName, attCvDataId, ssid, url){
    var vurl=url;
    vurl=vurl+"&dataType=json&t="+(new Date()).getTime();
    var formData = new FormData();
    if(fileName)
        formData.append('file', file, fileName);
    else
        formData.append('file', file);
    downloadLoadingInstance = ElLoading.service({ text: "正在提交数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
    return service.post(vurl, formData,
        {
          ctname: '上传文件',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(data =>{
        downloadLoadingInstance.close();
        console.log('upload res:',data);
        return data;
      }).catch((r) => {
        console.error(r)
        ElMessage.error('上传文件出现错误，请联系管理员！')
        downloadLoadingInstance.close();
      });	
}

export default service

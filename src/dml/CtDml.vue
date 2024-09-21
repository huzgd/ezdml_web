<template>
  <el-container v-loading="dmlLoading" class="ez-main-form">
    <el-header height="40px" style="padding:0 15px 0 5px;">
      <DmlMainMenu :dmlData="dmlData" style="width:100%"/>
    </el-header>

    <el-container>
      <el-aside :width="dmlData.leftAsideWidth+'px'" v-show="!dmlData.maximizeMode">
        <DmlTree :dmlData="dmlData" />
      </el-aside>
      <div class="line-e" @mousedown="startResizeDrag($event)" @mouseover="showFoldBtn()" @mouseleave="hideFoldBtn" :style="{'background-color': resizerFocused?'#80beff':''}"></div> 
      <el-container>
        <el-main>
          <DmlGraph :dmlData="dmlData"/>
        </el-main>
        <!-- el-footer v-if="!dmlData.maximizeMode">FT</el-footer -->
      </el-container>
    </el-container>
  </el-container>
  
  <el-button v-if="!dmlData.maximizeMode && canShowFoldBtn && !isFolderResizing" class="fold-tree-btn" type="info" circle size="small" :icon="ArrowLeftBold" @click="dmlData.maximizeMode=true" :style="{left: (dmlData.leftAsideWidth-1)+'px'}"></el-button>     
  <el-button v-if="dmlData.maximizeMode && canShowFoldBtn && !isFolderResizing" class="fold-tree-btn" type="info" circle size="small" :icon="ArrowRightBold" @click="dmlData.maximizeMode=false" style="left: -1px;"></el-button>     

  <input ref="dmjFileInput" type="file" @change="handleFile" style="display: none;" accept=".dmj,.json">
  <a href="" ref="dmlSaveLink" style="display: none;"/>

  <DmlShare :dmlData="dmlData"/>
  <DmlPropDialog  :dmlData="dmlData"/>
  <DmlContextMenu :dmlData="dmlData"/>
  <DmlOnlineFiles :dmlData="dmlData"/>

</template>


<script setup>

import { shallowReactive, watch, ref, onMounted} from 'vue'
import DmlGraph from './DmlGraph/index.vue'
import DmlTree from './DmlTree/index.vue'
import DmlMainMenu from './DmlComp/DmlMainMenu.vue'
import DmlContextMenu from './DmlComp/DmlContextMenu.vue'
import DmlOnlineFiles from './DmlComp/DmlOnlineFiles.vue'
import DmlShare from './DmlComp/DmlShare.vue'
import {emptyDmlData, getDmlTableCount, loadDmlData, getDmlItemByName, processDmlDataEvent, checkDmlDataIds, 
  checkSaveDmlData, saveDmlCacheFile, setDmlFileHistory, getDmlUid} from './DmlData'
import CryptoJS from 'crypto-js';
import DmlPropDialog from "./DmlProps/DmlPropDialog.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import {extractCompStr,getUrlParamValue,formatDateTime} from './Utils/ctutil'
import {ArrowLeftBold,ArrowRightBold} from '@element-plus/icons-vue'


const dmlData=shallowReactive({
  _refreshCounter:0,
  mobilePhoneMode: false,
  maximizeMode: false,
  leftAsideWidth: 300,
  fileName: '',
  content: {items:[]},
  userData: {value:0, params:[], customObjs:{test:null}},
  curModelName: '',
  curModel: null, //请通过curModelName切换模型，勿直接修改
  curTable: null,
  selectedCount: 0,
  execCmd: null,
  emitEvent: null,
  onExecCmds:[],
  onEmitEvents:[],
  searchText: ''
});
const dmlLoading=ref(true);

const _execCmd=(cmd,par1,par2)=>{
  let res=undefined;
  if(cmd=='menu_action'){
    if(par1=='loadFile'){
      loadFile();
      return true;
    }
    if(par1=='onlineFiles'){
      onlineFiles(par2);
      return true;
    }
    if(par1=='saveFile'){
      saveFile();
      return true;
    }
    if(par1=='shareModels'){
      shareModels();
      return true;
    }
    if(par1=='showSelectedProp'){
      showSelectedProp();
      return true;
    }
    if(par1=='newFile'){
      newFile();
      return true;
    }
    if(par1=='openEzdmlDownload'){
      openEzdmlDownload();
      return true;
    }
    if(par1=='openEzdmlHome'){
      openEzdmlHome();
      return true;
    }
    if(par1=='exportImage'){
      exportImage();
      return true;
    }
  }

  dmlData.onExecCmds.some(fun=>{
    res=fun(cmd,par1,par2);
    if(res)
    return true;
  });

  if(!res){
    if(cmd=='loadFileUrl'){
      loadFileUrl(par1,par2);
      return true;
    }
    if(cmd=='saveFileCache'){
      saveFileCache(par1,par2);
      return true;
    }
    if(cmd=='showItemProps'){
      if(dmlData.curTable){
        showTableProp(dmlData.curTable);
      }
      res=true;
    }
    if(cmd=='removeCmdHandler'){
      for(var idx=0;idx<dmlData.onExecCmds.length;idx++){
        if(dmlData.onExecCmds[idx]==par1){
          dmlData.onExecCmds.splice(idx,1);
          break;
        }
      }
      res=true;
    }
    if(cmd=='removeEventHandler'){
      for(var idx=0;idx<dmlData.onEmitEvents.length;idx++){
        if(dmlData.onEmitEvents[idx]==par1){
          dmlData.onEmitEvents.splice(idx,1);
          break;
        }
      }
      res=true;
    }
  }

  return res;
}



const _emitEvent=(evt, par1, par2)=>{
  dmlData.onEmitEvents.forEach(fun=>{
    fun(evt,par1,par2);
  })
};

dmlData.execCmd = _execCmd;
dmlData.emitEvent=_emitEvent;

const OnDmlEmitEvent=(evt,par1,par2)=>{
  processDmlDataEvent(dmlData, evt, par1, par2);

  if(evt=='selectObj'){
    dmlData.selectedCount=par1;
    dmlData.curTable=dmlData.execCmd('getDmlSelectedTable');
  }
  if(evt=='dml_dblclick'){
    showSelectedProp();
  }
  if(evt=='tableChanged'){
    _execCmd('dmlReloadTable', par1, par2);
  }
  if(evt=='dmlKeyDown_Delete'){
    delSelected();
  }
  if(evt=='deleteSelectedObjects'){
    delSelected();
  }
}

dmlData.onEmitEvents.push(OnDmlEmitEvent);

function showSelectedProp(){
  let selC=dmlData.execCmd('getDmlSelectedCount');
  if(selC==1){
    let tb=dmlData.execCmd('getDmlSelectedTable');
    if(tb)
      showTableProp(tb);
    else {
      let lnk=dmlData.execCmd('getDmlSelectedLink');
      if(lnk)
        showLinkProp(lnk);
    }
  }
}

function showTableProp(tb){
  _emitEvent('showTablePropDialog', tb);
}

function showLinkProp(lnk){
  _emitEvent('showLinkPropDialog', lnk);
}

const dmjFileInput=ref(null);
const dmlSaveLink=ref(null);


const newFile=()=>{
  ElMessageBox.confirm(
    '确定要清空所有内容?',
    '清空',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    newFileEx();
    })
    .catch(()=>{});
}

const newFileEx=()=>{
  dmlData.curModelName='';
  dmlData.curModel=null;
  dmlData.curTable=null;
  let res=emptyDmlData();
  dmlData.content=res;
  if(res.items.length>0){
    dmlData.curModelName=res.items[0].Name;
    dmlData.curModel=res.items[0];
  } else {
    dmlData.curModelName='';
  }
  dmlData.fileName='';
  dmlData._refreshCounter++;
}

const loadFileUrl=(furl,opt)=>{
  if(furl=='demo'){
    loadUrl('demo', {dataType:'string'});
    return;
  }
  if(furl.startsWith("cache://")){
    let fid=getUrlParamValue(furl, 'fid');
    loadUrl(furl, fid, furl);
    return;
  }

  let sid=getUrlParamValue(furl, 'sid');
  if(sid){
    let cap=getUrlParamValue(furl, 'cap');
    loadUrl('/mdown/?sid='+sid+'&uid='+getDmlUid(), {dataType:'string'}, furl);
  }
  else{
    loadUrl(furl, {}, furl);
  }
}

const saveFileCache=(fName, cacheNo)=>{
  if(!fName || !cacheNo)
    return;
  checkSaveDmlData(dmlData.content);
  let jsonStr=JSON.stringify(dmlData.content,null,2);
  let blob=new Blob([jsonStr], {type: "text/plain;charset=utf-8"});
  if(blob.size>1024*1024){
    ElMessageBox.alert('该文件太大，无法在浏览器缓存中存储', '错误', {type:'error'});
    return;
  }
  saveDmlCacheFile(cacheNo, fName, blob.size, 'cache://?fid='+cacheNo+'&cap='+encodeURIComponent(fName), formatDateTime(), jsonStr);
  dmlData.fileName=fName;
  ElMessage('缓存文件已保存 - '+fName);
}

const loadUrl=(url,opt, origUrl)=>{
  let vurl=origUrl||url;
  let fn=getUrlParamValue(vurl,'cap');
  if(!fn) fn=vurl;
  let tbC=getDmlTableCount(dmlData.content);
  if(tbC>0){
    ElMessageBox.confirm(
      '加载新文件将清空已有内容，未保存的数据将丢失。确定要继续加载吗?',
      '加载 - '+fn,
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
        loadUrlEx(url,opt, origUrl);
      })
    .catch(()=>{});
  } else {
    loadUrlEx(url,opt, origUrl);
  }
}
const loadUrlEx=(url,opt, origUrl)=>{
  dmlLoading.value=true;
  dmlData.fileName='';
  loadDmlData(url, opt).then(res => {
    dmlLoading.value=false;
    if(res.substring(0,13)=='[DMJ_ENC_AES]'){
      loadEncContent(res, url, 0, origUrl);
    } else
      loadJsonContent(res, url, origUrl);
  });
}

function setEncKeyLen(key, len){
  if(!key)
    return key;
  while(key.length<len){
    key=key+key;
  }
  if(key.length>len)
    key=key.substring(0,len);
  return key;
}

function loadEncContent(sdata, url, retryTimes, origUrl){
  let data=sdata;
  let p1=data.indexOf('TITLE=');
  if(p1<0)
    return;
  let p2=data.indexOf("\n",p1+1);
  if(p1<0)
    return;
  let title=data.substring(p1+6,p2).trim();
  if(title.indexOf("+")>=0)
    title=title.replace(/\+/g,'%20');
  title=decodeURIComponent(title);
    
  let err=null;
  ElMessageBox.prompt(retryTimes?'解密失败，请检查并重新输入密码':'输入密码进行解密', title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  .then(({ value }) => {
    let pwd=setEncKeyLen(value,32);
    let iv=CryptoJS.MD5(title);
    data=data.substring(p2);
    data=data.replace(/[\ |\r|\n]/g,"");;

    let decData;
    let decTxt;
    try {
      decData=CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(pwd),
        {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.NoPadding
        }
      );
      decTxt = decData.toString(CryptoJS.enc.Utf8);
      let p=decTxt.indexOf('\n');
      let header=decTxt.substring(0,p).trim();
      decTxt=decTxt.substring(p+1);
      p=decTxt.indexOf('\n'+header+'\n');
      if(p>0)
        decTxt=decTxt.substring(0,p);
      if(decTxt.substring(0,1)!='{'){
        err='解密错误';
      }
    } catch (error) {
      err=error;
    }

    if(err){
      retryTimes++;
      if(retryTimes<=3){
        loadEncContent(sdata, url, retryTimes+1, origUrl);
      } else {
        ElMessage.error('解密失败，请检查密码是否正确 - '+err);
      }
      return;
    }
    loadJsonContent(decTxt, url, origUrl);
  })
  .catch((err) => {
    ElMessage.error('解密加载出错：'+err)
  })
}

function loadJsonContent(data, url, origUrl){
  data=data.trim();
  if(data.substring(0,1)!='{'){
    if(data.substring(0,1)=='<'){
      let msg=extractCompStr(data,'>错误：','</pre>');
      if(msg){
        ElMessage.error('错误：'+msg);
        return;
      }
    }
    if(data.length>256)
      data=data.substring(1,254)+'...';
    ElMessage.error('JSON解释错误：'+data);
    return;
  }
  let res;
  try {
    res=JSON.parse(data);
  } catch (error) {
    ElMessage.error('JSON解释出错：'+err)
  }
  res=checkDmlDataIds(res);
  newFileEx();
  dmlData.content=res;
  if(res.items.length>0){
    dmlData.curModelName=res.items[0].Name;
    dmlData.curModel=res.items[0];
  } else {
    dmlData.curModelName='';
  }

  let fnUrl=origUrl||url;
  let fn=fnUrl;
  if(fn.indexOf('?')>=0){
    fn=getUrlParamValue(fn,'cap');
    if(!fn)
      fn=fnUrl;
  }
  let po=fn.lastIndexOf('/');
  if(po<0)
    po=fn.lastIndexOf('\\');
  if(po>=0)
    fn=fn.substring(po+1);
  dmlData.fileName=fn;
  
  let fid=fnUrl;
  if(!fid.startsWith('file://') && !fid.startsWith('cache://')){
    if(fid!='demo'){
      fid=getUrlParamValue(fnUrl,'sid');
      if(!fid) fid=getUrlParamValue(fnUrl,'fid');
      if(!fid) fid=fnUrl;
    }
    let blob=new Blob([data], {type: "text/plain;charset=utf-8"});
    setDmlFileHistory(fid, fn, blob.size, fnUrl, formatDateTime());
  }
  dmlData._refreshCounter++;
}

const loadFile=()=>{
  dmjFileInput.value.value="";
  dmjFileInput.value.click();
}

const handleFile=(event)=>{  
  const file = event.target.files[0];
  loadUrl('file://?cap='+encodeURIComponent(file.name), file);
}

const onlineFiles=(saveMode)=>{
  _emitEvent('showOnlineFileDialog',saveMode);
}

const saveFile=()=>{
  let fn=dmlData.fileName;
  if(!fn.toLowerCase().endsWith('.dmj'))
    fn=fn+'.dmj';
  ElMessageBox.prompt('保存本地文件后可以用EZDML桌面版打开。请输入文件名：', '保存本地文件', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: fn
  })
    .then(({ value }) => {
      saveFileEx(value);
    })
    .catch(() => {
    })
}

const saveFileEx=(fn)=>{
  if(!fn)
    return;
  if(!fn.toLowerCase().endsWith('.dmj'))
    fn=fn+'.dmj';
  checkSaveDmlData(dmlData.content);
  let jsonStr=JSON.stringify(dmlData.content,null,2);
  let blob=new Blob([jsonStr], {type: "text/plain;charset=utf-8"});
  let lnk=dmlSaveLink.value;

  lnk.href=URL.createObjectURL(blob);
  if(!fn)
    fn=dmlData.curModelName+'.dmj';
  lnk.download=fn;
  lnk.click();
}

const shareModels=()=>{
  _emitEvent('showDmlShare');
}

watch(()=>dmlData.curModelName, ()=>{
  dmlData.curModel=getDmlItemByName(dmlData.content.items, dmlData.curModelName);
});

onMounted(() => {
  var ww=window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  var wh=window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  if (ww<=wh){
    dmlData.mobilePhoneMode=true;
    dmlData.maximizeMode=true;
    dmlData.leftAsideWidth=200;
  }
  dmlLoading.value=false;

  let url=window.location.href;
  if(url.startsWith("http://"))
    url=url.substring(7);
  else if(url.startsWith("https://"))
    url=url.substring(8);
  if(url.startsWith("www.ezdml.com/"))
    url=url.substring(4);
  let sid=getUrlParamValue(url, 'sid');
  if(sid){
    let cap=getUrlParamValue(url, 'cap');
    promptLoadSid(sid, cap, url);
  }
  else{
    let fid=getUrlParamValue(url, 'fid');
    if(fid){
      loadUrl(fid, {dataType:'string'}, url);
    } else {
      loadUrl('demo',{dataType:'string'});
    }
  }
  //loadUrl('http://127.0.0.1:5173/ezdml_vue/demo_ch.dmj', {dataType:'string'});
  window._EzdmlExecCmd=_execCmd;
});

function promptLoadSid(sid, cap, origUrl){
  if(!cap)
    cap=sid;
  ElMessageBox.confirm(
    '要加载分享的文件"'+cap+'"吗?',
    '加载',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(() => {
    loadUrl('/mdown/?sid='+sid, {dataType:'string'}, origUrl);
  })
  .catch(()=>{
  });
}

const delSelected=()=>{
  let res=dmlData.execCmd('getDmlSelectedCount');
  if(res){
    ElMessageBox.confirm(
      '确定要删除选中的对象?',
      '删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
        dmlData.execCmd('dmlDeleteSelected');
      })
      .catch(()=>{});
  }
}

function openEzdmlDownload(){
  window.open("http://www.ezdml.com/download_cn.html");
}
function openEzdmlHome(){
  window.open("http://www.ezdml.com/");
}
function exportImage(){
  let cvs=_execCmd('getDmlCanvas');
  cvs.toBlob((blob)=>{
    let fn=dmlData.fileName+'_'+formatDateTime()+'.png';
    let lnk=dmlSaveLink.value;

    lnk.href=URL.createObjectURL(blob);
    lnk.download=fn;
    lnk.click();
  });
}


// 拖拽事件
let startResizeDrag = function (event, type) {

if(dmlData.maximizeMode){
  dmlData.maximizeMode=false;
  return;
}
// 鼠标按下
let e = event ? event : window.event;
let minValue = 100; // 最小值
let maxValue = 800; // 最大值
let startValue = e.pageX; // 起始位置
let endValue = dmlData.leftAsideWidth; // 结束位置
let value = 0; // 初始值
isFolderResizing.value=true;

// 鼠标指针移动
var oldEvt=document.onmousemove;
document.onmousemove = function (event) {
  let e = event ? event : window.event;
  value = e.pageX - startValue + endValue;

  if (value < minValue || value === minValue) {
    value = minValue;
  }

  if (value > maxValue || value === maxValue) {
    value = maxValue;
  }

  dmlData.leftAsideWidth = value;
  event.preventDefault();
};

// 鼠标松开
document.onmouseup = function (ev) {
  document.onmousemove = oldEvt;
  isFolderResizing.value=false;
  ev.preventDefault();
};
e.preventDefault();
};

const resizerFocused=ref(false);
const canShowFoldBtn=ref(false);
const isFolderResizing=ref(false);
var timer_HideFoldBtn=null;
const showFoldBtn=()=>{
  resizerFocused.value=true;
  canShowFoldBtn.value=true;
  if(timer_HideFoldBtn){
    clearTimeout(timer_HideFoldBtn);
    timer_HideFoldBtn=null;
  }
}
const hideFoldBtn=()=>{
  resizerFocused.value=false;
  timer_HideFoldBtn=setTimeout(()=>{
    canShowFoldBtn.value=false;
  },2000);
}
</script>

<style scoped>
.ez-main-form{
  width: 100vw;
  height: 100vh;
}
.el-main{
  align-items: stretch;
  padding:1px 12px 15px 0px;
}
.el-aside{
  align-items: stretch;
}


.line-e {
  position: relative;
  min-width: 6px;
  height: 100%;
  cursor: e-resize;
}

.fold-tree-btn{
  position: absolute; 
  top: 184px;
}
</style>

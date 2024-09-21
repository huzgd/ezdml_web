<template>
<div>
  <el-dialog
    v-model="showShareDialog"
    title="分享"
    width="600px"
    draggable
    overflow
  >
  
  <el-form label-width="100px">
    <el-form-item label="选择模型">
      <template v-for="item in modelList">
        <el-checkbox v-model="item.checked" :label="item.NameCaption"/>
      </template>
      <div style="width: 100%;"></div>
      <el-checkbox v-model="checkAll" label="全选" @change="checkSelAll"/>
    </el-form-item>

    <el-form-item label="分享标题">
      <el-input v-model="shareInfo.NAME" placeholder="请输入标题"/>
    </el-form-item>
    
    <el-space fill>
      <el-form-item label="密码保护">
        <el-input v-model="encpwd" placeholder="无密码则明文分享"/>
        <p>指定密码后将先加密再进行传输和分享，系统不会存储任何跟密码相关的信息，您需要自行将密码告知接收方</p>
      </el-form-item>
    </el-space>
    
    
  </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showShareDialog=false;">
          取消
        </el-button>
        <el-button type="primary" @click="previewShare">
          预览
        </el-button>
      </div>
    </template>
  </el-dialog>

  
  <el-dialog
    v-model="showPreviewDialog"
    title="分享预览"
    width="860px"
    draggable
    overflow
    :close-on-click-modal="shareInfo.SHARE_URL?false:true"
    @close="onShareClose"
  >
  
  <el-form label-width="auto">

    <el-form-item label="分享标题">
      <el-input v-model="shareInfo.NAME" readonly/>
    </el-form-item>
    
    <el-form-item label="有效期">
      <el-date-picker
        v-model="shareInfo.EXPIRED_DATE"
        type="datetime"
        placeholder="为空则永不过期"
        :readonly="shareInfo.SHARE_URL?true:false"
        :shortcuts="dateShortcuts"
        :disabled-date="isDisabledDate"
      />
      <span v-if="shareInfo.EXPIRED_DATE">&nbsp;【说明】过期后文件无法下载（已下载的不受影响）</span>
    </el-form-item>
    
    <el-form-item label="预览">
      <el-input type="textarea" v-model="shareInfo.PREVIEW" :autosize="{ minRows: 4, maxRows: 12 }" style="font-family: monospace;" readonly/>
      <div style="width:100%;">
        <el-button @click="copyShareContent">
          复制
        </el-button>
        <div style="float:right;">
          <span>{{ shareInfo.PREVIEW.length }}字符 </span>
            <el-tooltip
              v-if="encpwd"
              class="box-item"
              effect="dark"
              content="加密算法：AES；加密库：CryptoJS；模式：CBC；密钥：密码（32字节，不足则重复填充）；初始向量：分享标题(UTF-8)的MD5；填充模式：无填充；结果编码：Base64"
              placement="top-start"
            >
              <el-button :icon="InfoFilled" >加密说明</el-button>
            </el-tooltip>
          <a href="" ref="dmlSaveLink"/>
        </div>
      </div>
    </el-form-item>
    
    <el-form-item label="分享链接" v-if="shareInfo.SHARE_URL">
      <el-input v-model="shareInfo.SHARE_URL" readonly/>
        <el-button @click="copyShareUrl">
          复制
        </el-button>
    </el-form-item>
  </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showPreviewDialog=false">
          返回
        </el-button>
        <el-button @click="saveShareFile">
          保存为文件
        </el-button>
        <el-button type="primary" @click="commitShare" :disabled="shareInfo.SHARE_URL?true:false">
          生成分享链接
        </el-button>
      </div>
    </template>
  </el-dialog>
</div>
</template>
  
<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs, watch, nextTick } from 'vue'
import {uploadFile} from '../Utils/ctrequest.js'
import ctrequest from '../Utils/ctrequest.js'
import {checkSaveDmlData, genCtGuid, emptyDmlData, cloneMap, getDmlUid, setDmlFileHistory} from '../DmlData'
import CryptoJS from 'crypto-js';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import {formatDateTime} from '../Utils/ctutil'

const dmlData = useAttrs()['dmlData'] || {};
const showShareDialog=ref(false);
const showPreviewDialog=ref(false);
const dmlSaveLink=ref(null);

const modelList=ref([]);
const checkAll=ref(false);
const shareInfo=ref({
  NAME:'',
  PWD_PROTECTED:false,
  MEMO:'',
  EXPIRED_DATE:'',
  CREATOR_DML_UID:'test001',
  CREATOR_NAME:'test',
  PREVIEW:'',
  SHARE_URL: '',
  FILENAME:'model',
  FILESIZE: 0
})
const encpwd=ref('');
var curDate=new Date();
const dateShortcuts=[
  {
    text: '五分钟后',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 5*60*1000 +30*1000);
      return date;
    },
  },
  {
    text: '半小时后',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 30*60*1000+30*1000);
      return date;
    },
  },
  {
    text: '4小时后',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 4*60*60*1000+30*1000);
      return date;
    },
  },
  {
    text: '1天后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      return date
    },
  },
  {
    text: '2天后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 2)
      return date
    },
  },
  {
    text: '一周后',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      return date
    },
  },
  {
    text: '一个月',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 30)
      return date
    },
  },
  {
    text: '一年',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() + 365)
      return date
    },
  },
];
function isDisabledDate(dt){
  return dt.getTime()<curDate.getTime()-24*60*60*1000;
}

const dmlShare_EventLsr=(evt,par1,par2)=>{
  if(evt=='showDmlShare'){
    showShareDialog.value=true;
  }
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

const previewShare=()=>{
  let mC=0;
  let mds=emptyDmlData();
  mds.items.length=0;
  modelList.value.forEach(fmd=>{
    if(fmd.checked){
      let md=cloneMap(fmd.metaModel);
      mds.items.push(md);
      mC++;
    }
  });
  if(mC==0){
    ElMessage.error('请指定要分享的模型');
    return;
  }
  let sName=shareInfo.value.NAME.trim();
  if(!sName){
    ElMessage.error('请指定分享标题');
    return;
  }

  checkSaveDmlData(mds);
  let jsonStr=JSON.stringify(mds,null,2);

  let pwd=encpwd.value;
  if(pwd){
    pwd=setEncKeyLen(pwd,32);
    let ivs=sName;
    let iv=CryptoJS.MD5(ivs);
    let rLen=Math.floor(Math.random()*128);
    let rndArr=CryptoJS.lib.WordArray.random(64+rLen);
    let rndStr=CryptoJS.enc.Base64.stringify(rndArr);
    rndStr=rndStr.substring(0,rndStr.length-3);
    jsonStr=rndStr+"\n"+jsonStr+"\n"+rndStr+"\n";
    let warr=CryptoJS.enc.Utf8.parse(jsonStr);
    let oLen=warr.sigBytes;
    let wLen=oLen % 16;

    let tArr=CryptoJS.lib.WordArray.random(32);
    let tStr=CryptoJS.enc.Base64.stringify(tArr);
    tStr=tStr.substring(0,16-wLen);
    tArr=CryptoJS.enc.Utf8.parse(tStr);

    let dArr=warr.concat(tArr);    
    let encTxt=CryptoJS.AES.encrypt(dArr, CryptoJS.enc.Utf8.parse(pwd),
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.NoPadding
    }
    );
    let rs=CryptoJS.enc.Base64.stringify(encTxt.ciphertext);
    jsonStr="[DMJ_ENC_AES]\n";
    jsonStr+="TITLE="+encodeURIComponent(sName)+"\n";
    let mLen=80;
    while(true){
      let len=rs.length;
      if(len<mLen){
        jsonStr+=rs;
        break;
      }
      jsonStr+=rs.substring(0,mLen)+"\n";
      rs=rs.substring(mLen);
    }
  }

  shareInfo.value.PREVIEW=jsonStr;
  showPreviewDialog.value=true;
}

const commitShare=()=>{
  let pwd=encpwd.value;
  if(!pwd){
    ElMessageBox.confirm(
      '您未指定密码保护，您分享的模型数据将会在网络上进行明文传输和存储。确定要在无密码保护的情况下进行分享吗?',
      '无密码保护',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      commitShareEx();
      })
      .catch(()=>{});
  } else {
    commitShareEx();
  }
}
const commitShareEx=()=>{
  let blob=new Blob([shareInfo.value.PREVIEW], {type: "text/plain;charset=utf-8"});
  shareInfo.value.FILESIZE=blob.size;

  let ssid=genCtGuid();

  uploadFile(blob, shareInfo.value.FILENAME+'.dmj', 10003, ssid, '/mup/?attssid='+ssid+'&dataType=json&').then(res=>{
    console.log('commitShare upload res:',res);
    saveShareInfo(ssid);
  })
    .catch((err) => {
      ElMessage.error('上传出错：'+err);
    });
  
}

function saveShareInfo(attSsid){
  let url =  '/msave/?t=';
  let qData = {};
  let ud=shareInfo.value;
  qData['main.NAME']=ud.NAME;
  qData['main.PWD_PROTECTED']=encpwd.value?1:0;
  qData['main.MEMO']=ud.MEMO;
  qData['main.EXPIRED_DATE']=ud.EXPIRED_DATE?formatDateTime(ud.EXPIRED_DATE):'';
  qData['main.__GLOBE_OPID']=attSsid;
  qData['main.CREATOR_DML_UID']=getDmlUid();
  let loadLoadingInstance=ElLoading.service({ text: "正在提交分享信息...", background: "rgba(0, 0, 0, 0.7)", });
  ctrequest({
    ctname: '提交分享信息',
    url: url,
    data: qData
  }).then((res) => {
    loadLoadingInstance.close();
    //console.log('saveShareInfo res:',res);

    if (res.resultCode == 0) {
      shareInfo.value.SHARE_URL=res.SHARE_URL;
      let fid=res.SHARE_GUID;
      setDmlFileHistory(fid, ud.NAME, ud.FILESIZE, res.SHARE_URL, formatDateTime(),'我的分享');

      ElMessage(res.MESSAGE||'提交成功');
    }
  }).catch((err) => {
    loadLoadingInstance.close();
    ElMessage.error('提交出错：'+err);
  });
}

const saveShareFile=()=>{
  let blob=new Blob([shareInfo.value.PREVIEW], {type: "text/plain;charset=utf-8"});
  let lnk=dmlSaveLink.value;

  lnk.href=URL.createObjectURL(blob);
  let fn=shareInfo.value.NAME+'.dmj';
  lnk.download=fn;
  lnk.click();
}

const copyShareContent=()=>{
  if(navigator && navigator.clipboard){
    navigator.clipboard.writeText(shareInfo.value.PREVIEW)
    ElMessage('已复制预览内容到剪贴板');
  } else {
    ElMessage.error('无法访问剪贴板，请手工选择复制（Ctrl+A，Ctrl+C）');
  }
}

const copyShareUrl=()=>{
  if(navigator && navigator.clipboard){
    navigator.clipboard.writeText(shareInfo.value.SHARE_URL)
    ElMessage('已复制分享链接到剪贴板');
  } else {
    ElMessage.error('无法访问剪贴板，请手工选择复制（Ctrl+A，Ctrl+C）');
  }
}

function reloadModels(){
  encpwd.value='';
  showPreviewDialog.value=false;
  let mds=modelList.value;
  let cdt=formatDateTime(null,'yyyyMMdd_HHmmss');
  shareInfo.value.NAME='分享_'+cdt;
  shareInfo.value.FILENAME='model_'+cdt;
  shareInfo.value.SHARE_URL='';
  shareInfo.value.PWD_PROTECTED=false;
  shareInfo.value.MEMO='';
  let dt=new Date();
  shareInfo.value.EXPIRED_DATE=new Date(dt.getTime()+7*24*60*60*1000);
  shareInfo.value.PREVIEW='';
  shareInfo.value.FILESIZE=0;

  mds.length=0;
  dmlData.content.items.forEach(md => {
    let nmd={checked:false};
    nmd.Name=md.Name;
    nmd.Caption=md.Caption;
    nmd.NameCaption=md.Name;
    if(md.Caption && md.Caption!=md.Name)
      nmd.NameCaption=md.Name+'('+md.Caption+')';
    nmd.TableCount=md.Tables.items.length;
    nmd.metaModel=md;
    if(nmd.Name==dmlData.curModelName){
      nmd.checked=true;
      shareInfo.value.NAME=nmd.NameCaption+'_'+cdt;
    }
    mds.push(nmd);
  });
  curDate=new Date();
}

function checkSelAll(val){
  modelList.value.forEach(md=>{
    md.checked=val;
  });
}

onMounted(() => {
  dmlData.onEmitEvents.push(dmlShare_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlShare_EventLsr);
});

watch(()=>showShareDialog.value, (value)=>{
  if(value){
    reloadModels();
  }
})

const onShareClose=()=>{
  if(shareInfo.value.SHARE_URL){
    showShareDialog.value=false;
  }
}
</script>
  

<style>
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
}
</style>
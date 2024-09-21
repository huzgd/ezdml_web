<template>
    
  <el-dialog
    v-model="showDialog"
    :title="saveMode?'保存在线文件':'打开在线文件'"
    :width="dmlData.mobilePhoneMode?'90%':'62%'"
    draggable
    overflow
  >
    <el-menu
        :default-active="activeTabIndex"
        mode="horizontal"
        @select="handleTabSelect"
    >
        <el-menu-item v-if="!saveMode" index="1">公共示例</el-menu-item>
        <el-menu-item index="2">浏览器缓存</el-menu-item>
        <el-menu-item v-if="!saveMode" index="3">历史记录</el-menu-item>
    </el-menu>

    <el-table :data="fileList" v-loading="fileListLoading" style="width: 100%"  height="360" 
      @row-click="onRowClicked" @row-dblclick="onRowDblClicked"
      :highlight-current-row="true">
      <el-table-column prop="NAME" label="名称" width="320" />
      <el-table-column prop="FILE_SIZE" label="大小" width="90" />
      <el-table-column v-if="activeTabIndex!='3'" prop="CREATEDATE" label="创建时间" width="180" />
      <el-table-column v-if="activeTabIndex=='3'" prop="LASTDATE" label="访问时间" width="180" />
      <el-table-column prop="VISIT_COUNTER" label="访问计数" width="90" />
      <el-table-column prop="MEMO" label="说明" min-width="200"/>
    </el-table>

    <el-form style="margin-top: 10px;">
      <el-form-item v-if="saveMode" label="文件名:">
        <el-input v-model="tFileName" />
      </el-form-item>
      <el-form-item v-if="!saveMode" label="文件URL:">
        <el-input v-model="tFileUrl" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog=false">
          取消
        </el-button>
        <el-button type="primary" @click="confirmOnlineFile">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  
  </template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount, useAttrs} from 'vue'
import ctrequest from '../Utils/ctrequest.js'
import {getDmlFileHistory,getDmlCacheFiles,getDmlUid} from '../DmlData'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

const dmlData = useAttrs()['dmlData'] || {};

const _execCmd=(cmd,par1,par2)=>{
  return dmlData.execCmd(cmd,par1,par2);
}

const _emitEvent=(evt, par1, par2)=>{
  dmlData.emitEvent(evt,par1,par2);
};


onMounted(() => {
  dmlData.onEmitEvents.push(dmlShare_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlShare_EventLsr);
});

const dmlShare_EventLsr=(evt,par1,par2)=>{
  if(evt=='showOnlineFileDialog'){
    saveMode.value=par1;
    if(saveMode.value){
        activeTabIndex.value="2";
        tFileName.value=dmlData.fileName;
        loadCacheFiles();
    } else {
        activeTabIndex.value="1";
        loadEzWebFiles();
    }
    showDialog.value=true;
  }
}

const showDialog=ref(false);
const activeTabIndex=ref("1");
const fileList = ref([]);
const fileListLoading=ref(false);
const tFileUrl=ref("");
const tFileName=ref("");
const saveMode=ref(false);
var tSaveCacheId='';
var tSaveCacheExists=false;

const confirmOnlineFile=()=>{
    if(!saveMode.value){
        if(!tFileUrl.value)
            return;
        _execCmd('loadFileUrl', tFileUrl.value);
        showDialog.value=false;
    } else {
        if(!tFileName.value || !tSaveCacheId)
            return;
        if(tSaveCacheExists){
          ElMessageBox.confirm(
            '该位置已经有内容，要覆盖已有的内容吗?',
            '保存缓存文件',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }
          ).then(() => {
            _execCmd('saveFileCache', tFileName.value, tSaveCacheId);
            showDialog.value=false;
          })
          .catch(()=>{
          });
        } else {
          _execCmd('saveFileCache', tFileName.value, tSaveCacheId);
          showDialog.value=false;
        }
    }
}

const handleTabSelect=(key)=>{
    if(key=="1"){
        loadEzWebFiles(activeTabIndex.value==key);
    }
    if(key=="2"){
        loadCacheFiles();
    }
    if(key=="3"){
        loadHistFiles();
    }
    activeTabIndex.value=key;
}

var lastWebFilesRes=null;
const loadEzWebFiles=(bForce)=>{
  if(!bForce)
  {
    // if(!lastWebFilesRes){
    //   let s=localStorage.getItem("DmlWebFiles");
    //   if(s)
    //     lastWebFilesRes=JSON.parse(s);
    // }
    if(lastWebFilesRes){
        fileList.value=lastWebFilesRes;
        tFileUrl.value='';
        return;
    }
  }
  let url =  '/mfiles/?uid='+getDmlUid();
  fileListLoading.value=true;
  ctrequest({
    ctname: '加载在线文件',
    url: url
  }).then((res) => {
    fileListLoading.value=false;
    if (res.resultCode == 0) {
      lastWebFilesRes=res.itemList;
      //localStorage.setItem("DmlWebFiles",JSON.stringify(lastWebFilesRes));
      if (activeTabIndex.value=="1")
        fileList.value=lastWebFilesRes;
    }
  }).catch((err) => {
    fileListLoading.value=false;
    //ElMessage.error('加载出错：'+err);
  });
}

const loadCacheFiles=()=>{
    let ds=getDmlCacheFiles();
    if(!saveMode.value)
      ds=ds.filter(item=>item.SHARE_URL);
    fileList.value=ds;
    tFileUrl.value='';
}

const loadHistFiles=()=>{
    fileList.value=getDmlFileHistory();
    tFileUrl.value='';
}

const onRowClicked=(row,col,ev)=>{
  tSaveCacheId='';
  if(saveMode.value && activeTabIndex.value=="2"){
    tSaveCacheId=row.FILE_GUID;
    tSaveCacheExists=false;
    if(row.NAME){
      tFileName.value=row.NAME;
      tSaveCacheExists=true;
    }
  }
  tFileUrl.value=row.SHARE_URL;
}

const onRowDblClicked=(row,col,ev)=>{
  onRowClicked(row,col,ev);
  confirmOnlineFile();
}

</script>

<style scoped>
.el-menu--horizontal {
    height: 36px;
}
</style>
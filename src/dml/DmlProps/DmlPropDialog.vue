<template>
<div>
  <el-dialog
    v-model="showPropDialog"
    :title="tmpTable.Name+((tmpTable.Caption && tmpTable.Caption!=tmpTable.Name)?' ('+tmpTable.Caption+')':'')"
    :width="dmlData.mobilePhoneMode?'90%':'62%'"
    draggable
    overflow
    :before-close="checkCanClosePropDlg"
  >
    <TableProp v-if="showPropDialog" :dmlData="dmlData" :metaTable="tmpTable"></TableProp>
    
    <template #footer>
      <div class="ezp-dialog-footer">
        <el-button @click="showMore">
          更多
        </el-button>
        <div class="flex-grow" />
        <el-button @click="cancelTableProp">
          取消
        </el-button>
        <el-button type="primary" @click="saveTableProp">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  
  <el-dialog
    v-model="showLinkDialog"
    :title="linkInfo.Title"
    :width="dmlData.mobilePhoneMode?'90%':'48%'"
    draggable
    overflow
    :before-close="checkCanCloseLinkDlg"
  >
    <LinkProp v-if="showLinkDialog" :dmlData="dmlData" :linkInfo="linkInfo"></LinkProp>
    
    <template #footer>
      <div class="ezp-dialog-footer">
        <el-button @click="showMore">
          更多
        </el-button>
        <div class="flex-grow" />
        <el-button @click="showLinkDialog=false">
          取消
        </el-button>
        <el-button type="primary" @click="saveLinkProp">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</div>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs} from 'vue'
import TableProp from './TableProp.vue'
import LinkProp from './LinkProp.vue'
import { cloneMap, syncTbInfo, processDmlDataEvent} from '../DmlData'
import {newTableTmpl,newTextTmpl,newGroupBoxTmpl} from '../Templates/NewTable.js'
import { ElMessage, ElMessageBox } from 'element-plus'


const dmlData = useAttrs()['dmlData'] || {};

const _execCmd=(cmd,par1,par2)=>{
  return dmlData.execCmd(cmd,par1,par2);
}

const _emitEvent=(evt, par1, par2)=>{
  dmlData.emitEvent(evt,par1,par2);
};

const showPropDialog=ref(false);
var curPropTable=null;
const tmpTable=ref({});
var oldTbCopy=null;

const newTable=(tp)=>{
  let tmpl=newTableTmpl;
  if(tp=='TEXT')
    tmpl=newTextTmpl;
  if(tp=='GROUP')
    tmpl=newGroupBoxTmpl;
  let tb=cloneMap(tmpl);
  if(tp)
    tb.TypeName=tp;
  processDmlDataEvent(dmlData, 'checkNewTableName', tb);
  showTableProp(tb);
}

const showTableProp=(tb)=>{
  curPropTable=tb;
  oldTbCopy=cloneMap(tb);
  oldTbCopy.MetaFields.items.forEach(fd=>{
    fd._EZRESERVED_ORD_NAME=fd.Name;
  });
  tmpTable.value=cloneMap(oldTbCopy);
  showPropDialog.value=true;
};

const saveTableProp=()=>{
  let tmp=tmpTable.value;
  
  if(oldTbCopy){
    let s=JSON.stringify(tmp);
    if(s!=JSON.stringify(oldTbCopy) || tmp._EZRESERVED_ISNEW){
      syncTbInfo(tmp, curPropTable);
      if(curPropTable._EZRESERVED_ISNEW){
        _execCmd('addDmlTable',curPropTable);
      } else {
        if(oldTbCopy.Name != curPropTable.Name || oldTbCopy.Caption != curPropTable.Caption){
          _emitEvent('tableTextChanged',curPropTable,oldTbCopy);
        }
        _emitEvent('tableChanged',curPropTable,oldTbCopy);
      }
    }
  }
  oldTbCopy=null;
  showPropDialog.value=false;
};
const cancelTableProp=()=>{
  oldTbCopy=null;
  showPropDialog.value = false;
};
const checkCanClosePropDlg=(done)=>{
  if(oldTbCopy){
    let s=JSON.stringify(tmpTable.value);
    if(s!=JSON.stringify(oldTbCopy)){
      ElMessageBox.confirm(
        '将丢失已修改的内容，仍然要关闭吗?',
        '关闭窗口',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          done();
        })
        .catch(()=>{});
      return;
    }
  }
  done();
}

var oldLinkInfo=null;
const linkInfo=ref({});
const showLinkDialog=ref(false);

const newLink=()=>{
  let lnkInf=_execCmd('getDmlNewMetaLinkInfo');
  if(lnkInf){
    lnkInf._EZRESERVED_ISNEW=true;
    showLinkProp(lnkInf);
  } else {
    ElMessage.error('请依次选择主表、从表（按住Shift键，从表须包含关联字段）后，再执行此操作')
  }
}

const showLinkProp=(lnkInfo)=>{
  oldLinkInfo=lnkInfo;
  linkInfo.value=cloneMap(lnkInfo);
  showLinkDialog.value=true;
};

const checkCanCloseLinkDlg=(done)=>{
  if(oldLinkInfo){
    let s=JSON.stringify(linkInfo.value);
    if(s!=JSON.stringify(oldLinkInfo)){
      ElMessageBox.confirm(
        '将丢失已修改的内容，仍然要关闭吗?',
        '关闭窗口',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          done();
        })
        .catch(()=>{});
      return;
    }
  }
  done();
}

const saveLinkProp=()=>{
  let tmp=linkInfo.value;
  
  if(oldLinkInfo){
    let s=JSON.stringify(tmp);
    if(s!=JSON.stringify(oldLinkInfo) || tmp._EZRESERVED_ISNEW){
      if(tmp._EZRESERVED_ISNEW){
        _execCmd('addDmlLink',tmp);
      } else {
        _execCmd('modifyDmlLink',tmp);
      }
    }
  }
  oldLinkInfo=null;
  showLinkDialog.value=false;
};

onMounted(() => {
  dmlData.onEmitEvents.push(dmlShare_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlShare_EventLsr);
});

const dmlShare_EventLsr=(evt,par1,par2)=>{
  if(evt=='showTablePropDialog'){
    showTableProp(par1);
  }
  if(evt=='showLinkPropDialog'){
    showLinkProp(par1);
  }
  if(evt=='newTableDialog'){
    newTable(par1);
  }
  if(evt=='newLinkDialog'){
    newLink();
  }
}

function showMore(){
  ElMessageBox.confirm(
    'EZDML Web版仍在开发完善中，目前仅提供基本的属性设置。EZDML桌面版与WEB版使用完全一致的文件格式，同时可以共享剪贴板数据，提供完善的属性设置，更多功能请使用EZDML桌面版。',
    '更多',
    {
      confirmButtonText: '下载桌面版',
      cancelButtonText: '确定',
      type: 'info',
    }
  )
    .then(() => {
      _execCmd('menu_action','openEzdmlDownload');
    })
    .catch(()=>{});
}
</script>

<style scoped>
.ezp-dialog-footer{
  display:flex;
  width:100%;
}
.flex-grow {
  flex-grow: 1;
}
</style>
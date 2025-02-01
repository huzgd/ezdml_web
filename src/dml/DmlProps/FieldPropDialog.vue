<template>
<div>
  <el-dialog
    v-model="showPropDialog"
    top="5vh"
    :title="'字段属性 - '+metaTable.Name+'.'+tmpField.Name"
    :width="dmlData.mobilePhoneMode?'80%':'680px'"
    draggable
    overflow
    :before-close="checkCanClosePropDlg"
  >
    <FieldProp v-if="showPropDialog" :dmlData="dmlData" :metaTable="metaTable" :metaField="tmpField"></FieldProp>
    
    <template #footer>
      <div class="ezp-dialog-footer">
        <div class="flex-grow" />
        <el-button @click="cancelFieldProp">
          取消
        </el-button>
        <el-button type="primary" @click="saveFieldProp">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</div>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
import FieldProp from './FieldProp.vue'
import { cloneMap, syncMapInfo} from '../DmlData'
import { ElMessage, ElMessageBox } from 'element-plus'
import {callDmlMetaObjCmd} from '../DmlGraph/DmlObjs'


const props=defineProps({
  dmlData: {
    type: Object
  },
  metaTable: {
    type: Object,
    default: {
      MetaFields:{
        items:[]
      }
    }
  },
  metaField: {
    type: Object
  }
});


const showPropDialog=ref(false);
var curPropField=null;
const tmpField=ref({});
var oldFdCopy=null;

const showFieldProp=()=>{
  let fd=props.metaField;
  curPropField=fd;
  oldFdCopy=cloneMap(fd);
  tmpField.value=cloneMap(oldFdCopy);
  showPropDialog.value=true;
};

const saveFieldProp=()=>{
  let tmp=cloneMap(tmpField.value);
  
  if(oldFdCopy){
    let s=JSON.stringify(tmp);
    if(s!=JSON.stringify(oldFdCopy) || tmp._EZRESERVED_ISNEW){
      syncMapInfo(tmp, props.metaField);
      callDmlMetaObjCmd(props.metaTable,'GenFieldConstraintDescs');
    }
  }
  oldFdCopy=null;
  showPropDialog.value=false;
};
const cancelFieldProp=()=>{
  oldFdCopy=null;
  showPropDialog.value = false;
};
const checkCanClosePropDlg=(done)=>{
  if(oldFdCopy){
    let tmp=cloneMap(tmpField.value);
    let s=JSON.stringify(tmp);
    let s2=JSON.stringify(oldFdCopy);
    if(s!=s2){
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

const showDialog=()=>{
  nextTick(showFieldProp);
}

defineExpose({
  showDialog
});

</script>

<template>
    <div>
      <el-dialog
        v-model="showGenDDLDialog"
        title="生成数据库DDL"
        :width="dmlData.mobilePhoneMode?'90%':'62%'"
        draggable
        overflow
      >
        <el-form label-width="60px" >
    
          <el-form-item label="表:">
            <span>{{curTableList}}</span>
          </el-form-item>

          <el-form-item label="数据库:">
            <el-select v-model="dbType" style="width: 160px" @change="regenDDL">
                <el-option
                    v-for="item in DEF_DmlDbTypeList"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
          </el-form-item>
          
          <el-form-item label="SQL:">
            <el-input type="textarea" v-model="ddlSQL" :autosize="{ minRows: 12, maxRows: 24 }"  wrap="off" style="font-family: monospace; overflow-x: auto;"/>
          </el-form-item>
          
        </el-form>
    
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showGenDDLDialog=false;">
              关闭
            </el-button>
          </div>
        </template>
      </el-dialog>
      
    </div>
</template>
    
<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs, watch, nextTick } from 'vue'
import {DEF_DmlDbTypeList, callTbCodeGenerator} from '../DmlGraph/DmlObjs'

const dmlData = useAttrs()['dmlData'] || {};
const showGenDDLDialog=ref(false);
const curTableList=ref('');
const ddlSQL=ref('');
const dbType=ref(DEF_DmlDbTypeList[0]);

const dmlGenDDL_EventLsr=(evt,par1,par2)=>{
    if(evt=='showDmlGenDDL'){
        showGenDDLDialog.value=true;
    }
}

function genDDL(tb){
  let res=callTbCodeGenerator(dbType.value, tb,{});
  return res;
}

function regenDDL(){
    var md=dmlData.curModel;
    var tbs=md.Tables.items;
    var s="";
    tbs.forEach(tb => {
        if(tb.TypeName &&tb.TypeName!='TABLE') return;
        if(s) s+="\n";
        let v=genDDL(tb);
        s+='-- '+tb.Name+'\n';
        s+=v;
        s+='\n';
    });
    ddlSQL.value = s;
}

function reloadInfo(){
    var md=dmlData.curModel;
    var tbs=md.Tables.items;
    var s="";
    tbs.forEach(tb => {
        if(tb.TypeName &&tb.TypeName!='TABLE') return;
        if(s) s+=", ";
        s+=tb.Name;
    });
    curTableList.value = s;
    regenDDL();
}
    
onMounted(() => {
  dmlData.onEmitEvents.push(dmlGenDDL_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlGenDDL_EventLsr);
});

watch(()=>showGenDDLDialog.value, (value)=>{
    if(value){
        reloadInfo();
    }
})

</script>
    

<style>
</style>
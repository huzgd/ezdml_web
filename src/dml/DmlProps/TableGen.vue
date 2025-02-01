<template>
  <el-tabs :tab-position="dmlData.mobilePhoneMode?'top':'left'" v-model="activeGenTab">
    <el-tab-pane v-for="item in EZTB_CODE_GENERATOR_NAMES" :label="item" :name="item">
        <el-input type="textarea" v-model="genResult[item]" :autosize="{ minRows: 20, maxRows: 28 }" wrap="off" style="font-family: monospace; overflow-x: auto;"/>
    </el-tab-pane>
  </el-tabs>
</template>
  
  
<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs, defineExpose } from 'vue'
import { cloneMap } from '../DmlData'
import {EZTB_CODE_GENERATOR_NAMES,callTbCodeGenerator} from '../DmlGraph/DmlObjs'
  
const activeGenTab=ref(EZTB_CODE_GENERATOR_NAMES[0]);
const genResult=reactive({});

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
  }
});

const genCurTab=()=>{
  let tab=activeGenTab.value;
  //let res=genResult[tab];
  //if(res) return;
  let res=callTbCodeGenerator(tab, props.metaTable,{addDbTypeHint:true, addDqlDml: true});
  genResult[tab]=res;
}

genCurTab();

watch(()=>activeGenTab.value,genCurTab)

const checkRefreshGenTable=()=>{
  genCurTab();
}

defineExpose({
  checkRefreshGenTable
});

</script>
  
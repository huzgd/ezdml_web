<template>
    <div class="common-layout">
      <el-container>
        <el-container>
          <el-container>
            <el-main style="padding:2px;">
              <el-input type="textarea" v-model="tbDesc" :autosize="{ minRows: 20, maxRows: 26 }" wrap="off" style="font-family: monospace; overflow-x: auto;" @blur="onEditorBlur"/>
            </el-main>
            <el-aside v-if="!dmlData.mobilePhoneMode" width="190px" style="padding:8px 2px 2px 8px;">
              <pre style="margin:0; color:#aaaaaa; font-family: monospace;">描述字输入示例:

TestTb 测试表
//这是个测试表
--------
ID PKInc
RID FK //关联到XX表
订单号 I(20)
标题 S(200)
数量 I
单价 F(10,2)
日期 D
Desc 描述
TpNa 类名 String:NCLOB
图标 BL
富文本 S(99999)
是否激活 BO
注释
              </pre>
            </el-aside>
          </el-container>
          <el-footer style="padding: 4px; height: 28px;">
            数据类型: S=文本, I=整数, F=浮点数, D=时间, BO=真假, E=枚举, BL=文件, C=计算, O=对象
            <div style="float:right; margin-top:5px;">
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;" @click="showJson">
              <g>
              <title>Layer 1</title>
              <g stroke="null" id="svg_2">
                <path stroke="null" fill="currentColor" d="m12.6482,5.15923l-2.63185,-2.6938l0,2.6938l2.63185,0zm0.42134,1.04169l-4.07092,0l0,-4.16674l-6.10638,0l0,12.50023l10.17729,0l0,-8.33348zm-10.68616,-5.20843l7.63297,0l4.07092,4.16674l0,9.89601a0.50886,0.52084 0 0 1 -0.50886,0.52084l-11.19502,0a0.50886,0.52084 0 0 1 -0.50886,-0.52084l0,-13.54191a0.50886,0.52084 0 0 1 0.50886,-0.52084" id="svg_1"/>
                <text stroke="null" fill="#000000" x="70" y="420" id="svg_4" stroke-width="0" font-size="250" font-family="'Alumni Sans'" text-anchor="start" xml:space="preserve" font-weight="bold" font-style="normal" transform="matrix(0.0283654 0 0 0.0194167 2.08969 3.70046)">{ }</text>
              </g>
              </g>
              </svg>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </div>
</template>
  
  
<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs, defineExpose } from 'vue'
import { cloneMap, syncTbInfo, removeTbReservedProps } from '../DmlData'
import {callDmlMetaObjCmd} from '../DmlGraph/DmlObjs'
import { ElMessage, ElMessageBox } from 'element-plus'
  
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

var lastDescTb=cloneMap(props.metaTable);
const descMetaTable=ref(lastDescTb);
const checkRefreshDescTable=()=>{
  var s1=JSON.stringify(props.metaTable);
  var s2=JSON.stringify(lastDescTb);
  if(s1!=s2){
    lastDescTb=cloneMap(props.metaTable);
    descMetaTable.value=lastDescTb;
    checkRegenDesc();
  }
}

const tbDesc=ref('');
var descSrc='';
const checkRegenDesc=()=>{
  descSrc=callDmlMetaObjCmd(descMetaTable.value,'GetDescribe')+'\n';
  tbDesc.value=descSrc;
}

checkRegenDesc();


const onEditorBlur=()=>{
  if(tbDesc.value !=descSrc ){
    callDmlMetaObjCmd(props.metaTable,'SetDescribe',tbDesc.value,'[GenFieldConstraintDescs]');
    checkRefreshDescTable();
  }
}

const showJson=()=>{
  onEditorBlur();
  let t=cloneMap(props.metaTable);
  removeTbReservedProps(t);
  let json=JSON.stringify(t,null,2);
  ElMessageBox.prompt('JSON：', props.metaTable.Name, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'textarea',
      inputValue: json
    })
    .then(({ value }) => {
      if(value!=json){
        let tmp=JSON.parse(value);
        syncTbInfo(tmp, props.metaTable);
        checkRefreshDescTable();
      }
    })
    .catch(() => {
    })
}

defineExpose({
  checkRefreshDescTable
});

</script>
  
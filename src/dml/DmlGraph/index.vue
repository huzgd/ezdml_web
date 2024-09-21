<template>
  <div ref="obSizeDivRef" style="height: 100%; width: 100%; overflow: hidden;">
    <canvas ref="canvasRef" :width="obSizeDivWidth" :height="obSizeDivHeight" style="border: 1px solid #999999; position: absolute; outline:none;"></canvas>
  </div>
</template>
  
<script lang="ts" setup>
// @ts-nocheck
import { ref, shallowRef, onMounted, onBeforeUnmount, useAttrs, watch, nextTick } from 'vue'
import {DmlCanvas} from './DmlCanvas'
import ResizeObserver from 'resize-observer-polyfill'

const dmlData = useAttrs()['dmlData'] || {};
const curModel=shallowRef({});/*nofuse*/
const canvasRef=ref(null);/*nofuse*/
var dmlCanvas=null;

watch(()=>dmlData?dmlData.curModel:null, ()=>{
  if(dmlData && dmlData.curModel){
    curModel.value=dmlData.curModel;
  } else {
    curModel.value={};
  }
  reloadDmlGraph();
});

const execCmd_dmlGraph=(cmd,par1,par2)=>{
  let res=dmlCanvas.execCmd(cmd,par1,par2);
  if(res)
    return res;
}

const onEmitEvent_dmlGraph=(evt,par1,par2)=>{
  dmlData.onEmitEvents/*nofuse*/.some(fun=>{
    fun(evt,par1,par2);
  })
}


onMounted(() => {
  dmlCanvas=new DmlCanvas(canvasRef.value as HTMLCanvasElement);
  dmlData.onExecCmds.push(execCmd_dmlGraph);
  dmlCanvas.onEmitEvents.push(onEmitEvent_dmlGraph)
  reloadDmlGraph();
  setTimeout(()=>{
    if(!dmlData.mobilePhoneMode){
      canvasRef.value.tabIndex=0;
    }
  },800);
});

var reloadTimer=null;
const reloadDmlGraph=()=>{
  if(!dmlCanvas){
    if(!reloadTimer)
    reloadTimer=setTimeout(function(){
      reloadTimer=null;
      reloadDmlGraph();
    }, 300);
    return;
  }
  dmlCanvas.loadDmlModel(curModel.value);
  dmlCanvas.refresh();
};


const obSizeDivRef=ref(null);/*nofuse*/
const obSizeDivWidth=ref('400');/*nofuse*/
const obSizeDivHeight=ref('300');/*nofuse*/
const resizeObserver = new ResizeObserver(entries => {
    let rct=entries[0].contentRect;
    obSizeDivWidth.value=rct.width/*nofuse*/;
    obSizeDivHeight.value=rct.height/*nofuse*/;
    nextTick(()=>{
      dmlCanvas.refresh();
    });    
});

onMounted(() => {
  resizeObserver.observe(obSizeDivRef.value);
});

onBeforeUnmount(()=>{
  resizeObserver.unobserve(obSizeDivRef.value);
  dmlData.execCmd/*nofuse*/('removeCmdHandler', execCmd_dmlGraph);
});

</script>
  
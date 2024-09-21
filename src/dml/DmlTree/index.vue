<template>
  <div ref="obSizeDivRef" style="height: 100%; width: 100%; overflow: hidden;">
    <el-tree-v2
      ref="treeRef"
      :data="treeData"
      :props="props"
      :expand-on-click-node="false"
      :highlight-current="true"
      :height="obSizeDivHeight"
      style="position: relative; top:0; left:0;"
      :filter-method="treeFilterMethod"
      @current-change="onCurrentNodeChanged"
      @node-click="onNodeClicked"
      @node-contextmenu="onNodeContextmenu"
    />
  </div>
</template>
  
<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs, watch, nextTick } from 'vue'
import { ElTreeV2 } from 'element-plus'
import ResizeObserver from 'resize-observer-polyfill'

const dmlData = useAttrs()['dmlData'] || {};

const obSizeDivRef=ref(null);
const obSizeDivWidth=ref(400)
const obSizeDivHeight=ref(300)
const resizeObserver = new ResizeObserver(entries => {
    let rct=entries[0].contentRect;
    obSizeDivWidth.value=rct.width;
    obSizeDivHeight.value=rct.height-20;
});

watch(()=>dmlData?dmlData._refreshCounter:-1, ()=>{
  recreateGraphNodes();
})

watch(()=>dmlData.searchText, ()=>{
  if(treeRef.value)
    treeRef.value.filter(dmlData.searchText);
});

const treeFilterMethod=(query, node)=>{
  let fText=query.trim().toLowerCase();
  if(!fText)
    return true;
  else if(!node.Name)
    return false;
  if(node.Name.toLowerCase().indexOf(fText)>=0)
    return true;
  
  return false;
}

const dmlTree_EventLsr=(evt,par1,par2)=>{
  if(evt=='newModel'){
    var md=par1;
    var item={};
    item.ID=md.ID;
    item.Name=md.Name;

    if(md.Caption && md.Caption!=md.Name){
      item.Name=item.Name+'('+md.Caption+')';
    }
    if (md.Tables && md.Tables.items && md.Tables.items.length>0){
      item.children=createTableNodes(md);
    }
    item.UserData=md;
    item.NodeType='model';
    treeData.push(item);
    treeRef.value.setData(treeData);
  }
  if(evt=='tableTextChanged'){
    let oName=par2.Name;
    if(par2.Caption && par2.Caption!=par2.Name){
      oName=oName+'('+par2.Caption+')';
    }
    let tb=par1;
    treeData.forEach(mNode=>{
      mNode.children.some(item=>{
        if(item.Name==oName){
          item.Name=tb.Name;
          if(tb.Caption && tb.Caption!=tb.Name){
            item.Name=item.Name+'('+tb.Caption+')';
          }
        }
      })
    });
    treeRef.value.setData(treeData);
  }
  if(evt=='tableDeleted'){
    let oName=par1.Name;
    if(par1.Caption && par1.Caption!=par1.Name){
      oName=oName+'('+par1.Caption+')';
    }
    var bFound=false;
    treeData.forEach(mNode=>{
      if(dmlData.curModelName!=mNode.UserData.Name)
        return;
      let nds=mNode.children;
      for(var i=nds.length-1;i>=0;i--){
        if(nds[i].Name==oName){
          nds.splice(i,1);
          bFound=true;
          break;
        }
      }
    });
    if(bFound)
      treeRef.value.setData(treeData);
  }
  if(evt=='modelChanged'){
    var bFound=false;
    for(var i=treeData.length-1;i>=0;i--){
      if(par1==treeData[i].UserData){
        let item=treeData[i];
        item.Name=par1.Name;
        if(par1.Caption && par1.Caption!=par1.Name){
          item.Name=item.Name+'('+par1.Caption+')';
        }
        bFound=true;
        break;
      }
    }
    if(bFound)
      treeRef.value.setData(treeData);
  }
  if(evt=='modelDeleted'){
    var bFound=false;
    for(var i=treeData.length-1;i>=0;i--){
      if(par1==treeData[i].UserData){
        treeData.splice(i,1);
        bFound=true;
        break;
      }
    }
    if(bFound)
      treeRef.value.setData(treeData);
  }
  if(evt=='newDmlTable'){
    par1=[par1];
    evt='newDmlTables';
  }
  if(evt=='newDmlTables'){
    var bFound=false;
    treeData.forEach(mNode=>{
      if(dmlData.curModelName!=mNode.UserData.Name)
        return;
      var md=mNode.UserData;
      par1.forEach(tb=>{
        var item={};
        item.ID=md.ID+'_'+tb.ID;
        item.Name=tb.Name;
        if(tb.Caption && tb.Caption!=tb.Name){
          item.Name=item.Name+'('+tb.Caption+')';
        }
        item.UserData=tb;
        item.NodeType='table';
        item.ParentData=md;
        if(!mNode.children)
          mNode.children=[];
        mNode.children.push(item);
      });
      bFound=true;
    });
    if(bFound)
      treeRef.value.setData(treeData);
  }
}

onMounted(() => {
  dmlData.onEmitEvents.push(dmlTree_EventLsr);
  resizeObserver.observe(obSizeDivRef.value);
  recreateGraphNodes();
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlTree_EventLsr);
  resizeObserver.unobserve(obSizeDivRef.value);
});

const props = {
  value: 'ID',
  label: 'Name',
  children: 'children',
}
const treeData = [];
const treeRef = ref(null);

const createTableNodes = (md) => {
  var res=[];
  var tables=md.Tables.items;
  for(var idx in tables){
    var tb=tables[idx];
    var item={};
    item.ID=md.ID+'_'+tb.ID;
    item.Name=tb.Name;
    if(tb.Caption && tb.Caption!=tb.Name){
      item.Name=item.Name+'('+tb.Caption+')';
    }
    item.UserData=tb;
    item.NodeType='table';
    item.ParentData=md;
    res.push(item);
  }
  return res;
}

const recreateGraphNodes = () => {
  if(!treeRef.value || !dmlData){
    setTimeout(() => {
      recreateGraphNodes();
    }, 200);
    return;
  }

  //console.log('tree refresh:',dmlData.content.items);
  treeData.length=0;
  let mds=dmlData.content.items || [];
  for(var idx in mds){
    var md=mds[idx];
    var item={};
    item.ID=md.ID;
    item.Name=md.Name;

    if(md.Caption && md.Caption!=md.Name){
      item.Name=item.Name+'('+md.Caption+')';
    }
    if (md.Tables && md.Tables.items && md.Tables.items.length>0){
      item.children=createTableNodes(md);
    }
    item.UserData=md;
    item.NodeType='model';
    treeData.push(item);
  }
  treeRef.value.setData(treeData);

  let eks=[];
  if(dmlData.curModel){
    eks.push(dmlData.curModel.ID);
    treeRef.value.setCurrentKey(dmlData.curModel.ID);
  }
  treeRef.value.setExpandedKeys(eks);
}

const onCurrentNodeChanged=(data, node)=>{
  var tp=data.NodeType;
  if(tp=='model'){
    if(dmlData.curModelName!=data.UserData.Name)
      dmlData.curModelName=data.UserData.Name;
    else
      dmlData.execCmd('bestFit');
  } else if (tp=='table') {
    dmlData.curModelName=data.ParentData.Name;
    nextTick(()=>{
      dmlData.execCmd('focusToObj',data.UserData.Name);
    });
    
  }
}

var mouseClickX=0,mouseClickY=0,mouseClickTick=0;
const onNodeClicked=(data, node, e)=>{
  let mx=e.pageX;
  let my=e.pageY;
  let tk=(new Date()).getTime();
  dmlData.emitEvent('dmlTreeClicked', data, e);
  if(Math.abs(mx-mouseClickX)<=1 && Math.abs(my-mouseClickY)<=1){
    if(Math.abs(tk-mouseClickTick)<=600){
      if(data.NodeType=='table')
        dmlData.execCmd('showItemProps', data.UserData, data.NodeType);
      else
        dmlData.execCmd('bestFitOrReset');
      e.preventDefault();
      return;
    }
  }
  mouseClickX=mx;
  mouseClickY=my;
  mouseClickTick=tk;
}

const onNodeContextmenu=(event, data, node)=>{
  dmlData.emitEvent('dmlTreeContextMenu', data, event);
  event.preventDefault();
}
</script>
  

<style scoped>
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #aaaaff !important;
  }
</style>
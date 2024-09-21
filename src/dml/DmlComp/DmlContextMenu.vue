<template>
  <RightClickMenu :menus="dmlContextMenus" ref="rightClickMenu" />
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs, watch, nextTick, markRaw } from 'vue'
import RightClickMenu from "../RightClickMenu/index.vue"
import { Plus, Close, Edit, RefreshLeft} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {cloneMap} from '../DmlData'

const dmlData = useAttrs()['dmlData'] || {};

const dmlContextMenus = ref([]);
const rightClickMenu=ref(null);

const _execCmd=(cmd,par1,par2)=>{
  return dmlData.execCmd(cmd,par1,par2);
}

const _emitEvent=(evt, par1, par2)=>{
  dmlData.emitEvent(evt,par1,par2);
};

const dmlShare_EventLsr=(evt,par1,par2)=>{
  if(evt=='dml_contextmenu'){
    showDmlContextMenu(par1);
  }
  if(evt=='dmlTreeClicked'){
    closeContextMenu();
  }
  if(evt=='dmlTreeContextMenu'){
    showDmlTreeContextMenu(par1,par2);
  }
}

onMounted(() => {
  dmlData.onEmitEvents.push(dmlShare_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlShare_EventLsr);
});

function closeContextMenu(){
  rightClickMenu.value.close();
}

const showDmlContextMenu=(event)=>{
  let pasteTxt='';
  let isDone=false;
  if(navigator && navigator.clipboard){
    navigator.clipboard.readText().then(res=>{
      if(!isDone){
        isDone=true;
        pasteTxt=res;
        showDmlContextMenuEx(event, pasteTxt);
      }
    }).catch(() => {
      isDone=true;
      pasteTxt='$prompt';
      showDmlContextMenuEx(event, pasteTxt);
    });
    setTimeout(function(){
      if(!isDone){
        isDone=true;
        showDmlContextMenuEx(event, pasteTxt);
      }
    }, 100);
  } else {
    showDmlContextMenuEx(event, pasteTxt);
  }
}
const showDmlContextMenuEx=(event, pasteTxt)=>{
  let selTbC=dmlData.execCmd('getDmlSelectedTableCount');
  let selC=dmlData.execCmd('getDmlSelectedCount');

  let canPaste=false;  
  if(pasteTxt=='$prompt'){
    canPaste=true;
  }
  else if(pasteTxt && pasteTxt.substring(0,1)=='{'){
    let po=pasteTxt.indexOf('"RootName": "Tables"');
    if(po>=1 && po<100){
      canPaste=true;
    }
  }

   // 构建菜单
   dmlContextMenus.value = [{
      icon: markRaw(Edit),
      name: "对象属性",
      disabled: !selC,
      click: () => {
        let tb=dmlData.execCmd('getDmlSelectedTable');
        if(tb)
          showTableProp(tb);
        else {
          let lnk=dmlData.execCmd('getDmlSelectedLink');
          if(lnk)
            showLinkProp(lnk);
        }
      }
   }, {
      icon: markRaw(Plus),
      name: "新建表",
      click: () => {
         newTable();
      }
   }, {
      //icon: markRaw(CollectionTag),
      name: "添加文字",
      click: () => {
        newTable('TEXT');
      }
  //  }, {
  //     //icon: markRaw(Crop),
  //     name: "新建分组框",
  //     click: () => {
  //       newTable('GROUP');
  //     }
   }, {
      //icon: markRaw(Connection),
      name: "新建连接",
      disabled: !(selC==selTbC && selC==2),
      click: () => {
        _emitEvent('newLinkDialog');
      }
   }, {
      icon: markRaw(RefreshLeft),
      name: "重置大小和连线",
      disabled: !selC,
      click: () => {
        _execCmd('dmlResetShapes');
      }
   }, {
      //icon: markRaw(Brush),
      name: "设置实体颜色",
      disabled: !selTbC,
      click: () => {
        _emitEvent('showEntColorSelector');
      }
   }, {
      icon: markRaw(Close),
      name: "删除对象",
      disabled: !selC,
      click: () => {
         _emitEvent('deleteSelectedObjects');
      }
   }, {
      name: "复制",
      disabled: !selC,
      click: () => {
        let tbs=_execCmd('getDmlSelectedTableMetaList');
        if(tbs){
          let md={RootName: "Tables", Count:tbs.length, items:tbs};
          navigator.clipboard.writeText(JSON.stringify(md,null,2))
        }
      }
   }, {
      name: "粘贴",
      disabled: !canPaste,
      click: () => {
        pasteTbs(pasteTxt, false);
      }
  //  }, {
  //     name: "粘贴为副本",
  //     disabled: !canPaste,
  //     click: () => {
  //       pasteTbs(pasteTxt, true);
  //     }
   }, {
      name: "全选",
      click: () => {
        _execCmd('dmlSelectAll');
      }
   }];
   // 打开右键菜单
   nextTick(()=>{
    rightClickMenu.value.open(event);
   });
}

function pasteTbs(pasteTxt, asCopies){
  if(pasteTxt=='$prompt'){
    ElMessageBox.prompt('请将内容粘贴到这里：', asCopies?'粘贴为副本':'粘贴', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'textarea',
      inputValue: ''
    })
      .then(({ value }) => {
        pasteTbsEx(value, asCopies)
      })
      .catch(() => {
      })
  } else {
    pasteTbsEx(pasteTxt, asCopies)
  }
}
function pasteTbsEx(pasteTxt, asCopies){
  let res=pasteTxt;
  if(res.substring(0,1)=='{'){
    let po=res.indexOf('"RootName": "Tables"');
    if(po>=1 && po<100){
      let md=JSON.parse(res);
      _execCmd('pasteDmlTables',md,asCopies);
    }
  }
}

const newTable=(tp)=>{
  _emitEvent('newTableDialog', tp);
}

function showTableProp(tb){
  _emitEvent('showTablePropDialog', tb);
}

function showLinkProp(lnk){
  _emitEvent('showLinkPropDialog', lnk);
}


const showDmlTreeContextMenu=(data, event)=>{
  let nType=data.NodeType;
   // 构建菜单
  dmlContextMenus.value = [{
      icon: markRaw(Plus),
      name: "新建模型",
      disabled: nType!='model',
      click: () => {
        newModel(data);
      }
   }, {
      name: "重命名模型",
      disabled: nType!='model',
      click: () => {
        renameModel(data);
      }
   }, {
      icon: markRaw(Close),
      name: "删除模型",
      disabled: nType!='model',
      click: () => {
        removeModel(data);
      }
   }, {
    icon: markRaw(Edit),
      name: "对象属性",
      disabled: nType!='table',
      click: () => {
        showTableProp(data.UserData);
      }
   }
  ];
   // 打开右键菜单
   nextTick(()=>{
    rightClickMenu.value.open(event);
   });

}

function renameModel(data){
  ElMessageBox.prompt('输入新名称', '重命名模型', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: data.Name
  })
  .then(({ value }) => {
    if(!value)
      return;
    if(value==data.Name)
      return;
    let md=data.UserData;
    let po=value.indexOf('(');
    if(po>0 && value.endsWith(')')){
      md.Caption=value.substring(po+1, value.length-1);
      md.Name=value.substring(0,po);
    } else{
      md.Name=value;
    }
    _emitEvent('modelChanged',md,null);
  })
  .catch(() => {
  });
}
function removeModel(data){
  ElMessageBox.confirm(
    '确定要删除模型 '+data.Name+'?',
    '删除模型',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    let md=data.UserData;
    let idx=-1;
    dmlData.content.items.some((m,index)=>{
      if(m==md){
        idx=index;
        return true;
      }
    });
    if(idx>=0){
      dmlData.content.items.splice(idx,1);
      if(dmlData.curModelName==md.Name){
        if(dmlData.content.items.length>0){
          dmlData.curModelName=dmlData.content.items[0].Name;
        } else {
          dmlData.curModelName='';
        }
      }
      _emitEvent('modelDeleted',md,null);
    }
  })
  .catch(()=>{});
}


const newModel=()=>{
  ElMessageBox.prompt('输入新模型名：', '新建模型', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: '模型_'+(dmlData.content.items.length+1)
  })
    .then(({ value }) => {
      newModelEx(value);
    })
    .catch(() => {
    })
}
const newModelEx=(name)=>{
  let md=cloneMap({
    "Name": "模型",
    "Tables": {"items": []}
  });
  dmlData.content.items.push(md);
  md.Name=name;
  _emitEvent('newModel', md,null);
  dmlData.curModelName=md.Name;
}

</script>
  
<style scoped>

</style>
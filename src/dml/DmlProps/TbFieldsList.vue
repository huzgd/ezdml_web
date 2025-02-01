<template>
  <div style="margin: 5px 0 8px 0;">
    <span>字段: 共{{metaFields.length}}个&nbsp;&nbsp;</span>
    <el-button-group>
      <el-button size="small" @click="newField">添加</el-button>
      <el-button size="small" @click="editField" :disabled="!currentRow">编辑</el-button>
      <el-button size="small" @click="delFields" :disabled="selectedRows.length==0">删除</el-button>
      <el-button size="small" @click="moveUp" :disabled="selectedRows.length==0">上移</el-button>
      <el-button size="small" @click="moveDn" :disabled="selectedRows.length==0">下移</el-button>
    </el-button-group>
    
  </div>
  <div ref="tbDivRef">
  <el-table
    :data="metaFields"
    border
    stripe
    ref="tableRef"
    :max-height="maxGridHeight"
    :highlight-current-row="true"
    :header-cell-style="{padding: '2px'}"
    :cell-style="{padding: '0'}"
    :scrollbar-always-on="true"
    :row-class-name="tableRowClassName"
    @cell-dblclick="handleCellDblClick"
    @cell-click="handleCellClick"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    @header-click="handelHeaderClick"
    style="--el-table-current-row-bg-color: #d9ecff;--el-table-row-hover-bg-color:#ecf5ff;"
    >
    <el-table-column
      type="selection"
      width="40"
      class-name="sel-col">
    </el-table-column>

    <el-table-column
      width="40"
      class-name="icon-col">
      <template #default="scope">
        <div class="field-icon" :style="{'background-position': getIcoPosition(scope.row)}"/>
      </template>
    </el-table-column>

    <el-table-column
      prop="Name"
      label="名称"
      min-width="160" >
      <template #default="scope">
        <input class="pcell_input" v-model="scope.row.Name"/>
        <div class="pcell_txt">{{scope.row.Name}}</div>
      </template>
    </el-table-column>

    <el-table-column
      prop="DisplayName"
      label="显示名称"
      min-width="200" >
      <template #default="scope">
        <input class="pcell_input" v-model="scope.row.DisplayName"/>
        <div class="pcell_txt">{{scope.row.DisplayName}}</div>
      </template>
    </el-table-column>

    <el-table-column
      prop="DataType"
      label="数据类型"
      min-width="120" >
      <template #default="scope">
        <select class="pcell_input" v-model="scope.row.DataType" filterable allow-create>
          <option v-for="(item,index) in DML_LogicTypeNamesCn" :value="index">{{item}}</option>
        </select>
        <div class="pcell_txt">{{DML_LogicTypeNamesCn[scope.row.DataType]}}</div>
      </template>
    </el-table-column>

    <el-table-column
      prop="DataSize"
      label="长度"
      min-width="90" >
      <template #default="scope">
        <input class="pcell_input" :value="getFieldLenStr(scope.row)" @change="event => onFieldLenStrChange(scope.row,event.target.value)"/>
        <div class="pcell_txt">{{getFieldLenStr(scope.row)}}</div>
      </template>
    </el-table-column>

    <el-table-column
      prop="_EZRESERVED_ConstraintDesc"
      label="约束"
      min-width="118" >
      <template #default="scope">
        <input class="pcell_input" v-model="scope.row._EZRESERVED_ConstraintDesc" list="_field_constrain_opts" @change="onFieldContraintChange(scope.row)"/>
        <div class="pcell_txt">{{scope.row._EZRESERVED_ConstraintDesc}}</div>
      </template>
    </el-table-column>

    <el-table-column
      prop="Memo"
      label="说明"
      min-width="219" >
      <template #default="scope">
        <input class="pcell_input" v-model="scope.row.Memo"/>
        <div class="pcell_txt">{{scope.row.Memo}}</div>
      </template>
    </el-table-column>

  </el-table>
  </div>
  <datalist id="_field_constrain_opts">
    <option value="非空"/>
    <option value="主键"/>
    <option value="外键"/>
    <option value="唯一索引"/>
    <option value="普通索引"/>
    <option value="缺省值:"/>
    <option value="主键,自增长"/>
    <option value="外键,普通索引"/>
  </datalist>
  <FieldPropDialog ref="refFieldPropDlg" :dmlData="dmlData" :metaTable="metaTable" :metaField="curPropField"/>
</template>

<script setup>

import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs} from 'vue'
import {newFieldTmpl} from '../Templates/NewTable.js'
import {cloneMap} from '../DmlData'
import FieldPropDialog from './FieldPropDialog.vue'
import {callDmlMetaObjCmd, DML_LogicTypeNamesCn} from '../DmlGraph/DmlObjs'
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

const dmlData=props.dmlData;

const tableRef=ref(null);
const tbDivRef=ref(null);
const maxGridHeight=ref(200);
const selectedRows=ref([]);
const metaFields=ref([]);
const curPropField=ref(null);
const refFieldPropDlg=ref(null);

const currentRow = ref(null);
const handleCurrentChange = (val) => {
  currentRow.value = val
}

onMounted(()=>{
  if(props.metaTable && props.metaTable.MetaFields && props.metaTable.MetaFields.items){
    setTimeout(()=>{
      if(props.metaTable._EZRESERVED_FOCUS_FIELD && tableRef.value){
        let ff=props.metaTable._EZRESERVED_FOCUS_FIELD;
        props.metaTable.MetaFields.items.some((fd,index)=>{
          if(fd.Name==ff){
            tableRef.value.setCurrentRow(fd);
            let mc=5;
            if(tbDivRef.value){
              let h=tbDivRef.value.offsetHeight;
              if(h>100)
                mc=(h-50)/25;
            }
            if(index>=mc){
              tableRef.value.setScrollTop((index-mc+1)*25);
            }
            return true;
          }
        });
      }
    }, 200)
  }
})

const getFieldLenStr=(field)=>{
  if(!field) return '';
  var res='';
  if(field.DataLength>0){
    if(field.DataScale>0)
      return field.DataLength+','+field.DataScale;
    else
      return field.DataLength+'';
  } else
    return '';
}

const genFieldConstraintDescs=()=>{
  callDmlMetaObjCmd(props.metaTable, 'GenFieldConstraintDescs');
}
const onFieldContraintChange=(field)=>{
  if(field._EZRESERVED_ConstraintDesc=='缺省值:')
    return;
  callDmlMetaObjCmd(props.metaTable,'SetFieldConstraintDesc',field.Name,field._EZRESERVED_ConstraintDesc);
}
const onFieldLenStrChange=(field,val)=>{
  val=val.trim();
  if(val===''){
    field.DataLength=0;
    field.DataScale=0;
    return;
  }
  let po=val.indexOf(',');
  if(po>0){
    let s=val.substring(po+1).trim();
    val=val.substring(0,po).trim();
    if(s)
    field.DataScale=parseInt(s);
    field.DataLength=parseInt(val);
  } else {
    field.DataLength=parseInt(val);
    field.DataScale=0;
  }
}

const checkMetaFields=()=>{
  if(props.metaTable && props.metaTable.MetaFields && props.metaTable.MetaFields.items)
    metaFields.value=props.metaTable.MetaFields.items;
  else
    metaFields.value=[];
  
  if(dmlData && dmlData.execCmd){
    let sz=dmlData.execCmd('getDmlCanvasSize');
    if(sz)
      maxGridHeight.value=Math.round((sz[1]-200-60)*3/4);
    if(maxGridHeight.value<200)
      maxGridHeight.value=200;
  }

  genFieldConstraintDescs();
}
checkMetaFields();
watch(()=>props.metaTable, checkMetaFields);


const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if(!row)
    return '';
  if (row.KeyFieldType == 1) {
    return 'ctrow-pk'
  } else if (row.KeyFieldType === 3) {
    return 'ctrow-fk'
  } else if (row.FieldWeight && row.FieldWeight<=-9) {
    return 'ctrow-hidden'
  } else if (row.FieldWeight && row.FieldWeight<0) {
    return 'ctrow-gray'
  } else if (row.FieldWeight && row.FieldWeight>0) {
    return 'ctrow-bold'
  }
  return 'ctrow-normal'
}

const getIcoPosition=(row)=>{
  if(!row)
    return '0 0';
  let st=0;
  let idx=0;
  if(row.FieldWeight && row.FieldWeight<0){
    st+=20;
  }
  if(row.FieldWeight && row.FieldWeight<=-9){
    idx=st+15;
  } else if(row.KeyFieldType == 1)
    idx=st+1;
  else {
    let icos=[0,3,2,6,7,8,5,9,10,11,12,13,14,15];
    idx=st+icos[row.DataType];
  }
  let y=-idx*16;
  return '0 '+y+'px';
}


var lastClickRow=null;
var lastCell=null;
var editMode=true;
function hideEditor(){
  if(lastCell){
    lastCell.querySelector('.pcell_input').style.display = 'none'
    lastCell.querySelector('.pcell_txt').style.display = 'block'
  }
}
const handleCellDblClick= (row, column, cell, event) => {
  if(column.className=="icon-col"){
    curPropField.value=row;
    if(refFieldPropDlg.value)
      refFieldPropDlg.value.showDialog();
    return;
  }
  editMode=true;
  handleCellClick(row, column, cell, event);
}

const handleCellClick= (row, column, cell, event) => {
  lastClickRow=row;
  
  if(!editMode)
    return;
  if(lastCell){
    if(lastCell==cell)
      return;
    lastCell.querySelector('.pcell_input').style.display = 'none'
    lastCell.querySelector('.pcell_txt').style.display = 'block'
  }

  if (column.property) {
    let el=cell.querySelector('.pcell_input');
    el.style.display = 'block';
    if(el.focus)
      el.focus();

    cell.querySelector('.pcell_txt').style.display = 'none'
    lastCell=cell;
  }
};

const handelHeaderClick=(col, evt)=>{
  if(col.className=='icon-col'){
  }
}

const handleSelectionChange=(rows)=>{
  selectedRows.value=rows;
}
const getRowIndex=(row)=>{
  let res=-1;
  if(row){
    metaFields.value.some((fd,index)=>{
      if(fd==row){
        res=index;
        return;
      }
    })
  }
  return res;
}
const newField=()=>{
  hideEditor();
  let fd=cloneMap(newFieldTmpl);
  let idx=getRowIndex(lastClickRow);
  if(idx>=0 && idx<metaFields.value.length-1){
    metaFields.value.splice(idx+1,0,fd);
    idx++;
  }
  else{
    metaFields.value.push(fd);
    idx=metaFields.value.length-1;
  }
  lastClickRow=metaFields.value[idx];
  fd.Name=fd.Name+'_'+metaFields.value.length;
  if(fd.DisplayName)
    fd.DisplayName=fd.DisplayName+'_'+metaFields.value.length;
}

const editField=()=>{
  hideEditor();
  if(!currentRow.value)
    return;
  let sel=currentRow.value;
  let idx=getRowIndex(sel);
  curPropField.value=metaFields.value[idx];
  if(refFieldPropDlg.value)
    refFieldPropDlg.value.showDialog();
}

const delFields=()=>{
  hideEditor();
  let len=selectedRows.value.length;
  if(len==0)
    return;
  ElMessageBox.confirm(
    '确定要删除选定的'+len+'个字段?',
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    delFieldsEx();
    })
    .catch(()=>{});
}
const delFieldsEx=()=>{
  let sels=selectedRows.value;
  for(var i=sels.length-1;i>=0;i--){
    if(currentRow.value && currentRow.value.Name==sels[i].Name)
      currentRow.value=null;
    let idx=getRowIndex(sels[i]);
    if(idx>=0){
      metaFields.value.splice(idx,1);
    }
  }
}

const moveUp=()=>{
  hideEditor();
  let sels=selectedRows.value;
  if(sels.length==0)
    return;
  let idxs=[];
  for(var i=sels.length-1;i>=0;i--){
    let idx=getRowIndex(sels[i]);
    if(idx>=0){
      idxs.push(idx);
    }
  }
  idxs.sort(function(a,b){
    return a-b;
  });

  if(idxs[0]==0)
    return;

  let fds=metaFields.value;
  for(var i=0;i<idxs.length;i++){
    let idx=idxs[i];
    let fd=fds[idx];
    fds.splice(idx,1);
    fds.splice(idx-1,0,fd);
  }
}

const moveDn=()=>{
  hideEditor();
  let sels=selectedRows.value;
  if(sels.length==0)
    return;
  let idxs=[];
  for(var i=sels.length-1;i>=0;i--){
    let idx=getRowIndex(sels[i]);
    if(idx>=0){
      idxs.push(idx);
    }
  }
  idxs.sort(function(a,b){
    return a-b;
  });

  let fds=metaFields.value;
  if(idxs[idxs.length-1]==fds.length-1)
    return;

  for(var i=idxs.length-1;i>=0;i--){
    let idx=idxs[i];
    let fd=fds[idx];
    fds.splice(idx,1);
    fds.splice(idx+1,0,fd);
  }
}

</script>

<style scoped>
  .pcell_input{
    display: none;
    border:none;
    outline:none;
    width: 100%;
  }
  .pcell_txt{
    padding: 0 2px;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .ctrow-pk .pcell_txt{
    color: fuchsia;
  }
  .ctrow-fk .pcell_txt{
    color: blue;
  }
  .ctrow-hidden .pcell_txt{
    color: silver;
  }
  .ctrow-gray .pcell_txt{
    color: gray;
  }
  .ctrow-bold .pcell_txt{
    font-weight: bold;
  }
  .ctrow-normal .pcell_txt{
    color: black;
  }

  .field-icon{
    width:16px;
    height:16px;
    background: url("@/assets/images/field_icos.png")
  }
  :deep(.icon-col .cell){
    text-overflow: clip!important;
  }
</style>



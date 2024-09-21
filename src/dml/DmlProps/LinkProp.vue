<template>  
    <el-form>
    <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item
            label="主表" > 
            <el-input v-model="linkInfo.MasterMetaTable.Name" readonly>
            </el-input>
        </el-form-item>

        <el-form-item
            label="主键" > 
            <el-select v-if="linkInfo.LinkType==1 || linkInfo.LinkType==2" v-model="linkInfo.MasterField" >
                <el-option v-for="item in linkInfo.MasterMetaTable.MetaFields.items" :label="getFieldNameCap(item)" :value="item.Name"></el-option>
            </el-select>
            <el-input v-else disabled>
            </el-input>
        </el-form-item>
        
        <el-form-item
            label="类型" > 
            <el-select v-model="linkInfo.LinkType" >
            <el-option label="外键(一对多)" v-if="!isOneToOne()" :value="1"></el-option>
            <el-option label="外键(一对一)" v-if="isOneToOne()" :value="2"></el-option>
            <el-option label="连线" :value="0"></el-option>
            <el-option label="方向" :value="3"></el-option>
            <el-option label="反向" :value="4"></el-option>
            </el-select>
        </el-form-item>

    </el-col>

    
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item
            label="从表" > 
            <el-input v-model="linkInfo.SlaveMetaTable.Name" readonly>
            </el-input>
        </el-form-item>

        <el-form-item
            v-if="!linkInfo.CreateNewField"
            label="字段" > 
            <el-select v-model="linkInfo.SlaveField" @change="checkFKType">
                <el-option v-for="item in linkInfo.SlaveMetaTable.MetaFields.items" :label="getFieldNameCap(item)" :value="item.Name"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            v-if="linkInfo.CreateNewField"
            label="字段" > 
            <el-input v-model="linkInfo.NewSlaveField" autocomplete="off" clearable>
            </el-input>
        </el-form-item>

        <el-form-item
            label="创建新字段" > 
            <el-checkbox v-model="linkInfo.CreateNewField" @change="checkFKType"></el-checkbox>
        </el-form-item>

    </el-col>
</el-row>

    </el-form>
  </template> 
  
<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs} from 'vue'
  /*
  LinkProp
------------------------
MasterTable     String
MasterField     String
SlaveTable      String
SlaveField      String
CreateNewField  Bool
LinkType        Integer
*/
  
const props=defineProps({
  dmlData: {
    type: Object
  },
  linkInfo: {
    type: Object
  },
});

const linkInfo=ref(props.linkInfo);

const getFieldNameCap=(field)=>{
    if(field.DisplayName && field.DisplayName != field.Name)
        return field.Name+'('+field.DisplayName+')';
    else
        return field.Name;
}

const isOneToOne=()=>{
    if(!linkInfo.value.CreateNewField && linkInfo.value.SlaveField){
        let fd=null;
        linkInfo.value.SlaveMetaTable.MetaFields.items.some(f=>{
            if(f.Name==linkInfo.value.SlaveField){
                fd=f;
                return true;
            }
        });
        if(fd)
            if(fd.IndexType==1 || fd.KeyFieldType==1)
                return true;
    }
    return false;
}

const checkFKType=()=>{
    if(isOneToOne()){
        if(linkInfo.value.LinkType==1)
            linkInfo.value.LinkType=2;
    } else {
        if(linkInfo.value.LinkType==2)
            linkInfo.value.LinkType=1;
    }
}
</script>
  
  <style>
  </style>
  
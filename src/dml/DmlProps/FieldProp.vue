<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="字段定义" name="fieldProp">
      <el-form label-width="80">
        <el-row>
          <el-col :xs="24" :sm="12">
            <el-form-item label="字段名">
              <el-input v-model="metaField.Name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="逻辑名">
              <el-input v-model="metaField.DisplayName" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="注释说明">
              <el-input v-model="metaField.Memo" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"/>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="border-top:1px solid #dcdfe6">
          <el-row style="margin-top: 20px;">
            <el-col :xs="24" :sm="12">
              <el-form-item label="数据类型">
                <el-select v-model="metaField.DataType">
                  <el-option v-for="(item,index) in DML_LogicTypeNamesCn" :value="index" :label="item"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="类型名称">
                <el-input v-model="metaField.DataTypeName" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="字段类别">
                <el-select v-model="metaField.KeyFieldType">
                  <el-option v-for="(item,index) in DML_KeyTypeNamesCn" :value="index" :label="item"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="长度精度">
                <el-input :value="getDataLenScale(metaField)" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="缺省值">
                <el-input v-model="metaField.DefaultValue" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="">
                <el-checkbox label="可为空" v-model="fd_Nullable" />
                <el-checkbox label="自增长" v-model="fd_IsAutoInc" style="margin-left: 30px;"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        
        <div style="border-top:1px solid #dcdfe6">
          <el-row style="margin-top: 20px;">
            <el-col :xs="24" :sm="12">
              <el-form-item label="索引类型">
                <el-select v-model="metaField.IndexType">
                  <el-option :value="0" label="无索引"/>
                  <el-option :value="1" label="唯一索引"/>
                  <el-option :value="2" label="普通索引"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="索引字段">
                <el-input v-model="metaField.IndexFields" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="关联表">
                <el-input v-model="metaField.RelateTable" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="关联字段">
                <el-input v-model="metaField.RelateField" />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="检查约束">
                <el-input type="textarea" v-model="metaField.DBCheck" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="设计说明">
                <el-input type="textarea" v-model="metaField.DesignNotes" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="字段权重">
                <el-select v-model="metaField.FieldWeight" style="width: 180px;">
                  <el-option :value="1" label="高"/>
                  <el-option :value="0" label="正常"/>
                  <el-option :value="-1" label="低"/>
                  <el-option :value="-9" label="隐藏"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="">
                <el-checkbox label="是否事实指标度量" v-model="metaField.IsFactMeasure" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
  
  
<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs, defineExpose, computed } from 'vue'
import { cloneMap } from '../DmlData'
import { DML_LogicTypeNamesCn, DML_KeyTypeNamesCn, DEF_VAL_auto_increment} from '../DmlGraph/DmlObjs'
  
const activeTab=ref('fieldProp');

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

const getDataLenScale=(fd)=>{
  if(!fd.DataLength || fd.DataLength<=0)
    return '';
  let res=fd.DataLength+'';
  if(!fd.DataScale || fd.DataScale<=0)
    return res;
  return res+','+fd.DataScale;
};

const fd_Nullable = computed({
  get() {
    if(props.metaField.Not_Nullable)
      return false;
    else
      return true;
  },
  set(newValue) {
    if(newValue) props.metaField.Not_Nullable=false;
    else props.metaField.Not_Nullable=true;
  }
});

const fd_IsAutoInc = computed({
  get() {
    let mm=props.metaField.DefaultValue;
    if(!mm) return false;
    else if(mm.trim()==DEF_VAL_auto_increment)
      return true;
    else
      return false;
  },
  set(newValue) {
    if(newValue) props.metaField.DefaultValue=DEF_VAL_auto_increment;
    else if(props.metaField.DefaultValue && props.metaField.DefaultValue.trim()==DEF_VAL_auto_increment)
      props.metaField.DefaultValue='';
  }
});

</script>

<style scoped>
.el-form-item{
  margin-bottom:12px;
}
</style>
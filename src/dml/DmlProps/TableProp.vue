<template>
  <el-tabs v-model="activeTabName">

    <el-tab-pane v-if="tbType=='TABLE'" label="表设计" name="tableProp">
      <el-form label-width="auto">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item label="表名">
              <el-input v-model="metaTable.Name" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item label="逻辑名">
              <el-input v-model="metaTable.Caption" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="注释">
              <el-input v-model="metaTable.Memo" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <TbFieldsList :dmlData="dmlData" :metaTable="metaTable"/>
    </el-tab-pane>
    
    <el-tab-pane v-if="tbType=='TABLE'" label="描述" name="tableDesc">
      <TableDesc ref="tbDesc" :dmlData="dmlData" :metaTable="metaTable"/>
    </el-tab-pane>

    <el-tab-pane v-if="tbType=='TABLE'" label="生成" name="tableGen">
      <TableGen ref="tbGen" :dmlData="dmlData" :metaTable="metaTable"/>
    </el-tab-pane>

    <el-tab-pane v-if="tbType=='TEXT' || tbType=='GROUP'" :label="tbTypeCnName" name="textProp">
      <el-form label-width="auto">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="表名">
              <el-input v-model="metaTable.Name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="逻辑名">
              <el-input v-model="metaTable.Caption" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="metaTable.Memo" :autosize="{ minRows: 8, maxRows: 24 }" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    
  </el-tabs>
</template>


<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs} from 'vue'
import TbFieldsList from './TbFieldsList.vue'
import TableDesc from './TableDesc.vue';
import TableGen from './TableGen.vue';

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
});

const activeTabName=ref('tableProp');
const tbType=ref('TABLE');
const tbTypeCnName=ref('表');

if(props.metaTable.TypeName)
  tbType.value=props.metaTable.TypeName;
if(tbType.value=='TEXT'){
  activeTabName.value='textProp';
  tbTypeCnName.value='文字';
}
if(tbType.value=='GROUP'){
  activeTabName.value='textProp';
  tbTypeCnName.value='分组';
}

const tbDesc=ref(null);
const tbGen=ref(null);
watch(()=>activeTabName.value,(newVal,oldVal)=>{
  if(newVal=='tableDesc'){
    if(tbDesc.value)
      tbDesc.value.checkRefreshDescTable();
  }
  if(newVal=='tableGen'){
    if(tbGen.value)
      tbGen.value.checkRefreshGenTable();
  }
})

</script>

<style scoped>
</style>

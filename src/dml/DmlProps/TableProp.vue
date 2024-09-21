<template>
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
    <el-form-item label="注释">
      <el-input v-if="metaTable.TypeName=='TABLE' || !metaTable.TypeName" v-model="metaTable.Memo" type="textarea" />
      <el-input v-else type="textarea" v-model="metaTable.Memo" :autosize="{ minRows: 8, maxRows: 24 }" />
    </el-form-item>
  </el-form>
  
  <template v-if="metaTable.TypeName=='TABLE' || !metaTable.TypeName">
    <TbFieldsList :dmlData="dmlData" :metaTable="metaTable"/>
  </template>
</template>


<script setup>
import {reactive, shallowReactive, watch, ref, onMounted, nextTick, useAttrs} from 'vue'
import TbFieldsList from './TbFieldsList.vue'

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

</script>

<style scoped>
</style>

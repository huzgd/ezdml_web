<template>
  
  <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
    
    <el-input
      v-if="!dmlData.maximizeMode"
      v-model="dmlData.searchText"
      class="dml-search-input"
      :style="{width: (dmlData.leftAsideWidth-4)+'px'}"
      placeholder="搜索"
      :prefix-icon="Search"
      clearable
    />
    
    <template v-if="dmlData.mobilePhoneMode">
      <el-dropdown>
        <el-button  :icon="Fold" ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dmlData.maximizeMode=!dmlData.maximizeMode">{{dmlData.maximizeMode?'显示列表':'隐藏列表'}}</el-dropdown-item>
            <el-dropdown style="width: 100%;" >
              <span class="el-dropdown-menu__item" style="width: 100%;">打开</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="_execCmd('menu_action','loadFile')">本地磁盘文件</el-dropdown-item>
                  <el-dropdown-item @click="_execCmd('menu_action','onlineFiles')">在线文件</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown style="width: 100%;">
              <span class="el-dropdown-menu__item" style="width: 100%;">保存</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="_execCmd('menu_action','saveFile')">本地磁盘文件</el-dropdown-item>
                  <el-dropdown-item @click="_execCmd('menu_action','onlineFiles',true)">在线文件</el-dropdown-item>
                  <el-dropdown-item @click="_execCmd('menu_action','exportImage')">保存图像</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown-item @click="_execCmd('menu_action','shareModels')">分享</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('toogleShowPhyField')" :divided="true">切换视图</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('bestFitOrReset')">缩放至全部/复原</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','showSelectedProp')" :disabled="!dmlData.selectedCount">对象属性</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','newFile')">清空</el-dropdown-item>
            <el-dropdown-item @click="showHelp" :divide="true">操作说明</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','openEzdmlHome')">打开EZDML首页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button :icon="ZoomIn" @click="_execCmd('zoomIn')" style="margin-left: 2px;"  />
      <el-button :icon="ZoomOut" @click="_execCmd('zoomOut')" style="margin-left: 2px;"  />
    </template>
    <template v-else>
      
      <el-dropdown>
        <el-button :icon="FolderOpened">打开</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="_execCmd('menu_action','loadFile')">本地磁盘文件</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','onlineFiles')">在线文件</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <el-button :icon="Suitcase">保存</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="_execCmd('menu_action','saveFile')">本地磁盘文件</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','onlineFiles',true)">在线文件</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','exportImage')">保存图像</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button @click="_execCmd('menu_action','shareModels')" :icon="Share" style="margin-left:0px">分享</el-button>

      <el-button-group style="margin-left:8px">
        <el-button :icon="ZoomIn" @click="_execCmd('zoomIn')"/>
        <el-button :icon="ZoomOut" @click="_execCmd('zoomOut')"/>
      </el-button-group>

    </template>
    
    <el-color-picker ref="entColorPicker" v-model="selEntColor" :predefine="predefineEntColors" style="visibility: hidden;" @change="entColorChange"/>

    <div class="flex-grow" />
    <el-link v-if="dmlData.maximizeMode || !dmlData.mobilePhoneMode" style="word-break:break-all;">&nbsp;{{dmlData.fileName}}</el-link>
    
    <el-dropdown  style="margin-left:8px" v-if="!dmlData.mobilePhoneMode">
        <img
          style="width: 32px;height:32px"
          :src="gDmlLogoSrc"
          alt="logo"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dmlData.maximizeMode=!dmlData.maximizeMode">{{dmlData.maximizeMode?'显示列表':'隐藏列表'}}</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('toogleShowPhyField')" >切换视图</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('bestFitOrReset')">缩放至全部/复原</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','newFile')">清空</el-dropdown-item>
            <el-dropdown-item @click="showHelp" :divide="true">操作说明</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','openEzdmlDownload')">下载EZDML桌面版</el-dropdown-item>
            <el-dropdown-item @click="_execCmd('menu_action','openEzdmlHome')">打开EZDML首页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

  </el-menu>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, useAttrs, watch, nextTick } from 'vue'
import {gDmlLogoSrc} from '../DmlData/DmlIcons'
import { Search, Fold, ZoomIn, ZoomOut,FolderOpened,Suitcase,Share,View} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const dmlData = useAttrs()['dmlData'] || {};

const _execCmd=(cmd,par1,par2)=>{
  return dmlData.execCmd(cmd,par1,par2);
}


const entColorPicker=ref(null);
const selEntColor=ref('');
const predefineEntColors = ref([
  '#ffcccc',
  '#ffe6d9',
  '#ffffcc',
  '#ccffcc',
  '#ccffff',
  '#ccccff',
  '#ffccff',
  '#e6e6e6',
  '#aaffaa',
  '#ffaaff',

  '#ffeeee',
  '#fff7f0',
  '#ffffee',
  '#eeffee',
  '#eeffff',
  '#eeeeff',
  '#ffeeff',
  '#f6f6f6',
  '#aaaaff',
  '#ffaaaa',
]);
 
const entColorChange=(value)=>{
  dmlData.execCmd('setDmlSelectedTableColor', value);
}

const setEntColor=()=>{
  let tb=dmlData.execCmd('getDmlSelectedTable');
  if(!tb)
    return;
  selEntColor.value=dmlData.execCmd('getDmlSelectedTableColor');
  entColorPicker.value.show();
}



onMounted(() => {
  dmlData.onEmitEvents.push(dmlShare_EventLsr);
});

onBeforeUnmount(()=>{
  dmlData.execCmd('removeEventHandler', dmlShare_EventLsr);
});

const dmlShare_EventLsr=(evt,par1,par2)=>{
  if(evt=='showEntColorSelector'){
    setEntColor();
  }
}

function showHelp(){
  ElMessageBox.alert('模型图中可按加减号放大缩小，方向键平移，R复原，F居中，按住CTRL键时可用鼠标滚轮缩放，可以拉框选择，双击空白处自动全图缩放，直接拖空白处或按住ALT键拖动平移', '操作提示', {type:'info'});
}

</script>
  
<style scoped>

.flex-grow {
  flex-grow: 1;
}

.dml-search-input{
 height: 31px;
 margin:1px 6px 0 0;
}

.el-menu--horizontal {
    height: 36px;
}
.el-menu--horizontal.el-menu{
  border-bottom:none;
}

</style>
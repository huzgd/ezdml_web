<template>
    <!-- 右键菜单 -->
    <div class="rightMenu" v-show="showMenu">
        <ul>
            <li v-for="(menu, index) in menus" @click="doItemClick(menu)" :key="index" :style="{color:menu.disabled?'#bbbbbb':''}">
                <el-icon>
                    <component :is="menu.icon" />
                </el-icon>
                <span class="menu-cap">
                    {{ menu.name }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup name="RightClickMenu">
import { ref, defineExpose } from "vue";
// 接收菜单信息
const props = defineProps({
    menus: {
        type: Object,
        default: [],
    }
})
const showMenu = ref(false);
function doItemClick(menu){
    if(!menu.disabled)
        if(menu.click){
            menu.click();
        }
}
// 关闭菜单
function close() {
    showMenu.value = false
}
// 打开菜单和显示位置
function open(event) {
    // 阻止系统默认行为
    event.preventDefault();
    // 先关闭
    showMenu.value = false;
    // 显示位置
    let menu = document.querySelector('.rightMenu');
    
    // 计算菜单宽高
    var mh=36*props.menus.length-4;
    var mw=144;
    var ww=window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    var wh=window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    var ex=event.clientX;
    var ey=event.clientY;

    if(ex>ww-mw) ex=ww-mw;
    if(ey>wh-mh) ey=ey-mh;
    if(ex<0) ex=0;
    if(ey<0) ey=0;

    menu.style.left = ex + 'px';
    menu.style.top = ey + 'px';
    // 显示
    showMenu.value = true;
    // 注册点击侦听事件
    document.addEventListener('click', close, {once:true});
}
// 暴露方法
defineExpose({ open, close });
</script>

<style scoped>
.rightMenu {
    position: fixed;
    z-index: 99999999;
    cursor: pointer;
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 2px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #606266;
    font-size: 14px;
    background: #fff;
}

.rightMenu ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border-radius: 6px;
}

.rightMenu ul li {
    padding: 6px 10px;
    border-bottom: 1px solid #efefef;
    box-sizing: border-box;
    /*display: flex;*/
    align-items: center;
    justify-content: space-around;
    white-space:nowrap;
    text-overflow: ellipsis;
}

.rightMenu ul li:last-child {
    border: none;
}

.rightMenu ul li:hover {
    transition: all 0.5s;
    background: #EBEEF5;
    
}
.rightMenu ul li:hover {
    transition: all 0.5s;
    background: #EBEEF5;
}

.rightMenu ul li:first-child {
    border-radius: 6px 6px 0 0;
}
.rightMenu ul li:last-child {
    border-radius: 0 0 6px 6px;
}
.menu-cap {
   margin-left: 10px;
}
</style>

<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo navmenu" mode="horizontal" @select="handleSelect" router>
            <el-menu-item :index="menuItem.url" v-for='(menuItem,i) in mainMenu' :key="i">{{menuItem.name}}</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import {route} from "../../api/getData-yhj"
export default {
    data() {
        return {
            activeIndex: '',
            activeIndex2: '',
            changeMenu:false,
            mainMenu: []
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        selectMenu(){
            this.changeMenu=!this.changeMenu;
        }
    },
    mounted(){
    },
    created(){
        //一级路由的状态 主数据库和价格库正在建设中。。。。。。
        if(this.$route.matched[1].path=='/database/:building'){
            this.activeIndex = '/database/false'
        }else if(this.$route.matched[1].path=='/pricelib/:isRoot'){
            this.activeIndex = '/pricelib/false';
        }else{
            this.activeIndex = this.$route.matched[1].path;
        }
        route().then((routes)=>{
           this.mainMenu =  routes.data.list;
        })
    }

}
</script>

<style scoped>
.navbar .el-menu {
    background-color: #648fd4;
}

.navbar .el-menu .el-menu-item {
    color: #fff;
    border-right: 1px solid #5f88c9
}

.navbar .is-active {
    background-color: #6495f2;
    font-size: 16px;
}

.navbar .el-menu-item:hover {
    background-color: #6495f2
}
</style>

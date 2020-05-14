<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="https://tvax1.sinaimg.cn/crop.0.0.1328.1328.180/9d02d005ly8foj9m9h378j210w10w775.jpg?KID=imgbed,tva&Expires=1588606951&ssig=1YHH9ivD2C"
        />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="‘info’" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 动态绑定背景的width宽度 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <!-- <div class="toogle-button" @click="toggleCollapse">=</div> -->
        <!-- unique-opened另外的绑定方法：   :unique-opened='true' -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <!-- 这里动态绑定一个index，指定模板，同时index必须接受字符串，所以要加个空字符串 -->
          <el-submenu :index="item.id + ' ' " v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!-- 这里利用每一个循环都有一个自己的id的现象，在data中写好icon的名字，就可以这样绑定啦 -->
              <i :class="iconList[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="subItem.id + ' '"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <input
          type="button"
          class="toogle-button"
          @click="toggleCollapse"
          :value="isCollapse ? '>' : '<'"
        />
      </el-aside>
      <!-- 右侧 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconList: {
        // 对应后台数据每个id的值
        125: ' iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠的布尔值
      isCollapse: false
    }
  },
  created: function() {
    this.getMenuList()
  },
  methods: {
    logout: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menulist = res.data
      console.log(res)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 这个使得退出按钮居中
  color: whitesmoke;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    > span {
      margin-left: 15px;
    }
    > img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    // 解决右边交界处不对齐
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toogle-button {
  border: 0;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  margin-left: 20px;
}
</style>

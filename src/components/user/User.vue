<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- elementUI 每一个标签都是对应的 class， -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 保存请求获取到的数据
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // getUserList() {
    //   this.$http.get('user', { params: this.queryInfo })
    // }
    // 为了简化操作，所以使用async,await，用到await，就会有一个对象，所以使用解构赋值接收
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        //   请求的路径 users 在后台定义
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.userlist
      this.total = res.data.total
      console.log(res)
    }
  }
}
</script>

<style lang='less' scoped>
</style>

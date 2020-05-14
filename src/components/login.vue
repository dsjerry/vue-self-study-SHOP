<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- name -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度要在3到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 6, max: 15, message: '长度要在6到15之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return 0
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          console.log(res)
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功!')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: darkcyan;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avator_box {
    height: 130px;
    width: 130px;
    border: 2px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: o o 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    // 百分比是根据 avator_box 的尺寸取得
    background-color: aliceblue;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

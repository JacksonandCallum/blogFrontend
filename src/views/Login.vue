<template>
  <div class="container">
    <div style="width: 390px; padding: 50px 30px; background-color: white; border-radius: 5px; opacity: 0.9;">
      <div style="text-align: center; font-size: 24px; margin-bottom: 30px; color: #333">欢迎使用</div>
      <el-form :model="admin" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input size="medium" prefix-icon="el-icon-user" placeholder="请输入账号" v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password
            v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex;">
            <el-input style="flex: 1;" size="medium" v-model="code"></el-input>
            <Identify :identifyCode="identifyCode" @click.native="refreshCode()" style="cursor: pointer;"></Identify>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" style="width: 100%; background-color: #2a60c9; border-color: #2a60c9; color: white"
            @click="login">登 录</el-button>
        </el-form-item>
        <!-- <div style="align-items: center">
          <div style="text-align: right">
            还没有账号？请 <a href="/register">注册</a>
          </div>
        </div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from '@/components/Identify.vue'

export default {
  name: "Login",
  components: {
    Identify
  },
  data() {
    return {
      // form: {
      //   // 单选钮默认选中管理员
      //   role: 'ADMIN'
      // },
      admin: {
        role: "ADMIN",
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      // 验证码表单绑定的属性
      code: "",
      // 图片验证码
      identifyCode: "",
      // 验证码规则
      identifyCodes: "123456789ABCDEFGHGKMNPQRSTUVWXY"
    }
  },
  created() {

  },
  mounted() {
    this.refreshCode()
  },
  methods: {

    // 切换验证码
    refreshCode() {
      this.identifyCode = ""
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[Math.floor(Math.random() * (this.identifyCodes.length))]
      }
    },

    login() {
      if (!this.code) {
        this.$message.warning("请输入验证码")
        // 刷新验证码
        this.refreshCode()
        return
      }
      if (this.code.toLowerCase !== this.identifyCode.toLowerCase) {  // toLowerCase可以使大写转成小写
        this.$message.warning("验证码错误")
        // 刷新验证码
        this.refreshCode()
        return
      }
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // 验证通过
          this.$request.post('/login', this.admin).then(res => {
            if (res.code === '200') {
              this.$message.success('登录成功')
              setTimeout(() => {
                // 跳转主页
                if (res.data.role === 'ADMIN') {
                  localStorage.removeItem("USER");
                  location.href = '/manager/home'
                  localStorage.setItem("ADMIN", JSON.stringify(res.data))  // 存储用户数据
                }
              }, 500)
            } else {
              this.refreshCode()
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/imgs/bg.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

a {
  color: #2a60c9;
}
</style>
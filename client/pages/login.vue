<template>
  <div class="page-login">
    <div class="login-logo"></div>
    <div class="login-form">
      <p class="title">H5-VIEW 可视化编辑</p>
      <el-form :model="formData" ref="loginForm" :rules="type==='login' ? loginRules : regRules" label-width="100px">
        <el-form-item prop="email" v-show="type==='register'" label="邮箱">
          <el-input v-model="formData.email" @keyup.enter.native="registerOrLogin">
            <span slot="prefix" class="iconfont iconemail"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" @keyup.enter.native="registerOrLogin">
            <span slot="prefix" class="iconfont iconuser"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input :type="showpassword ? 'text' : 'password'" v-model="formData.password" @keyup.enter.native="registerOrLogin">
            <span slot="prefix" class="iconfont iconlock"></span>
            <span slot="suffix" class="iconfont" :class="showpassword ? 'iconeye' : 'iconeye-close'" @mousedown="showpassword=!showpassword" @mouseup="showpassword=!showpassword"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" v-show="type==='register'" label="确认密码">
          <el-input :type="showCheckPass ? 'text' : 'password'" v-model="formData.checkPassword" @keyup.enter.native="registerOrLogin">
            <span slot="prefix" class="iconfont iconlock"></span>
            <span slot="suffix" class="iconfont" :class="showCheckPass ? 'iconeye' : 'iconeye-close'" @mousedown="showCheckPass=!showCheckPass" @mouseup="showCheckPass=!showCheckPass"></span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="registerOrLogin">{{type === 'login' ? '登 录' : '注 册'}}</el-button>
          <el-button type="text" class="redirect-btn" @click="redirectClick">{{type === 'login' ? '前往注册' : '立即登录'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPassword !== '') {
          this.$refs.loginForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        email: '',
        username: '',
        password: '',
        checkPassword: ''
      },
      type: 'login',
      // input框密码显示还是隐藏
      showpassword: false,
      showCheckPass: false,
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      regRules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    registerOrLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.formData)
          console.log(this.type)
          let url = this.type === 'login' ? '/user/login' : '/user/register'
          this.$axios.post(url, this.formData).then((res) => {
            console.log(res)
            if (res.code === 200) {
              this.$store.dispatch('updateUserToken', res.body.token)
              this.$router.push('/')
              this.getUserInfo()
            }
          })
        } else {
          this.$message.error('信息不完整，请按提示正确输入信息！')
        }
      })
    },
    getUserInfo() {
      this.$axios.get('/user/info').then(res => {
        this.$store.dispatch('updateUserInfo', res.body)
      })
    },
    redirectClick() {
      this.type = this.type === 'login' ? 'register' : 'login'
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    width: 420px;
    .title {
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .submit-btn {
      width: 320px;
    }
    .redirect-btn {
      float: right;
    }
    .el-input__prefix .iconfont, .el-input__suffix .iconfont {
      font-size: 20px;
    }
  }
</style>
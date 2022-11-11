<template>
  <div class="main">
    <a-form-model class="user-layout-login"
                  ref="formLogin"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  :rules="loginRules"
                  :model="loginForm">
      <a-form-model-item label="用户名"
                         name="username">
        <a-input placeholder="请输入用户名"
                 size="large"
                 v-model="loginForm.username" />
      </a-form-model-item>
      <a-form-model-item label="密码"
                         name="password">
        <a-input type="password"
                 placeholder="请输入密码"
                 size="large"
                 v-model="loginForm.password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button style="width:100%;"
                  size="large"
                  type="primary"
                  class="login-button"
                  :loading="loginBtn"
                  :disabled="loginBtn"
                  @click="handleSubmit">确定</a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions, mapMutations } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  name: 'userLogin',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      loginBtn: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    ...mapActions(['Login']),
    handleSubmit () {
      this.$refs.formLogin.validate(async valid => {
        if (valid) {
          this.Login().then(() => {
            this.$router.push('/home')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>

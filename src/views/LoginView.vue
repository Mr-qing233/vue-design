<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { checkNameExist, submitLogin, submitRegister } from '@/api/user'
import type { CheckDto, User } from '@/utils/interface'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

//登录相关
const isActive = ref(false)
const change = (form: FormInstance) => {
  isActive.value = !isActive.value
  resetForm(form)
}
//校验登录的信息格式

const loginRules = reactive({
  uid: [{ required: true, message: 'Please input uid', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
  ]
})
//登录相关data传递接收
const userLogin = ref<CheckDto>({
  uid: '',
  password: ''
})
const userLoginForm = ref<FormInstance>()

const userStore = useUserStore()

//用户登录相关axios
async function login(check: CheckDto) {
  console.log(check)
  await submitLogin(check)
    .then((res) => {
      if (res.code == 200) {
        userStore.userData = res.data
        console.log(res.data)
        console.log(userStore.userData)
        ElMessage({
          showClose: true,
          type: 'success',
          message: '登录成功'
        })
        window.localStorage.setItem('privilege', res.data.privilege)
        router.push('/home')
      } else {
        ElMessage({
          showClose: true,
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        type: 'error',
        message: err.msg
      })
    })
}

// 注册相关
const userRegisterForm = ref<FormInstance>()

// 注册校验规则

function checkName(rule: any, value: any, cb: any) {
  checkNameExist(value)
    .then((res) => {
      // 未被使用的uname
      if (res.code == 200) {
        return cb()
      } else {
        return cb(new Error('用户名已被使用'))
      }
    })
    .catch((err) => {
      return cb(new Error('Please enter a valid uname'))
    })
}
function checkConfirm(rule: any, value: any, cb: any) {
  if (value !== userRegister.value.password) {
    return cb(new Error("Two inputs don't match!"))
  }
  return cb()
}

//邮箱校验规则
function checkEmail(rule: any, value: any, cb: any) {
  //验证邮箱的正则表达式
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (regEmail.test(value)) {
    //合法的邮箱
    return cb()
  }
  cb(new Error('Please enter a valid email'))
}

function checkPhone(rule: any, value: any, cb: any) {
  const phoneRule = /^1[3456789][0-9]{9}$/
  if (phoneRule.test(value)) {
    //合法的邮箱
    return cb()
  }
  cb(new Error('Please enter a valid phone'))
}

const registerRules = reactive({
  uname: [
    { required: true, message: 'Please input uid', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
  ],
  confirm: [
    { required: true, message: 'Please confirm password', trigger: 'blur' },
    { validator: checkConfirm, trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' }
  ],
  birthday: [{ required: true, message: 'Please select birthday', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please input phone', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' }
  ]
})
// 注册相关data传递接收
const userRegister = ref({
  uid: '0',
  uname: '',
  password: '',
  confirm: '',
  email: '',
  phone: '',
  birthday: '',
  privilege: 0
})

async function register(user: User, form: FormInstance) {
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      await submitRegister(user)
        .then(() => {
          ElMessage({
            showClose: true,
            type: 'success',
            message: '注册成功'
          })
          // location.reload()
          resetForm(form)
        })
        .catch((err) => {
          console.log(user)
          ElMessage({
            showClose: true,
            type: 'error',
            message: err.msg
          })
        })
    } else {
      ElMessage({
        showClose: true,
        type: 'error',
        message: '请补全有效信息'
      })
    }
  })
}
</script>

<template>
  <div id="page" class="site" :class="{ active: isActive }">
    <div class="container">
      <div class="blueBg">
        <div class="box signIn">
          <h2>已有账号?点击登录</h2>
          <el-button class="signInBtn" @click="change(userRegisterForm)">登录</el-button>
        </div>
        <div class="box signUp">
          <h2>还未注册?现在进行注册</h2>
          <el-button class="signUpBtn" @click="change(userLoginForm)">注册</el-button>
        </div>
      </div>
      <div class="formBox" :class="{ active: isActive }">
        <!--    登录表单-->
        <div class="form signInForm">
          <el-form :model="userLogin" :rules="loginRules" ref="userLoginForm">
            <h3>登录图书管理系统</h3>
            <el-form-item prop="uid">
              <el-input type="text" placeholder="请输入用户uid" v-model="userLogin.uid" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                show-password
                placeholder="密码"
                v-model="userLogin.password"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" value="Login" @click="login(userLogin)">Login</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!--    注册表单-->
        <div class="form signUpForm">
          <el-form
            label-width="5rem"
            label-position="right"
            :model="userRegister"
            :rules="registerRules"
            ref="userRegisterForm"
          >
            <h3>注册账号</h3>
            <el-form-item label="用户名" prop="uname">
              <el-input v-model="userRegister.uname" placeholder="Please input" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="userRegister.password"
                type="password"
                placeholder="Please input password"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm">
              <el-input
                v-model="userRegister.confirm"
                type="password"
                placeholder="Please confirm password"
              />
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="userRegister.birthday"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择出生日期"
              />
            </el-form-item>
            <el-form-item label="邮箱号" prop="email">
              <el-input v-model="userRegister.email" placeholder="Please input email" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userRegister.phone" placeholder="Please input phone" />
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm(userRegisterForm)">清空内容</el-button>
              <el-button type="primary" @click="register(userRegister, userRegisterForm)"
                >确认提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css';
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');

.site {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #03a9f4;
  transition: 0.5s;
}

.site.active {
  background: #f43648;
}

.container {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 20px;
}

.blueBg {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 420px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.box h2 {
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 10px;
}

.formBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease-in-out;
  overflow: hidden;
}

.formBox.active {
  left: 50%;
}

.formBox .form {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 50px;
  transition: 0.5s;
}

.formBox .signInForm {
  transition-delay: 0.25s;
}

.formBox.active .signInForm {
  left: -100%;
  transition-delay: 0s;
}

.formBox .signUpForm {
  left: 100%;
  transition-delay: 0s;
}

.formBox.active .signUpForm {
  left: 0;
  transition-delay: 0.25s;
}

.formBox .form .el-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.formBox .form .el-form h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

@media (max-width: 991px) {
  .container {
    max-width: 400px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container .blueBg {
    top: 0;
    height: 100%;
  }
  .formBox {
    width: 100%;
    height: 500px;
    top: 0;
    box-shadow: none;
  }
  .blueBg .box {
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
  }
  .blueBg .signIn {
    top: 0;
  }
  .formBox.active {
    left: 0;
    top: 150px;
  }
}
</style>

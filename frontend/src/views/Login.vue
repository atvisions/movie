<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="@/assets/images/logo.png" alt="logo">
          POPO.WORK    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  登录
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">用户名：</label>
                      <input v-model="username" type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="POPO" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密码：</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">记住账号</label>
                          </div>
                      </div>
                      <a href="/reset_password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">忘记密码?</a>
                  </div>
                  <button v-on:click.prevent="submitForm"  type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">登录</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      还没有账号? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">去注册</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>
<script>
import axios from 'axios';
import showMessage from '@/utils/message';
    export default{
        name : "Login",
        data:function(){
            return {
                username : '',
                password : ''
            }
        },
        methods:{
            submitForm(){
                const username = this.username;
                const password = this.password;
                if (username === ''){
                    showMessage("用户名不能为空！")
                    return
                } 
                if (password === ''){
                    showMessage("密码不能为空！")
                    return
                }   
                const formData = {
                    username : username,
                    password : password
                }
                axios
                    .post('/api/jwt/create/',formData) 
                    //存储数据
                    .then(response => {
                        
                        const token = response.data.access;
                        const refreshToken = response.data.refresh;
                        const username = this.username;
                        localStorage.setItem("token",token)
                        localStorage.setItem("refreshToken",refreshToken)
                        localStorage.setItem("username",username)
                        
                        const jumpLogin = this.$route.query.jump
                        const jumpLoginUrl = jumpLogin ? jumpLogin : '/'
                        this.$store.commit('setLoginStatus',true)
                        showMessage("登陆成功！","info",()=>{
                            this.$router.push({
                                path : jumpLoginUrl
                            })
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        // 遍历所有错误信息
                        const errorData = error.response.data
                        const errorMessages = Object.values(errorData).flat(); 
                        for (let i = 0; i < errorMessages.length; i++) {
                        showMessage(errorMessages[i])
                        }
                    })
            }           
        },
        
    }
</script>
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
                创建账号
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">用户昵称：</label>
                      <input v-model="username" type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="POPO" required="">
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">邮箱地址：</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密码：</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">确认密码：</label>
                      <input v-model="re_password" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input v-model="acceptedTerms" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">我已阅读并接受 <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">《版权声明》</a>和<a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">《隐私保护》</a></label>
                      </div>
                  </div>
                  <button v-on:click.prevent="register" type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">创建账号</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    已有账号? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">去登录</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

</template>

<script>
import axios from 'axios';
import showMessage from '@/utils/message.js';

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      re_password: '',
      acceptedTerms: false, // 绑定复选框
    };
  },
  methods: {
    register() {
      if (!this.acceptedTerms) {
        showMessage("请先勾选注册协议");
        return;
      }

      const formData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      axios.post('/api/users/', formData)
      .then(response => {
          showMessage("注册成功，请到邮箱中激活账号！", response, () => {
            this.$router.push({ name: 'Login' });
          });
        })
        .catch(error => {
          console.log(error);
          const errorData = error.response.data;
          const errorMessages = Object.values(errorData).flat();
          errorMessages.forEach(msg => showMessage(msg));
        });
    },
  },
};
</script>
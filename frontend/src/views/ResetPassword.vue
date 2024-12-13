<template>
    <HeadView />
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mx-auto max-w-5xl">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">重置密码</h2>

                <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                    <div class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                        <div class="mb-6 grid grid-cols-1 gap-4">
                            <div class="col-span-2 sm:col-span-1">
                                <label for="email"
                                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> 请输入邮箱地址</label>
                                <input v-model="email" type="email" id="email"
                                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    placeholder="abc@popo.work" required />
                            </div>


                            <div>
                                <button v-on:click="resetPassword" type="submit"
                            class="flex w-full items-center justify-center rounded-lg bg-primary-700 p-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            发送邮件</button>

                            </div>

                        </div>

                        
                    </div>

              
                </div>
            </div>
        </div>
    </section>

    
    <FootView />
</template>

<script>
import HeadView from '@/components/HeadView.vue';
import FootView from '@/components/FootView.vue';
import axios from 'axios';
import showMessage from '@/utils/message';

export default {
    name: "ResetPassword",
    data : function (){
        return {
            email : ''
        }
    },
    components: {
        HeadView, FootView
    },
    methods:{
        resetPassword(){
            const email = this.email.trim()
            if (email === ''){
                showMessage("邮箱不能为空")
                return
            }
            axios
                .post('api/users/reset_password/',{email:email})
                .then(() => {
                    showMessage("已发送邮件",'info',()=>{
                        this.$router.push({
                            name:'Login'
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
    }

}

</script>
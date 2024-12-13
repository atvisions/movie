<template>
    <HeadView />
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mx-auto max-w-5xl">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">修改密码</h2>

                <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                    <div
                        class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                        <div class="mb-6 grid grid-cols-1 gap-4">
                            <div class="col-span-2 sm:col-span-1">
                                <label for="password"
                                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> 请输入新密码</label>
                                <input v-model="new_password" type="password" id="new_password"
                                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    placeholder="" required />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="re_password"
                                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> 请重复密码</label>
                                <input v-model="re_new_password" type="password" id="re_new_password"
                                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    placeholder="" required />
                            </div>


                            <div>
                                <button v-on:click="resetPassword" type="submit"
                                    class="flex w-full items-center justify-center rounded-lg bg-primary-700 p-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    修改密码</button>

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
import showMessage from '@/utils/message';
import axios from 'axios';

export default {
    name: "PasswordReset",
    data: function () {
        return {
            uid: '',
            token: '',
            new_password: '',
            re_new_password: ''
        }

    },
    components: {
        HeadView, FootView
    },
    methods: {
        resetPassword() {
            // 获取参数
            const uid = this.$route.params.uid
            const token = this.$route.params.token
            const new_password = this.new_password
            const re_new_password = this.re_new_password
            if(new_password != re_new_password){
                showMessage("2次密码输入不一致")
                return
            }
            const formData = {
                uid : uid,
                token : token ,
                new_password : this.new_password,
                re_new_password : this.re_new_password
            }
            axios
                .post('/api/users/reset_password_confirm/',formData)
                .then(()=>{
                    showMessage("密码修改成功！","info",()=>{
                        this.$router.push({
                            name:'Login'
                        })       
                    })
                })
                .catch(error =>{
                    // 遍历所有错误信息
                    const errorData = error.response.data
                    const errorMessages = Object.values(errorData).flat(); 
                    for (let i = 0; i < errorMessages.length; i++) {
                        showMessage(errorMessages[i])
                    }
                })
            //console.log(formData)
        }
    }
}
</script>
<template>
    <!-- 翻页 -->
    <div class="flex justify-center">
        <nav aria-label="Page navigation example mx-auto ">
            <ul class="flex items-center -space-x-px h-8 text-sm">
                <li>
                    <a href="javascript:;" v-if="info.previous" @click="goToPage(prePage)"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                    <a href="javascript:;" v-else 
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                </li>
                <li v-for="page in pages" :key="page">
                    <!-- Ellipsis page -->
                    <a v-if="page === '...'"
                        href="javascript:;"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {{ page }}
                    </a>

                    <!-- Current page -->
                    <a v-else-if="page === current"
                        href="javascript:;"
                        class="flex items-center justify-center px-3 h-8 leading-tigh bg-gray-500 text-white">
                        {{ page }}
                    </a>

                    <!-- Other pages (non-current) -->
                    <a v-else
                        href="javascript:;"
                        @click="goToPage(page)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-500 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {{ page }}
                    </a>
                    </li>
                <li v-if="info.next">
                    <a href="javascript:;" @click="goToPage(nextPage)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </li>
                <li v-else>
                    <a href="javascript:;" 
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name: "Pagination",
    props:["info"],
    data: function(){
        return {
            current : 1
        }
    },
    computed:{
        lastPage (){
            let pageSize = 12
            return Math.ceil(this.info.count / pageSize)
        },
        prePage (){
            if (this.current > 1){
               return this.current - 1
            }
            return 1
        },
        nextPage (){
            if (this.current < this.lastPage){
               return this.current + 1
            }
            return this.lastPage
        },
        pages() {
            const pages = [];
            for (let i = 1; i <= this.lastPage; i++) {
                // If i is the first page, the last page, or around the current page
                if (i === 1 || i === this.lastPage || (i >= this.current - 1 && i <= this.current + 1)) {
                    pages.push(i);
                }else if(pages[pages.length - 1] !== "...") {
                    pages.push('...')
                }
            }
            return pages;
        }
    },
    //加载执行
    mounted(){
        this.current = this.getPage()
    },
    methods:{
        getPage(){
            const page = Number(this.$route.query.page)
            return page ? page : 1
            
        },
        goToPage(page){
            this.current = page
            const params = {...this.$route.query};
            params.page = page
            this.$router.push({query:params})
        }
    }
};
</script>
<template>
  <div class="bg-gray-100 overflow-y-hidden py-5">
    <section class="max-w-screen-xl bg-white mx-auto my-5 rounded-lg border-2 border-slate-500">
      <div class="flex items-center justify-center">
        <div class="w-full px-2">
          <div id="movie-list" class="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div class="movie">
              <a href="">
                <div class="relative">
                  <div class="cover">
                    <img src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.jpg" alt=""
                      class="rounded h-full w-full">
                  </div>
                  <div class="rounded absolute top-0 bg-purple-600 px-1 text-sm">
                    置顶
                  </div>
                  <div class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">
                    720p
                  </div>
                </div>
                <p> </p>
                <p class="text-sm text-primary-200"></p>
              </a>
            </div>

            <div class="movie">
              <a href="">
                <div class="relative">
                  <div class="cover">
                    <img src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.jpg" alt=""
                      class="rounded h-full w-full">
                  </div>
                  <div class="rounded absolute top-0 bg-purple-600 px-1 text-sm">
                    置顶
                  </div>
                  <div class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">
                    720p
                  </div>
                </div>
                <p> </p>
                <p class="text-sm text-primary-200"></p>
              </a>
            </div>

            <div class="movie">
              <a href="">
                <div class="relative">
                  <div class="cover">
                    <img src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.jpg" alt=""
                      class="rounded h-full w-full">
                  </div>
                  <div class="rounded absolute top-0 bg-purple-600 px-1 text-sm">
                    置顶
                  </div>
                  <div class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">
                    720p
                  </div>
                </div>
                <p> </p>
                <p class="text-sm text-primary-200"></p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Page></Page>
 </div>   
</template>

<script>
import Page from '@/components/Page.vue'
export default {
  name: 'IndexView',
  components: { 
    Page 
  }
}
</script>

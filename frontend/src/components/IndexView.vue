<template>
  <div class="overflow-y-hidden py-5 dark:bg-slate-600 bg-slate-100">
    <section class="max-w-screen-xl mx-auto my-5">
      <div class="flex items-center justify-center">
        <div class="w-full px-2">
          <div id="movie-list" class="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">


            <div class="movie" v-for="movie in info.results" :key="movie.id">
              <a :href="'movie/' + movie.id">
                <div class="relative">
                  <div class="cover">
                    <img :src="movie.image_url" alt="" class="rounded h-full w-full max-h-64">
                  </div>
                  <div v-if="movie.is_top" class="rounded absolute top-0 bg-purple-600 px-1 text-sm">置顶</div>
                  <div v-if="movie.quality == 1" class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">
                    720p</div>
                  <div v-else-if="movie.quality == 2"
                    class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">1080p</div>
                  <div v-else-if="movie.quality == 3"
                    class="rounded absolute bottom-0 right-0 bg-blue-500 px-1 text-sm ">4k</div>
                </div>
                <p class="text-black dark:text-white">{{ movie.movie_name }} ({{ movie.release_year }})</p>
                <p class="text-sm text-black dark:text-white">{{ movie.language }}</p>
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
    <Pagination :info="info" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import axios from 'axios';
export default {
  name: 'IndexView',
  data: function () {
    return {
      info: ''
    }
  },
  //加载axios
  mounted() {
    this.get_movie_data()
  },
  methods: {
    get_movie_data: function () {
      let url = '/api/movie/'
      const page = Number(this.$route.query.page);
      const search = this.$route.query.search;
      const params = new URLSearchParams;
      const category = this.$route.query.category;
      const region = this.$route.query.region;
      if (page) {
        params.append("page", page)
      }
      if (search) {
        params.append("movie_name", search)
      }
      if (category) {
        params.append("category", category)
      }
      if (region) {
        params.append("region", region)
      }

      url = url + '?' + params.toString()
      axios
        .get(url)
        .then(response => (this.info = response.data))
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    $route() {
      this.get_movie_data()
    }
  },
  components: {
    Pagination
  }
}
</script>

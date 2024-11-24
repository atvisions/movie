<template>
  <HeadView />
  <IndexView />
  <FootView />
</template>

<script>
// @ is an alias to /src
import FootView from '@/components/FootView.vue';
import HeadView from '@/components/HeadView.vue';
import IndexView from '@/components/IndexView.vue'

export default {
  name: 'HomeView',
  components: {
    IndexView,HeadView,FootView
  }
}
</script>

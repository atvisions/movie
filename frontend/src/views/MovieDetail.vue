<template>
    <HeadView/>
    <MovieBox/>
    <FootView/>
</template>

<script>
    import FootView from '@/components/FootView.vue';
    import HeadView from '@/components/HeadView.vue';
    import MovieBox from '@/components/MovieBox.vue';
    export default{
        name:'MovieDetail',
        components:{
            FootView,HeadView,MovieBox
        }       
    }
</script>
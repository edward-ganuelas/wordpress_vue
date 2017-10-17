<template>
    <post-list apiUrl="CATEGORY" />
</template>


<script>
import PostList from './PostList.vue';
export default {
    components: {
        PostList
    },
    watch: {
        '$route'(to, from) {
            //    console.log(to.path);
            router.forward(to.path);

        }
    }
}
</script>

<style scoped>

</style>
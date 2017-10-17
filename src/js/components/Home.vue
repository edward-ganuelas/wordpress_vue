<template>
    <post-list apiUrl="POSTS" />
</template>

<script>
import PostList from './PostList.vue';
export default {
    name: 'home',
    components: {
        PostList
    }
}
</script>

<style>

</style>
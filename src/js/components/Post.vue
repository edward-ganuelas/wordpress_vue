<template>
    <post-item v-bind:postId="$route.query.postId" />
</template>

<script>
    import PostItem from './PostItem.vue';

    export default{
        components: {
            PostItem
        }
    }
</script>

<style scoped>

</style>
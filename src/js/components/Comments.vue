<template>
    <comment-list v-bind:postId="$route.query.postID" />
</template>

<script>
import CommentList from './CommentList.vue';
export default {
    components: {
        CommentList
    }
}

</script>


<style scoped>

</style>
<template>
    <div class="col-xs-12 col-md-8">
        <div v-for="post in posts" class="well" v-bind:key="post.id">
            <h1 v-html="post.title.rendered"></h1>
            <p v-html="post.excerpt.rendered"></p>
            <router-link :to="{path: '/post', query: {postId: post.id}}">Read More</router-link>
        </div>
    </div>
</template>

<script>
import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
export default {
    name: 'post-list',
    props: ['apiUrl'],
    data: function() {
        return {
            posts: ''
        }
    },
    methods: {
        getPosts: function() {
            let componentThis = this;
            let urlString = HOSTNAME + APIENDPOINTS['POSTS'];
            if (this.apiUrl !== 'posts') {
                let id = this.$route.params.id;
                urlString = HOSTNAME + APIENDPOINTS[this.apiUrl] + id;
            }

            $.ajax({
                headers: {
                    "Authorization": "Basic " + AUTHORIZATION
                },
                url: urlString

            }).success(function(data) { componentThis.posts = data; })
        },
    },
    beforeMount: function() {
        this.getPosts();
    }
}
</script>


<style>

</style>
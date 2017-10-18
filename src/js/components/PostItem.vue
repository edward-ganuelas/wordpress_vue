<template>
    <div class="col-xs-12 col-md-8">
        <div class="well">
            <h1 v-html="title"></h1>
            <p>{{date}}</p>
            <p v-html="content"></p>
            <router-link :to="{path: 'comments', query: {postID: postId}}">Read Comments</router-link>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
export default {
    name: 'post-list',
    props: ['postId'],
    data: function() {
        return {
            date: '',
            title: '',
            content: '',
            comments: '',
        }
    },
    methods: {
        getPost: function() {

            axios({
                method: 'get',
                url: HOSTNAME + APIENDPOINTS.POST + this.postId,
                auth: {
                    username: AUTHORIZATION.USERNAME,
                    password: AUTHORIZATION.PASSWORD
                }
            }).then(message => {
                this.date = message.data.date;
                this.title = message.data.title.rendered;
                this.content = message.data.content.rendered;
            })

        },

    },
    beforeMount: function() {
        this.getPost();
    }
}

</script>


<style scoped>

</style>
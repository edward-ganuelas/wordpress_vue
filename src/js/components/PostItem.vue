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
    import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
    export default{
        name: 'post-list',
        props: ['postId'],
        data: function(){
            return {
                date: '',
                title: '',
                content: '',
                comments: '',
            }
        },
        methods: {
            getPost: function () {
                let componentThis = this;
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: HOSTNAME + APIENDPOINTS.POST + componentThis.postId
                }).success(function (data) {
                    componentThis.date = data.date;
                    componentThis.title = data.title.rendered;
                    componentThis.content = data.content.rendered;
                })
            },

        },
        beforeMount: function () {
            this.getPost();
        }
    }

</script>


<style scoped>

</style>
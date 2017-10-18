<template>
    <div class="col-xs-12 col-md-8">
        <div class="well">
            <h4>Comments: </h4>
            <div v-for="comment in comments" v-if="comment.post == postId" class="comment" v-bind:key="comment.id">
                <p>{{comment.author_name}} : </p>
                <p v-html="comment.content.rendered"></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
export default {
    name: 'comment-list',
    props: ['postId'],
    data: function() {
        return {
            comments: ''
        }
    },
    methods: {
        getComments: function() {

            axios({
                method: 'get',
                url: HOSTNAME + APIENDPOINTS.COMMENTS,
                auth: {
                    username: '',
                    password: ''
                }
            }).then(message => this.comments = message.data);
        },
    },
    beforeMount: function() {
        this.getComments();
    }
}
</script>

<style scoped>

</style>
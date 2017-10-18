<template>
    <div class="well">
        <h4>Tags</h4>
        <ul>
            <li v-for="tag in tags" v-bind:key="tag.id">{{tag.name}}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
export default {
    name: 'tag-list',
    data: function() {
        return {
            tags: ''
        }
    },
    methods: {
        getTags: function() {

            axios({
                method: 'get',
                url: HOSTNAME + APIENDPOINTS['TAGS'],
                auth: {
                    username: AUTHORIZATION.USERNAME,
                    password: AUTHORIZATION.PASSWORD
                }
            }).then(message => this.tags = message.data);
        }
    },
    beforeMount: function() {
        this.getTags();
    }
}

</script>
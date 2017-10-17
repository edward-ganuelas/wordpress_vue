<template>
    <div class="well">
        <h4>Tags</h4>
        <ul>
            <li v-for="tag in tags" v-bind:key="tag.id">{{tag.name}}</li>
        </ul>
    </div>
</template>

<script>
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
            var componentThis = this;
            $.ajax({
                headers: {
                    "Authorization": "Basic " + AUTHORIZATION
                },
                url: HOSTNAME + APIENDPOINTS.TAGS
            }).success(function(data) { componentThis.tags = data });
        }
    },
    beforeMount: function() {
        this.getTags();
    }
}

</script>
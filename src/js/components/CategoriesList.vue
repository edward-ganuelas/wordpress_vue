<template>
    <div class="well">
        <h4>Categories</h4>
        <ul>
            <li v-for="category in categories" v-bind:key="category.id">
                <router-link :to="{name: 'category', params: {id: category.id}}">{{category.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { HOSTNAME, AUTHORIZATION, APIENDPOINTS } from '../const/urls';
export default {
    name: 'categories-list',
    data: function() {
        return {
            categories: ''
        }
    },
    methods: {
        getCategories: function() {
            let componentThis = this;
            $.ajax({
                headers: {
                    "Authorization": "Basic " + AUTHORIZATION
                },
                url: HOSTNAME + APIENDPOINTS.CATEGORIES
            }).success(function(data) { componentThis.categories = data });
        }
    },
    mounted: function() {
        this.getCategories();
    }
}
</script>


<style scoped>

</style>
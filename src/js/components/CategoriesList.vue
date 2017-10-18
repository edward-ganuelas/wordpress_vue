<template>
    <div class="well">
        <h4>Categories</h4>
        <ul>
            <li v-for="category in categories" v-bind:key="category.id ">
                <router-link :to="{name: 'category', params: {id: category.id}}">{{category.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
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
            axios({
                method: 'get',
                url: HOSTNAME + APIENDPOINTS.CATEGORIES,
                auth: {
                    username: AUTHORIZATION.USERNAME,
                    password: AUTHORIZATION.PASSWORD
                }
            }).then(message => this.categories = message.data);
        }
    },
    beforeMount: function() {
        this.getCategories();
    }
}
</script>


<style scoped>

</style>
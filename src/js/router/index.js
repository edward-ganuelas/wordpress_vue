import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Home, name: 'Home' }
        // {
        //     path: '/post',
        //     name: 'post',
        //     component: Post
        // },
        // {
        //     path: '/comments',
        //     name: 'comments',
        //     component: Comments
        // },{
        //     path: '/post/category/:id',
        //     name: 'category',
        //     component: Categories
        // }
    ]
})
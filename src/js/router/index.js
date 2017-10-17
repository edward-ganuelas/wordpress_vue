import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Post from '../components/Post.vue';
import Comments from '../components/Comments.vue';
import Categories from '../components/Categories.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        {
            path: '/post',
            name: 'post',
            component: Post
        },
        {
            path: '/comments',
            name: 'comments',
            component: Comments
        },
        {
            path: '/post/category/:id',
            name: 'category',
            component: Categories
        }
    ]
})
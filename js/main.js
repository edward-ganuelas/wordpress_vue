var hostname = ''; //Replace with your hostname;
var authorization = "" // Your username:password on base64
var apiEndpoints = {
    posts: '/wp-json/wp/v2/posts?filter[posts_per_page]=-1',
    comments: '/wp-json/wp/v2/comments?filter[posts_per_page]=-1',
    categories: '/wp-json/wp/v2/categories',
    post: '/wp-json/wp/v2/posts/'
}
const Home = { template: '<post-list />' }
const Post = { template: '<post-item v-bind:postId="$route.query.postId" />' }
const Comments = {template: '<comment-list v-bind:postId="$route.query.postID" />'}

const routes = [
    { path: '/', component: Home },
    {
        path: '/post',
        name: 'post',
        component: Post
    },
    {
        path: '/comments',
        name: 'comments',
        component: Comments
    }
]

const router = new VueRouter({
    routes
})

Vue.component('post-list', {
    template: '#post-list',
    data: function () {
        return {
            posts: ''
        }
    },
    methods: {
        getPosts: function () {
            var componentThis = this;

            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.posts

            }).success(function (data) { componentThis.posts = data;})
        },
    },
    mounted: function () {
        this.getPosts();
    }
})

Vue.component('post-item', {
    template: "#post-item",
    props: ['postId'],
    data: function () {
        return {
            date: '',
            title: '',
            content: '',
            comments: '',
        }
    },
    methods: {
        getPost: function() {
            var componentThis = this;
            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.post + componentThis.postId
            }).success(function (data) { 
                componentThis.date = data.date;
                componentThis.title = data.title.rendered;
                componentThis.content = data.content.rendered;
            })
        },
        
    },
    mounted: function () {
        this.getPost();
    }
})

Vue.component('comment-list',{
    template: "#comment-list",
    props: ['postId'],
    data: function(){
        return{
            comments: ''
        }
    },
    methods: {
        getComments: function () {
            var componentThis = this;
            var jsondata = '';
            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.comments
            }).success(function (data) { jsondata = data; componentThis.comments = data});
        },
    },
    mounted: function(){
        this.getComments();
    }
})

var app = new Vue({
    el: "#app",
    router,
    data: {
        categories: '',
    },
    methods: {
        getCategories: function () {//@TODO
            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.categories
            }).success(function (data) { app.categories = data });
        },
       
    },
})


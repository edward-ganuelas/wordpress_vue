var hostname = ''; //Replace with your hostname;
var authorization = "" // Your username:password on base64
var apiEndpoints = {
    posts: '/wp-json/wp/v2/posts?filter[posts_per_page]=-1',
    comments: '/wp-json/wp/v2/comments?filter[posts_per_page]=-1',
    categories: '/wp-json/wp/v2/categories',
    post: '/wp-json/wp/v2/posts/'
}
const Home = { template: `<post-list />` }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Post = { template: '<post-item v-bind:postId="$route.params.postId" />' }

const routes = [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    {
        path: '/post/:postId',
        name: 'post',
        component: Post
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
            content: ''
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
                // componentThis.post = data; 
                componentThis.date = data.date;
                componentThis.title = data.title.rendered;
                componentThis.content = data.content.rendered;
            })
        }
    },
    mounted: function () {
        this.getPost();
    }
})

var app = new Vue({
    el: "#app",
    router,
    data: {
        comments: '',
        categories: '',
    },
    methods: {
        getComments: function () {
            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.comments
            }).success(function (data) { app.comments = data });
        },
        getCategories: function () {//@TODO
            $.ajax({
                headers: {
                    "Authorization": "Basic " + authorization
                },
                url: hostname + apiEndpoints.categories
            }).success(function (data) { app.categories = data });
        },
        // loadPost: function(id){
        //    this.showExcerpts = false;
        //    $('#post-'+id).show();
        // },
        // loadExcerpts: function(){
        //     this.showExcerpts = true;
        //     $('.post').hide();
        // }
    },
})
//  app.getComments();
//  app.getCategories();

(function () {
    const hostname = ''; //Replace with your hostname;
    const authorization = "" // Your username:password on base64
    const apiEndpoints = {
        posts: '/wp-json/wp/v2/posts?filter[posts_per_page]=-1',
        comments: '/wp-json/wp/v2/comments?filter[posts_per_page]=-1',
        categories: '/wp-json/wp/v2/categories',
        post: '/wp-json/wp/v2/posts/',
        tags: '/wp-json/wp/v2/tags',
        category: '/wp-json/wp/v2/posts?categories='
    }
    const Home = { template: '<post-list apiUrl="posts"/>' }
    const Post = { template: '<post-item v-bind:postId="$route.query.postId" />' }
    const Comments = { template: '<comment-list v-bind:postId="$route.query.postID" />' }
    const Categories = {
        template: '<post-list apiUrl="category" />',
        watch:{
            '$route'(to, from){
            //    console.log(to.path);
            router.forward(to.path);
            
              
            
            }
        }

    }

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
        },{
            path: '/post/category/:id',
            name: 'category',
            component: Categories
        }
    ]

    const router = new VueRouter({
        routes
    })

    Vue.component('post-list', {
        template: `
                <div class="col-xs-12 col-md-8">
                    <div v-for="post in posts" class="well">
                        <h1 v-html="post.title.rendered"></h1>
                        <p v-html="post.excerpt.rendered"></p>
                        <router-link :to="{path: '/post', query: {postId: post.id}}">Read More</router-link>
                    </div>
                </div>
            `,
        props: ['apiUrl'],
        data: function () {
            return {
                posts: ''
            }
        },
        methods: {
            getPosts: function () {
                let componentThis = this;
                let urlString = hostname + apiEndpoints['posts'];
                if(this.apiUrl !== 'posts'){
                    let id = this.$route.params.id;
                    urlString = hostname + apiEndpoints[this.apiUrl]+id;
                }

                $.ajax({
                    headers: {
                        "Authorization": "Basic " + authorization
                    },
                    url: urlString

                }).success(function (data) { componentThis.posts = data; })
            },
        },
        mounted: function () {
            this.getPosts();
        }
    })

    Vue.component('post-item', {
        template: `
                <div class="col-xs-12 col-md-8">
                    <div class="well">
                        <h1 v-html="title"></h1>
                        <p>{{date}}</p>
                        <p v-html="content"></p>
                        <router-link :to="{path: 'comments', query: {postID: postId}}">Read Comments</router-link>
                        <router-view></router-view>
                    </div>
                </div>
            `,
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
            getPost: function () {
                let componentThis = this;
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

    Vue.component('comment-list', {
        template: `
                <div class="col-xs-12 col-md-8">
                    <div class="well">
                    <h4>Comments: </h4>
                        <div v-for="comment in comments" v-if="comment.post == postId" class="comment">
                            <p>{{comment.author_name}} : </p>
                            <p v-html="comment.content.rendered"></p>
                      </div>
                    </div>
                </div>
        `,
        props: ['postId'],
        data: function () {
            return {
                comments: ''
            }
        },
        methods: {
            getComments: function () {
                let componentThis = this;
                let jsondata = '';
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + authorization
                    },
                    url: hostname + apiEndpoints.comments
                }).success(function (data) { jsondata = data; componentThis.comments = data });
            },
        },
        mounted: function () {
            this.getComments();
        }
    })

    Vue.component('categories-list', {
        template: `
                <div class="well">
                    <h4>Categories</h1>
                        <ul>
                            <li v-for="category in categories"><router-link :to="{name: 'category', params: {id: category.id}}">{{category.name}}</router-link></li>
                        </ul>
                </div>
        `,
        data: function () {
            return {
                categories: ''
            }
        },
        methods: {
            getCategories: function () {
                let componentThis = this;
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + authorization
                    },
                    url: hostname + apiEndpoints.categories
                }).success(function (data) { componentThis.categories = data });
            }
        },
        mounted: function () {
            this.getCategories();
        }
    })

    Vue.component('tag-list', {
        template: `
                <div class="well">
                    <h4>Tags</h4>
                        <ul>
                            <li v-for="tag in tags">{{tag.name}}</li>
                        </ul>
                </div>
        `,
        data: function () {
            return {
                tags: ''
            }
        },
        methods: {
            getTags: function () {
                var componentThis = this;
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + authorization
                    },
                    url: hostname + apiEndpoints.tags
                }).success(function (data) { componentThis.tags = data });
            }
        },
        mounted: function () {
            this.getTags();
        }
    })

    var app = new Vue({
        el: "#app",
        router,
        data: {
            posts: ''
        },
        methods:{
            getPosts(apiUrl){
                let componentThis = this;
                let urlString = hostname + apiEndpoints['posts'];
                if(this.apiUrl !== 'posts'){
                    let id = this.$route.params.id;
                    urlString = hostname + apiEndpoints[this.apiUrl]+id;
                }
                console.log(urlString);
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + authorization
                    },
                    url: urlString

                }).success(function (data) { componentThis.posts = data; })
            }
        }
    });
})();

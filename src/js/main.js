import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import {HOSTNAME, AUTHORIZATION, APIENDPOINTS} from './const/urls';


(function () {
    // Vue.use(VueRouter);
    const Home = { template: '' }
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
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: HOSTNAME + APIENDPOINTS.post + componentThis.postId
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
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: HOSTNAME + APIENDPOINTS.COMMENTS
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
                    <h4>Categories</h4>
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
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: HOSTNAME + APIENDPOINTS.CATEGORIES
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
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: HOSTNAME + APIENDPOINTS.TAGS
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
                let urlString = HOSTNAME + APIENDPOINTS['POSTS'];
                if(this.apiUrl !== 'posts'){
                    let id = this.$route.params.id;
                    urlString = HOSTNAME + APIENDPOINTS[this.apiUrl]+id;
                }
                console.log(urlString);
                $.ajax({
                    headers: {
                        "Authorization": "Basic " + AUTHORIZATION
                    },
                    url: urlString

                }).success(function (data) { componentThis.posts = data; })
            }
        },
        template: '<App />',
        components: {App}
    });
})();

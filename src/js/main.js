import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import {HOSTNAME, AUTHORIZATION, APIENDPOINTS} from './const/urls';


(function () {
    // Vue.use(VueRouter);

    const Categories = {
        template: '<post-list apiUrl="category" />',
        watch:{
            '$route'(to, from){
            //    console.log(to.path);
            router.forward(to.path);

            }
        }

    }

    Vue.component('comment-list', {
        template: `
                
        `,
        
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

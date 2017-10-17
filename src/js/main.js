import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import {HOSTNAME, AUTHORIZATION, APIENDPOINTS} from './const/urls';


(function () {

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

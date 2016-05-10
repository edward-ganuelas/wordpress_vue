var hostname = ''; //Replace with your hostname;
var authorization = "=" // Your username:password on base64
var apiEndpoints ={
    post: '/wp-json/wp/v2/posts?filter[posts_per_page]=-1',
    comments: '/wp-json/wp/v2/comments?filter[posts_per_page]=-1',
    categories: '/wp-json/wp/v2/categories'
}

var app = new Vue({
    el: "#app",
    data: {
        posts: '',
        comments: '',
        categories: '',
        showExcerpts: true
    },
    methods: {
        getPosts: function(){
            $.ajax({
                headers: {
                    "Authorization": "Basic "+authorization
                },
                url:hostname+apiEndpoints.post
                
            }).success(function(data){app.posts = data;})
        },
        getComments: function(){
            $.ajax({
                 headers: {
                    "Authorization": "Basic "+authorization
                },
                url: hostname+apiEndpoints.comments}).success(function(data){app.comments = data});
        },
        getCategories: function(){//@TODO
             $.ajax({
                 headers: {
                    "Authorization": "Basic "+authorization
                },
                url: hostname+apiEndpoints.categories}).success(function(data){app.categories = data});
        },
        loadPost: function(id){
           this.showExcerpts = false;
           $('#post-'+id).show();
        },
        loadExcerpts: function(){
            this.showExcerpts = true;
            $('.post').hide();
        }
    }
})
 app.getPosts();
 app.getComments();
 app.getCategories();

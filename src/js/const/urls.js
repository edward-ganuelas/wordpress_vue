export const HOSTNAME = 'https://wordpress.eightrayedsun.com'; //Replace with your hostname;
export const AUTHORIZATION = "" // Your username:password on base64
export const APIENDPOINTS = {
    POSTS: '/wp-json/wp/v2/posts?filter[posts_per_page]=-1',
    COMMENTS: '/wp-json/wp/v2/comments?filter[posts_per_page]=-1',
    CATEGORIES: '/wp-json/wp/v2/categories',
    POST: '/wp-json/wp/v2/posts/',
    TAGS: '/wp-json/wp/v2/tags',
    CATEGORY: '/wp-json/wp/v2/posts?categories='
}
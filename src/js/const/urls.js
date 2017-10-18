export const HOSTNAME = 'https://wordpress.eightrayedsun.com'; //Replace with your hostname;
export const AUTHORIZATION = {
    USERNAME: '',
    PASSWORD: ''
}
export const APIENDPOINTS = {
    POSTS: '/wp-json/wp/v2/posts?per_page=100',
    COMMENTS: '/wp-json/wp/v2/comments?per_page=100',
    CATEGORIES: '/wp-json/wp/v2/categories',
    POST: '/wp-json/wp/v2/posts/',
    TAGS: '/wp-json/wp/v2/tags',
    CATEGORY: '/wp-json/wp/v2/posts?per_page=100&categories='
}
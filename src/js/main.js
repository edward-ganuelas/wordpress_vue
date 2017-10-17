import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import {HOSTNAME, AUTHORIZATION, APIENDPOINTS} from './const/urls';


(function () {

    var app = new Vue({
        el: "#app",
        router,
        template: '<App />',
        components: {App}
    });
})();

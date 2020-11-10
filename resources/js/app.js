/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './components/Welcome'
import Navbar from './components/parts/Navbar'
import Tasks from './components/pages/tasks/Index'
import ValidationErrors from "./components/parts/ValidationErrors"

Vue.component('navbar', Navbar);
Vue.component('tasks', Tasks);
Vue.component('validation-errors', ValidationErrors);


const app = new Vue({
    el: '#app',
    render: h => h(App)
});

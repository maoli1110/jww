import Vue from "vue";
import Router from "vue-router";
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/main',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            redirect: '/main/home',
            children: [
                {
                    //  home
                    path: 'home',
                    component: resolve => require(['../components/Game/profile.vue'], resolve)
                },
                {
                    //  ingame
                    path: 'ingame/:num',
                    component: resolve => require(['../components/Game/ingame.vue'], resolve)
                },
                {
                    //  ingame
                    path: 'address',
                    component: resolve => require(['../components/Game/address.vue'], resolve)
                },
                {
                    //  我的
                    path: 'mine',
                    component: resolve => require(['../components/Game/mine.vue'], resolve)
                }
            ],
        },
        {
            // login
            path: '/login',
            component: resolve => require(['../components/Login/Login.vue'], resolve)
        },
        {
            // login
            path: '/account',
            component: resolve => require(['../components/Login/account.vue'], resolve)
        }
    ]
})

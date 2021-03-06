import Vue from 'vue';
import ViewUI from 'view-design';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import store from '@/store';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    const token = store.state.user.userInfo.token;
    const locking = store.state.app.locking;
    if (locking === 1 && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (locking === 0 && to.name === 'locking') {
        next(false);
    } else {
        if (!token && to.name !== 'login') { // 判断是否未登录且前往的页面不是登录
            next({
                name: 'login'
            });
        } else if (token && to.name === 'login') { // 判断是否已登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            Util.toDefaultPage(routers, to.name, router, next);
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;

import Vue from 'vue';
import ViewUI from 'view-design';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'view-design/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import {postRequest,getRequest,openUrl} from './api/api';
import iviewArea from 'iview-area';
import Cookies from 'js-cookie';

Vue.use(VueI18n);
Vue.use(ViewUI);
Vue.use(iviewArea);
Vue.prototype.postRequest = postRequest;  //axios post
Vue.prototype.getRequest = getRequest;  //axios get
Vue.prototype.openUrl = openUrl;  //打开URL
Vue.prototype.util = util;
Vue.prototype.Cookies = Cookies;

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        util.initRouter(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

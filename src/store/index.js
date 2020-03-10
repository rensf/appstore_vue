import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;

import axios from 'axios';
import store from '@/store';
import router from '@/router';
import {Notice} from 'view-design';

const service = axios.create({
    baseURL: '',
    timeout: 0
});

service.interceptors.request.use(config => {
    if (store.state.user.userInfo.token)
        config.headers.token = store.state.user.userInfo.token;
    return config;
});

service.interceptors.response.use(
    response => {
        console.log(response);
        let code = response.data.code;
        if (code === null || code === undefined) {
            Notice.error({
                title: 'Tip',
                desc: '******NULL******'
            });
            return;
        } else if (code === '0') {
            Notice.success({
                title: 'Tip',
                desc: '操作成功！'
            });
            return response;
        } else if (code.substring(0, 1) === '1') {
            Notice.error({
                title: 'Tip',
                desc: response.data.msg
            });
            store.commit('logout')
            router.push({
                name: 'login'
            })
            return;
        } else if (code.substr(0, 1) === '2') {
            Notice.error({
                title: 'Tip',
                desc: response.data.msg
            });
            store.commit('logout')
            router.push({
                name: 'login'
            })
            return;
        } else if (code.substring(0, 1) === '3') {
            Notice.error({
                title: 'Tip',
                desc: response.data.msg
            });
            store.commit('logout')
            router.push({
                name: 'login'
            })
            return;
        }
    }, error => {
        return Promise.reject(error);
    }
);

export default service;

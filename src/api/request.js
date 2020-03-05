import axios from 'axios';
import { Notice } from 'view-design';

const service = axios.create({
    baseURL: '',
    timeout: 0
});

service.interceptors.response.use(response => {
    console.log(response)
    if (response.data.code === null || response.data.code === undefined) {
        Notice.error({
            title: 'Tip',
            desc: '******NULL******'
        });
        return;
    } else if (response.data.code === 0) {
        Notice.success({
            title: 'Tip',
            desc: '操作成功！'
        });
        return response;
    } else if (response.data.code.substring(0, 1) === '1') {
        Notice.error({
            title: 'Tip',
            desc: response.msg
        });
        return;
    } else if (response.data.code.substring(0, 1) === '2') {
        Notice.error({
            title: 'Tip',
            desc: response.msg
        });
        return;
    } else if (response.data.code.substring(0, 1) === '3') {
        Notice.error({
            title: 'Tip',
            desc: response.msg
        });
        return;
    }
});

export default service;

import axios from 'axios';
import iView from 'iview';

const service = axios.create({
    baseURL: '',
    timeout: 0
});

// service.interceptors.response.use(response => {
//     if(response.data.errcode === null || response.data.errcode === undefined)
//     {
//         iView.Notice.error({
//             title: "Tip",
//             desc: "******NULL******"
//         });
//         return;
//     }else if(response.data.errcode === 0){
//         return response;
//     }else if(response.data.errcode.substring(0,1) === '1'){
//         iView.Notice.error({
//             title: "Tip",
//             desc: response.data.errmsg
//         });
//         return ;
//     }else if(response.data.errcode.substring(0,1) === '2'){
//         iView.Notice.error({
//             title: "Tip",
//             desc: response.data.errmsg
//         });
//         return;
//     }else if(response.data.errcode.substring(0,1) === '3'){
//         iView.Notice.error({
//             title: "Tip",
//             desc: response.data.errmsg
//         });
//         return;
//     }
// });

export default service;
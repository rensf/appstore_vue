import service from './request';

export const postRequest = (url, params) => {
    return service({
        method: 'post',
        url: '/api'+`${url}`,
        data: params,
    });
}

export const getRequest = (url, params) => {
    return service({
        method: 'get',
        url: '/api'+`${url}`,
        params: params,
    });
}

export const openUrl = (url, params) => {
    let param = "";
    for(let field in params) {
        if(params[field]) {
            param += field + "=" + params[field] + "&";
        }
    }
    param = param.substring(0, param.length-1);
    let URL = '/api' + url + "?" + param;
    window.open(URL);
}

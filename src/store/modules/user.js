
const user = {
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo;
        },
        logout (state, vm) {
            //置空用户信息
            state.userInfo = {};
            localStorage.removeItem('menuConfig');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;

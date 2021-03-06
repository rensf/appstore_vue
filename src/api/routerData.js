export default [
    {
        'path': '/user',
        'icon': 'md-person',
        'title': '用户管理',
        'name': 'user',
        'component': 'Main',
        'children': [
            {
                'path': 'user',
                'title': '用户管理',
                'name': 'user',
                'component': 'user/user'
            }
        ]
    },
    {
        'path': '/application',
        'icon': 'md-apps',
        'title': '应用管理',
        'name': 'application',
        'component': 'Main',
        'children': [
            {
                'path': 'application',
                'title': '应用管理',
                'name': 'application',
                'component': 'application/application'
            }
        ]
    }
];

<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="loginForm" :rules="loginRule">
                        <FormItem prop="adminname">
                            <Input v-model="loginForm.adminname" placeholder="请输入用户名...">
                                <span slot="prepend">
                                    <Icon :size="16" type="md-person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="请输入密码...">
                                <span slot="prepend">
                                    <Icon :size="16" type="md-lock"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            loginForm: {},
            loginRule: {
                staffname: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.postRequest('/td-sys-admin/login', this.loginForm).then(response => {
                        //将权限配置存入本地缓存
                        // this.$store.commit('setMenuConfig', JSON.stringify(data.menuinfos));
                        //初始化路由
                        // this.util.initRouter(this);
                        Cookies.set('adminid', response.data.result.adminid);
                        Cookies.set('adminname', response.data.result.adminname);
                        this.$store.commit('setAvator', '../src/images/head.jpg');
                        this.$router.push({
                            name: 'home_index'
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            });
        }
    }
};
</script>

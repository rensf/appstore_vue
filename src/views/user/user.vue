<style lang="less">
@import "../../styles/common.less";
</style>
<template>
    <div>
        <Card title="用户管理">
            <!-- 内容 -->
            <div>
                <!-- 查询用户 -->
                <Form ref="queryUserForm" :model="queryUserForm" inline :rules="queryUserFormRules">
                    <!-- :rules="queryUserFormRules"  表单的校验-->
                    <FormItem prop="username">
                        <Input
                            v-model="queryUserForm.username"
                            type="text"
                            placeholder="请输入用户姓名..."
                        />
                    </FormItem>
                    <FormItem prop="telno">
                        <Input v-model="queryUserForm.telno" type="text" placeholder="请输入用户电话..."/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query()">查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button @click="cancelQuery()">重置</Button>
                    </FormItem>
                </Form>

                <!-- 展示信息 -->
                <Table border :columns="columns1" :data="users"></Table>
                <br>
                <Page
                    :total="queryUserForm.total"
                    :current="queryUserForm.current"
                    :page-size="queryUserForm.size"
                    @on-change="changePage"
                ></Page>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            columns1: [
                {
                    title: "用户姓名",
                    align: "center",
                    key: "username"
                },
                {
                    title: "用户电话",
                    align: "center",
                    key: "telno"
                },
                {
                    title: "用户邮箱",
                    align: "center",
                    key: "email"
                },
                {
                    title: "注册时间",
                    align: "center",
                    key: "createtime"
                },
                {
                    title: "操作",
                    align: "center",
                    key: "action",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        margin: "0 3px"
                                    }

                                },
                                "查看信息"
                            )
                        ])
                    }
                }
            ],
            queryUserFormRules: {
                telno: [
                    {
                        type: "string",
                        pattern: /^1[0-9]{10}$/,
                        message: "请输入正确格式的手机号",
                        trigger: "blur"
                    }
                ]
            },
            queryUserForm: {
                total: 0,
                current: 1,
                size: 10
            }
        };
    },
    methods: {
        init() {
            this.query();
        },
        //按照给定的时间，姓名条件查询
        query() {
            this.postRequest("/td-sys-user/queryUser", this.queryUserForm).then(
                response => {
                    this.users = response.data.result.records;
                    this.queryUserForm.total = response.data.result.total;
                }
            );
        },
        cancelQuery() {
            this.queryUserForm = {
                total: 0,
                current: 1,
                size: 10
            };
        },
        changePage(current) {
            this.queryUserForm.current = current;
            this.query();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
</style>

<template>
    <div>
        <Card>
            <!-- 头部 -->
            <div slot="title">
                <p class="p-title">
                    <Icon type="md-remove"></Icon>应用管理
                    <Button type="primary" @click="handleAdd()">添加应用</Button>
                </p>
            </div>
            <!-- 内容 -->
            <div>
                <!-- 查询应用 -->
                <Form class="queryForm" ref="queryForm" :model="queryForm" inline>
                    <FormItem prop="appname">
                        <Input type="text" placeholder="请输入APP名称..." v-model="queryForm.appname"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query()">查询</Button>
                        <Button>重置</Button>
                    </FormItem>
                </Form>
                <!-- 弹出框 -->
                <Modal title="添加应用" v-model="showAdd">
                    <Form
                        class="addForm"
                        ref="addForm"
                        :model="addForm"
                        :rules="addFormRule"
                        label-position="right"
                        :label-width="100"
                    >
                        <FormItem label="APP名称：" prop="appname">
                            <Input type="text" v-model="addForm.appname" placeholder="请输入APP名称..."></Input>
                        </FormItem>
                        <FormItem></FormItem>
                        <FormItem></FormItem>
                    </Form>
                    <div slot="footer">
                        <Button @click="cancelAdd()">取消</Button>
                        <Button type="primary">确定</Button>
                    </div>
                </Modal>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAdd: false,
            queryForm: {},
            addForm: {},
            addFormRule: {}
        };
    },
    methods: {
        query() {},
        handleAdd() {
            this.showAdd = true;
        },
        cancelAdd() {
            this.showAdd = false;
            this.$refs["addForm"].resetFields();
        }
    }
};
</script>

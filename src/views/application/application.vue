<style lang="less" scoped>
    @import "../../styles/common.less";
</style>

<template>
    <div>
        <Card title="应用管理">
            <!-- 内容 -->
            <div>
                <!-- 查询应用 -->
                <Form ref="queryForm" :model="queryForm" inline>
                    <FormItem prop="appname">
                        <Input type="text" placeholder="请输入APP名称..." v-model="queryForm.appname"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query()">查询</Button>
                    </FormItem>
                    <FormItem class="queryForm-btn">
                        <Button type="primary" @click="handleAdd()">添加应用</Button>
                    </FormItem>
                </Form>

                <!-- 展示 -->
                <Table :columns="columns" :data="apps" border></Table>
                <br>

                <!-- 分页 -->
                <Page></Page>

                <!-- 添加弹出框 -->
                <Modal
                        :styles="{top: '60px'}"
                        title="添加应用"
                        v-model="showAdd"
                        width="45"
                        :mask-closable="false"
                        @on-cancel="cancelAdd()"
                >
                    <Form
                            ref="addForm"
                            :model="addForm"
                            :rules="addFormRule"
                            label-position="right"
                            :label-width="100"
                    >
                        <FormItem label="APP名称：" prop="appname">
                            <Input style="max-width: 500px;" type="text" v-model="addForm.appname"
                                   placeholder="请输入APP名称..."></Input>
                        </FormItem>
                        <FormItem label="APP描述：" prop="appdetail">
                            <Input style="max-width: 500px;" type="textarea" v-model="addForm.appdetail"
                                   placeholder="请输入APP描述..."></Input>
                        </FormItem>
                        <FormItem label="APP图标：" prop="appicon">
                            <Upload-File
                                    :list="appiconList"
                                    type="drag"
                                    :max-size="1024"
                                    :max-length="1"
                                    action="/api/td-sys-app/uploadApp"
                                    :headers="{token: token}"
                                    accept=".jpg, .jpeg, .png"
                                    :format="['jpg','jpeg','png']"
                                    icon="md-camera"
                                    @upload-success="uploadAppicon"
                            ></Upload-File>
                        </FormItem>
                        <FormItem label="APP上传：" prop="apppath">
                            <Upload-File
                                    :showList="false"
                                    action="/api/td-sys-app/uploadApp"
                                    :headers="{token: token}"
                                    accept=".apk"
                                    :format="['apk']"
                                    icon="ios-cloud-upload-outline"
                                    text="上传"
                                    @upload-success="uploadApp"
                            ></Upload-File>
                        </FormItem>
                        <FormItem label="APP图片：" prop="appphoto">
                            <Upload-File
                                    :list="appimageList"
                                    type="drag"
                                    :max-size="2048"
                                    action="/api/td-sys-app/uploadApp"
                                    :headers="{token: token}"
                                    accept=".jpg, .jpeg, .png"
                                    :format="['jpg','jpeg','png']"
                                    icon="md-add"
                                    @upload-success="uploadAppimage"
                            ></Upload-File>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button @click="cancelAdd">取消</Button>
                        <Button type="primary" @click="confirmAdd">确定</Button>
                    </div>
                </Modal>

                <Modal
                        title="上架图展示"
                        v-model="showPicture"
                        @on-cancel="closePicture"
                        :mask-closable="false"
                        :footer-hide="true"
                        width="274"
                >
                    <div>
                        <Carousel style="width: 240px;height: 414px;">
                            <CarouselItem v-for="item in pictureList" :key="item.url">
                                <img :src="item.url" style="width: 240px;height: 414px;"/>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </Modal>
            </div>
        </Card>
    </div>
</template>

<script>
    import UploadFile from '@/views/my-components/upload-file/upload-file.vue';

    export default {
        name: 'application',
        components: {
            UploadFile
        },
        data () {
            return {
                token: this.$store.state.user.userInfo.token,
                showAdd: false,
                queryForm: {
                    total: 0,
                    current: 1,
                    size: 10
                },
                addForm: {},
                addFormRule: {},
                appiconList: [],
                appList: [],
                appimageList: [],
                columns: [
                    {
                        title: 'APP名称',
                        align: 'center',
                        key: 'appname',
                        width: 150
                    },
                    {
                        title: 'APP图标',
                        align: 'center',
                        key: 'appicon',
                        render: (h, params) => {
                            return h('img', {
                                style: {
                                    width: '48px',
                                    height: '48px',
                                    'margin-top': '5px'
                                },
                                attrs: {
                                    src:
                                        '/api/td-sys-app/previewAppImage/' +
                                        params.row.appicon
                                }
                            });
                        },
                        width: 100
                    },
                    {
                        title: 'APP描述',
                        align: 'center',
                        key: 'appdetail',
                        tooltip: true,
                        width: 300
                    },
                    {
                        title: '下载量',
                        align: 'center',
                        key: 'appdown',
                        width: 100
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {type: 'success', size: 'small'},
                                        style: {margin: '0 3px'},
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },
                                    '上架'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {type: 'warning', size: 'small'},
                                        style: {margin: '0 3px'},
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    },
                                    '下架'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {margin: '0 3px'},
                                        on: {
                                            click: () => {
                                                this.handleShowPicture(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {margin: '0 3px'},
                                        on: {
                                            click: () => {
                                                this.delete(
                                                    params.row,
                                                    params.index
                                                );
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        },
                        minWidth: 300
                    }
                ],
                apps: [],
                showPicture: false,
                pictureList: []
            };
        },
        methods: {
            init () {
                this.query();
            },
            query () {
                this.postRequest('/td-sys-app/queryApp', this.queryForm).then(
                    response => {
                        this.apps = response.data.result.records;
                        this.queryForm.total = response.data.result.total;
                    }
                );
            },
            handleAdd () {
                this.showAdd = true;
            },
            cancelAdd () {
                this.showAdd = false;
                this.$refs['addForm'].resetFields();
                this.appiconList = [];
                this.appimageList = [];
            },
            uploadAppicon (res) {
                this.addForm.appicon = res;
            },
            handleBeforeUploadApp () {
                const appMax = this.appList.length < 1;
                if (!appMax) {
                    this.$Notice.warning({
                        title: '最多可以上传一个文件'
                    });
                }
            },
            handleAppFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: file.name + '文件格式错误，请选择.apk格式的文件。'
                });
            },
            uploadApp (res) {
                this.addForm.apppath = res;
                this.appList.push({
                    value: res
                });
            },
            uploadAppimage (res) {
                this.appimageList.push(res);
            },
            confirmAdd () {
                this.appimageList.forEach((item, index) => {
                    this.addForm['picture' + (index + 1)] = item.value;
                });
                this.postRequest('/td-sys-app/addApp', this.addForm).then(
                    response => {
                        if (response.data === 1) {
                            this.$Notice.success({
                                title: '操作成功！'
                            });
                            this.showAdd = false;
                            this.$refs['addForm'].resetFields();
                            this.appiconList = [];
                            this.appimageList = [];
                            this.query();
                        }
                    }
                );
            },
            handleShowPicture (v) {
                this.showPicture = true;
                for (let index = 1; index <= 5; index++) {
                    if (v['picture' + index] !== undefined) {
                        this.pictureList.push({
                            url:
                                '/api/td-sys-app/previewAppImage/' +
                                v['picture' + index]
                        });
                    }
                }
            },
            closePicture () {
                this.showPicture = false;
                this.pictureList = [];
            },
            delete (v, index) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除该记录吗?',
                    onOk: () => {
                        this.postRequest('/td-sys-app/delApp', v).then(response => {
                            if (response.data === 1) {
                                // 成功删除数据
                                this.apps.splice(index, 1);
                                this.$Notice.success({
                                    title: '提示',
                                    desc: '操作成功！'
                                });
                            }
                        });
                    }
                });
            },
            download (v, index) {
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

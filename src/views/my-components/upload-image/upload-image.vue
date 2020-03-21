<style lang="less" scoped>
    @import "./upload-image.less";
</style>

<template>
    <div class="upload">
        <div v-if="showList"
             class="upload-image-list"
             :style="{width: listWidth + 'px', height: listHeight  + 'px', lineHeight: listHeight  + 'px'}"
             v-for="item in list">
            <img :src="item.url"/>
        </div>
        <Upload
                class="upload-image"
                :style="{width: uploadWidth + 'px'}"
                :type="type"
                :max-size="maxSize"
                :multiple="multiple"
                :action="action"
                :headers="headers"
                :data="data"
                :accept="accept"
                :format="format"
                :show-upload-list="showUploadList"
                :before-upload="handleBeforeUpload"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="uploadSuccess"
        >
            <Icon :style="{height: uploadHeight + 'px', lineHeight: uploadHeight + 'px'}" :type="icon"></Icon>
            <span>{{text}}</span>
        </Upload>
        <Input v-if="!showList" class="upload-input" v-model="value"/>
    </div>
</template>

<script>
    export default {
        name: 'upload-image',
        props: {
            showList: {
                type: Boolean,
                default: true
            },
            listWidth: '',
            listHeight: '',
            value: '',
            list: {
                type: Array,
                default: () => {
                    [];
                }
            },
            type: {
                type: String,
                default: 'select'
            },
            maxSize: {
                type: Number
            },
            maxLength: {
                type: Number
            },
            multiple: {
                type: Boolean,
                default: false
            },
            action: '',
            headers: {
                type: Object,
                default: () => {
                    {
                    }
                }
            },
            data: {
                type: Object,
                default: () => {
                    {
                    }
                }
            },
            accept: '',
            format: {
                type: Array,
                default: () => {
                    [];
                }
            },
            showUploadList: {
                type: Boolean,
                default: false
            },
            uploadWidth: {
                type: String,
                default: '75'
            },
            uploadHeight: {
                type: String,
                default: '75'
            },
            icon: {
                type: String,
                default: 'md-add'
            },
            text: ''
        },
        methods: {
            handleBeforeUpload () {
                if (this.maxLength) {
                    const check = this.list.length < this.maxLength;
                    if (!check) {
                        this.$Notice.warning({
                            title: '文件数量超过限制！'
                        });
                    }
                }
                return true;
            },
            handleFormatError () {
                this.$Notice.warning({
                    title: '文件格式错误!'
                });
            },
            handleMaxSize () {
                this.$Notice.warning({
                    title: '文件大小超过限制！'
                });
            },
            uploadSuccess (res) {
                if (res.code === '0') {
                    if (this.showList) {

                    }
                    this.$Notice.success({
                        title: '文件上传成功！'
                    });
                } else if (res.code.substring(0, 1) === '1') {
                    this.$Notice.warning({
                        title: res.msg
                    });
                } else if (res.code.substr(0, 1) === '2') {
                    this.$Notice.error({
                        title: res.msg
                    });
                    this.$store.commit('logout');
                    this.$router.push({
                        name: 'login'
                    });
                }
            }
        }
    };
</script>

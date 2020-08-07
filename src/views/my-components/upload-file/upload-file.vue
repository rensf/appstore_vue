<style lang="less" scoped>
    @import "upload-file.less";
</style>

<template>
    <div class="upload">
        <div v-if="showList"
             class="upload-image-list"
             :style="{width: uploadWidth + 'px', height: uploadHeight  + 'px', lineHeight: uploadHeight  + 'px'}"
             v-for="item in imgList">
            <img :src="item.url"/>
        </div>
        <Input v-if="!showList" class="upload-input" v-model="value"/>
        <Upload
                class="upload-file"
                :style="{width: uploadWidth + 'px'}"
                v-bind="$attrs"
                v-on="$listeners"
                :before-upload="handleBeforeUpload"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="uploadSuccess"
        >
            <Icon v-if="showList" :style="{height: uploadHeight + 'px', lineHeight: uploadHeight + 'px'}" :type="icon"></Icon>
            <Button v-else :icon="icon">{{text}}</Button>
        </Upload>
    </div>
</template>

<script>
    export default {
        name: 'upload-file',
        inheritAttrs: false,
        props: {
            showList: {
                type: Boolean,
                default: true
            },
            list: {
                type: Array
            },
            value: '',
            maxLength: {
                type: Number
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
        data () {
            return {
                imgList: this.list ? this.list : []
            };
        },
        methods: {
            handleBeforeUpload () {
                if (this.maxLength) {
                    const check = this.imgList.length < this.maxLength;
                    if (!check) {
                        this.$Notice.warning({
                            title: '文件数量超过限制！'
                        });
                    }
                    return check;
                }
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
                    this.imgList.push({
                        url: '/api/td-sys-app/previewAppImage/' + res.result
                    });
                    if (this.showList) {
                        this.$emit('upload-success', res.result);
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

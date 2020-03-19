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
                :data="data"
                :accept="accept"
                :format="format"
                :show-upload-list="showUploadList"
                :before-upload="handleBeforeUpload"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="uploadSuccess"
        >
            <Icon :style="{width: iconWidth + 'px', height: iconHeight + 'px', lineHeight: iconHeight + 'px'}" :type="icon"></Icon>
            <p>{{text}}</p>
        </Upload>
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
            listWidth: {
                type: Number,
                default: 75
            },
            listHeight: {
                type: Number,
                default: 75
            },
            list: {
                type: Array,
                default: () => {[]}
            },
            uploadWidth: {
                type: Number,
                default: 75
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
            action: {
                type: String,
                default: ''
            },
            data: {
                type: Object,
                default: () => {{}}
            },
            accept: {
                type: String,
                default: ''
            },
            format: {
                type: Array,
                default: () => {[]}
            },
            showUploadList: {
                type: Boolean,
                default: false
            },
            iconWidth: {
                type: Number,
                default: 75
            },
            iconHeight: {
                type: Number,
                default: 75
            },
            icon: {
                type: String,
                default: 'md-add'
            },
            text: {
                type: String,
                default: ''
            }
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
            uploadSuccess () {
                this.$Notice.success({
                    title: '文件上传成功！'
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .upload {
        display: flex;

        .upload-image-list {
            display: inline-block;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            margin-right: 4px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        &-image {
            display: inline-block;
        }
    }
</style>

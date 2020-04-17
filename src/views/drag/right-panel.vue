<template>
    <div class="right-board">
        <Tabs v-model="currentTab">
            <TabPane label="组件属性" name="field"></TabPane>
            <TabPane label="表单属性" name="form"></TabPane>
        </Tabs>
        <div class="field-box">
            <Form
                style="padding-right: 20px;"
                v-show="currentTab === 'field' && showField"
                label-position="right"
                :label-width="100"
            >
                <FormItem v-if="activeData.changeTag" label="组件类型：">
                    <Select
                        v-model="activeData.tagIcon"
                        placeholder="请选择组件类型"
                        :style="{ width: '100%' }"
                        @change="tagChange"
                    >
                        <OptionGroup
                            v-for="group in tagList"
                            :key="group.label"
                            :label="group.label"
                        >
                            <Option
                                v-for="option in group.options"
                                :key="option.label"
                                :label="option.label"
                                :value="option.tagIcon"
                            >
                                <Icons :type="option.tagIcon" />
                                <span>{{option.label}}</span>
                            </Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem v-if="activeData.vModel !== undefined" label="字段名：">
                    <Input v-model="activeData.vModel" placeholder="请输入字段名"></Input>
                </FormItem>
                <FormItem v-if="activeData.label !== undefined" label="标题：">
                    <Input v-model="activeData.label" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem v-if="activeData.placeholder" label="提示占位：">
                    <Input v-model="activeData.placeholder" placeholder="请输入占位提示"></Input>
                </FormItem>
                <FormItem v-if="activeData['start-placeholder'] !== undefined" label="开始占位：">
                    <Input v-model="activeData['start-placeholder']" placeholder="请输入占位提示"></Input>
                </FormItem>
                <FormItem v-if="activeData['end-placeholder'] !== undefined" label="结束占位：">
                    <Input v-model="activeData['end-placeholder']" placeholder="请输入占位提示"></Input>
                </FormItem>
                <FormItem v-if="activeData.span !== undefined" label="表单栅格：">
                    <Slider
                        v-model="activeData.span"
                        :max="24"
                        :min="1"
                        :marks="{12:''}"
                        @change="spanChange"
                    />
                </FormItem>
                <FormItem v-if="activeData.layout === 'rowFormItem'" label="栅格间隔：">
                    <Input v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
                </FormItem>
                <FormItem
                    v-if="activeData.style && activeData.style.width !== undefined"
                    label="组件宽度："
                >
                    <Input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable></Input>
                </FormItem>
                <FormItem v-if="activeData.prepend !== undefined" label="前缀：">
                    <Input v-model="activeData.prepend" placeholder="请输入前缀"></Input>
                </FormItem>
                <FormItem v-if="activeData.append !== undefined" label="后缀：">
                    <Input v-model="activeData.append" placeholder="请输入后缀"></Input>
                </FormItem>
                <FormItem v-if="activeData.prefix !== undefined" label="前图标："></FormItem>
                <FormItem v-if="activeData.suffix !== undefined" label="后图标："></FormItem>
                <FormItem v-if="activeData.maxlength !== undefined" label="最多输入：">
                    <Input v-model="activeData.maxlength" placeholder="请输入字符长度">
                        <span slot="append">个字符</span>
                    </Input>
                </FormItem>
                <FormItem v-if="activeData.readonly !== undefined" label="是否只读：">
                    <Switch v-model="activeData.readonly" />
                </FormItem>
                <FormItem v-if="activeData.disabled !== undefined" label="是否禁用：">
                    <Switch v-model="activeData.disabled" />
                </FormItem>
                <FormItem v-if="activeData.required !== undefined" label="是否必填：">
                    <Switch v-model="activeData.required" />
                </FormItem>
                <FormItem v-if="activeData.filterable !== undefined" label="可否搜索：">
                    <Switch v-model="activeData.filterable" />
                </FormItem>
                <FormItem v-if="activeData.multiple !== undefined" label="可否多选：">
                    <Switch v-model="activeData.multiple" />
                </FormItem>
            </Form>
            <Form
                style="padding-right: 20px;"
                v-show="currentTab === 'form'"
                label-position="right"
                :label-width="100"
            >
                <FormItem label="表单名称：">
                    <Input v-model="formConf.formName" placeholder="请输入表单名称"></Input>
                </FormItem>
                <FormItem label="表单标识：">
                    <Input v-model="formConf.formRef" placeholder="请输入表单标识（英文）"></Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Icons from "_c/icons/icons";
import { inputComponents, selectComponents } from "./config";
import { saveFormConf } from "./util";
export default {
    name: "RightPanel",
    props: ["showField", "activeData", "formConf"],
    components: {
        Icons
    },
    data() {
        return {
            currentTab: "field"
        };
    },
    computed: {
        tagList() {
            return [
                {
                    label: "输入型组件",
                    options: inputComponents
                },
                {
                    label: "选择型组件",
                    options: selectComponents
                }
            ];
        }
    },
    watch: {
        formConf: {
            handler(val) {
                saveFormConf(val);
            },
            deep: true
        }
    },
    methods: {
        spanChange(val) {
            this.formConf.span = val;
        },
        tagChange(tagIcon) {
            let target = inputComponents.find(item => item.tagIcon === tagIcon);
            if (!target)
                target = selectComponents.find(
                    item => item.tagIcon === tagIcon
                );
            this.$emit("tag-change", target);
        }
    }
};
</script>

<style lang="less" scoped>
.right-board {
    width: 350px;
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 3px;
    .field-box {
        position: relative;
        height: calc(100vh - 32px);
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .field-box::-webkit-scrollbar {
        display: none;
    }
}
</style>
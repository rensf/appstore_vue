<template>
    <div class="right-board">
        <Tabs v-model="currentTab">
            <TabPane label="组件属性" name="field"></TabPane>
            <TabPane label="表单属性" name="form"></TabPane>
        </Tabs>
        <div class="field-box">
            <Form v-show="currentTab === 'field'" label-position="right" :label-width="100">
                <FormItem label="组件类型：">
                    <Select
                        v-model="activeData.tagIcon"
                        placeholder="请选择组件类型"
                        :style="{ width: '100%' }"
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
                            >{{option.label}}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem v-if="activeData.vModel !== undefined" label="字段名：">
                    <Input v-model="activeData.vModel" placeholder="请输入字段名"></Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import { inputComponents, selectComponents } from "./config";
export default {
    name: "RightPanel",
    props: ["showField", "activeData", "formConf"],
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
        height: calc(100vh - 42px);
        box-sizing: border-box;
        overflow: hidden;
    }
}
</style>
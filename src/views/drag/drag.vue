<template>
    <div>
        <Card title="自定义表单（可拖拽）">
            <div class="container">
                <div class="left-board">
                    <div class="components-list">
                        <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
                            <div class="components-title">
                                <Icon type="logo-buffer" size="18"></Icon>
                                {{item.title}}
                            </div>
                            <draggable
                                class="components-draggable"
                                :list="item.list"
                                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                                :clone="cloneComponent"
                                draggable=".components-item"
                                :sort="false"
                                @end="onEnd"
                            >
                                <div
                                    v-for="(element, index) in item.list"
                                    :key="index"
                                    class="components-item"
                                    @click="addComponent(element)"
                                >
                                    <div class="components-body">
                                        <Icons :type="element.tagIcon" size="15"></Icons>
                                        {{ element.label }}
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </div>
                <div class="center-board">
                    <Row class="center-board-row">
                        <Form
                            :label-position="formConf.labelPosition"
                            :disabled="formConf.disabled"
                            :label-width="formConf.labelWidth"
                        >
                            <draggable
                                class="drawing-draggable"
                                :list="drawingList"
                                :animation="340"
                                group="componentsGroup"
                            >
                                <draggable-item
                                    v-for="(element, index) in drawingList"
                                    :key="element.renderKey"
                                    :drawing-list="drawingList"
                                    :element="element"
                                    :index="index"
                                    :active-id="activeId"
                                    :form-conf="formConf"
                                    @activeItem="activeFormItem"
                                    @copyItem="drawingItemCopy"
                                    @deleteItem="drawingItemDelete"
                                />
                            </draggable>
                            <div v-show="!drawingList.length" class="empty-info">从左侧拖入或点选组件进行表单设计</div>
                        </Form>
                    </Row>
                </div>
                <right-panel :active-data="activeData" />
            </div>
        </Card>
    </div>
</template>

<script>
import Icons from "_c/icons/icons";
import draggable from "vuedraggable";
import { debounce } from "throttle-debounce";
import { formConf, inputComponents, selectComponents } from "./config";
import drawingDefault from "./drawing-default";
import DraggableItem from "./draggable-item";
import RightPanel from "./right-panel";
import {
    getDrawingList,
    saveDrawingList,
    getIdGlobal,
    saveIdGlobal,
    getFormConf
} from "./util";

let oldActiveId;
let tempActiveData;
const drawingListInDB = getDrawingList();
const formConfInDB = getFormConf();
const idGlobal = getIdGlobal();

export default {
    name: "drag",
    components: {
        Icons,
        draggable,
        DraggableItem,
        RightPanel
    },
    data() {
        return {
            formConf,
            idGlobal,
            inputComponents,
            selectComponents,
            drawingList: drawingDefault,
            activeId: drawingDefault[0].formId,
            activeData: drawingDefault[0],
            saveDrawingListDebounce: debounce(340, saveDrawingList),
            saveIdGlobalDebounce: debounce(340, saveIdGlobal),
            leftComponents: [
                {
                    title: "输入型组件",
                    list: inputComponents
                },
                {
                    title: "选择型组件",
                    list: selectComponents
                }
            ]
        };
    },
    watch: {
        "activeData.label": function(val, oldVal) {
            if (
                this.activeData.placeholder === undefined ||
                !this.activeData.tag ||
                oldActiveId !== this.activeId
            ) {
                return;
            }
            this.activeData.placeholder =
                this.activeData.placeholder.replace(oldVal, "") + val;
        },
        activeId: {
            handler(val) {
                oldActiveId = val;
            },
            immediate: true
        },
        drawingList: {
            handler(val) {
                this.saveDrawingListDebounce(val);
                if (val.length === 0) this.idGlobal = 100;
            },
            deep: true
        },
        idGlobal: {
            handler(val) {
                this.saveIdGlobalDebounce(val);
            },
            immediate: true
        }
    },
    methods: {
        activeFormItem(element) {
            this.activeData = element;
            this.activeId = element.formId;
        },
        onEnd(obj, a) {
            if (obj.from !== obj.to) {
                this.activeData = tempActiveData;
                this.activeId = this.idGlobal;
            }
        },
        addComponent(item) {
            const clone = this.cloneComponent(item);
            this.drawingList.push(clone);
            this.activeFormItem(clone);
        },
        cloneComponent(origin) {
            const clone = JSON.parse(JSON.stringify(origin));
            clone.formId = ++this.idGlobal;
            clone.span = formConf.span;
            clone.renderKey = +new Date(); // 改变renderKey后可以实现强制更新组件
            if (!clone.layout) clone.layout = "colFormItem";
            if (clone.layout === "colFormItem") {
                clone.vModel = `field${this.idGlobal}`;
                clone.placeholder !== undefined &&
                    (clone.placeholder += clone.label);
                tempActiveData = clone;
            } else if (clone.layout === "rowFormItem") {
                delete clone.label;
                clone.componentName = `row${this.idGlobal}`;
                clone.gutter = this.formConf.gutter;
                tempActiveData = clone;
            }
            return tempActiveData;
        },
        drawingItemCopy(item, parent) {
            let clone = JSON.parse(JSON.stringify(item));
            clone = this.createIdAndKey(clone);
            parent.push(clone);
            this.activeFormItem(clone);
        },
        createIdAndKey(item) {
            item.formId = ++this.idGlobal;
            item.renderKey = +new Date();
            if (item.layout === "colFormItem") {
                item.vModel = `field${this.idGlobal}`;
            } else if (item.layout === "rowFormItem") {
                item.componentName = `row${this.idGlobal}`;
            }
            if (Array.isArray(item.children)) {
                item.children = item.children.map(childItem =>
                    this.createIdAndKey(childItem)
                );
            }
            return item;
        },
        drawingItemDelete(index, parent) {
            parent.splice(index, 1);
            this.$nextTick(() => {
                const len = this.drawingList.length;
                if (len) {
                    this.activeFormItem(this.drawingList[len - 1]);
                }
            });
        }
    },
    mounted() {
        if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
            this.drawingList = drawingListInDB;
        } else {
            this.drawingList = drawingDefault;
        }
        this.activeFormItem(this.drawingList[0]);
        if (formConfInDB) {
            this.formConf = formConfInDB;
        }

        // const clipboard = new ClipboardJS('#copyNode', {
        //     text: trigger => {
        //         const codeStr = this.generateCode();
        //         this.$notify({
        //             title: '成功',
        //             message: '代码已复制到剪切板，可粘贴。',
        //             type: 'success'
        //         });
        //         return codeStr;
        //     }
        // });
        // clipboard.on('error', e => {
        //     this.$message.error('代码复制失败');
        // });
    }
};
</script>

<style lang="less" scoped>
@selectedColor: #f6f7ff;
@lighterBlue: #409eff;

.container {
    position: relative;
    width: 100%;
    height: 100%;

    .left-board {
        width: 260px;
        position: absolute;
        left: 0;
        top: 0;

        .components-list {
            padding: 8px;
            box-sizing: border-box;
            height: 100%;

            .components-title {
                font-size: 14px;
                color: #222;
                margin: 6px 2px;
            }

            .components-draggable {
                padding-bottom: 20px;
            }

            .components-item {
                display: inline-block;
                width: 48%;
                margin: 1%;
                transition: transform 0ms !important;
            }

            .components-body {
                padding: 8px 10px;
                background: @selectedColor;
                font-size: 12px;
                cursor: move;
                border: 1px dashed @selectedColor;
                border-radius: 3px;

                &:hover {
                    border: 1px dashed #787be8;
                    color: #787be8;
                }
            }
        }
    }

    .center-board {
        height: 75vh;
        width: auto;
        margin: 0 350px 0 260px;
        box-sizing: border-box;
        border-left: 1px solid #f1e8e8;
        border-right: 1px solid #f1e8e8;

        .center-board-row {
            box-sizing: border-box;
            padding: 12px;
            /deep/ & > .ivu-form {
                height: calc(~"75vh - 12px");
            }

            .drawing-draggable {
                height: 100%;
                position: relative;

                .components-body {
                    padding: 0;
                    margin: 0;
                    font-size: 0;
                }

                .sortable-ghost {
                    position: relative;
                    display: block;
                    overflow: hidden;
                    &::before {
                        content: " ";
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        height: 3px;
                        background: rgb(89, 89, 223);
                        z-index: 2;
                    }
                }

                .components-item.sortable-ghost {
                    margin-bottom: 10px;
                    width: 100%;
                    height: 60px;
                    background-color: @selectedColor;
                }

                .active-from-item {
                    /deep/ & > .ivu-form-item {
                        background: @selectedColor;
                        border-radius: 6px;
                    }
                    /deep/ & > .drawing-item-copy,
                    /deep/ & > .drawing-item-delete {
                        display: initial;
                    }
                    /deep/ & > .component-name {
                        color: @lighterBlue;
                    }
                }

                /deep/ .ivu-form-item {
                    margin-bottom: 15px;
                }

                .drawing-item {
                    position: relative;
                    cursor: move;
                    &.unfocus-bordered:not(.active-from-item)
                        > div:first-child {
                        border: 1px dashed #ccc;
                    }
                    /deep/ .ivu-form-item {
                        padding: 12px 10px;
                    }
                }

                .drawing-row-item {
                    position: relative;
                    cursor: move;
                    box-sizing: border-box;
                    border: 1px dashed #ccc;
                    border-radius: 3px;
                    padding: 0 2px;
                    margin-bottom: 15px;
                    .drawing-row-item {
                        margin-bottom: 2px;
                    }
                    /deep/ .ivu-col {
                        margin-bottom: 22px;
                    }
                    /deep/ .ivu-form-item {
                        margin-bottom: 0;
                    }
                    .drag-wrapper {
                        min-height: 80px;
                    }
                    &.active-from-item {
                        border: 1px dashed @lighterBlue;
                    }
                    .component-name {
                        position: absolute;
                        top: 0;
                        left: 0;
                        font-size: 12px;
                        color: #bbb;
                        display: inline-block;
                        padding: 0 6px;
                    }
                }

                .drawing-item,
                .drawing-row-item {
                    &:hover {
                        /deep/ & > .ivu-form-item {
                            background: @selectedColor;
                            border-radius: 6px;
                        }
                        /deep/ & > .drawing-item-copy,
                        /deep/ & > .drawing-item-delete {
                            display: initial;
                        }
                    }
                    /deep/ & > .drawing-item-copy,
                    /deep/ & > .drawing-item-delete {
                        display: none;
                        position: absolute;
                        top: -14px;
                        width: 22px;
                        height: 22px;
                        line-height: 22px;
                        text-align: center;
                        border-radius: 50%;
                        font-size: 12px;
                        border: 1px solid;
                        cursor: pointer;
                        z-index: 1;
                    }
                    /deep/ & > .drawing-item-copy {
                        right: 56px;
                        border-color: @lighterBlue;
                        color: @lighterBlue;
                        background: #fff;
                        &:hover {
                            background: @lighterBlue;
                            color: #fff;
                        }
                    }
                    /deep/ & > .drawing-item-delete {
                        right: 24px;
                        border-color: #f56c6c;
                        color: #f56c6c;
                        background: #fff;
                        &:hover {
                            background: #f56c6c;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .empty-info {
            position: absolute;
            top: 46%;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 18px;
            color: #ccb1ea;
            letter-spacing: 4px;
        }
    }
}
</style>

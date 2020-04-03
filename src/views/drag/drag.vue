<template>
    <div>
        <Card title="自定义表单（可拖拽）">
            <div style="display: flex;">
                <div style="width: 300px;">
                    <ul ref="test1" class="draggable-list">
                        <li v-for="(item, index) in testList" :key="index">
                            {{item.content}}
                        </li>
<!--                        <li>-->
<!--                            <Radio>男</Radio>-->
<!--                        </li>-->
                    </ul>
                </div>
                <Divider type="vertical"/>
                <div style="width: 100%;">
                    <ul ref="test2" class="select-list"></ul>
                </div>
                <Divider type="vertical"/>
                <div style="width: 300px;">
                    <Form>
                        <FormItem v-for="(item, index) in actionForm.items" :key="index" :prop="item.prop">
                            <Input v-model="item.value"/>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import Sortable from 'sortablejs';

    export default {
        name: 'drag',
        data () {
            return {
                testList: [
                    {
                        content: '文本框'
                    },
                    {
                        content: '单选框'
                    },
                    {
                        content: '多选框'
                    },
                    {
                        content: '下拉框'
                    },
                ],
                selectList: [],
                actionForm: {
                    items: []
                },
                aaa: '1111111'
            };
        },
        mounted () {
            let that = this;
            let test1 = this.$refs.test1;
            Sortable.create(test1, {
                group: {
                    name: 'shared',
                    pull: 'clone',
                    put: false // 不允许拖拽进这个列表
                },
                animation: 120,
                sort: false,
                onRemove (event) {
                    switch (event.clone.innerText) {
                        case '文本框': {
                            event.item.innerHTML.template = '<Input/>';
                        }
                        case '单选框': {
                            event.item.innerHTML = '<Radio>男</Radio>'
                        }
                    }
                    console.log(event.item.innerHTML);
                    // let obj = {
                    //     title: event.clone.innerText,
                    //     placeholder: ''
                    // };
                    // Object.entries(obj).forEach(item => {
                    //     console.log(item);
                    //
                    // });
                    // that.selectList.splice(event.newIndex, 0, obj);
                    // console.log(that.selectList);
                }
            });
            let test2 = this.$refs.test2;
            Sortable.create(test2, {
                group: 'shared',
                animation: 120
            });
        }
    };
</script>

<style lang="less" scoped>
    .draggable-list {
        height: 100%;
    }

    .draggable-list li {
        display: block;
        width: 48%;
        padding: 9px;
        border: 1px solid #e7ebee;
        border-radius: 3px;
        margin: 1%;
        text-align: center;
        cursor: pointer;
        position: relative;
        float: left;
        transition: all .2s;
    }

    .draggable-list li:hover {
        display: block;
        color: #87b4ee;
        border-color: #87b4ee;
        transition: all .2s;
    }

    .select-list {
        height: 100%;
    }

    .select-list li {
        display: block;
        padding: 9px;
        border: 1px solid #e7ebee;
        border-radius: 3px;
        margin: 9px;
        cursor: pointer;
        position: relative;
        transition: all .2s;
    }

    .select-list li:hover {
        display: block;
        color: #87b4ee;
        border-color: #87b4ee;
        transition: all .2s;
    }

    .ivu-divider {
        height: auto;
    }
</style>

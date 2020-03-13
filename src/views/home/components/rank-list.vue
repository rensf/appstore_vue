<template>
    <div class="rank">
        <Row class="rank-list" v-for="(item, index) in value" :key="index">
            <Col :span="6">
                <div class="rank-list-index" :class="'rank-list-index' + index" >{{ index + 1 }}</div>
            </Col>
            <Col :span="12">
                <div class="rank-list-name">{{ item.name }}</div>
            </Col>
            <Col :span="6">
                <div class="rank-list-total">
                    {{ item.total }}
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'rankList',
        props: {
            value: {
                type: Array,
                default: []
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "./styles/rank-list.less";
</style>

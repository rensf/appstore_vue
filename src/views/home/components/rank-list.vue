<template>
    <Row class="rank-list">
        <Col :span="6">
            <div class="rank-list-index">{{ index }}</div>
        </Col>
        <Col :span="12">
            <div class="rank-list-name">{{ name }}</div>
        </Col>
        <Col :span="6">
            <div class="rank-list-total">
                {{ total }}
            </div>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: 'rank-list',
        props: {
            index: 0,
            name: '',
            total: ''
        }
    };
</script>

<style lang="less" scoped>
    @import "./styles/rank-list.less";
</style>

<template>
    <Icon :custom="'iconfont icon-' + type" :size="size" :color="color"/>
</template>

<script>
export default {
    name: 'Icons',
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            default: 16
        },
        color: {
            type: String,
            default: '#5c6b77'
        }
    }
}
</script>
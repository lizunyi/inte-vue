<template>
    <nav role="layout">
        <nav role="top">
            <LayoutTop></LayoutTop>
        </nav>
        <nav role="main">
            <LayoutMain></LayoutMain>
        </nav>
    </nav>
</template>

<script>

    import {LayoutMain, LayoutTop} from './components'

    export default {
        name: 'Layout',
        components: {
            LayoutMain,
            LayoutTop
        }
    }
</script>
<style lang="scss" scoped>
    [role=layout] {
        height: 100%;
        background: #fff;

        [role=top] {
            height: 60px;
            display: flex;
            align-items: center;
            background: #404040;
            color: #fff;
        }

        [role=main] {
            width: 80%;
            border-radius: 5px;
            padding: 10px;
            margin: 0 auto;
        }

    }
</style>

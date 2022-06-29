<template>
    <nav role="layout">
        <LayoutTop role="top"></LayoutTop>
        <nav role="bottom">
            <nav role="main">
                <LayoutMain></LayoutMain>
            </nav>
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
            height: 7%;
            display: flex;
            align-items: center;
            background: #404040;
            color: #fff;
        }

        [role=main] {
            width: 70%;
            border-radius: 5px;
            padding: 10px;
            display: flex;
            margin-left: 15%;
            position: absolute;
            height: 90%;
        }
    }
</style>

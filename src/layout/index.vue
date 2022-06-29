<template>
    <nav role="layout">
        <LayoutTop role="top"></LayoutTop>
        <nav role="bottom">
            <nav role="left">
                <LayoutLeft></LayoutLeft>
            </nav>
            <nav role="main">
                <LayoutMain ></LayoutMain>
            </nav>
        </nav>
    </nav>
</template>

<script>

    import {LayoutLeft,LayoutMain, LayoutTop} from './components'

    export default {
        name: 'Layout',
        components: {
            LayoutMain,
            LayoutLeft,
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

        [role=bottom] {
            display: flex;
            width: 60%;
            margin: 40px auto;

            [role=main] {
                width: 80%;
                border-radius: 5px;
                padding: 10px;
                display: flex;
                margin: 0 auto;
            }

            [role=left] {
                background: #f8f8f8;
                width: 30%;
            }
        }
    }
</style>

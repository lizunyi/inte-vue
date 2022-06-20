<template>
    <nav role="layout">
        <nav role="left">
            <LayoutLeft></LayoutLeft>
        </nav>
        <nav role="right">
            <nav role="top">
                <LayoutTop></LayoutTop>
            </nav>
            <nav role="tabs">
                <LayoutTabs></LayoutTabs>
            </nav>
            <nav role="main">
                <LayoutMain></LayoutMain>
            </nav>
        </nav>
    </nav>
</template>

<script>

    import {LayoutLeft, LayoutTabs, LayoutMain, LayoutTop} from './components'

    export default {
        name: 'Layout',
        components: {
            LayoutLeft,
            LayoutTabs,
            LayoutMain,
            LayoutTop
        }
    }
</script>
<style lang="scss">
    * {
        font-size: 13px !important;
        font-family: 宋体 !important;
    }

    [role=layout] {
        display: flex;
        height: 100%;
        flex: 1 1 auto;
        background: #fff;

        [role=left] {
            width: 15%;
            color: #fff;
            background: #1890ff;
        }

        [role=right] {
            width: 83%;
            display: flex;
            flex-direction: column;

            [role=top] {
                height: 60px;
                display: flex;
                align-items: center;
            }

            [role=tabs] {
                height: 40px;
                border-radius: 5px;
                padding: 0 10px;
                align-items: center;
                display: flex;
            }

            [role=main] {
                border-radius: 5px;
                padding: 10px;
                background: linear-gradient(#f3f3f3 1%, 3%, #fff);
                box-shadow: 10px -3px 10px #e0dfdf;
                flex: 1 1 auto;
            }
        }
    }

</style>

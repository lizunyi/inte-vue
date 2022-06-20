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
            border-right:1px solid #e2e2e2;
        }

        [role=right] {
            width: 85%;
            display: flex;
            flex-direction: column;

            [role=top] {
                height: 50px;
                display: flex;
                align-items: center;
                background: #4390ff;
                color:#fff;

            }

            [role=tabs] {
                height: 40px;
                border-radius: 5px;
                align-items: center;
                display: flex;
            }

            [role=main] {
                width: 98%;
                border-radius: 5px;
                padding: 10px;
                background: linear-gradient(#f3f3f3 1%, 3%, #fff);
                box-shadow: 10px -3px 10px #e0dfdf;
                flex: 1 1 auto;
            }
        }
    }

</style>

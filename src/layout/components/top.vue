<template>
    <div class="negative-top">
        <div class="negative-logo"><img src="@/assets/images/logo.png"/></div>
        <div class="negative-module" ref="negativeModule">
            <span v-for="(item,index) in moduleList" :key="item.id" :class="{'active':item.id == curModuleInfo.id}"
                  @click="fnClickModule(item)">{{item.moduleName}}</span>
        </div>
    </div>
</template>

<script>
    import store from '@/store'
    import {mapGetters} from "vuex"

    export default {
        name: 'LayoutTop',
        computed: {
            ...mapGetters(["curModuleInfo"]),
        },
        data() {
            return {
                moduleList: [],
                curModuleId: null
            }
        },
        created() {
            this.loadTable()
        },
        methods: {
            loadTable() {
                axios
                    .reqGet('/module/search')
                    .then(res => this.moduleList = res?.data)
                    .then(res => store.dispatch('setModuleInfo', res?.[0]))
            },
            fnClickModule(row) {
                store.dispatch('setModuleInfo', row)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .negative-top {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;

        .negative-logo {
            margin-left: 40px;
        }

        .negative-module {
            margin-left: 40px;

            span {
                height: 50px;
                line-height: 50px;
                padding: 20px 30px;
                margin: 0 20px;
                cursor: pointer;
                font-size: 20px !important;
                opacity: .5;
            }

            span.active {
                opacity: 1;
            }
        }
    }
</style>

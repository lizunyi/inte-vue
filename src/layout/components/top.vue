<template>
    <div class="negative-top">
        <div class="negative-logo"><img src="@/assets/images/logo.png"/></div>
        <div class="negative-module" ref="negativeModule">
            <span v-for="(item,index) in moduleList" :key="item.id" :class="{'active':item.id == curModuleInfo.id}"
                  @click="fnClickModule(item)">{{item.moduleName}}</span>
        </div>
        <div v-if="$route.path != '/login'">
            <i class="el-icon-switch-button" @click="fnLogout"></i>
        </div>
    </div>
</template>

<script>
    import store from '@/store'
    import { getToken, setToken } from '@/utils/cookie'
    import { mapGetters } from 'vuex'

    export default {
        name: 'LayoutTop',
        computed: {
            ...mapGetters(['curModuleInfo'])
        },
        data() {
            return {
                moduleList: []
            }
        },
        created() {
            this.loadTable()
        },
        methods: {
            loadTable() {
                getToken('username') && axios
                    .reqPost('/module/search')
                    .then(res => this.moduleList = res?.data)
                    .then(res => store.dispatch('setModuleInfo', res?.[0]))
            },
            fnClickModule(row) {
                store.dispatch('setModuleInfo', row)
            },
            fnLogout() {
                this.$confirm('是否确认退出系统？', '温馨提示').then(() => {
                    this.moduleList = null
                    store.dispatch('LogOut').finally(() => {
                        this.$router.push({ path: '/login' })
                    })
                })
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
        height: 100%;

        .negative-logo {
            margin-left: 15%;
        }

        .negative-module {
            margin-left: 40px;
            min-width: 800px;

            span {
                padding: 20px 10px;
                margin: 0 10px;
                cursor: pointer;
                font-size: 15px !important;
                opacity: .5;
            }

            span.active {
                opacity: 1;
            }
        }

        .el-icon-switch-button {
            font-size: 30px !important;
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        }
    }
</style>

<template>
    <div class="negative" v-loading="active.loading">
        <div class="negative-left">
            <ul>
                <li v-for="(item,index) in table.menuList" @click="fnClickMenu(item)" >
                    <div v-html="fnMenuPath(item)"></div>
                </li>
            </ul>
        </div>
        <div class="negative-main" v-html="editorContent"></div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "index",
        computed: {
            ...mapGetters(["curModuleInfo"])
        },
        components: {},
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {}
                },
                table: {},
                editorContent : null
            }
        },
        watch: {
            curModuleInfo: function (newVal, oldVal) {
                this.loadTable(newVal)
            }
        },
        methods: {
            loadTable(curModuleInfo) {
                axios
                    .before(() => this.active.loading++)
                    .reqPost('/menu/search', {moduleId: curModuleInfo.id})
                    .then(res => this.fnCyclePath(res?.data))
                    .then(res => this.table.menuList = res)
                    .finally(() => this.active.loading--)
            },
            fnCyclePath(data) {
                this.fnCycle(data, 0, 0)
                return data
            },
            fnCycle(data, parentId, parentLevel, parentLevelLabel) {
                data?.filter(x => x.parentId == parentId).map((x, index) => {
                    x.level = parentLevel + 1
                    x.index = index
                    x.levelLabel = (parentLevelLabel ? parentLevelLabel + '.' : '') + (index + 1)
                    this.fnCycle(data, x.id, x.level, x.levelLabel)
                })
            },
            fnMenuPath(row) {
                return '<span style="margin-left:' + (row.level * 20) + 'px">' + (row.levelLabel) + ' ' + row.menuName + '</span>'
            },
            fnClickMenu(row) {
                axios
                    .reqPost('/menu/searchId', {id: row.id})
                    .then(res => this.editorContent = res?.data.content)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .negative {
        display: flex;
        width: 100%;
        margin-top: 40px;

        .negative-left {
            background: #f8f8f8;
            width: 20%;

            ul {
                padding: 0;
                margin: 0;
            }

            li {
                list-style-type: none;
                padding: 12px 5px;
                margin: 0;
                border-left: 5px solid transparent;
            }

            li:hover {
                background: #fff;
                cursor: pointer;
                border-left: 5px solid #5a6166;
            }
        }

        .negative-main {
            width: 80%;
            display: flex;
            margin-left: 60px;
        }
    }
</style>


<template>
    <div class="negative" v-loading="active.loading">
        <div class="negative-left">
            <div class="module-title">{{curModuleInfo.moduleName}}</div>
            <ul>
                <li v-for="(item,index) in table.menuList" :class="{'active':active.selected==item.id}" @click="fnClickMenu(item)">
                    <div v-html="fnMenuPath(item)"></div>
                </li>
            </ul>
        </div>
        <div class="negative-main">
            <div class="negative-main-tile">
                {{editorTitle}}
            </div>
            <div class="negative-main-body" v-html="editorContent">

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'index',
        computed: {
            ...mapGetters(['curModuleInfo'])
        },
        components: {},
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {},
                    selected:''
                },
                table: {},
                editorTitle: null,
                editorContent: null,
                cacheCurModuleInfo: null
            }
        },
        watch: {
            curModuleInfo: function(newVal, oldVal) {
                if (newVal && this.cacheCurModuleInfo != newVal) {
                    this.cacheCurModuleInfo = newVal
                    this.loadTable()
                }
            }
        },
        methods: {
            loadTable() {
                this.editorTitle = null
                this.editorContent = null
                axios
                    .before(() => this.active.loading++)
                    .reqPost('/menu/search', { moduleId: this.cacheCurModuleInfo?.id })
                    .then(res => this.fnCyclePath(res?.data))
                    .then(res => this.table.menuList = res)
                    .then(res => {
                        let row = this.table.menuList.filter(x=> x.defaultShow == 1)[0]
                        this.fnClickMenu(row)
                    })
                    .finally(() => this.active.loading--)
            },
            fnCyclePath(data) {
                this.fnCycle(data, 0, 0)
                data?.sort((x1, x2) => x1.sort < x2.sort ? -1 : 1)
                return data
            },
            fnCycle(data, parentId, parentLevel, parentLevelLabel) {
                data?.filter(x => x.parentId == parentId).map((x, index) => {
                    x.level = parentLevel + 1
                    x.index = index
                    x.levelLabel = (parentLevelLabel ? parentLevelLabel + '.' : '') + (index + 1)
                    let y = x.levelLabel.split('\.')
                    let len = y.length
                    x.sort = y.map((m,index)=> m * Math.pow(10,len - index)).reduce(function(total,curNumber){
                        total += curNumber
                    },0)
                    this.fnCycle(data, x.id, x.level, x.levelLabel)
                })
            },
            fnMenuPath(row) {
                return '<span style="margin-left:' + (row.level * 20) + 'px">' + (row.levelLabel) + ' ' + row.menuName + '</span>'
            },
            fnClickMenu(row) {
                this.active.selected = row.id
                this.editorTitle = (row.levelLabel) + ' ' + row.menuName
                axios
                    .reqPost('/menu/searchId', { id: row.id })
                    .then(res => this.editorContent = res.data.content)
            }
        }
    }
</script>

<style lang="scss">
    .negative {
        display: flex;
        width: 100%;
        margin-top: 40px;

        .module-title {
            padding: 20px 20px 10px 20px;
            font-size:25px !important;
        }

        .negative-left {
            background: #f8f8f8;
            width: 20%;
            min-width: 250px;

            ul {
                padding: 0;
                margin: 0;
                background: #f8f8f8;
            }

            li {
                list-style-type: none;
                padding: 12px 5px;
                margin: 0;
                border-left: 5px solid transparent;
            }

            li:hover,li.active {
                background: #fff;
                cursor: pointer;
                border-left: 5px solid #5a6166;
            }
        }


        .negative-main {
            width: 80%;
            margin-left: 60px;


            .negative-main-tile {
                padding-bottom: 10px;
                margin-bottom: 10px;
                font-size: 20px !important;
                font-weight: bold;
                border-bottom: 1px solid #dfe2e5;
            }

            .negative-main-body {
                table td, th {
                    border: 1px solid #b1afaf;
                    padding: 6px 13px;
                    height: 30px;
                    min-width: 80px;
                }

                table tr:first-child td, th {
                    background: #dfe2e5;
                }

                pre {
                    background: #dfe2e5;
                }
            }
        }
    }
</style>


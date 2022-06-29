<template>
    <div>
        <el-button type="primary" @click="btnAddMenu" style="background:#404040;border:0px;opacity: .8">新增</el-button>
        <hr style="border-color:#fff"/>
        <el-table v-loading="active.loading" :data="table.menuList">
            <el-table-column label="菜单名称" prop="menuName" align="left">
                <div slot-scope="scope" v-html="fnMenuPath(scope.row)"></div>
            </el-table-column>
            <el-table-column label="操作" prop="remark" align="right">
                <template slot-scope="scope">
                    <el-link type="primary" @click="fnView(scope.row)">预览</el-link>&nbsp;
                    <el-link type="primary" @click="fnEdit(scope.row)">编辑</el-link>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="active.dialog.title" v-if="active.dialog.visible" :visible.sync="active.dialog.visible"
                   :class="active.dialog.className">
            <popEditor @refresh="refresh" v-if="active.dialog.list.includes('editor')"
                       :editMenuInfo="editMenuInfo"></popEditor>
            <popViewer @refresh="refresh" v-if="active.dialog.list.includes('viewer')"
                       :viewMenuInfo="viewMenuInfo"></popViewer>
            <popAddMenu @refresh="refresh" v-if="active.dialog.list.includes('addMenu')"></popAddMenu>
        </el-dialog>
    </div>
</template>

<script>
    import popEditor from '@/views/editor/edit'
    import popViewer from '@/views/editor/view'
    import popAddMenu from '@/views/pop/addMenu'
    import {mapGetters} from "vuex"

    export default {
        name: "list",
        components: {
            popEditor,
            popViewer,
            popAddMenu
        },
        computed: {
            ...mapGetters(["curModuleInfo"])
        },
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {}
                },
                content: null,
                table: {},
                editMenuInfo: null,
                viewMenuInfo: null
            }
        },
        watch: {
            curModuleInfo: function (newVal, oldVal) {
                this.loadTable(newVal)
            }
        },
        methods: {
            btnAddMenu() {
                this.openDialog('添加模块/菜单', 'addMenu')
            },
            loadTable(curModuleInfo) {
                axios
                    .before(() => this.active.loading++)
                    .reqPost('/menu/search', {moduleId: curModuleInfo.id})
                    .then(res => this.fnCyclePath(res?.data))
                    .then(res => this.table.menuList = res)
                    .finally(() => this.active.loading--)
            },
            refresh() {
                this.loadTable()
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
            fnEdit(row) {
                this.editMenuInfo = {id: row.id}
                this.openDialog((row.levelLabel) + '、' + row.menuName, 'editor', {
                    className: 'full-dialog'
                })
            },
            fnView(row) {
                this.viewMenuInfo = {id: row.id}
                this.openDialog((row.levelLabel) + '、' + row.menuName, 'viewer', {
                    className: 'full-dialog'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


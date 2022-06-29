<template>
    <div>
        <el-button type="primary" @click="btnAddMenu">新增</el-button>

        <el-table v-loading="active.loading" :data="table.menuList" ref="table">
            <el-table-column label="菜单名称" prop="menuName" align="left"/>
            <el-table-column label="操作" prop="remark" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="fnView(scope.row)">预览</el-link>&nbsp;
                    <el-link type="primary" @click="fnEdit(scope.row)">编辑</el-link>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="active.dialog.title" v-if="active.dialog.visible" :visible.sync="active.dialog.visible" :class="active.dialog.className">
            <popEditor @refresh="refresh" v-if="active.dialog.list.includes('editor')" :editMenuInfo="editMenuInfo"></popEditor>
            <popAddMenu @refresh="refresh" v-if="active.dialog.list.includes('addMenu')"></popAddMenu>
        </el-dialog>
    </div>
</template>

<script>
    import popEditor from '@/views/editor/edit'
    import popAddMenu from '@/views/pop/addMenu'

    export default {
        name: "list",
        components: {
            popEditor,
            popAddMenu
        },
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {}
                },
                content: null,
                table: {},
                editMenuInfo: null
            }
        },
        mounted() {
            this.loadTable()
        },
        methods: {
            btnAddMenu() {
                this.openDialog('添加模块/菜单', 'addMenu')
            },
            loadTable() {
                axios
                    .before(() => this.active.loading++)
                    .reqGet('/menu/search')
                    .then(res => this.table.menuList = res?.data)
                    .finally(() => this.active.loading--)
            },
            refresh() {
                this.loadTable()
            },
            fnView() {

            },
            fnEdit(row) {
                this.editMenuInfo = {
                    id: row.id
                }
                this.openDialog('编辑内容', 'editor',{
                    className:'full-dialog'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


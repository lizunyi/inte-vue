<template>
    <div>
        <el-tabs v-model="tab.activeName" type="card" @tab-click="refresh">
            <el-tab-pane label="用户管理" name="user">
                <el-button type="primary" @click="btnAddUser" style="background:#404040;border:0px;opacity: .8">新增用户</el-button>
                <hr style="border-color:#fff"/>
                <el-table v-loading="active.loading" :data="table.userList">
                    <el-table-column label="账号" prop="userName" align="center"></el-table-column>
                    <el-table-column label="密码" prop="password" align="center"></el-table-column>
                    <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" align="center">
                        <template slot-scope="scope">
                            {{ ['/','正常','停用'][scope.row.status] }}
                        </template>
                    </el-table-column>
                    <el-table-column label="是否管理员" prop="isAdmin" align="center">
                        <template slot-scope="scope">
                            {{ ['/','是','否'][scope.row.isAdmin] }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="remark" align="right">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="fnUserEdit(scope.row)">编辑</el-link>&nbsp;
                            <el-link type="primary" @click="fnUserDel(scope.row)">停用</el-link>&nbsp;
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="模块/菜单管理" name="menu">
                <el-button type="primary" @click="btnAddMenu" style="background:#404040;border:0px;opacity: .8">新增模块/菜单</el-button>
                <hr style="border-color:#fff"/>
                <el-table v-loading="active.loading" :data="table.menuList">
                    <el-table-column label="菜单名称" prop="menuName" align="left">
                        <div slot-scope="scope" v-html="fnMenuPath(scope.row)"></div>
                    </el-table-column>
                    <el-table-column label="操作" prop="remark" align="right">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="fnMenuView(scope.row)">预览</el-link>&nbsp;
                            <el-link type="primary" @click="fnMenuEdit(scope.row)">编辑</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="active.dialog.title" v-if="active.dialog.visible" :visible.sync="active.dialog.visible"
                   :class="active.dialog.className">
            <popEditor @refresh="refresh" v-if="active.dialog.list.includes('editor')"
                       :editMenuInfo="editMenuInfo"></popEditor>
            <popViewer @refresh="refresh" v-if="active.dialog.list.includes('viewer')"
                       :viewMenuInfo="viewMenuInfo"></popViewer>
            <popAddMenu @refresh="refresh" v-if="active.dialog.list.includes('addMenu')"></popAddMenu>
            <popAddUser @refresh="refresh" v-if="active.dialog.list.includes('addUser')"></popAddUser>
            <popEditUser @refresh="refresh" v-if="active.dialog.list.includes('editUser')" :userInfo="selected.userInfo"></popEditUser>
        </el-dialog>
    </div>
</template>

<script>
    import popEditor from '@/views/editor/edit'
    import popViewer from '@/views/editor/view'
    import popAddMenu from '@/views/pop/addMenu'
    import popAddUser from '@/views/pop/addUser'
    import popEditUser from '@/views/pop/editUser'
    import { mapGetters } from 'vuex'

    export default {
        name: 'list',
        components: {
            popEditor,
            popViewer,
            popAddMenu,
            popAddUser,
            popEditUser
        },
        computed: {
            ...mapGetters(['curModuleInfo'])
        },
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {}
                },
                tab: {
                    activeName: 'user'
                },
                selected: {},
                content: null,
                table: {},
                editMenuInfo: null,
                viewMenuInfo: null,
                cacheCurModuleInfo: null
            }
        },
        watch: {
            curModuleInfo: function(newVal, oldVal) {
                if (newVal && this.cacheCurModuleInfo != newVal) {
                    this.cacheCurModuleInfo = newVal
                    this.loadTable('menu')
                }
            }
        },
        methods: {
            btnAddMenu() {
                this.openDialog('添加模块/菜单', 'addMenu')
            },
            btnAddUser() {
                this.openDialog('添加用户', 'addUser')
            },
            loadTable() {
                if (this.tab.activeName == 'user') {
                    axios
                        .before(() => this.active.loading++)
                        .reqPost('/user/search')
                        .then(res => this.table.userList = res?.data)
                        .finally(() => this.active.loading--)
                } else {
                    axios
                        .before(() => this.active.loading++)
                        .reqPost('/menu/search', { moduleId: this.cacheCurModuleInfo?.id })
                        .then(res => this.fnCyclePath(res?.data))
                        .then(res => this.table.menuList = res)
                        .finally(() => this.active.loading--)
                }
            },
            refresh() {
                this.loadTable()
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
            fnMenuEdit(row) {
                this.editMenuInfo = { id: row.id }
                this.openDialog((row.levelLabel) + ' ' + row.menuName, 'editor', {
                    className: 'full-dialog'
                })
            },
            fnMenuView(row) {
                this.viewMenuInfo = { id: row.id }
                this.openDialog((row.levelLabel) + ' ' + row.menuName, 'viewer', {
                    className: 'full-dialog'
                })
            },
            fnUserEdit(row) {
                this.selected.userInfo = {
                    ...row, isAdmin: row['isAdmin'] + '', status: row['status'] + ''
                }
                this.openDialog('编辑账户', 'editUser')
            },
            fnUserDel(row) {
                this.$confirm('是否确认停用该账号?', '温馨提示').then(() => {
                    axios
                        .before(() => this.active.loading++)
                        .reqPost('/user/delete', { id: row.id })
                        .then(res => {
                            if (res.code == 0) {
                                this.refresh()
                                this.$alert('已停用')
                            } else {
                                this.$alert(res.msg)
                            }
                        })
                        .finally(() => this.active.loading--)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


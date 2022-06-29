<template>
    <el-form v-loading="active.loading" label-width="80px">
        <el-form-item label="模块/菜单">
            <el-radio-group v-model="form.isModuleMenu">
                <el-radio label="1">模块</el-radio>
                <el-radio label="2">菜单</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="选择模块" v-if="form.isModuleMenu == 2" :required="true">
            <el-select v-model="form.moduleId" placeholder="选择模块" :class="classes('moduleId')" clearable filterable>
                <el-option v-for="(item, index) in init.moduleList" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" v-if="form.isModuleMenu == 2">
            <el-select v-model="form.parentId" placeholder="父级菜单" :class="classes('parentId')" clearable
                       filterable>
                <el-option v-for="(item, index) in init.menuList" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名称" :required="true">
            <el-input v-model="form.moduleMenuName" :class="classes('moduleMenuName')"/>
        </el-form-item>
        <el-row style="margin-top:20px;text-align:center">
            <el-button @click="save" type="success">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "addMenu",
        components: {},
        data() {
            return {
                active: {
                    loading: false,
                    allowEdit: false,
                    editStyle: [],
                },
                form: {},
                init: {}
            }
        },
        created() {
        },
        mounted() {
            this.loadData()
        },
        computed: {
            classes() {
                return (prop) => {
                    if (this.active.editStyle.includes(prop)) {
                        return ['error']
                    }
                    return ['']
                }
            }
        },
        methods: {
            hide() {
                this.$parent.hide()
            },
            cancel() {
                this.hide()
            },
            loadData() {
                this.active.loading++
                let future = [
                    axios
                        .reqPost('/module/search')
                        .then(res => {
                            return {flag: 1, data: res?.data}
                        }),
                    axios
                        .reqPost('/menu/search')
                        .then(res => {
                            return {flag: 2, data: res?.data}
                        })
                ]
                Promise.all(future)
                    .then((result = []) => {
                        this.init.moduleList = result.filter(x => x.flag == 1).flatMap(x => x?.data).map(x => {
                            return {value: String(x.id), label: x.moduleName}
                        }) ?? []
                        console.log(this.init.moduleList)
                        this.init.menuList = result.filter(x => x.flag == 2).flatMap(x => x?.data).map(x => {
                            return {value: String(x.id), label: x.menuName}
                        }) ?? []
                    })
                    .finally(() => this.active.loading--)
            },
            save() {
                let reqData = {}
                this.active.editStyle = []
                if (this.form.isModuleMenu == 1) {
                    reqData.moduleName = this.form.moduleMenuName
                } else if (this.form.isModuleMenu == 2) {
                    reqData.menuName = this.form.moduleMenuName
                    reqData.parentId = this.form.parentId
                    reqData.moduleId = this.form.moduleId
                    if (!reqData.moduleId) {
                        this.active.editStyle.push('moduleId')
                    }
                }

                if (!this.form.moduleMenuName) {
                    this.active.editStyle.push('moduleMenuName')
                }
                if (this.active.editStyle.length > 0) {
                    return
                }

                axios
                    .before(() => this.active.loading++)
                    .reqPost(['', '/module/insert', '/menu/insert'][this.form.isModuleMenu], reqData)
                    .then(res => {
                        if (res?.code == 0) {
                            this.hide()
                            this.$emit('refresh')
                            this.$alert('已提交')
                        } else {
                            this.$alert(res?.msg)
                        }
                    })
                    .finally(() => this.active.loading--)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


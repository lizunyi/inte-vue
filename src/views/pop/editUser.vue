<template>
    <el-form v-loading="active.loading" label-width="120px">
        <el-form-item label="账号">
            <el-input v-model="formData.userName" :class="classes('userName')"/>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password" :class="classes('password')"/>
        </el-form-item>
        <el-form-item label="企业名称">
            <el-input v-model="formData.companyName" :class="classes('companyName')"/>
        </el-form-item>
        <el-form-item label="是否为管理员">
            <el-select v-model="formData.isAdmin" :class="classes('isAdmin')">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="formData.status" :class="classes('status')">
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="2"></el-option>
            </el-select>
        </el-form-item>

        <el-row style="margin-top:20px;text-align:center">
            <el-button @click="save" type="success">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: 'editUser',
        components: {},
        data() {
            return {
                compareIns: null,
                active: {
                    loading: false,
                    editStyle: []
                },
                formData: null
            }
        },
        props: ['userInfo'],
        mounted() {
            this.formData = Object.assign({}, this.userInfo)
            this.compareIns = initCompare()
            this.formCompare()
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
            formCompare() {
                let isChange = this.compareIns.set([
                    { key: 'id', val: this.formData.id, label: 'id', fixed: true },
                    { key: 'userName', val: this.formData.userName, label: '账号', valid: ['required'], fixed: true },
                    { key: 'password', val: this.formData.password, label: '密码', valid: ['required'], fixed: true },
                    { key: 'companyName', val: this.formData.companyName, label: '企业名称', valid: ['required'], fixed: true },
                    { key: 'isAdmin', val: this.formData.isAdmin, label: '是否管理员', valid: ['required'], fixed: true },
                    { key: 'status', val: this.formData.status, label: '状态', valid: ['required'], fixed: true }
                ])
                return isChange
            },
            save() {
                let isChange = this.formCompare()
                this.active.editStyle = []
                let { keys, tips } = this.compareIns.valid()
                if (tips) {
                    this.$alert(tips.join('<br/>'), '验证提示')
                    this.active.editStyle = keys
                    return
                }
                if (!isChange) {
                    return
                }
                let reqData = this.compareIns.get()
                axios
                    .before(() => this.active.loading++)
                    .reqPost('/user/update', reqData)
                    .then(res => {
                        if (res.code == 0) {
                            this.hide()
                            this.$emit('refresh')
                            this.$alert('已修改')
                        } else {
                            this.$alert(res.msg)
                        }
                    })
                    .finally(() => this.active.loading--)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


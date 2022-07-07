<template>
    <el-form class="login" v-loading="active.loading > 0">
        <el-form-item label="账号">
            <el-input v-model="formData.username" :class="classes('username')"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password" type="password" :class="classes('password')"></el-input>
        </el-form-item>
        <el-form-item class="btn">
            <el-button type="primary" @click="fnLogin">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import store from '../store'

    export default {
        name: 'index',
        computed: {
            classes() {
                return (prop) => {
                    if (this.active.editStyle.includes(prop)) {
                        return ['error']
                    }
                    return null
                }
            }
        },
        components: {},
        data() {
            return {
                compareIns: null,
                active: {
                    loading: 0,
                    editStyle: []
                },
                formData: {
                    username: '',
                    password: ''
                }
            }
        },
        created() {
            this.compareIns = initCompare()
            this.formCompare()
        },
        methods: {
            fnLogin() {
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
                this.active.loading++
                store.dispatch('Login', reqData)
                    .then((res) => {
                        this.$router.push({ path: this.redirect || '/index' })
                    })
                    .catch(x => this.$alert(x))
                    .finally(() => this.active.loading--)
            },
            formCompare() {
                let isChange = this.compareIns.set([
                    { key: 'username', val: this.formData.username, label: '账号', valid: ['required'], fixed: true },
                    { key: 'password', val: this.formData.password, label: '密码', valid: ['required'], fixed: true }
                ])
                return isChange
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        position: absolute;
        top: 30%;
        left: 40%;
        width: 20%;
        margin: 0 auto;
        background: #f8f8f8;
        border: 1px solid rgba(204, 204, 204, 0.09);
        padding: 20px 20px 0 20px;
        border-radius: 15px;

        .btn {
            text-align: center;
        }
    }

</style>


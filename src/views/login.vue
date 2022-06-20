<template>
    <el-form :inline="true">
        <el-form-item label="账号">
            <el-input v-model="loginForm.username" type="text" placeholder="账号">
            </el-input>
        </el-form-item>
        <el-form-item label="密碼">
            <el-input v-model="loginForm.password" type="text" placeholder="密码">
            </el-input>
        </el-form-item>
        <el-row style="margin-top:20px;text-align:center">
            <el-button @click="save" type="success">登录</el-button>
        </el-row>
    </el-form>
</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "admin",
                password: "admin123"
            }
        }
    },
    created() {

    },
    methods: {
        save() {
            this.$store.dispatch("Login", this.loginForm).then((res) => {
                this.$router.push({path: this.redirect || "/"}).catch(() => {
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

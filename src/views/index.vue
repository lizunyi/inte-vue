<template>
    <div>
        <div v-html="content"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {},
        data() {
            return {
                content: null
            }
        },
        mounted() {
            this.content = "<h2 id=\"jei5j\"><p>支持新增和更新员工信息/用车规则,仅支持单条导入,更新员工信息以手机号或者外部用户Id为唯一标识</p><p>该接口适用于支使用绿色公务APP叫车、免登企业H5叫车</p><p><strong>请求地址：</strong>&nbsp;/v2/common/addOrUpdateCompanyEmpV2</p><p><strong>服务协议：</strong>&nbsp;HTTP/POST</p><p><strong>Content-Type：</strong>&nbsp;application/x-www-form-urlencoded</p><p>q</p></h2>"
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>


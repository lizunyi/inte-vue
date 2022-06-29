<template>
    <div v-loading="active.loading">
        <div v-html="editorContent"></div>
        <el-row class="editor-btn">
            <el-button @click="cancel">取消</el-button>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "EditorView",
        data() {
            return {
                active: {
                    loading: 0
                },
                editorContent : null
            }
        },
        props: {
            viewMenuInfo: {
                type: Object,
                default: () => {}
            }
        },
        created() {
            axios
                .before(() => this.active.loading++)
                .reqPost('/menu/searchId', {id: this.viewMenuInfo.id})
                .then(res => this.editorContent = res?.data.content)
                .finally(() => this.active.loading--)
        },
        methods: {
            hide() {
                this.$parent.hide()
            },
            cancel() {
                this.hide()
            }
        }
    }
</script>

<style lang="scss">
</style>


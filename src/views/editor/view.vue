<template>
    <div v-loading="active.loading">
        <div class="editorView">
            <div v-html="editorContent"></div>
        </div>
        <el-row class="editor-btn">
            <el-button @click="cancel">取消</el-button>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'EditorView',
        data() {
            return {
                active: {
                    loading: 0
                },
                editorContent: null
            }
        },
        props: {
            viewMenuInfo: {
                type: Object,
                default: () => {
                }
            }
        },
        created() {
            axios
                .before(() => this.active.loading++)
                .reqPost('/menu/searchId', { id: this.viewMenuInfo.id })
                .then(res => this.editorContent = res.data.content)
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
    .editorView {
        overflow: auto;
        position: absolute;
        height: 86%;
        width: 99%;
        left: 1%;
        bottom: 50px;

        table td, th {
            border: 1px solid #dfe2e5;
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
</style>


<template>
    <div>
        <div ref="editorElem" class="editor"></div>
        <el-row class="editor-btn">
            <el-button type="primary" @click="save">提交</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-row>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: "Editor",
        data() {
            return {
                active: {
                    loading: 0,
                    dialog: {}
                },
                editIns: {},
                editorContent : null
            }
        },
        props: {
            editMenuInfo: {
                type: Object,
                default: () => {}
            }
        },
        created() {
            axios
                .before(() => this.active.loading++)
                .reqPost('/menu/searchId', {id: this.editMenuInfo.id})
                .then(res => this.editorContent = res.data.content)
                .then(res => this.editIns.txt.html(res))
                .finally(() => this.active.loading--)
        },
        mounted() {
            this.editIns = new E(this.$refs.editorElem);
            this.editIns.customConfig = {
                uploadImgServer: '/api/UploadImg',
                uploadFileName: 'Content',
                uploadImgMaxLength: 1,
            }
            this.editIns.create()
            this.editIns.txt.html(this.editorContent)
        },
        methods: {
            save() {
                axios
                    .before(() => this.active.loading++)
                    .reqPost('/menu/update', {
                        id: this.editMenuInfo.id,
                        content: this.editIns.txt.html()
                    })
                    .then(res => {
                        if (res.code == 0) {
                            this.$message.success('已提交')
                        } else {
                            this.$alert(res.msg)
                        }
                    })
                    .finally(() => this.active.loading--)
            },
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
    .editor {
        width: 100%;
        height: 93%;
        position: absolute;

        .w-e-text-container {
            height: 85% !important;
        }
        .w-e-toolbar p, .w-e-text-container p, .w-e-menu-panel p{
            font-size:inherit !important;
        }
    }

    .editor-btn {
        position: absolute;
        bottom: 10px;
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>


<template>
    <div class="negative-top">
        <ul>
            <li>首页</li>
            <li v-for="tag in tags">
                {{ tag }}
            </li>
        </ul>
        <div class="opear">
            <el-popover
                placement="top-start"
                title="用户信息"
                width="200"
                trigger="hover"
                :content="getUserInfo()">
                <i class="el-icon-user-solid" slot="reference"></i>
            </el-popover>
            <i class="el-icon-bell"></i>
            <i class="el-icon-goods"></i>
            <i class="exit">退</i>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'LayoutTop',
        computed: {
            ...mapGetters(["routes"])
        },
        data() {
            return {
                tags: null
            }
        },
        methods: {
            getUserInfo() {
                return `姓名：${this.$store.getters.name} 年龄：5`
            },
            cycleFind(initTag, x, path) {
                if (x.path == path) {
                    initTag.push(x.meta.title)
                    initTag.push('>')
                    return x
                }
                let o
                x?.children?.forEach(y => {
                    let p = this.cycleFind(initTag, y, path) ?? null
                    if (p) o = p
                })
                if (o) {
                    initTag.push(x.meta.title)
                    initTag.push('>')
                    return x
                }
            },
            initTags() {
                if (this.$route.path != "/") {
                    let initTag = []
                    this.routes?.forEach(x => {
                        this.cycleFind(initTag, x, this.$route.path)
                    })
                    this.tags = initTag.reverse()
                }
            }
        },
        watch: {
            $route() {
                this.initTags()
            }
        },
        mounted() {
            this.initTags()
        }
    }
</script>
<style lang="scss" scoped>
    .negative-top {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;

        ul {
            margin: 0;
            padding: 0;
            display: flex;

            li {
                list-style-type: none;
                display: flex;
                align-items: center;
                padding: 0 10px;
            }
        }

        .opear {
            position: absolute;
            right: 10px;
            display: flex;
            align-items: center;

            .exit {
                font-style: normal;
                width: 18px;
                height: 18px;
                border-radius: 18px;
                border: 1px solid #fff;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            i {
                margin-left: 20px;
                cursor: pointer;
                user-select: none;
                transition: 0.1s all linear;
            }

            i::before {
                font-size: 20px;
            }

            i:hover {
                transition: .2s all linear;
                transform: scale(1.5);
            }
        }
    }
</style>

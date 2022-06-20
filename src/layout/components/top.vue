<template>
    <div class="negative-top">
        <ul>
            <li>
                <i class="el-icon-s-home" />
            </li>
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
            <i class="el-icon-switch-button"></i>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'LayoutTop',
        computed: {
            ...mapGetters(["tiledRoutes"])
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
            initTags() {
                if (this.$route.path != "/") {
                    let titles = this.tiledRoutes?.filter(x => x.path == this.$route.path).map(x => x.titles)[0]
                    this.tags = titles.map((x, index) => ['/', x]).flatMap(x => x)
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

            li:first-child {
                margin-right: 10px
            }

            li {
                list-style-type: none;
                display: flex;
                align-items: center;
                padding: 0 3px;
            }
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
        .opear {
            position: absolute;
            right: 10px;
            display: flex;
            align-items: center;

            i:hover {
                transition: .2s all linear;
                transform: scale(1.5);
            }
        }
    }
</style>

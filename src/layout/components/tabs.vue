<template>
    <div class="tabViews">
        <i class="el-icon-arrow-left"></i>
        <ul>
            <router-link
                v-for="tag in visitedViews"
                :key="tag.fullPath"
                :class="isActive(tag)?'active':''"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                tag="li"
            >
                {{ tag.title }}
                <i class="el-icon-error"></i>
            </router-link>
        </ul>
        <i class="el-icon-arrow-right"></i>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'LayoutTabs',
        computed: {
            ...mapGetters(["routes"]),
            visitedViews() {
                return this.$store.state.tabViews.visitedViews
            }
        },
        methods: {
            cycleFind(initTag, x, path) {
                if (x.path == path) {
                    if (initTag.length == 0) {
                        initTag.push(x)
                        return
                    }
                }
                x?.children?.forEach(y => {
                    return this.cycleFind(initTag, y, path) ?? null
                })
            },
            isActive(route) {
                return route.fullPath === this.$route.fullPath
            },
            initTags() {
                if (this.$route.path != "/") {
                    let initTag = []
                    this.routes?.forEach(x => {
                        this.cycleFind(initTag, x, this.$route.path)
                    })
                    this.$store.dispatch('tabViews/addVisitedView', initTag[0])
                }
            },
            addTags() {
                if (this.$route.path && this.$route.path != "/") {
                    this.$store.dispatch('tabViews/addView', this.$route)
                }
                return false
            }
        },
        watch: {
            $route() {
                this.addTags()
            }
        },
        mounted() {
            this.addTags()
        }
    }
</script>
<style lang="scss" scoped>
    .tabViews {
        user-select: none;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;

        i {
            position: absolute;
            cursor: pointer;
        }

        i.el-icon-arrow-left {
            left: 10px
        }

        i.el-icon-arrow-right {
            right: 10px
        }

        i:before {
            font-size: 15px;
        }

        ul {
            margin: 0;
            padding: 0;
            display: flex;
            font-size: 13px;
            cursor: pointer;
            position: absolute;
            width: 100%;
            left: 35px;

            li {
                list-style-type: none;
                margin-right: 5px;
                position: relative;
                display: flex;
                align-items: center;
                padding: 5px 30px 5px 20px;
                border: 1px solid #8aadc1;
                border-radius: 3px;

                i {
                    position: absolute;
                    right: 5px;
                }
            }

            li.active {
                border: none;
                color: #fff;
                background: #4390ff;
            }

        }
    }
</style>

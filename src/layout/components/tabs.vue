<template>
    <div class="tabViews">
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

    </div>
</template>

<script>

import { mapGetters } from "vuex";

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
                let initTag = [];
                this.routes?.forEach(x => {
                    this.cycleFind(initTag, x, this.$route.path)
                })
                this.$store.dispatch('tabViews/addVisitedView', initTag[0])
            }
        },
        addTags() {
            const {name} = this.$route
            if (name) {
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
        // this.initTags()
        this.addTags()
    }
}
</script>
<style lang="scss" scoped>
.tabViews {
    user-select: none;

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        font-size: 13px;
        cursor: pointer;

        li {
            list-style-type: none;
            margin-right: 5px;
            position: relative;
            display: flex;
            align-items: center;
            padding: 5px 30px 5px 20px;
            color: #495060;
            border: 1px solid #ccc;
            border-radius: 3px;

            i {
                position: absolute;
                right: 5px;
            }
        }

        li.active {
            border: none;
            box-shadow: 0px 0px 3px #4fa0fa;
            background: #409EFF;
            color: #fff;
        }

        //li.active::before {
        //    content: ' ';
        //    width: 8px;
        //    height: 8px;
        //    background: #fff;
        //    position: absolute;
        //    border-radius: 8px;
        //    left: 8px;
        //}
    }
}
</style>

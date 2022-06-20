<template>
    <div class="negative-top">
        <ul>
            <li>首页</li>
            <li v-for="tag in tags">
                {{ tag }}
            </li>
        </ul>

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
        ul {
            margin: 0;
            padding: 0;
            display: flex;

            li {
                list-style-type: none;
                display: flex;
                align-items: center;
                padding: 10px;
                color: #495060;
            }
        }
    }
</style>

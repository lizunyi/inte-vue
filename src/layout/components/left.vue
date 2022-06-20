<template>
    <div class="negative-left">
        <div v-for="(route,index) in routes" v-if="!route.hidden">
            <div class="item" @click="expandMenuName = route.name" :class="isActive(route) ? 'active' : ''">
                <span>{{route.meta.title}}</span>
                <i class="el-icon-caret-right " :class="isActive(route) ? 'rotate' : 'normal'"></i>
            </div>
            <ul v-if="isActive(route)">
                <router-link tag="li" v-for="child in route.children" :key="child.path"
                             :to="{ path: child.path, query: child.query, fullPath: child.fullPath }">
                    {{ child.meta.title }}
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'LayoutLeft',
        computed: {
            ...mapGetters(["routes"])
        },
        data() {
            return {
                expandMenuName: null
            }
        },
        methods: {
            isActive(route) {
                return route.name == this.expandMenuName
            }
        }
    }
</script>
<style lang="scss" scoped>
    .negative-left {
        cursor: pointer;
        user-select: none;

        .item {
            padding: 10px 20px;
            position: relative;
            display: flex;
            align-items: center;

            i {
                position: absolute;
                right: 10px;
            }
        }
        .item.active{
            /*background: #2e72c7;*/
        }

        ul {
            margin: 0;
            padding: 0;
            font-size: 13px;
            cursor: pointer;

            li {
                list-style-type: none;
                position: relative;
                align-items: center;
                display: flex;
                padding: 10px 50px;
                align-items: center;
                border: none;
            }

            li.router-link-active {
                box-shadow: 0px 0px 3px #4fa0fa;
                background: #0a468d !important;
            }

            li:hover {
                background: #1070e1;
            }
        }

        .normal {
            transition: all 0.1s linear;
        }

        .rotate {
            transition: all 0.3s linear;
            transform: rotate(90deg);
        }
    }


</style>

<template>
    <div class="negative-left">
        <div class="title">后台管理系统</div>
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

        .title {
            height: 70px;
            display: flex;
            align-items: center;
            font-size: 20px !important;
            font-weight: bold;
            justify-content: center;
            /*background: #4390ff;*/
        }

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
                background: #4390ff !important;
                color: #fff;
            }

            li:hover {
                background: rgba(#409EFF, 0.4);
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

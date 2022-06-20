<template>

    <el-form ref="loginForm" label-width="80" size="small" :inline="true">
        <el-row>
            <el-form-item label="文本框">
                <el-input v-model="this.$store.getters.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="下拉框">
                <el-select v-model="form.select" clearable>
                    <el-option value="1" label="选项1"></el-option>
                    <el-option value="2" label="选项2"></el-option>
                    <el-option value="3" label="选项3"></el-option>
                    <el-option value="4" label="选项4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单选组">
                <el-radio-group v-model="form.radio">
                    <el-radio label="周杰倫" value="2"></el-radio>
                    <el-radio label="周杰倫2" value="3"></el-radio>
                    <el-radio label="周杰倫3" value="4"></el-radio>
                    <el-radio label="周杰倫4" value="5"></el-radio>
                    <el-radio label="周杰倫5" value="6"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="多选组">
                <el-checkbox-group v-model="form.checkbox2">
                    <el-checkbox label="周杰倫2" :value="'2'"></el-checkbox>
                    <el-checkbox label="周杰倫3" :value="'3'"></el-checkbox>
                    <el-checkbox label="周杰倫4" :value="'4'"></el-checkbox>
                    <el-checkbox label="周杰倫5" :value="'5'"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="用戶名">
                <el-input v-model="this.$store.getters.roles.join(',')" clearable></el-input>
            </el-form-item>
            <el-form-item label="用戶名">
                <el-input v-model="this.$store.getters.permissions.join(',')" clearable></el-input>
            </el-form-item>
            <el-form-item label="用戶名">
                <el-input clearable></el-input>
            </el-form-item>
            <el-form-item label="用戶名">
                <el-input clearable></el-input>
            </el-form-item>
        </el-row>
        <el-row class="searchPan">
            <el-col :span="24">
                <el-button type="primary">查询</el-button>
                <el-button type="info">重置</el-button>
                <el-button type="warning">高级筛选</el-button>
            </el-col>
        </el-row>
        <el-table :data="table.data">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
        </el-table>
        <el-pagination @size-change="searchList" @current-change="searchList" :current-page.sync="table.page"
                       :page-size.sync="table.limit"
                       :total="100"></el-pagination>
    </el-form>

</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                dialog: {
                    visible: false
                },
                form: {
                    checkbox2: ['2', '3']
                },
                table: {
                    page: 1,
                    limit: 10,
                    data: []
                }
            }
        },
        created() {
            for (let i = 0; i < 2; i++) {
                this.table.data.push({
                    "name": "李尊怡" + i,
                    "age": 10
                })
            }
        },
        methods: {
            searchList() {
                console.log(this.table)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .searchPan {
        text-align: center;
        margin-bottom: 10px;
    }
</style>


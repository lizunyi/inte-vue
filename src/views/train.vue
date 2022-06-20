<template>
     <div>火車票</div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            dialog: {
                visible: true
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
                "name": "李尊怡",
                "age": 10
            })
        }
    },
    methods: {
        searchList({page}) {
            console.log(page)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


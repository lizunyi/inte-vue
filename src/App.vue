<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    metaInfo() {
        return {
            title: `${process.env.VUE_APP_TITLE}`
        }
    }
}
</script>

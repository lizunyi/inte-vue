import Vue from 'vue'
import Vuex from 'vuex'
import tabViews from './modules/tabViews'
import login from './modules/login'
import module from './modules/module'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tabViews,
        login,
        module
    },
    getters
})

export default store

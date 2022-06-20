import Vue from 'vue'
import Vuex from 'vuex'
import tabViews from './modules/tabViews'
import login from './modules/login'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tabViews,
        login
    },
    getters
})

export default store

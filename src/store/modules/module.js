const module = {
    state: {
        curModuleInfo: {}
    },
    mutations: {
        SET_MODULE: (state, curModuleInfo) => {
            state.curModuleInfo = curModuleInfo
        }
    },
    actions: {
        setModuleInfo({commit}, curModuleInfo) {
            return new Promise((resolve, reject) => {
                commit('SET_MODULE', curModuleInfo)
                resolve()
            })
        }
    }
}

export default module

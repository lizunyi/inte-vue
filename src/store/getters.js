const getters = {
    visitedViews: state => state.tabViews.visitedViews,
    cachedViews: state => state.tabViews.cachedViews,
    token: state => state.login.token,
    name: state => state.login.name,
    roles: state => state.login.roles,
    routes: state => state.login.routes,
    tiledRoutes: state => state.login.tiledRoutes,
    permissions: state => state.login.permissions,
    moduleList: state => state.login.moduleList,
    curModuleInfo: state => state.module.curModuleInfo
}
export default getters

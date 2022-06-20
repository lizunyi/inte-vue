const getters = {
    visitedViews: state => state.tabViews.visitedViews,
    cachedViews: state => state.tabViews.cachedViews,
    token: state => state.login.token,
    name: state => state.login.name,
    roles: state => state.login.roles,
    routes: state => state.login.routes,
    permissions: state => state.login.permissions
}
export default getters

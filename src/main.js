import Vue from 'vue'
//element-UI
import Element from 'element-ui'

Vue.use(Element)
//element-ui css
import '@/assets/element-ui/element-ui.scss'
import '@/assets/icons'
//Vue Plugins
import App from '@/App'
import store from '@/store'
import router from '@/router'

/***
 * 以下为自定义内容
 */
import '@/assets/styles/comm.scss'
//自定义指令
import directive from '@/directive'

Vue.use(directive)
//自定义公共函数库
import {reRender, openDialog} from '@/utils/comm'
import '@/utils/request'

Vue.prototype.reRender = reRender
Vue.prototype.openDialog = openDialog
//自定义扩展ElementUI组件

//设置分页默认布局
Element.Pagination.props.layout.default = 'sizes,prev, pager, next, jumper, ->, total'
//扩展消息弹框组件
Element.MessageBox.setDefaults({
    dangerouslyUseHTMLString: true
})
//扩展文本搜索框组件
Object.assign(Element.Autocomplete.methods, {
    select(item) {
        this.$emit('input', item[this.valueKey])
        this.$emit('select', item, this.$attrs.customData)
        this.$nextTick(_ => {
            this.suggestions = []
            this.highlightedIndex = -1
        })
    },
    getData(queryString) {
        if (this.suggestionDisabled) {
            return
        }
        this.loading = true
        this.fetchSuggestions(queryString, (suggestions) => {
            this.loading = false
            if (this.suggestionDisabled) {
                return
            }
            if (Array.isArray(suggestions)) {
                this.suggestions = suggestions
                this.highlightedIndex = this.highlightFirstItem ? 0 : -1
            } else {
                console.error('[Element Error][Autocomplete]autocomplete suggestions must be an array')
            }
        }, this.$attrs.customData)
    }
})
//扩展下拉框组件
Element.Select.methods.emitChange = function (val) {
    if (!valueEquals(this.value, val)) {
        this.$emit('change', val, this.$attrs.customData)
    }
}


//init
new Vue({
    el: '#app', router, store, render: h => h(App)
})

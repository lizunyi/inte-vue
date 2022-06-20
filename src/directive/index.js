import hasPermi from './permission/hasPermi'
import dialogDrag from './dialog/drag'
import dialogDragWidth from './dialog/dragWidth'
import dialogDragHeight from './dialog/dragHeight'

const install = function (Vue) {
    Vue.directive('hasPermi', hasPermi)
    Vue.directive('dialogDrag', dialogDrag)
    Vue.directive('dialogDragWidth', dialogDragWidth)
    Vue.directive('dialogDragHeight', dialogDragHeight)
}

export default install

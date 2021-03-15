import Vue from 'vue'
import store from '@/store'
/**权限指令**/
const operatePriv = Vue.directive('operatePriv', {
    bind: function (el, binding) {
        // if (!store.state.user.data.privileges['_special:all']) {
        // 获取按钮权限
        const btnPermissions = binding.value.priv; // 是否有权限
        const display = binding.value.display; // 没权限是否显示
        if (!Vue.prototype.$_operatePriv(btnPermissions)) {
            Vue.nextTick(() => {
                if (display) {
                    el.disabled = true
                    el.style.cursor = 'not-allowed'
                } else {
                    el.parentNode.removeChild(el)
                }
            })
        }
        // }
    }
});
// 权限检查方法
Vue.prototype.$_operatePriv = function (value) {
    const btnPermissionsStr = store.state.user.priv
    return btnPermissionsStr[value];
}
// v-operatePriv="{priv:'user:member:list',display:true}" 使用方法
export { operatePriv };
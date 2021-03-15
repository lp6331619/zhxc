/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2019-11-01 15:11:57
 * @LastEditors: Teemor
 * @LastEditTime: 2020-12-23 11:31:25
 */
const plugins = []
if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console');
}
module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: plugins
}
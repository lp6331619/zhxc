import { login, loginSchema, logout, getMenuApi, userInfo, signIn } from '@/api/user'
import { getToken, setToken, removeToken, getStatus, setStatus, removeStatus, getData, removeData, setData, getMenu, setMenu, getPriv, setPriv } from '@/utils/auth'
import { resetRouter } from '@/router'
import Vue from 'vue'
// import { JSEncrypt } from 'jsencrypt'
const state = {
    token: getToken(),
    data: getData(),
    codeStatus: getStatus(),
    menu: getMenu(),
    priv: getPriv()
}
const mutations = {
    SET_TOKEN: (state, token) => {
        Vue.set(state, 'token', token)
    },
    SET_NAME: (state, name) => {
        Vue.set(state, 'name', name)
    },
    SET_DATA: (state, data) => {
        Vue.set(state, 'data', data)
    },
    SET_CODESTATUS: (state, data) => {
        Vue.set(state, 'codeStatus', data)
    },
    SET_MENU: (state, data) => {
        Vue.set(state, 'menu', data)
    },
    SET_PRIV: (state, data) => {
        Vue.set(state, 'priv', data)
    }
}
// var publicKey = ''
// 加密函数
// function encryptedData(publicKey, data) {
//     // 新建JSEncrypt对象
//     const encryptor = new JSEncrypt()
//     // 设置公钥
//     encryptor.setPublicKey(publicKey)
//     // 加密数据
//     return encryptor.encrypt(data)
// }
const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password, captcha } = userInfo
        return new Promise((resolve, reject) => {
            // login({ username: encryptedData(publicKey, username.trim()), password: encryptedData(publicKey, password), captcha: captcha,__token__:state.token }).then(response => {
            login({ username: username, password: password, captcha: captcha, __token__: state.token }).then(response => {
                const { data } = response
                if (!data || response.code !== 1) {
                    reject(response)
                }
                commit('SET_DATA', data)
                setData(data)
                removeStatus()
                resolve(response)
            })
        })
    },
    signIn({ commit }, userInfo) {
        const { id, token } = userInfo
        return new Promise((resolve, reject) => {
            // login({ username: encryptedData(publicKey, username.trim()), password: encryptedData(publicKey, password), captcha: captcha,__token__:state.token }).then(response => {
            signIn({ id: id, token: token }).then(response => {
                const { data } = response
                if (!data || response.code !== 1) {
                    reject('Verification failed, please Login again.')
                }
                commit('SET_DATA', data)
                setData(data)
                removeStatus()
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 设置登录错误次数
    setCodeStatus({ commit }) {
        return new Promise(resolve => {
            let codeS = state.codeStatus ? Number(state.codeStatus) : 0
            codeS++
            commit('SET_CODESTATUS', codeS)
            setStatus(codeS)
            resolve()
        })
    },
    // 获取 token 步骤
    loginSchema({ commit }) {
        return new Promise((resolve, reject) => {
            loginSchema({}).then(response => {
                const { data } = response.data
                const { token } = data
                commit('SET_TOKEN', token)
                setToken(token)
                resolve()
                // // 获取公钥
                // getJsconfig().then(res => {
                //     publicKey = res.data.jsencryptKey
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取菜单
    getMenus({ commit }) {
        if (state.data && state.data.authkey && state.data.sessionid) {
            return new Promise((resolve, reject) => {
                getMenuApi({
                }).then(response => {
                    const { data } = response
                    if (!data || response.code !== 1) {
                        reject('Verification failed, please Login again.')
                    }
                    const { menus, authlist } = data
                    commit('SET_MENU', menus)
                    setMenu(menus)
                    commit('SET_PRIV', authlist)
                    setPriv(authlist)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    // 修改个人信息 user info
    editInfo({ commit }, form) {
        return new Promise((resolve, reject) => {
            userInfo(form).then(data => {
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const params = getData()
                params.user_info.username = form.username
                params.user_info.nick = form.nick
                params.user_info.email = form.email
                params.user_info.mobile = form.mobile
                commit('SET_DATA', params)
                setData(params)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                removeToken()
                removeData()
                commit('SET_DATA', {})
                resetRouter()
                removeStatus()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @name: 设置 token
     */
    setToken({ commit }, token) {
        console.log(token, 111)
        return new Promise(resolve => {
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            removeData()
            removeStatus()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}


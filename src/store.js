import Vue from "vue";
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        access_token: '',
        loggedIn: null
    },
    mutations: {
        AUTH_SUCCESS(state) {
            state.loggedIn = true
        },
        AUTH_ERROR(state) {
            state.loggedIn = false
        },
        USER_INFO(state, user) {
            state.user = user
        },
        LOGOUT(state) {
            state.loggedIn = false
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                axios.post('auth/login', user).then(response => {
                    commit('AUTH_SUCCESS')
                    localStorage.setItem('token', response.data.access_token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
                    resolve(response)
                })
                .then(() => {
                    axios.get('auth/me').then(response => {
                        commit('USER_INFO', response.data)
                    })
                })
                .catch(err => {
                    commit('AUTH_ERROR')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({commit}) {
            axios.post('auth/logout').then(() => {
                localStorage.removeItem('token')
                commit('LOGOUT')
            })
        }
    },
    getters: {
        user: state => state.user,
        loggedIn: state => state.loggedIn
    }
})

export default store;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toolbar: JSON.parse(localStorage.getItem("toolbar") || '{"visible": false, "enter": true}'),
        currentUser: JSON.parse(localStorage.getItem("USER") || '{}'),
        currentAdmin: JSON.parse(localStorage.getItem("ADMIN") || '{}'),
        isLikes: false, // 默认用户未点赞
        isCollect: false, // 默认用户未收藏
    },
    getters: {},
    mutations: {
        changeToolbarStatus(state, toolbarState) {
            state.toolbar = toolbarState;
            localStorage.setItem("toolbar", JSON.stringify(toolbarState));
        },
        loadCurrentUser(state, user) {
            state.currentUser = user;
            localStorage.setItem("USER", JSON.stringify(user));
        },
        loadCurrentAdmin(state, user) {
            state.currentAdmin = user;
            localStorage.setItem("ADMIN", JSON.stringify(user));
        },
        // 更新点赞状态的 mutation
        setLikes(state, value) {
            state.isLikes = value;
        },
        // 更新收藏状态的 mutation
        setCollect(state, value) {
            state.isCollect = value;
        },
    },
    actions: {},
    modules: {}
})
import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userId: sessionStorage.getItem("user_id") || null,
        };
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
            sessionStorage.setItem("user_id", userId);
        },
        clearUserId(state) {
            state.userId = null;
            sessionStorage.removeItem("user_id");
        },
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit("setUserId", userId);
        },
        removeUserId({ commit }) {
            commit("clearUserId");
        },
    },
    getters: {
        userId: (state) => state.userId,
    },
});

export default store;

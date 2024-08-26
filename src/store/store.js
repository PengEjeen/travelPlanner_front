import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userId: localStorage.getItem("user_id") || null,
            placeId: localStorage.getItem("place_id") || "",
        };
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
            localStorage.setItem("user_id", userId);
        },
        clearUserId(state) {
            state.userId = null;
            localStorage.removeItem("user_id");
        },
        setPlaceId(state, placeId) {
            state.placeId = placeId;
            localStorage.setItem("place_id", placeId);
        },
        clearPlaceId(state) {
            state.placeId = "";
            localStorage.removeItem("place_id");
        },
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit("setUserId", userId);
        },
        removeUserId({ commit }) {
            commit("clearUserId");
        },
        updatePlaceId({ commit }, placeId) {
            commit("setPlaceId", placeId);
        },
        removePlaceId({ commit }) {
            commit("clearPlaceId");
        },
    },
    getters: {
        userId: (state) => state.userId,
        placeId: (state) => state.placeId,
    },
});

export default store;

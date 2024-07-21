import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import MyPage from "@/components/MyPage.vue";
import GuidelinesPage from "@/components/GuidelinesPage.vue";

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage,
    },
    {
        path: "/MyPage",
        name: "MyPage",
        component: MyPage,
    },
    {
        path: "/GuidelinesPage",
        name: "GuidelinesPage",
        component: GuidelinesPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

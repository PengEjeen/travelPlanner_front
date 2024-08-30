import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import MyPage from "@/components/MyPage.vue";
import GuidelinesPage from "@/components/GuidelinesPage.vue";
import SignPage from "@/components/SignPage.vue";
import FestivalPage from "@/components/FestivalPage.vue";
import PlannerPage from "@/components/PlannerPage.vue";
import SelectDetailPage from "@/components/SelectDetailPage.vue";
import ManualPage from "@/components/ManualPage.vue";

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
    {
        path: "/SignPage",
        name: "SignPage",
        component: SignPage,
    },
    {
        path: "/FestivalPage",
        name: "FestivalPage",
        component: FestivalPage,
    },
    {
        path: "/PlannerPage",
        name: "PlannerPage",
        component: PlannerPage,
    },
    {
        path: "/SelectDetailPage",
        name: "SelectDetailPage",
        component: SelectDetailPage,
    },
    {
        path: "/ManualPage",
        name: "ManualPage",
        component: ManualPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

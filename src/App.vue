<template>
    <TheHeader />
    <router-view />
    <TheFooter />
</template>

<script>
import TheHeader from "@/layout/TheHeader.vue";
import TheFooter from "@/layout/TheFooter.vue";

export default {
    name: "App",
    components: { TheHeader, TheFooter },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

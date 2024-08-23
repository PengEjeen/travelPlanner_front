import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";
import axios from "axios";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(BootstrapVue3);
app.use(store);
app.use(router);
app.mount("#app");

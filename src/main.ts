import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Router from "./routes/Router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueQueryPlugin);

const router = new VueRouter({
  mode: "history",
  routes: Router,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");

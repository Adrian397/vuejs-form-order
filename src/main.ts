import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Router from "./routes/Router";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Router,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");

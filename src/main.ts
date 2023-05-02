import { VueQueryPlugin } from "@tanstack/vue-query";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Router from "./routes/Router";

Vue.config.productionTip = false;

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

// extend("at_least_one_checked", {
//   validate: (value) => {
//     return value.includes(true);
//   },
//   message: "Please select at least one checkbox",
// });

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

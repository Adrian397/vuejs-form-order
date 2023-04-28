import { paths } from "@/utils/paths";
import Home from "./Home/Home.vue";
import Order from "./Order/Order.vue";

export default [
  { path: paths.root, component: Home },
  { path: paths.form, component: Order },
];

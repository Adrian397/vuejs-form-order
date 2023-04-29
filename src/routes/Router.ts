import { paths } from "@/utils/paths";
import Home from "./Home/Home.vue";
import Order from "./Order/Order.vue";
import OrderPlaced from "./OrderPlaced/OrderPlaced.vue";

export default [
  { path: paths.root, component: Home },
  { path: paths.form, component: Order },
  { path: paths.summary, component: OrderPlaced },
];

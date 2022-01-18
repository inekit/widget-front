import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "abstract",
  routes: [
    {
      path: "/widgets",
      name: "widgets",
      component: require("../src/LeftBlock.vue").default,
    },
    {
      path: "/newsub",
      name: "newsub",
      component: require("../src/NewSub.vue").default,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: require("../src/Statistics.vue").default,
    },
    {
      path: "*",
      redirect: "/widgets",
    },
  ],
});

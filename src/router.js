import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/character-vuex"
    },
    {
      path: "/character-no-vuex",
      name: "characterNoVuex",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/CharacterNoVuex.vue")
    },
    {
      path: "/character-vuex",
      name: "characterVuex",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/CharacterVuex.vue")
    }
  ]
});
x
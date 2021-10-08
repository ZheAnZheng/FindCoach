import { createRouter, createWebHistory } from "vue-router";
import coachesList from "../views/coaches/CoachesList.vue";
import coachesDetail from "../views/coaches/CoachesDetail.vue";
import coachesRegistration from "../views/coaches/CoachesRegistration.vue";
import contactCoaches from "../views/request/ContactCoaches.vue";
import requestReceive from "../views/request/RequestReceive.vue";
import userAuth from "../views/auth/UserAuth.vue";
import notFound from "../views/NotFound.vue";
import store from "../store/index.js"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: coachesList },
    {
      path: "/coaches/:id",
      component: coachesDetail,
      props: true,
      children: [{ path: "contact", component: contactCoaches }]
    },
    { path: "/register", component: coachesRegistration ,meta:{requiredAuth:true}},

    { path: "/requestReceive", component: requestReceive,meta:{requiredAuth:true} },
    { path: "/userAuth", component: userAuth,meta:{requiredUnauth:true} },

    { path: "/:notFound(.*)", component: notFound }
  ]
});

router.beforeEach(function(to,_,next){

  
  if(to.meta.requiredAuth && !store.getters.isAuthenticated){
    next('/userAuth');
  }else if(to.meta.requiredUnauth && store.getters.isAuthenticated){
    next('/coaches');
  }else{
    next();
  }
});
  

export default router;

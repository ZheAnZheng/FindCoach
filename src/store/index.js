import { createStore } from "vuex";
import coachesModule from './coaches/index.js'
import requestModule from './request/index.js'
import authModule from './auth/index.js'
export default createStore({
  modules:{
    coaches:coachesModule,
    request:requestModule,
    auth:authModule
  },
  
});

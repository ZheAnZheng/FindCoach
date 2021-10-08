let timer;
export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      accountName: "",
      didAutoLogout:false
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    getAccountName(state) {
      return state.accountName.charAt(0);
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.accountName = payload.name;
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout=false;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.tokenExpiration = null;
    },
    didAutoLogout(state){
        state.didAutoLogout=true;
    }
  },
  actions: {
    logout(context) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer);
      context.commit("setUser",{
          token:null,
          userId:null
      });
    },
    async auth(context, payload) {
      let url = "";
      const mode = payload.mode;
      if (mode === "login") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBytJpzXB3bVo77iQajCO0GGh78VgTUtAg";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBytJpzXB3bVo77iQajCO0GGh78VgTUtAg";
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "fail to fetch authenticate"
        );
        throw error;
      }
      const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;

      timer=setTimeout(function(){
          context.dispatch('autoLogout')
      },expiresIn)
      localStorage.setItem('token',responseData.idToken);
      localStorage.setItem('userId',responseData.localId);
      localStorage.setItem('tokenExpiration',expirationDate)
      localStorage.setItem('name',responseData.email);
      let tokenData = {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: expirationDate
      };
      if (mode === "login") {
        context.commit("setUser", {
          ...tokenData,
          name: responseData.email
        });
      }else if(mode==='signup'){
        context.commit("setUser", {
            ...tokenData,
           
          });
      }
    },
    async login(context, payload) {
      context.dispatch("auth", {
        ...payload,
        mode: "login"
      });
    },
    async signup(context, payload) {
      context.dispatch("auth", {
        ...payload,
        mode: "signup"
      });
    },
    tryLogin(context){
        const token=localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        const name=localStorage.getItem('name');
        const tokenExpiration=localStorage.getItem('tokenExpiration')
        const expiresIn= +tokenExpiration-new Date().getTime();
        if(expiresIn<0){
            return;
        }
        setTimeout(function(){
            context.dispatch('logout');
        },expiresIn);

        if(token && userId && name){
            context.commit('setUser',{
            name:name,
            token:token,
            userId:userId,
           
        })
        }
        
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('didAutoLogout');
    }
  }
};

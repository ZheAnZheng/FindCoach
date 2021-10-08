<template>
<div>

    <base-dialog :show='!!error' title="an error occuerred" @close='handlerError'>{{error}}</base-dialog>

    <base-dialog fixed :show="isLoading" title="authenticating...">
<base-spinner></base-spinner>
</base-dialog>
  <base-card>

    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">password</label>
        <input type="password" id="password" v-model.trim="password" />
        <p v-if="!formIsValid">please input Valid</p>
      </div>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="outline" @click="switchAuthMode">{{
        submitAuthButtonCaption
      }}</base-button>
    </form>
  </base-card>

</div>

</template>

<script>

export default {

  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "login";
      } else {
        return "signup";
      }
    },
    submitAuthButtonCaption() {
      if (this.mode === "login") {
        return "signup instead";
      } else {
        return "User";
      }
    },
   
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
       
       
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
     this.isLoading = true;

     const actionPayload={
          email: this.email,
            password: this.password
     }
      try {
        if (this.mode === "login") {
           await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        console.log(this.$route.query);
        console.log(this.$route.query.redirect);
        const redirectUrl='/'+(this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      }catch(err){
          this.error=err.message || 'Fail to authenticate , try again later'
      }

      this.isLoading = false;
      
    },

    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handlerError(){
        this.error=null;
    }
  }
};
</script>

<style scoped>
form {
  margin: 2rem 0;
  padding: 2rem 5rem;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
</style>

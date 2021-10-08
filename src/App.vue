<template>
  
    <the-header></the-header>

    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" ></component>
      </transition>
      
    </router-view>

</template>

<script>
import TheHeader from "./components/Layout/TheHeader.vue";

export default {
  components: { TheHeader },
  created(){
    this.$store.dispatch('tryLogin')
  },
  computed:{
    didAutoLogout(){
      return this.$store.getters.didAutoLogout;
    }
  },
  watch:{
    didAutoLogout(curValue , oldValue){
      if(curValue && curValue !==oldValue){
        this.$router.replace('/coaches')
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=STIX+Two+Math&display=swap");

* {
  font-family: "STIX Two Math", serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: rgba(53, 152, 233, 0.2);
  width: 100%;
  height: 100%;
}

.route-enter-from,
.route-leave-to{
  opacity: 0;
  transform:translateY(100px);
}

.route-enter-active{
  transition: all 0.3s ease-in;
}
.route-leave-active{
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from{
  opacity: 1;
  transform: translateY(0);
}
</style>

<template>
  <header>
    <nav>
      <h2 class="title">Find a coach</h2>
      <ul>
        <li>
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <li>
          <router-link
            :class="{ loginYet: !isAuthenticated }"
            to="/requestReceive"
            >Request</router-link
          >
        </li>
        <li
          class="dropdownMenu"
          v-if="isAuthenticated"
          @click="toggle"
          @mouseleave="closeDropdown"
        >
          <div>
            <a>menu</a>
          </div>
          <transition name="dropdown-menu">
            <ul class="dropdown" v-if="drop">
            <li @click="logout">logout</li>
          </ul>
          </transition>
          
        </li>
        <li>
          <router-link :class="{ logged: isAuthenticated }" to="/userAuth">{{
            loginState
          }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    toggle() {
      if (this.dropdown === this.dropdown) {
        this.dropdown = !this.dropdown;
      }
    },
    closeDropdown() {
      
      this.dropdown = false;
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    loginState() {
      if (this.$store.getters.isAuthenticated === false) {
        return "login";
      } else {
        return this.$store.getters.getAccountName.toUpperCase();
      }
    },
    drop() {
      return this.dropdown;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  padding: 0 1rem;
}
li {
  margin: 0 0.5rem;
}
nav {
  background-color: rgb(53, 152, 233);

  color: papayawhip;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
}
.title {
  padding: 0 3rem;
}
a {
  padding: 1rem;
  font-size: 1.3rem;
  text-decoration: none;

  color: white;
}
.router-link-active,
a:hover {
  background-color: rgba(44, 79, 235, 0.678);
  border: 2px solid rgba(44, 79, 235, 0.678);
  border-radius: 7px;
}
.loginYet {
  pointer-events: none;
  cursor: default;
  color: rgba(14, 14, 14, 0.294);
  border: 2px solid rgba(14, 14, 14, 0.294);
  border-radius: 7px;
}
.logged {
  padding: 1rem 1.3rem;
  pointer-events: none;
  background-color: rgb(0, 167, 67);
  border-radius: 50%;
  color: rgb(255, 255, 255);
  font-weight: bolder;
}
.dropdownMenu {
  position: relative;
  cursor: pointer;
}
.dropdown {
  background-color: cornflowerblue;
  color: azure;
  padding: 1rem 0.7rem;
  top: 2.5rem;
  left: 0.2rem;
  border-radius: 7px;
  position: absolute;
  display: block;
}
.dropdown-menu-enter-from,
.dropdown-menu-leave-to{
  opacity: 0;
  transform:translateY(-10px)
}
.dropdown-menu-enter-active,
.dropdown-menu-leave-active{
transition: all 0.3s ease-in-out;
}
.dropdown-menu-enter-to,
.dropdown-menu-leave-from{
  opacity: 1;
  transform: translateY(0)  
}
</style>

<template>
  <li>
    <h3>{{ title }}</h3>
    <h3>${{ rate }}/hour</h3>
    <div>
      <base-badge v-for="area in areas" :key="area" :type='area' :title="area">{{area}}</base-badge>
    </div>
    
    <div class="actions">
        <base-button link :to="detail" :mode="'outline'"><b>Views</b></base-button>
        <base-button link :to='contact'><b>Contact</b></base-button>  
    </div>
  </li>
</template>

<script>


export default {
  
  props: ["id", "areas", "description", "rate", "firstName", "lastName"],
  computed: {
    title() {
      return this.firstName + " " + this.lastName;
    },
    detail() {
      return "/coaches/" + this.id;
    },
    contact() {
      return "/coaches/" + this.id + "/contact";
    }
  }
};
</script>

<style scoped>

li {
  border: 1px solid black;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
}
a {
  
  text-decoration: none;
  padding: 1rem;
  margin: 1rem 0;
  
}
.actions{
    text-align: right;
}
</style>

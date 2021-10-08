<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handlerError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Search Coaches Name</h2>
        <input type="input" v-model="filterName" />
      </base-card>
    </section>
    <section>
      <coach-filter @update-filters="setFilter"></coach-filter>
    </section>

    <section>
      <base-card>
        <div>
          <base-button :mode="'outline'" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          
          <base-button link to="/register" v-if="isAuth && !isCoach"
            >register as coach</base-button
          >

          <base-button link to="/userAuth" v-if="!isAuth && !isCoach"
            >login to register as coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-loading></base-loading>
          
        </div>
        <ul v-if="hasCoaches">
          <coaches-item
            v-for="coach in coaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :description="coach.description"
            :rate="coach.hourlyRate"
          ></coaches-item>
        </ul>
      </base-card>
      
    </section>
  </div>
</template>

<script>
import CoachesItem from "../../components/coaches/CoachesItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachesItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      filterName: "",
      error: null,
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  created(){
    this.loadCoaches();
  },
  methods: {
    setFilter(updateFilters) {
      this.filters = updateFilters;
    },
    filterCoachesName(data) {
      const filteredCoaches = [];
      for (let index in data) {
        let fullName = data[index].firstName + " " + data[index].lastName;
        if (fullName.includes(this.filterName)) {
          filteredCoaches.push(data[index]);
        }
      }
    },
    async loadCoaches(refresh = false) {
      
      this.isLoading = true;
        try {
          await this.$store.dispatch("coaches/loadCoaches", {
            forceRefresh: refresh
          });
        } catch (error) {
          this.error = error.message || "Something went wrong";
        }
        this.isLoading = false;
      
      
    },
    handlerError() {
      this.error = null;
    },
    
  },
  computed: {
    hasCoaches() {
      return !this.isLoading && this.coaches.length > 0;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    coaches() {
      const coaches = [];
      for (let index in this.filteredCoaches) {
        const fullName =
          this.filteredCoaches[index].firstName +
          " " +
          this.filteredCoaches.lastName;
        if (fullName.toLowerCase().includes(this.filterName)) {
          coaches.push(this.filteredCoaches[index]);
        }
      }
      return coaches;
    },

    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(coach => {
        if (this.filters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.filters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.filters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    isAuth(){
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>

<template>
  <div>
    <base-dialog :show="!!error" title="an error occurred" @close="handleError">
      {{ error }}</base-dialog
    >
    <section>
      <base-card>
        <header>
          <h2>Requests Receive</h2>
        </header>
        <base-loading v-if="isLoading"></base-loading>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="request in receiveRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <p v-else>you have not receive any request!</p>
      </base-card>
    </section>
  </div>
</template>
<script>
import RequestItem from "../../components/request/RequestItem.vue";

export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("request/fetchRequests");
      } catch (error) {
        console.log(error.message);
        this.error = error.message || "something went wrong";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  computed: {
    receiveRequests() {
      return this.$store.getters["request/getRequests"];
    },
    hasRequests() {
      return this.$store.getters["request/hasRequests"];
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
p {
  text-align: center;
  font-weight: bolder;
}
</style>

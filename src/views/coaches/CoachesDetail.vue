<template>
  <div>
    <section>
      <base-card>
        <h3>{{ title }}</h3>
        <h4>${{ rate }}/hour</h4>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Interested! Contact to Coach !</h2>

        <base-button link :to="contactLink" v-if="isContact"
          >Contact</base-button
        >
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>

        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selected: null
    };
  },
  computed: {
    title() {
      return this.selected.firstName + " " + this.selected.lastName;
    },
    rate() {
      return this.selected.hourlyRate;
    },
    contactLink() {
      return "/coaches/" + this.id + "/contact";
    },
    description() {
      return this.selected.description;
    },
    areas() {
      return this.selected.areas;
    },
    isContact() {
      if (this.$route.path === "/coaches/" + this.id) {
        return true;
      } else if (this.$route.path === "/coaches/" + this.id + "/contact") {
        return false;
      }
      return true;
    }
  },
  created() {
    this.selected = this.$store.getters["coaches/coaches"].find(
      coach => coach.id === this.id
    );
  }
};
</script>

<style scoped>
p {
  margin: 2rem 0;
}
</style>

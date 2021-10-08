<template>
  <!-- 單純使用submit會送出表單，並刷新頁面 -->
  <form @submit.prevent="submitForm">
    <div class="formControl" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">FirstName</label>

      <input type="text" id="firstName" v-model.trim="firstName.val" @keypress="clearValidate('firstName')"/>
      <p v-if="!firstName.isValid">
        firstName is empty! please input your firstName
      </p>
    </div>
    <div class="formControl" :class="{ invalid: !lastName.isValid }">
      <label for="LastName">LastName</label>

      <input type="text" id="lastName" v-model.trim="lastName.val"  @keypress="clearValidate('lastName')"/>
      <p v-if="!lastName.isValid">
        lastName is empty! please input your lastName
      </p>
    </div>
    <div class="formControl" :class="{ invalid: !areas.isValid }">
      <h3>Chose yours expertise</h3>
      <div>
        <input
          type="checkbox"
          class="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @mousedown="clearValidate('areas')"
        />
        <label for="frontend">Frontend developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          class="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @mousedown="clearValidate('areas')"
        />
        <label for="backend">Backend developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          class="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @mousedown="clearValidate('areas')"
        />
        <label for="career">Career advisory</label>
      </div>
      <p v-if="!areas.isValid">At least check one!!!</p>
    </div>
    <div class="formControl" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>

      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
         @keypress="clearValidate('description')"
      ></textarea>
      <p v-if="!description.isValid">please input your description!</p>
    </div>
    <div class="formControl" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>

      <input type="number" id="rate" v-model="rate.val"  @keypress="clearValidate('rate')"/>
      <p v-if="!rate.isValid">rate could not less than 0 !</p>
    </div>
    <div style="margin:1rem 0">
      <base-button>Registration</base-button>
    </div>
  </form>
  <!-- form 裡的button會自動變submit -->
</template>

<script>
export default {
  emits: ["send-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true
      },
      lastName: {
        val: "",
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      description: {
        val: "",
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidate(input){
      this[input].isValid=true;
    },
    allValidate() {
      if (
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.areas.isValid &&
        this.rate.isValid &&
        this.description.isValid
      ) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validate() {
      this.firstName.val === ""
        ? (this.firstName.isValid = false)
        : (this.firstName.isValid = true);

      this.lastName.val === ""
        ? (this.lastName.isValid = false)
        : (this.lastName.isValid = true);

      this.areas.val.length === 0
        ? (this.areas.isValid = false)
        : (this.areas.isValid = true);

      if (this.rate.val < 0 || this.rate.val === null) {
        this.rate.isValid = false;
      } else {
        this.rate.isValid = true;
      }

      this.description.val === ""
        ? (this.description.isValid = false)
        : (this.description.isValid = true);
    },
    submitForm() {
      this.validate();
      this.allValidate();
      if (!this.formIsValid) {
        return;
      } else {
        const formData = {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          areas: this.areas.val,
          description: this.description.val,
          rate: this.rate.val
        };
        
        this.$emit("send-data", formData);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 2rem 0;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.base-button {
  margin: 1rem 0;
}
</style>

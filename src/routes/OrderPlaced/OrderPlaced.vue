<template>
  <div class="wrapper" v-if="Object.keys(parsedForm).length > 0">
    <h1>Thank you, your order has been placed!</h1>
    <Summary :form="parsedForm" />
    <button @click="handleBackToHomePage">Go to home page</button>
  </div>
</template>

<script lang="ts">
import { FormType } from "@/components/Form/FifthStep/FifthStep.utils";
import Summary from "@/components/Form/Summary/Summary.vue";
import { paths } from "@/utils/paths";
import Vue from "vue";

export default Vue.extend({
  name: "OrderPlacedPage",
  components: {
    Summary,
  },
  data() {
    return {
      parsedForm: {} as FormType,
    };
  },

  methods: {
    handleBackToHomePage() {
      this.$router.replace(paths.root);
      localStorage.removeItem("form");
    },
  },
  mounted() {
    const formJson = localStorage.getItem("form");
    if (formJson) {
      this.parsedForm = JSON.parse(formJson);
    }
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1rem;
  gap: 2rem;

  h1 {
    font-size: 64px;

    color: #333;
  }

  button {
    padding: 0.7rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    background-color: #68c968;
  }
}
</style>

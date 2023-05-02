<template>
  <section>
    <Summary :form="form" :price="price" />
    <button class="btn btn-prev" @click="onPrevStepChange">
      Previous step
    </button>
    <button class="btn btn-next" type="submit">Submit order</button>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Summary from "../Summary/Summary.vue";
import { FormType } from "./FifthStep.utils";

export default Vue.extend({
  name: "FormFifthStepComponent",
  components: {
    Summary,
  },
  props: {
    form: Object as PropType<FormType>,
    price: Number,
  },
  methods: {
    onPrevStepChange() {
      this.$emit("update:prevStep");
    },
  },
});
</script>

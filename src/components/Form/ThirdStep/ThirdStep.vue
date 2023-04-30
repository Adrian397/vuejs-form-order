<template>
  <section v-if="step === 2">
    <h1>test</h1>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { FormType } from "../FifthStep/FifthStep.utils";

export default Vue.extend({
  name: "FormThirdStepComponent",
  props: {
    step: Number,
    form: Object as PropType<FormType>,
  },
});
</script>

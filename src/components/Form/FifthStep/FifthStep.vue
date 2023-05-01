<template>
  <section>
    <Summary :form="form" />
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
  },
});
</script>

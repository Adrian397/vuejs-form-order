<template>
  <section class="fourth-step" v-if="step === 3">
    <Summary :form="form" />
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Summary from "../Summary/Summary.vue";
import { SummaryType } from "./FourthStep.utils";

export default Vue.extend({
  name: "FourthFormStep",
  components: {
    Summary,
  },
  props: {
    step: Number,
    form: Object as PropType<SummaryType>,
  },
});
</script>

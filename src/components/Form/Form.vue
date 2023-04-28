<template>
  <form>
    <FirstStep
      :step="step"
      :isFront="firstStep.isFront"
      :isBack="firstStep.isBack"
      :randomImg="randomImg"
      @update:isFront="onIsFrontUpdate"
      @update:isBack="onIsBackUpdate"
    />
    <SecondStep
      :step="step"
      :isFront="firstStep.isFront"
      :isBack="firstStep.isBack"
      :randomImg="randomImg"
    />
    <section v-if="step === 2">
      <h2>Step 3</h2>
    </section>
    <button
      class="btn btn-prev"
      v-if="step !== 0"
      @click.prevent="handlePreviousStep"
    >
      Previous step
    </button>
    <button
      class="btn btn-next"
      v-if="step !== totalSteps"
      @click.prevent="handleNextStep"
    >
      Next step
    </button>
    <button class="btn btn-checkout" v-if="step === totalSteps">
      Proceed to checkout
    </button>
  </form>
</template>

<script lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Vue from "vue";
import FirstStep from "./FirstStep/FirstStep.vue";
import SecondStep from "./SecondStep/SecondStep.vue";

const fetchRandomImg = async () => {
  const response = await fetch("https://picsum.photos/150");
  const blob = await response.blob();

  return URL.createObjectURL(blob);
};

export default Vue.extend({
  name: "FormComponent",
  components: {
    FirstStep,
    SecondStep,
  },
  data() {
    return {
      step: 0,
      totalSteps: 2,
      firstStep: {
        isFront: false,
        isBack: false,
      },
    };
  },
  setup() {
    const { data: randomImg } = useQuery(["randomImage"], fetchRandomImg, {
      refetchOnWindowFocus: false,
    });

    return { randomImg };
  },
  watch: {
    "firstStep.isFront"(newVal) {
      console.log("isFront value changed:", newVal);
    },
    "firstStep.isBack"(newVal) {
      console.log("isBack value changed:", newVal);
    },
  },
  methods: {
    handlePreviousStep() {
      this.step--;
    },
    handleNextStep() {
      this.step++;
    },
    onIsFrontUpdate(value: boolean) {
      this.firstStep.isFront = value;
    },
    onIsBackUpdate(value: boolean) {
      this.firstStep.isBack = value;
    },
  },
});
</script>

<style scoped lang="scss">
.btn {
  padding: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-next {
  background-color: #68c968;
}

.btn-prev {
  background-color: #333;
  margin-right: 1rem;
}

.btn-checkout {
  background-color: #68c968;
}
</style>

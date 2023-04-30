<template>
  <form>
    <FirstStep
      :step="step"
      :isFront="form.isFront"
      :isBack="form.isBack"
      :randomImg="randomImg"
      @update:isFront="onIsFrontValueUpdate"
      @update:isBack="onIsBackValueUpdate"
    />
    <SecondStep
      :step="step"
      :isFront="form.isFront"
      :isBack="form.isBack"
      :randomImg="randomImg"
      :handleRefetch="refetchRandomImg"
      ref="imgRef"
    />
    <ThirdStep :step="step" :form="form" />
    <FourthStep
      :step="step"
      :form="form"
      @update:billing="onBillingValueUpdate"
    />
    <FifthStep :step="step" :form="form" />
    <button
      class="btn btn-prev"
      v-if="step !== 0"
      @click.prevent="handlePreviousStep"
    >
      Previous step
    </button>
    <button
      class="btn btn-next"
      @click.prevent="handleNextStep"
      v-if="step !== 3"
    >
      {{ nextStepText }}
    </button>
    <button
      class="btn btn-next"
      v-if="step === 3"
      @click.prevent="handleSubmitOrder"
    >
      Submit order
    </button>
  </form>
</template>

<script lang="ts">
import { paths } from "@/utils/paths";
import { useQuery } from "@tanstack/vue-query";
import Vue from "vue";
import FifthStep from "./FifthStep/FifthStep.vue";
import FirstStep from "./FirstStep/FirstStep.vue";
import { BillingInfoType } from "./FourthStep/FourthStep.utils";
import FourthStep from "./FourthStep/FourthStep.vue";
import SecondStep from "./SecondStep/SecondStep.vue";
import ThirdStep from "./ThirdStep/ThirdStep.vue";

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
    ThirdStep,
    FourthStep,
    FifthStep,
  },
  data() {
    return {
      step: 0,
      totalSteps: 4,
      form: {
        isFront: false,
        isBack: false,
        printing: "",
        billing: {
          name: "",
          surname: "",
          street: "",
          buildingNumber: "",
          apartmentNumber: "",
          postalCode: "",
          city: "",
          phone: "",
          email: "",
        },
      },
    };
  },
  setup() {
    const { data: randomImg, refetch: refetchRandomImg } = useQuery(
      ["randomImage"],
      fetchRandomImg,
      {
        refetchOnWindowFocus: false,
      }
    );

    return { randomImg, refetchRandomImg };
  },
  computed: {
    nextStepText(): string {
      return this.step === 0
        ? "Next step"
        : this.step === 1
        ? "Next step"
        : this.step === 2
        ? "Proceed to checkout"
        : this.step === 3
        ? "Go to summary"
        : "";
    },
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
      if (this.step === 1 && this.$refs.imgRef) {
        this.form.printing = (
          this.$refs.imgRef as Vue & { currentImg: string }
        ).currentImg;
      }
      this.step++;
    },
    onIsFrontValueUpdate(value: boolean) {
      this.form.isFront = value;
    },
    onIsBackValueUpdate(value: boolean) {
      this.form.isBack = value;
    },
    onBillingValueUpdate(updatedBilling: BillingInfoType) {
      this.form.billing = updatedBilling;
    },
    onPrintingValueUpdate(value: string) {
      this.form.printing = value;
    },
    handleSubmitOrder() {
      console.log(this.form);
      localStorage.setItem("form", JSON.stringify(this.form));
      this.$router.replace(paths.summary);
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

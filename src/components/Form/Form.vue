<template>
  <form>
    <FirstStep
      :isFront="form.printing.isFront"
      :isBack="form.printing.isBack"
      :price="price"
      :randomImg="randomImg"
      @update:isFront="onIsFrontValueUpdate"
      @update:isBack="onIsBackValueUpdate"
      v-if="step === 0"
    />
    <SecondStep
      :isFront="form.printing.isFront"
      :isBack="form.printing.isBack"
      :price="price"
      :randomImg="randomImg"
      :handleRefetch="refetchRandomImg"
      ref="imgRef"
      v-if="step === 1"
    />
    <ThirdStep
      :form="form"
      :price="price"
      v-if="step === 2"
      @update:style="onPrintingStyleUpdate"
    />
    <FourthStep
      :form="form"
      :price="price"
      @update:billing="onBillingValueUpdate"
      v-if="step === 3"
    />
    <FifthStep :form="form" :price="price" v-if="step === 4" />
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
      v-if="step !== 4"
    >
      {{ nextStepText }}
    </button>
    <button
      class="btn btn-next"
      v-if="step === 4"
      @click.prevent="handleSubmitOrder"
    >
      Submit order
    </button>
  </form>
</template>

<script lang="ts">
import { apiService } from "@/api/apiService";
import { paths } from "@/utils/paths";
import { useQuery } from "@tanstack/vue-query";
import Vue from "vue";
import { UpdateStyleType } from "./FifthStep/FifthStep.utils";
import FifthStep from "./FifthStep/FifthStep.vue";
import FirstStep from "./FirstStep/FirstStep.vue";
import { BillingInfoType } from "./FourthStep/FourthStep.utils";
import FourthStep from "./FourthStep/FourthStep.vue";
import SecondStep from "./SecondStep/SecondStep.vue";
import ThirdStep from "./ThirdStep/ThirdStep.vue";

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
        printing: {
          isFront: false,
          isBack: false,
          url: "",
          style: {
            type: "normal",
            blurValue: 1,
          },
        },
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
      price: 0,
    };
  },
  setup() {
    const { data: randomImg, refetch: refetchRandomImg } = useQuery(
      ["randomImage"],
      apiService.fetchRandomImg,
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

  methods: {
    handlePreviousStep() {
      this.step--;
    },
    handleNextStep() {
      if (this.step === 1 && this.$refs.imgRef) {
        this.form.printing.url = (
          this.$refs.imgRef as Vue & { currentImg: string }
        ).currentImg;
      }

      this.step++;
    },
    onIsFrontValueUpdate(value: boolean) {
      this.form.printing.isFront = value;
      this.price += value ? 10 : -10;
    },
    onIsBackValueUpdate(value: boolean) {
      this.form.printing.isBack = value;
      this.price += value ? 10 : -10;
    },
    onBillingValueUpdate(updatedBilling: BillingInfoType) {
      this.form.billing = updatedBilling;
    },
    onPrintingStyleUpdate(value: UpdateStyleType) {
      const prevType = this.form.printing.style.type;

      this.form.printing = {
        ...this.form.printing,
        url: value.url,
        style: {
          type: value.type,
          blurValue: value.blurValue ?? 1,
        },
      };
      if (prevType === "blur") {
        this.price -= 3;
      } else if (prevType === "grayscale") {
        this.price -= 2;
      }

      if (value.type === "blur") {
        this.price += 3;
      } else if (value.type === "grayscale") {
        this.price += 2;
      }
    },
    handleSubmitOrder() {
      console.log({ form: this.form, price: this.price });
      localStorage.setItem(
        "form",
        JSON.stringify({ form: this.form, price: this.price })
      );
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

<template>
  <section class="first-step">
    <h1>What should be the place of the printing?</h1>
    <p>You can either choose one or both options</p>
    <div>
      <div>
        <label for="front">Front of the shirt</label>
        <input
          type="checkbox"
          id="front"
          v-model="isFrontChecked"
          @change="onIsFrontValueChange"
        />
      </div>
      <div>
        <label for="back">Back of the shirt</label>
        <input
          type="checkbox"
          id="back"
          v-model="isBackChecked"
          @change="onIsBackValueChange"
        />
      </div>
    </div>
    <h3>Printing:</h3>
    <img :src="randomImg" />
    <p>Price: {{ price }}</p>
    <button class="btn btn-next" :disabled="!isValid" @click="onNextStepChange">
      Next step
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormFirstStepComponent",
  props: {
    isFront: Boolean,
    isBack: Boolean,
    price: Number,
    randomImg: String,
  },

  data() {
    return {
      isFrontChecked: this.isFront,
      isBackChecked: this.isBack,
    };
  },

  methods: {
    onIsFrontValueChange() {
      this.$emit("update:isFront", this.isFrontChecked);
    },
    onIsBackValueChange() {
      this.$emit("update:isBack", this.isBackChecked);
    },
    onNextStepChange() {
      this.$emit("update:nextStep");
    },
  },

  computed: {
    isValid(): boolean {
      return this.isFrontChecked || this.isBackChecked;
    },
  },
});
</script>

<style scoped lang="scss">
.first-step {
  h1 {
    color: #333;
    font-size: 48px;
    margin-bottom: 1rem;
  }

  p:nth-of-type(1) {
    font-size: 24px;
    color: #524f4f;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p:nth-of-type(2) {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    div {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }

  h3 {
    color: #333;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  img {
    margin-bottom: 1rem;
  }
}
</style>

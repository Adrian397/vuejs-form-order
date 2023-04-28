<template>
  <section class="second-step" v-if="step === 1">
    <h1>Choose the printing...</h1>
    <div class="preview">
      <div>
        <h3>Printing:</h3>
        <img :src="randomImg" />
      </div>
      <div>
        <h3>On t-shirt:</h3>
        <div class="preview-tshirt">
          <img :src="require('@/assets/t-shirt.png')" />
          <img :src="randomImg" v-show="isFront" />
          <img :src="randomImg" v-show="isBack" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormSecondStep",
  props: {
    step: Number,
    isFront: Boolean,
    isBack: Boolean,
    randomImg: String,
  },
});
</script>

<style scoped lang="scss">
.second-step {
  h1 {
    color: #30bd30;
    font-size: 48px;
    margin-bottom: 1rem;
  }

  h3 {
    color: #333;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}

.preview {
  display: flex;
  gap: 4rem;

  & > div {
    margin-bottom: 1rem;
  }
}

.preview-tshirt {
  position: relative;
  img:nth-of-type(2) {
    width: 80px;
    position: absolute;
    top: 5rem;
    left: 6rem;
  }
  img:nth-of-type(3) {
    width: 80px;
    position: absolute;
    top: 5rem;
    right: 6rem;
  }
}
</style>

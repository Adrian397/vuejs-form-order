<template>
  <section class="second-step" v-if="step === 1">
    <h1>Choose the printing...</h1>
    <div class="preview">
      <div>
        <h3>Printing:</h3>
        <img :src="currentImg" />
        <div class="preview-buttons">
          <button @click.prevent="handleGenerateNewImg">
            Generate new printing
          </button>
          <button @click.prevent="handleGoBackward" v-if="previousImg">
            Load previous printing
          </button>
          <button
            @click.prevent="handleGoForward"
            v-if="currentImg !== randomImg"
          >
            Go one forward
          </button>
        </div>
      </div>
      <div>
        <h3>T-shirt preview:</h3>
        <div class="preview-tshirt">
          <img :src="require('@/assets/t-shirt.png')" />
          <img :src="currentImg" v-show="isFront" />
          <img :src="currentImg" v-show="isBack" />
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
    handleRefetch: Function,
  },
  data() {
    return {
      currentImg: this.randomImg,
      previousImg: "",
    };
  },

  watch: {
    randomImg(newVal: string) {
      this.currentImg = newVal;
    },
  },

  methods: {
    handleGenerateNewImg() {
      this.previousImg = this.currentImg;
      this.handleRefetch();
      this.currentImg = this.randomImg;
    },
    handleGoBackward() {
      if (this.previousImg) {
        this.currentImg = this.previousImg;
        this.previousImg = "";
      }
    },
    handleGoForward() {
      if (this.currentImg !== this.randomImg) {
        this.previousImg = this.currentImg;
        this.currentImg = this.randomImg;
      }
    },
    onPrintingValueChange() {
      this.$emit("update:printing", this.currentImg);
    },
  },
});
</script>

<style scoped lang="scss">
.second-step {
  h1 {
    color: #333;
    font-size: 48px;
    margin-bottom: 1rem;
  }

  h3 {
    color: #333;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}

.preview {
  display: flex;
  gap: 4rem;

  & > div {
    margin-bottom: 1rem;

    img {
      margin-bottom: 1rem;
    }
  }
}

.preview-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    font-weight: bold;
    color: white;
    border-color: transparent;
    padding: 0.1rem 0.3rem;
    width: 160px;
    cursor: pointer;
    border-radius: 2px;
  }

  button:nth-of-type(1) {
    background-color: #ec9b20;
  }
  button:nth-of-type(2) {
    background-color: crimson;
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

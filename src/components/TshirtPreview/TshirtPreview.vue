<template>
  <div class="preview-tshirt">
    <img :src="require('@/assets/t-shirt.png')" />
    <img :src="printing" v-show="isFront" />
    <img :src="printing" v-show="isBack" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TshirtPreviewComponent",
  props: {
    printing: String,
    isFront: Boolean,
    isBack: Boolean,
  },
});
</script>

<style scoped lang="scss">
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

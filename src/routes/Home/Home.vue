<template>
  <div class="wrapper">
    <h1>Customize your t-shirt now!</h1>
    <img :src="require('@/assets/t-shirt.png')" />
    <button @click="handlePageChange">Get started</button>
  </div>
</template>

<script lang="ts">
import { paths } from "@/utils/paths";
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",
  methods: {
    handlePageChange() {
      this.$router.push(paths.form);
    },
  },
});
</script>

<style scoped lang="scss">
@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(104, 201, 104, 0.4);
  }
  100% {
    box-shadow: 0 0 0 35px rgba(104, 201, 104, 0);
  }
}
.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;

  h1 {
    font-size: 64px;
    color: #333;
  }

  button {
    padding: 1rem 1.5rem;
    border-radius: 5px;
    font-size: 14px;
    border: none;
    font-weight: bold;
    color: white;
    background-color: rgb(104, 201, 104);
    text-transform: uppercase;
    animation: shadow-pulse 1s infinite;
    cursor: pointer;
  }
}
</style>

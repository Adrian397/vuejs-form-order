<template>
  <div class="wrapper">
    <Form />
  </div>
</template>

<script lang="ts">
import Form from "@/components/Form/Form.vue";
import Vue from "vue";

export default Vue.extend({
  name: "OrderPage",
  components: {
    Form,
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1rem;
}
</style>

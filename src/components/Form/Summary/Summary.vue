<template>
  <div class="summary">
    <h2>Summary</h2>
    <p>
      <span>Place of the printing:</span> {{ placeOfThePrinting }} of the shirt
    </p>
    <p>BILLING INFORMATION:</p>
    <ul>
      <li><span>Name:</span> {{ form.billing.name }}</li>
      <li><span>Surname:</span> {{ form.billing.surname }}</li>
      <li><span>Street:</span> {{ form.billing.street }}</li>
      <li><span>Building number:</span> {{ form.billing.buildingNumber }}</li>
      <li><span>Apartment number:</span> {{ form.billing.apartmentNumber }}</li>
      <li><span>Postal code:</span> {{ form.billing.postalCode }}</li>
      <li><span>City:</span> {{ form.billing.city }}</li>
      <li><span>Phone:</span> {{ form.billing.phone }}</li>
      <li><span>E-mail:</span> {{ form.billing.email }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SummaryType } from "../FourthStep/FourthStep.utils";

export default Vue.extend({
  name: "FourthFormStep",
  props: {
    form: Object as PropType<SummaryType>,
  },
  computed: {
    placeOfThePrinting(): string {
      return this.form.isFront && this.form.isBack
        ? "front and back"
        : this.form.isFront
        ? "front"
        : "back";
    },
  },
});
</script>

<style scoped lang="scss">
.summary {
  width: 25rem;
  background-color: rgb(233, 232, 232);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;

  ul {
    padding-left: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    word-break: break-all;
  }

  p:nth-of-type(2) {
    margin: 1.5rem 0rem 0.5rem 0rem;
    font-weight: bold;
    color: #333;
  }

  span {
    font-weight: 500;
    color: #333;
  }

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
  }
}
</style>

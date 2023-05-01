<template>
  <div class="summary-wrapper">
    <div class="summary">
      <div>
        <h2>Summary</h2>
        <p>
          <span>Place of the printing:</span> {{ placeOfThePrinting }} of the
          shirt
        </p>
        <p>BILLING INFORMATION:</p>
        <ul>
          <li><span>Name:</span> {{ form.billing.name }}</li>
          <li><span>Surname:</span> {{ form.billing.surname }}</li>
          <li><span>Street:</span> {{ form.billing.street }}</li>
          <li>
            <span>Building number:</span> {{ form.billing.buildingNumber }}
          </li>
          <li>
            <span>Apartment number:</span> {{ form.billing.apartmentNumber }}
          </li>
          <li><span>Postal code:</span> {{ form.billing.postalCode }}</li>
          <li><span>City:</span> {{ form.billing.city }}</li>
          <li><span>Phone:</span> {{ form.billing.phone }}</li>
          <li><span>E-mail:</span> {{ form.billing.email }}</li>
        </ul>
        <p class="price">Price: {{ price }}</p>
      </div>
    </div>
    <div>
      <TshirtPreview
        :url="form.printing.url"
        :isFront="form.printing.isFront"
        :isBack="form.printing.isBack"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TshirtPreview from "@/components/TshirtPreview/TshirtPreview.vue";
import Vue, { PropType } from "vue";
import { FormType } from "../FifthStep/FifthStep.utils";

export default Vue.extend({
  name: "SummaryComponent",
  components: {
    TshirtPreview,
  },
  props: {
    form: Object as PropType<FormType>,
    price: Number,
  },
  computed: {
    placeOfThePrinting(): string {
      return this.form.printing.isFront && this.form.printing.isBack
        ? "front and back"
        : this.form.printing.isFront
        ? "front"
        : "back";
    },
  },
});
</script>

<style scoped lang="scss">
.summary-wrapper {
  display: flex;
}
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

.price {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 1rem;
}
</style>

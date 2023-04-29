<template>
  <section class="third-step" v-if="step === 2">
    <div class="input-container">
      <label for="name">Name: <span>*</span></label>
      <input
        type="text"
        id="name"
        @input="(event) => onBillingChange('name', event)"
      />
    </div>
    <div class="input-container">
      <label for="surname">Surname: <span>*</span></label>
      <input
        type="text"
        id="surname"
        @input="(event) => onBillingChange('surname', event)"
      />
    </div>
    <div class="billing">
      <div class="input-container">
        <label for="street">Street: <span>*</span></label>
        <input
          type="text"
          id="street"
          @input="(event) => onBillingChange('street', event)"
        />
      </div>
      <div>
        <div class="input-container">
          <label for="building">Building number: <span>*</span></label>
          <input
            type="text"
            id="building"
            @input="(event) => onBillingChange('buildingNumber', event)"
          />
        </div>
        <div class="input-container">
          <label for="apartment">Apartment number:</label>
          <input
            type="text"
            id="apartment"
            @input="(event) => onBillingChange('apartmentNumber', event)"
          />
        </div>
      </div>
      <div>
        <div class="input-container">
          <label for="postalCode">Postal code: <span>*</span></label>
          <input
            type="text"
            id="postalCode"
            @input="(event) => onBillingChange('postalCode', event)"
          />
        </div>
        <div class="input-container">
          <label for="town">City: <span>*</span></label>
          <input
            type="text"
            id="town"
            @input="(event) => onBillingChange('city', event)"
          />
        </div>
      </div>
    </div>
    <div class="input-container">
      <label for="phoneNumber">Phone:</label>
      <input
        type="text"
        id="phoneNumber"
        @input="(event) => onBillingChange('phone', event)"
      />
    </div>
    <div class="input-container">
      <label for="email">E-mail: <span>*</span></label>
      <input
        type="text"
        id="email"
        @input="(event) => onBillingChange('email', event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BillingInfo } from "./ThirdStep.utils";

export default Vue.extend({
  name: "FormThirdStep",
  props: {
    step: Number,
    billing: Object as PropType<BillingInfo>,
  },
  methods: {
    onBillingChange(key: string, event: Event) {
      const updatedBilling = {
        ...this.billing,
        [key]: (event.target as HTMLInputElement).value,
      };
      this.$emit("update:billing", updatedBilling);
    },
  },
});
</script>

<style scoped lang="scss">
.third-step {
  margin-bottom: 2rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  span {
    color: crimson;
  }

  label {
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
  }

  input {
    padding: 0.5rem;
    border: 2px solid #dbdeea;
    border-radius: 3px;
  }
}

.billing {
  display: flex;
  flex-direction: column;

  div:nth-of-type(2) {
    display: flex;
    justify-content: space-between;
  }
  div:nth-of-type(3) {
    display: flex;
    gap: 1rem;
  }
}
</style>

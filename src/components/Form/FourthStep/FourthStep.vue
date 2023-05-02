<template>
  <section class="fourth-step">
    <div>
      <div>
        <div class="input-container">
          <label for="name">Name: <span>*</span></label>
          <ValidationProvider
            name="name"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <input
              type="text"
              id="name"
              :value="form.billing.name"
              @input="(event) => onBillingChange('name', event)"
              :class="{ 'error-border': errors && errors.length > 0 }"
            />
          </ValidationProvider>
        </div>
        <div class="input-container">
          <label for="surname">Surname: <span>*</span></label>
          <ValidationProvider
            name="surname"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <input
              type="text"
              id="surname"
              :value="form.billing.surname"
              @input="(event) => onBillingChange('surname', event)"
              :class="{ 'error-border': errors && errors.length > 0 }"
            />
          </ValidationProvider>
        </div>
        <div class="billing">
          <div class="input-container">
            <label for="street">Street: <span>*</span></label>
            <ValidationProvider
              name="street"
              rules="required|alpha"
              v-slot="{ errors }"
            >
              <input
                type="text"
                id="street"
                :value="form.billing.street"
                @input="(event) => onBillingChange('street', event)"
                :class="{ 'error-border': errors && errors.length > 0 }"
              />
            </ValidationProvider>
          </div>
          <div>
            <div class="input-container">
              <label for="building">Building number: <span>*</span></label>
              <ValidationProvider
                name="buildingNumber"
                rules="required|numeric"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="building"
                  :value="form.billing.buildingNumber"
                  @input="(event) => onBillingChange('buildingNumber', event)"
                  :class="{ 'error-border': errors && errors.length > 0 }"
                />
              </ValidationProvider>
            </div>
            <div class="input-container">
              <label for="apartment">Apartment number:</label>
              <ValidationProvider
                name="apartmentNumber"
                rules="numeric"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="apartment"
                  :value="form.billing.apartmentNumber"
                  @input="(event) => onBillingChange('apartmentNumber', event)"
                  :class="{ 'error-border': errors && errors.length > 0 }"
                />
              </ValidationProvider>
            </div>
          </div>
          <div>
            <div class="input-container">
              <label for="postalCode">Postal code: (PL) <span>*</span></label>
              <ValidationProvider
                name="postalCode"
                :rules="{ required: true, regex: /^[0-9]{2}-[0-9]{3}$/ }"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="postalCode"
                  :value="form.billing.postalCode"
                  @input="(event) => onBillingChange('postalCode', event)"
                  :class="{ 'error-border': errors && errors.length > 0 }"
                />
              </ValidationProvider>
            </div>
            <div class="input-container">
              <label for="city">City: <span>*</span></label>
              <ValidationProvider
                name="city"
                rules="required|alpha"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="city"
                  :value="form.billing.city"
                  @input="(event) => onBillingChange('city', event)"
                  :class="{ 'error-border': errors && errors.length > 0 }"
                />
              </ValidationProvider>
            </div>
          </div>
        </div>
        <div class="input-container">
          <label for="phoneNumber">Phone:</label>
          <ValidationProvider
            name="phoneNumber"
            :rules="{ regex: /^(\+48)? ?(\d{3}[- ]?){2}\d{3}$/ }"
            v-slot="{ errors }"
          >
            <input
              type="text"
              id="phoneNumber"
              :value="form.billing.phone"
              @input="(event) => onBillingChange('phone', event)"
              :class="{ 'error-border': errors && errors.length > 0 }"
            />
          </ValidationProvider>
        </div>
        <div class="input-container">
          <label for="email">E-mail: <span>*</span></label>
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              type="text"
              id="email"
              :value="form.billing.email"
              @input="(event) => onBillingChange('email', event)"
              :class="{ 'error-border': errors && errors.length > 0 }"
            />
          </ValidationProvider>
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
    <p>Price: {{ price }}</p>
    <button class="btn btn-prev" @click="onPrevStepChange">
      Previous step
    </button>
    <button class="btn btn-next" @click="onNextStepChange" :disabled="invalid">
      Go to summary
    </button>
  </section>
</template>

<script lang="ts">
import TshirtPreview from "@/components/TshirtPreview/TshirtPreview.vue";
import Vue, { PropType } from "vue";
import { FormType } from "../FifthStep/FifthStep.utils";

export default Vue.extend({
  name: "FormThirdStepComponent",
  components: {
    TshirtPreview,
  },
  props: {
    form: Object as PropType<FormType>,
    price: Number,
    invalid: Boolean,
  },

  methods: {
    onBillingChange(key: string, event: Event) {
      const updatedBilling = {
        ...this.form.billing,
        [key]: (event.target as HTMLInputElement).value,
      };
      this.$emit("update:billing", updatedBilling);
    },

    onPrevStepChange() {
      this.$emit("update:prevStep");
    },

    onNextStepChange() {
      this.$emit("update:nextStep");
    },
  },
});
</script>

<style scoped lang="scss">
.error-border {
  border-color: red;
}
.fourth-step {
  & > div {
    margin-bottom: 2rem;
    display: flex;
  }

  p {
    font-size: 18px;
    color: #333;
    font-weight: 500;
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

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  span:nth-of-type(1) {
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
    width: 100%;
  }

  input.error-border {
    border-color: red;
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

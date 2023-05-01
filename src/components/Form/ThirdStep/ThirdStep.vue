<template>
  <section class="third-step">
    <h1>Choose style of the printing...</h1>
    <div>
      <div>
        <label for="normal">Normal </label>
        <input
          type="radio"
          name="style"
          id="normal"
          v-model="selectedStyleType"
          value="normal"
          @change="onStyleUpdate"
        />
      </div>
      <div>
        <label for="grayscale">Grayscale</label>
        <input
          type="radio"
          name="style"
          id="grayscale"
          v-model="selectedStyleType"
          value="grayscale"
          @change="onStyleUpdate"
        />
      </div>
      <div class="blur">
        <label for="blur">Blur</label>
        <input
          type="radio"
          name="style"
          id="blur"
          v-model="selectedStyleType"
          value="blur"
          @change="onStyleUpdate"
        />
        <input
          type="range"
          min="1"
          max="10"
          v-model="blurValue"
          v-if="selectedStyleType === 'blur'"
          @input="onStyleUpdate"
        />
      </div>
    </div>

    <div class="printing">
      <div>
        <h3>Printing:</h3>
        <img :src="form.printing.url" />
      </div>
      <div>
        <h3>T-shirt preview:</h3>
        <TshirtPreview
          :url="form.printing.url"
          :isFront="form.printing.isFront"
          :isBack="form.printing.isBack"
        />
      </div>
    </div>
    <p>Price: {{ price }}</p>
  </section>
</template>

<script lang="ts">
import { apiService } from "@/api/apiService";
import TshirtPreview from "@/components/TshirtPreview/TshirtPreview.vue";
import { useQuery } from "@tanstack/vue-query";
import Vue, { PropType, onUnmounted, ref } from "vue";
import { FormType } from "../FifthStep/FifthStep.utils";

export default Vue.extend({
  name: "FormThirdStepComponent",
  props: {
    form: Object as PropType<FormType>,
    price: Number,
  },
  components: { TshirtPreview },

  setup({ form }, { emit }) {
    const selectedStyleType = ref(form.printing.style.type);
    const blurValue = ref(form.printing.style.blurValue);

    const url = form.printing.url;
    const idMatch = url.match(/\/id\/(\d+)\//);
    const id = idMatch ? idMatch[1] : null;

    const { data: specificImg, refetch: refetchSpecificImg } = useQuery(
      ["specificImg"],
      () =>
        apiService.fetchSpecificImg(
          id,
          selectedStyleType.value,
          blurValue.value
        ),
      {
        refetchOnWindowFocus: false,
      }
    );

    const onStyleUpdate = () => {
      emit("update:style", {
        url: specificImg,
        type: selectedStyleType.value,
        blurValue:
          selectedStyleType.value === "blur" ? blurValue.value : undefined,
      });
      refetchSpecificImg();
    };

    onUnmounted(() => {
      emit("reset:style", {
        type: "normal",
        blurValue: 1,
      });
    });

    return {
      selectedStyleType,
      blurValue,
      specificImg,
      onStyleUpdate,
    };
  },
});
</script>

<style lang="scss">
.third-step {
  margin-bottom: 1rem;
  h1 {
    color: #333;
    font-size: 48px;
    margin-bottom: 1rem;
  }

  & > div:nth-of-type(1) {
    display: flex;
    gap: 2rem;

    div {
      display: flex;
      margin-bottom: 1rem;

      label {
        margin-right: 0.5rem;
      }
    }
  }
  p {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin-bottom: 1rem;
  }
}

.printing {
  display: flex;
  gap: 4rem;

  h3 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
}

.blur {
  input:nth-of-type(1) {
    margin-right: 1rem;
  }
}
</style>

import { BillingInfoType } from "../FourthStep/FourthStep.utils";

type EffectType = "normal" | "grayscale" | "blur";

export type UpdateStyleType = {
  url: string;
  type: EffectType;
  blurValue?: number;
};

export type StyleType = {
  type: EffectType;
  blurValue?: number;
};

export type FormType = {
  printing: {
    isFront: boolean;
    isBack: boolean;
    url: string;
    style: StyleType;
  };
  billing: BillingInfoType;
};

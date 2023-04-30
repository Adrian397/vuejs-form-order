import { BillingInfoType } from "../FourthStep/FourthStep.utils";

export type FormType = {
  isFront: boolean;
  isBack: boolean;
  printing: string;
  billing: BillingInfoType;
};

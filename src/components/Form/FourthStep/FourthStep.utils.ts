import { BillingInfo } from "../ThirdStep/ThirdStep.utils";

export type SummaryType = {
  isFront: boolean;
  isBack: boolean;
  printing: string;
  billing: BillingInfo;
};

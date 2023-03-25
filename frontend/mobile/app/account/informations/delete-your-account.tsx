import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { VERIFICATION_CODE_LENGTH } from "../../../src/constants";
import { useTranslationsContext } from "../../../src/hooks";

const DeleteYourAccount = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { t } = useTranslationsContext();

  if (step === 1) {
    return (
      <PageStructure
        title={t("DELETE_YOUR_ACCOUNT_STEP_1_TITLE")}
        helperText={t("DELETE_YOUR_ACCOUNT_STEP_1_HELPER_TEXT")}
        button={{
          value: t("DELETE_YOUR_ACCOUNT_STEP_1_BUTTON"),
          onClick: () => setStep(2),
          cn: "bg-[#E64848]",
        }}
        link={{
          value: t("DELETE_YOUR_ACCOUNT_CANCEL_BUTTON"),
          onClick: router.back,
          valueCN: "text-[#0E333C]",
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title={t("DELETE_YOUR_ACCOUNT_STEP_2_TITLE")}
        helperText={t("DELETE_YOUR_ACCOUNT_STEP_2_HELPER_TEXT", {
          verificationCodeLength: VERIFICATION_CODE_LENGTH,
        })}
        button={{
          value: t("DELETE_YOUR_ACCOUNT_STEP_2_BUTTON"),
          onClick: () => console.log("ddd"),
          cn: "bg-[#E64848]",
        }}
        link={{
          value: t("DELETE_YOUR_ACCOUNT_CANCEL_BUTTON"),
          onClick: router.back,
          valueCN: "text-[#0E333C]",
        }}
      ></PageStructure>
    );
  }
};

export default DeleteYourAccount;

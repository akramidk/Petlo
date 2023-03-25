import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
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
        }}
        link={{
          value: t("DELETE_YOUR_ACCOUNT_CANCEL_BUTTON"),
          onClick: router.back,
          valueCN: "text-[#E64848]",
        }}
      ></PageStructure>
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title="Delete Your Account 2"
        helperText="If you delete your account there is no going back, you can't sign in or use your account once you delete it, are you sure about this?"
        button={{
          value: "Yes",
          onClick: () => console.log("ddd"),
        }}
        link={{
          value: "Cancel",
          onClick: router.back,
          valueCN: "text-[#E64848]",
        }}
      ></PageStructure>
    );
  }
};

export default DeleteYourAccount;

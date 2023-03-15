import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Filed } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";

const VERIFICATION_CODE_LENGTH = 6;

const VerifyYourAccount = () => {
  const { t } = useTranslationsContext();
  const router = useRouter();

  const { phoneNumber, sessionToken } = useSearchParams();
  const [verificationCode, setVerificationCode] = useState<string>();
  const { trigger, status } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
    method: "POST",
    options: {
      onSucceeded: () => router.replace("/"),
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title={t("VERIFY_YOUR_ACCOUNT_TITLE")}
      helperText={t("VERIFY_YOUR_ACCOUNT_HELPER_TEXT", {
        verificationCodeLength: VERIFICATION_CODE_LENGTH,
        phoneNumber: phoneNumber,
      })}
      button={{
        value: t("VERIFY_YOUR_ACCOUNT_VERIFY_BUTTON"),
        onClick: () =>
          trigger({
            verification_code: Number(verificationCode),
          }),
        status:
          status ??
          (verificationCode?.trim()?.length === VERIFICATION_CODE_LENGTH
            ? "active"
            : "inactive"),
      }}
    >
      {
        // TODO use figma design
      }
      <Filed
        value={verificationCode}
        onChange={setVerificationCode}
        keyboardType="number-pad"
        maxLength={VERIFICATION_CODE_LENGTH}
      />
    </Form>
  );
};

export default VerifyYourAccount;

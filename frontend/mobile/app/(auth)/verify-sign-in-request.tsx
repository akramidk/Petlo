import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { Form } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";
import { Filed } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";

const VerifySignInRequest = () => {
  const { t } = useTranslationsContext();
  const router = useRouter();
  const { phoneNumber, sessionToken } = useSearchParams();

  const [verificationCode, setVerificationCode] = useState<string>("");

  const { trigger, status } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.VERIFY_SIGN_IN_REQUEST,
    method: "POST",
    options: {
      onSucceeded: () => router.replace("/"),
      fireOnSucceededAfter: 1000,
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title={t("VERIFY_SIGN_IN_REQUEST_TITLE")}
      helperText={t("VERIFY_SIGN_IN_REQUEST_PLACEHOLDER", {
        verificationCodeLength: VERIFICATION_CODE_LENGTH,
        phoneNumber: phoneNumber,
      })}
      button={{
        value: t("VERIFY_SIGN_IN_REQUEST_BUTTON"),
        onClick: () => {
          trigger({
            verification_code: Number(verificationCode),
          });
        },
        status:
          status ??
          (verificationCode.trim().length === VERIFICATION_CODE_LENGTH
            ? "active"
            : "inactive"),
      }}
    >
      <Filed
        value={verificationCode}
        onChange={setVerificationCode}
        keyboardType="number-pad"
        maxLength={VERIFICATION_CODE_LENGTH}
      />
    </Form>
  );
};

export default VerifySignInRequest;

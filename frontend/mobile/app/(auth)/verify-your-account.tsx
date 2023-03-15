import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Filed, Link } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { ResendVerificationCodeResponse } from "../../src/interfaces";

const VERIFICATION_CODE_LENGTH = 6;

const VerifyYourAccount = () => {
  const { t } = useTranslationsContext();
  const router = useRouter();

  const { phoneNumber, sessionToken: sessionTokenParam } = useSearchParams();
  const [sessionToken, setSessionToken] = useState(sessionTokenParam);

  const [verificationCode, setVerificationCode] = useState<string>();
  const { trigger: verifyTrigger, status: verifyStatus } = useAPIMutation<
    unknown,
    unknown
  >({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
    method: "POST",
    options: {
      onSucceeded: () => router.replace("/"),
      overwriteSessionToken: sessionToken,
    },
  });

  const {
    response: resendCodeResponse,
    trigger: resendCodeTrigger,
    status: resendCodeStatus,
  } = useAPIMutation<undefined, ResendVerificationCodeResponse>({
    endpoint: Endpoints.RESEND_VERIFICATION_CODE,
    method: "POST",
    options: {
      onSucceeded: () =>
        setSessionToken(resendCodeResponse.body.customer.session_token),
      overwriteSessionToken: sessionToken,
      resetSucceededStatusAfter: 1000,
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
          verifyTrigger({
            verification_code: Number(verificationCode),
          }),
        status:
          verifyStatus ??
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

      <View className="mt-[16px] flex-row justify-between">
        <Link
          onClick={() => console.log("Edit Phone Number")}
          value="Edit Phone Number"
        />

        <Link
          onClick={() => resendCodeTrigger(undefined)} // TODO handle this shit
          value="Resend Code"
          status={resendCodeStatus}
        />
      </View>
    </Form>
  );
};

export default VerifyYourAccount;

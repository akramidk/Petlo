import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { Form } from "../../src/components/organisms";
import {
  useAPIMutation,
  useSettingsContext,
  useTranslationsContext,
} from "../../src/hooks";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";
import { Filed, Link } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import clsx from "clsx";

const VerifySignInRequest = () => {
  const router = useRouter();
  const { direction } = useSettingsContext();
  const { t } = useTranslationsContext();

  const { phoneNumber, sessionToken: sessionTokenParam } = useSearchParams();
  const [sessionToken, setSessionToken] = useState(sessionTokenParam);

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

  const {
    response: resendCodeResponse,
    trigger: resendCodeTrigger,
    status: resendCodeStatus,
  } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.RESEND_VERIFICATION_CODE_ON_VERIFY_SIGN_IN_REQUEST,
    method: "POST",
    options: {
      onSucceeded: () => setSessionToken(""),
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

      <View
        className={clsx(
          "mt-[16px] justify-between",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Link
          onClick={() => resendCodeTrigger(undefined)} // TODO handle this shit
          value={t("VERIFY_YOUR_ACCOUNT_RESEND_CODE_LINK")}
          status={resendCodeStatus}
        />
      </View>
    </Form>
  );
};

export default VerifySignInRequest;

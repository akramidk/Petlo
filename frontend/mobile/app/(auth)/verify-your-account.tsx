import clsx from "clsx";
import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Filed, Link } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIMutation,
  useSettingsContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  ResendVerificationCodeResponse,
  VerifyCustomerAccountRequest,
  VerifyCustomerAccountResponse,
} from "../../src/interfaces";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";

const VerifyYourAccount = () => {
  const { direction } = useSettingsContext();
  const { t } = useTranslationsContext();
  const router = useRouter();

  const { phoneNumber, sessionToken: sessionTokenParam } = useSearchParams();
  const [sessionToken, setSessionToken] = useState(sessionTokenParam);

  const [verificationCode, setVerificationCode] = useState<string>();
  const { trigger: verifyTrigger, status: verifyStatus } = useAPIMutation<
    VerifyCustomerAccountRequest,
    VerifyCustomerAccountResponse
  >({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
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
  } = useAPIMutation<undefined, ResendVerificationCodeResponse>({
    endpoint: Endpoints.RESEND_VERIFICATION_CODE,
    method: "POST",
    options: {
      onSucceeded: () =>
        setSessionToken(resendCodeResponse.body.customer.session_token),
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title={t("VERIFY_YOUR_ACCOUNT_TITLE")}
      helperText={t("VERIFY_YOUR_ACCOUNT_HELPER_TEXT", {
        verificationCodeLength: VERIFICATION_CODE_LENGTH,
        phoneNumber: phoneNumber.replace("+", ""),
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

      <View
        className={clsx(
          "mt-[16px] justify-between",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Link
          onClick={() =>
            router.push(`/edit-phone-number?sessionToken=${sessionToken}`)
          }
          value={t("VERIFY_YOUR_ACCOUNT_EDIT_PHONE_NUMBER_LINK")}
        />

        <Link
          onClick={() => resendCodeTrigger(undefined)} // TODO handle this shit
          value={t("VERIFY_YOUR_ACCOUNT_RESEND_CODE_LINK")}
          status={resendCodeStatus}
        />
      </View>
    </Form>
  );
};

export default VerifyYourAccount;

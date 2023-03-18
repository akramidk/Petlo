import { useSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Form } from "../../src/components/organisms";
import {
  useAPIMutation,
  useCustomerContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";
import { Filed, Link } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import clsx from "clsx";
import {
  ResendVerificationCodeOnVerifySignInResponse,
  VerifySignInRequest,
  VerifySignInResponse,
} from "../../src/interfaces";

const VerifySignIn = () => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const { setCustomerWithSessionToken } = useCustomerContext();

  const { phoneNumber, sessionToken: sessionTokenParam } = useSearchParams();
  const [sessionToken, setSessionToken] = useState(sessionTokenParam);

  const [verificationCode, setVerificationCode] = useState<string>("");

  const { response, trigger, status } = useAPIMutation<
    VerifySignInRequest,
    VerifySignInResponse
  >({
    endpoint: Endpoints.VERIFY_SIGN_IN,
    method: "POST",
    options: {
      onSucceeded: () =>
        setCustomerWithSessionToken({
          name: response.body.customer.name,
          sessionToken: response.body.customer.session_token,
        }),
      fireOnSucceededAfter: 1000,
      overwriteSessionToken: sessionToken,
    },
  });

  const {
    response: resendCodeResponse,
    trigger: resendCodeTrigger,
    status: resendCodeStatus,
  } = useAPIMutation<null, ResendVerificationCodeOnVerifySignInResponse>({
    endpoint: Endpoints.RESEND_VERIFICATION_CODE_ON_VERIFY_SIGN_IN,
    method: "POST",
    options: {
      onSucceeded: () =>
        setSessionToken(resendCodeResponse.body.customer.session_token),
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title={t("VERIFY_SIGN_IN__TITLE")}
      helperText={t("VERIFY_SIGN_IN__PLACEHOLDER", {
        verificationCodeLength: VERIFICATION_CODE_LENGTH,
        phoneNumber: phoneNumber.replace("+", ""),
      })}
      button={{
        value: t("VERIFY_SIGN_IN__BUTTON"),
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
          value={t("VERIFY_YOUR_ACCOUNT__RESEND_CODE_LINK")}
          status={resendCodeStatus}
        />
      </View>
    </Form>
  );
};

export default VerifySignIn;

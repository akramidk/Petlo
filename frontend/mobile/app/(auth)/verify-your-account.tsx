import clsx from "clsx";
import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Filed, Link } from "../../src/components/atoms";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIMutation,
  useCustomerContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  ResendVerificationCodeResponse,
  VerifyCustomerAccountRequest,
  VerifyCustomerAccountResponse,
} from "../../src/interfaces";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";

const VerifyYourAccount = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const { setCustomerWithSessionToken } = useCustomerContext();

  const { phoneNumber, sessionToken: sessionTokenParam } = useSearchParams();
  const [sessionToken, setSessionToken] = useState(sessionTokenParam);

  const [verificationCode, setVerificationCode] = useState<string>();
  const {
    response: verifyResponse,
    trigger: verifyTrigger,
    status: verifyStatus,
  } = useAPIMutation<
    VerifyCustomerAccountRequest,
    VerifyCustomerAccountResponse
  >({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
    method: "POST",
    options: {
      onSucceeded: () => {
        setCustomerWithSessionToken({
          name: verifyResponse.body.customer.name,
          sessionToken: verifyResponse.body.customer.session_token,
        });
      },
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
    <PageStructure
      title={t("VERIFY_YOUR_ACCOUNT__TITLE")}
      helperText={t("VERIFY_YOUR_ACCOUNT__HELPER_TEXT", {
        verificationCodeLength: VERIFICATION_CODE_LENGTH,
        phoneNumber: phoneNumber.replace("+", ""),
      })}
      button={{
        value: t("VERIFY_YOUR_ACCOUNT__VERIFY_BUTTON"),
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
          value={t("VERIFY_YOUR_ACCOUNT__EDIT_PHONE_NUMBER_LINK")}
        />

        <Link
          onClick={() => resendCodeTrigger(undefined)} // TODO handle this shit
          value={t("VERIFY_YOUR_ACCOUNT__RESEND_CODE_LINK")}
          status={resendCodeStatus}
        />
      </View>
    </PageStructure>
  );
};

export default VerifyYourAccount;

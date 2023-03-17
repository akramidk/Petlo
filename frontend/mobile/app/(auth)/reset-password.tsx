import { useRouter } from "expo-router";
import { Form } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { FiledWithSelector, Filed } from "../../src/components/atoms";
import {
  BaseOption,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
  RequestResetPasswordVerificationRequest,
  RequestResetPasswordVerificationResponse,
} from "../../src/interfaces";
import { useState } from "react";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { VERIFICATION_CODE_LENGTH } from "../../src/constants";
import { Text, View } from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [sessionToken, setSessionToken] = useState("");
  const [step, setStep] = useState(1);

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [verificationCode, setVerificationCode] = useState<string>("");

  const {
    response: requestResetPasswordResponse,
    trigger: requestResetPasswordTrigger,
    status: requestResetPasswordStatus,
  } = useAPIMutation<RequestResetPasswordRequest, RequestResetPasswordResponse>(
    {
      endpoint: Endpoints.REQUEST_RESET_PASSWORD,
      method: "POST",
      options: {
        onSucceeded: () => {
          setSessionToken(
            requestResetPasswordResponse.body.customer.session_token
          );
          setStep(2);
        },
      },
    }
  );

  const {
    response: requestResetPasswordVerificationResponse,
    trigger: requestResetPasswordVerificationTrigger,
    status: requestResetPasswordVerificationStatus,
  } = useAPIMutation<
    RequestResetPasswordVerificationRequest,
    RequestResetPasswordVerificationResponse
  >({
    endpoint: Endpoints.REQUEST_RESET_PASSWORD_VERIFICATION,
    method: "POST",
    options: {
      onSucceeded: () => {
        setSessionToken(
          requestResetPasswordVerificationResponse.body.customer.session_token
        );
        setStep(3);
      },
      fireOnSucceededAfter: 1000,
      overwriteSessionToken: sessionToken,
    },
  });

  if (step === 1) {
    return (
      <Form
        title={t("RESET_PASSWORD_STEP_1_TITLE")}
        backButton={() => router.back()}
        button={{
          value: t("RESET_PASSWORD_STEP_1_BUTTON"),
          onClick: () => {
            requestResetPasswordTrigger({
              phone_number: countryCode.value + phoneNumber,
            });
          },
          status:
            requestResetPasswordStatus ??
            (countryCode && phoneNumber.trim().length > 0
              ? "active"
              : "inactive"),
        }}
      >
        <FiledWithSelector
          name={t("RESET_PASSWORD_PHONE_NUMBER_LABEL")}
          require={true}
          placeholder={t("RESET_PASSWORD_PHONE_NUMBER_PLACEHOLDER")}
          options={COUNTIES_PHONE_CODE_OPTIONS}
          signalSelect={{
            selectedOption: countryCode,
            setSelectedOption: setCountryCode,
          }}
          value={phoneNumber}
          onChange={setPhoneNumber}
          keyboardType="number-pad"
        />
      </Form>
    );
  }

  if (step === 2) {
    return (
      <Form
        title={t("RESET_PASSWORD_STEP_2_TITLE")}
        helperText={t("RESET_PASSWORD_STEP_2_HELPER_TEXT", {
          verificationCodeLength: VERIFICATION_CODE_LENGTH,
          phoneNumber: countryCode.value + phoneNumber,
        })}
        button={{
          value: t("RESET_PASSWORD_STEP_2_BUTTON"),
          onClick: () => {
            requestResetPasswordVerificationTrigger({
              verification_code: Number(verificationCode),
            });
          },
          status:
            requestResetPasswordVerificationStatus ??
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
  }

  if (step === 3) {
    return (
      <View>
        <Text>33333333333333333333333333333333333</Text>
        <Text>{sessionToken}</Text>
      </View>
    );
  }
};

export default ResetPassword;

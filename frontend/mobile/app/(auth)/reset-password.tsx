import { useRouter } from "expo-router";
import { Form } from "../../src/components/organisms";
import {
  useAPIMutation,
  useSettingsContext,
  useTranslationsContext,
} from "../../src/hooks";
import { FiledWithSelector, Filed, Link } from "../../src/components/atoms";
import {
  BaseOption,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
  RequestResetPasswordVerificationRequest,
  RequestResetPasswordVerificationResponse,
  ResendResetPasswordCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../../src/interfaces";
import { useState } from "react";
import {
  COUNTIES_PHONE_CODE_OPTIONS,
  VERIFICATION_CODE_LENGTH,
} from "../../src/constants";
import { Endpoints } from "../../src/enums";
import clsx from "clsx";
import { View } from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useSettingsContext();

  const [sessionToken, setSessionToken] = useState("");
  const [step, setStep] = useState(1);

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        preventSucceededStatus: true,
      },
    }
  );

  const {
    response: resendResetPasswordCodeResponse,
    trigger: resendResetPasswordCodeTrigger,
    status: resendResetPasswordCodeStatus,
  } = useAPIMutation<null, ResendResetPasswordCodeResponse>({
    endpoint: Endpoints.RESEND_RESET_PASSWORD_CODE,
    method: "POST",
    options: {
      onSucceeded: () => {
        setSessionToken(
          resendResetPasswordCodeResponse.body.customer.session_token
        );
      },
      overwriteSessionToken: sessionToken,
    },
  });

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

  const { trigger: resetPasswordTrigger, status: resetPasswordStatus } =
    useAPIMutation<ResetPasswordRequest, ResetPasswordResponse>({
      endpoint: Endpoints.RESET_PASSWORD,
      method: "PATCH",
      options: {
        onSucceeded: () => {
          router.replace("/");
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

        <View
          className={clsx(
            "mt-[16px] justify-between",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Link
            onClick={() => resendResetPasswordCodeTrigger(undefined)}
            value={t("RESET_PASSWORD_RESEND_CODE_LINK")}
            status={resendResetPasswordCodeStatus}
          />
        </View>
      </Form>
    );
  }

  if (step === 3) {
    return (
      <Form
        title={t("RESET_PASSWORD_STEP_3_TITLE")}
        button={{
          value: t("RESET_PASSWORD_STEP_3_BUTTON"),
          onClick: () => {
            resetPasswordTrigger({
              password: password,
            });
          },
          status:
            resetPasswordStatus ??
            (password.trim().length >= 8 ? "active" : "inactive"),
        }}
      >
        <Filed
          name={t("RESET_PASSWORD_PASSWORD_LABEL")}
          helperText={t("RESET_PASSWORD_PASSWORD_HELPER_TEXT")}
          require={true}
          placeholder={t("RESET_PASSWORD_PASSWORD_PLACEHOLDER")}
          onChange={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </Form>
    );
  }
};

export default ResetPassword;

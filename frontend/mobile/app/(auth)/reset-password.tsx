import { useRouter } from "expo-router";
import { Form } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { FiledWithSelector } from "../../src/components/atoms";
import {
  BaseOption,
  RequestResetPasswordRequest,
  RequestResetPasswordResponse,
} from "../../src/interfaces";
import { useState } from "react";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { Text, View } from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [step, setStep] = useState(1);

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [sessionToken, setSessionToken] = useState("");

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
      <View>
        <Text>bla</Text>
      </View>
    );
  }
};

export default ResetPassword;
